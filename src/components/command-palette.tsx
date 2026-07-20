"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Command,
  Star,
  Clock,
  Zap,
  Lightbulb,
  Hash,
  TrendingUp,
  Loader2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import type { SearchDoc, ScoredDoc, GroupedSection, HistoryEntry, UsageEntry, Analytics } from "./types";
import { buildSearchIndex } from "./search-index";
import {
  loadRecent,
  saveRecent,
  loadUsage,
  saveUsage,
  loadFavorites,
  saveFavorites,
  loadAnalytics,
  saveAnalytics,
} from "./storage";
import { generateAIAnswer, parseQuery } from "./search-engine";

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════ */

const GROUP_ORDER = [
  "AI Answer",
  "Favorites",
  "Frequently Used",
  "Recent",
  "Pages",
  "Services",
  "Products",
  "Solutions",
  "Industries",
  "Case Studies",
  "Insights",
  "Careers",
  "FAQ",
  "Studio",
  "Open Source",
  "Actions",
];

const GROUP_ICONS: Record<string, LucideIcon> = {
  "AI Answer": Sparkles,
  Pages: Hash,
  Services: Zap,
  Products: Zap,
  Solutions: Lightbulb,
  Industries: Hash,
  "Case Studies": Hash,
  Insights: Hash,
  Careers: Hash,
  FAQ: Hash,
  Studio: Hash,
  "Open Source": Hash,
  Actions: Zap,
  Favorites: Star,
  "Frequently Used": TrendingUp,
  Recent: Clock,
};

const DEBOUNCE_MS = 120;
const MAX_RESULTS = 24;

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */

type CmdKContextValue = { open: () => void };

/* ═══════════════════════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════════════════════ */

const CmdKContext = createContext<CmdKContextValue | undefined>(undefined);

/* ═══════════════════════════════════════════════════════════════════════
   HIGHLIGHT COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.toLowerCase();
  const textLower = text.toLowerCase();
  const parts: Array<{ text: string; highlight: boolean }> = [];
  let lastIndex = 0;
  let idx = textLower.indexOf(q);

  while (idx !== -1) {
    if (idx > lastIndex) parts.push({ text: text.slice(lastIndex, idx), highlight: false });
    parts.push({ text: text.slice(idx, idx + q.length), highlight: true });
    lastIndex = idx + q.length;
    idx = textLower.indexOf(q, lastIndex);
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), highlight: false });
  if (parts.length === 0) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <mark key={i} className="bg-transparent font-semibold text-[var(--foreground)] underline decoration-2 underline-offset-2">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   COMMAND PALETTE PROVIDER
   ═══════════════════════════════════════════════════════════════════════ */

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // ── UI State ──────────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isSearching, setIsSearching] = useState(false);

  // ── Search Results ────────────────────────────────────────────
  const [scoredResults, setScoredResults] = useState<ScoredDoc[]>([]);
  const [aiAnswer, setAIAnswer] = useState<ReturnType<typeof generateAIAnswer>>(null);

  // ── Persistence State ─────────────────────────────────────────
  const [recent, setRecent] = useState<HistoryEntry[]>([]);
  const [usage, setUsage] = useState<UsageEntry[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({ searches: [], clicks: [] });
  const [isClient, setIsClient] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const searchIndexRef = useRef<SearchDoc[]>([]);

  // ── Build search index ONCE ─────────────────────────────────
  useEffect(() => {
    setIsClient(true);
    const idx = buildSearchIndex();
    searchIndexRef.current = idx;

    // Initialize worker
    if (typeof window !== "undefined" && "Worker" in window) {
      try {
        const worker = new Worker(
          new URL("./search-worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current = worker;

        // Send index to worker
        worker.postMessage({ type: "buildIndex", docs: idx });
      } catch {
        // Worker not supported, fall back to main-thread search
      }
    }

    // Load persistence
    Promise.all([loadRecent(), loadUsage(), loadFavorites(), loadAnalytics()]).then(
      ([r, u, f, a]) => {
        setRecent(r);
        setUsage(u);
        setFavorites(f);
        setAnalytics(a);
      }
    );

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Keep refs in sync
  useEffect(() => { openRef.current = open; }, [open]);

  /* ── Debounced Search ──────────────────────────────────────── */
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsSearching(false);
    }, DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  /* ── Execute Search (NO useMemo side effects!) ─────────────── */
  useEffect(() => {
    if (!isClient) return;

    const q = debouncedQuery;
    const index = searchIndexRef.current;
    if (index.length === 0) return;

    // Cancel previous search
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    startTransition(() => {
      // Try worker first
      const worker = workerRef.current;
      if (worker) {
        const handleMessage = (e: MessageEvent) => {
          if (e.data.type === "searchResults") {
            setScoredResults(e.data.results);
            // Generate AI answer
            const ai = generateAIAnswer(q, e.data.results.map((r: ScoredDoc) => r.doc));
            setAIAnswer(ai);
            worker.removeEventListener("message", handleMessage);
          }
        };
        worker.addEventListener("message", handleMessage);
        worker.postMessage({
          type: "search",
          query: q,
          options: {
            maxResults: MAX_RESULTS,
            favorites,
            usage,
            recent,
            enableSemantic: true,
            enableBM25: true,
          },
        });
      } else {
        // Fallback: main-thread search
        import("./search-engine").then(({ SearchEngine }) => {
          if (controller.signal.aborted) return;
          const engine = new SearchEngine();
          engine.buildIndex(index);
          const results = engine.search(q, {
            maxResults: MAX_RESULTS,
            favorites,
            usage,
            recent,
            enableSemantic: true,
            enableBM25: true,
          });
          setScoredResults(results);
          const ai = generateAIAnswer(q, results.map((r) => r.doc));
          setAIAnswer(ai);
        });
      }
    });

    return () => controller.abort();
  }, [debouncedQuery, isClient, favorites, usage, recent]);

  // Reset active when search changes
  useEffect(() => { setActive(0); }, [debouncedQuery]);

  /* ── Grouping ───────────────────────────────────────────────── */
  const grouped = useMemo<GroupedSection[]>(() => {
    const docs = scoredResults.map((r) => r.doc);
    const map = new Map<string, SearchDoc[]>();
    const favSet = new Set(favorites);
    const usageIds = new Set(usage.map((u) => u.id));
    const recentIds = new Set(recent.map((r) => r.id));

    // Add AI answer as first group if present
    const hasAIAnswer = aiAnswer && debouncedQuery.length > 0;

    for (const doc of docs) {
      let group = doc.group;
      if (!debouncedQuery) {
        if (favSet.has(doc.id)) group = "Favorites";
        else if (usageIds.has(doc.id) && !recentIds.has(doc.id)) group = "Frequently Used";
        else if (recentIds.has(doc.id)) group = "Recent";
      }
      const list = map.get(group) ?? [];
      list.push(doc);
      map.set(group, list);
    }

    const results: GroupedSection[] = [];
    let flatIndex = 0;

    // AI Answer group first
    if (hasAIAnswer) {
      results.push({ group: "AI Answer", items: [], indices: [] });
    }

    for (const groupName of GROUP_ORDER) {
      if (groupName === "AI Answer") continue;
      const list = map.get(groupName);
      if (!list || list.length === 0) continue;
      const indices: number[] = [];
      for (let i = 0; i < list.length; i++) indices.push(flatIndex++);
      results.push({ group: groupName, items: list, indices });
    }

    return results;
  }, [scoredResults, favorites, usage, recent, debouncedQuery, aiAnswer]);

  const totalItems = scoredResults.length;

  /* ── Navigation & Persistence ──────────────────────────────── */
  const recordUsage = useCallback((doc: SearchDoc, queryStr: string) => {
    setUsage((prev) => {
      const existing = prev.find((u) => u.id === doc.id);
      let next: UsageEntry[];
      if (existing) {
        next = prev.map((u) => u.id === doc.id ? { ...u, count: u.count + 1, ts: Date.now() } : u);
      } else {
        next = [...prev, { id: doc.id, label: doc.label, href: doc.href, group: doc.group, ts: Date.now(), count: 1 }];
      }
      next = next.sort((a, b) => b.count - a.count).slice(0, 50);
      saveUsage(next);
      return next;
    });

    setRecent((prev) => {
      const filtered = prev.filter((r) => r.id !== doc.id);
      const next = [{ id: doc.id, label: doc.label, href: doc.href, group: doc.group, ts: Date.now() }, ...filtered].slice(0, 8);
      saveRecent(next);
      return next;
    });

    setAnalytics((prev) => {
      const next = {
        ...prev,
        clicks: [...prev.clicks, { id: doc.id, ts: Date.now(), query: queryStr }],
      };
      saveAnalytics(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((doc: SearchDoc) => {
    setFavorites((prev) => {
      const next = prev.includes(doc.id) ? prev.filter((id) => id !== doc.id) : [...prev, doc.id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const navigate = useCallback((doc: SearchDoc) => {
    recordUsage(doc, debouncedQuery);
    setOpen(false);
    setQuery("");
    setActive(0);
    router.push(doc.href);
  }, [router, recordUsage, debouncedQuery]);

  /* ── Open / Close ──────────────────────────────────────────── */
  const openPalette = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setOpen(true);
    setQuery("");
    setActive(0);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => lastFocusedRef.current?.focus());
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const el = activeRef.current;
    if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [active, open]);

  /* ── Keyboard Handlers ───────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      // Toggle: Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openRef.current ? closePalette() : openPalette();
        return;
      }

      // Number shortcuts: Cmd/Ctrl + 1-9
      if ((event.metaKey || event.ctrlKey) && event.key >= "1" && event.key <= "9") {
        if (!openRef.current) return;
        event.preventDefault();
        const idx = parseInt(event.key, 10) - 1;
        const current = scoredResults;
        if (current[idx]) navigate(current[idx].doc);
        return;
      }

      if (!openRef.current) return;

      const currentFiltered = scoredResults;
      const maxIndex = Math.max(0, currentFiltered.length - 1);

      switch (event.key) {
        case "Escape": { event.preventDefault(); closePalette(); return; }
        case "ArrowDown": { event.preventDefault(); setActive((p) => (p >= maxIndex ? 0 : p + 1)); return; }
        case "ArrowUp": { event.preventDefault(); setActive((p) => (p <= 0 ? maxIndex : p - 1)); return; }
        case "Home": { event.preventDefault(); setActive(0); return; }
        case "End": { event.preventDefault(); setActive(maxIndex); return; }
        case "PageDown": { event.preventDefault(); setActive((p) => Math.min(p + 5, maxIndex)); return; }
        case "PageUp": { event.preventDefault(); setActive((p) => Math.max(p - 5, 0)); return; }
        case "Enter": {
          event.preventDefault();
          const selected = currentFiltered[active];
          if (selected) navigate(selected.doc);
          return;
        }
        case "Tab": {
          event.preventDefault();
          event.shiftKey
            ? setActive((p) => (p <= 0 ? maxIndex : p - 1))
            : setActive((p) => (p >= maxIndex ? 0 : p + 1));
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openPalette, closePalette, navigate, active, scoredResults]);

  /* ── Focus Trap ────────────────────────────────────────────── */
  const handleContainerKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const focusable = [
      inputRef.current,
      ...(listboxRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? []),
    ].filter(Boolean) as HTMLElement[];
    if (focusable.length === 0) return;
    const currentIdx = focusable.findIndex((el) => el === document.activeElement);
    const nextIdx = event.shiftKey
      ? currentIdx <= 0 ? focusable.length - 1 : currentIdx - 1
      : currentIdx >= focusable.length - 1 ? 0 : currentIdx + 1;
    focusable[nextIdx]?.focus();
  }, []);

  /* ── Suggestions for empty results ─────────────────────────── */
  const suggestions = useMemo(() => {
    if (debouncedQuery && totalItems === 0) {
      const qTokens = debouncedQuery.toLowerCase().split(/\s+/).filter(Boolean);
      const scored: Array<{ doc: SearchDoc; score: number }> = [];
      for (const doc of searchIndexRef.current) {
        let score = 0;
        for (const qt of qTokens) {
          if (doc.normLabel.includes(qt)) score += 50;
          else if (doc.normSubtitle.includes(qt)) score += 30;
          else if (doc.normCorpus.includes(qt)) score += 10;
        }
        if (score > 0) scored.push({ doc, score });
      }
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 5).map((s) => s.doc);
    }
    return [];
  }, [debouncedQuery, totalItems]);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <CmdKContext.Provider value={{ open: openPalette }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 backdrop-blur-sm"
            onClick={closePalette}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleContainerKeyDown}
              className="mx-4 mt-[8vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] sm:mt-[10vh] md:mt-24"
            >
              {/* ── Search Header ───────────────────────────── */}
              <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3.5">
                {isSearching ? (
                  <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin text-[var(--muted)]" />
                ) : (
                  <Search className="h-4.5 w-4.5 shrink-0 text-[var(--muted)]" />
                )}

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: >book, @services, #security, or ask anything..."
                  className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--muted)]"
                  aria-controls="cmdk-listbox"
                  aria-activedescendant={totalItems > 0 ? `cmdk-item-${scoredResults[active]?.doc.id}` : undefined}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                <kbd className="hidden shrink-0 rounded-md border border-[var(--border)] bg-[var(--background-subtle)] px-2 py-1 font-mono text-[10px] text-[var(--muted)] sm:inline">
                  ESC
                </kbd>
              </div>

              {/* ── Command Hints ───────────────────────────── */}
              {query.startsWith(">") && (
                <div className="border-b border-[var(--border)] bg-[var(--background-subtle)]/50 px-4 py-2 text-xs text-[var(--muted)]">
                  <span className="font-medium text-[var(--foreground)]">Command mode:</span> Type a command to execute directly. Examples: <code className="rounded bg-[var(--background)] px-1">&gt;book</code> <code className="rounded bg-[var(--background)] px-1">&gt;contact</code>
                </div>
              )}
              {query.startsWith("@") && (
                <div className="border-b border-[var(--border)] bg-[var(--background-subtle)]/50 px-4 py-2 text-xs text-[var(--muted)]">
                  <span className="font-medium text-[var(--foreground)]">Scoped search:</span> Searching within <code className="rounded bg-[var(--background)] px-1">{query.slice(1).split(" ")[0]}</code>
                </div>
              )}

              {/* ── Results Listbox ───────────────────────────── */}
              <div
                ref={listboxRef}
                id="cmdk-listbox"
                role="listbox"
                aria-label="Command palette results"
                aria-live="polite"
                aria-atomic="true"
                className="max-h-[55vh] min-h-[120px] overflow-y-auto overscroll-contain p-2"
              >
                {/* AI Answer */}
                {aiAnswer && debouncedQuery.length > 0 && (
                  <section className="mb-3" aria-label="AI Answer">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">
                        Ask Pedumo
                      </p>
                      <span className="ml-auto rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-400">
                        {Math.round(aiAnswer.confidence * 100)}% confidence
                      </span>
                    </div>
                    <div className="mx-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
                      <p className="text-sm leading-relaxed text-[var(--foreground)]">
                        {aiAnswer.answer}
                      </p>
                      {aiAnswer.sources.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {aiAnswer.sources.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => router.push(s.href)}
                              className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-400 transition-colors hover:bg-amber-400/20"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Empty State */}
                {totalItems === 0 && suggestions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
                    <Search className="h-8 w-8 text-[var(--muted)] opacity-40" />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">No results found</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">Try a different search term or check your spelling</p>
                    </div>
                  </div>
                ) : totalItems === 0 && suggestions.length > 0 ? (
                  <div className="px-2 py-4">
                    <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Did you mean</p>
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={false}
                        onClick={() => navigate(item)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[var(--background-subtle)]/50"
                      >
                        <Lightbulb className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">
                            <HighlightText text={item.label} query={debouncedQuery} />
                          </p>
                          <p className="mt-0.5 truncate text-xs text-[var(--muted)]">{item.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Grouped Results */
                  grouped.map((section) => (
                    <section key={section.group} className="mb-1" aria-label={section.group}>
                      <div className="flex items-center justify-between px-3 py-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{section.group}</p>
                        {section.group === "Favorites" && <Star className="h-3 w-3 text-[var(--muted)]" />}
                        {section.group === "Frequently Used" && <TrendingUp className="h-3 w-3 text-[var(--muted)]" />}
                        {section.group === "Recent" && <Clock className="h-3 w-3 text-[var(--muted)]" />}
                      </div>

                      {section.items.map((item, localIdx) => {
                        const globalIdx = section.indices[localIdx];
                        const isActive = globalIdx === active;
                        const isFav = favorites.includes(item.id);
                        const ItemIcon = item.icon ?? GROUP_ICONS[section.group] ?? Hash;

                        return (
                          <button
                            key={item.id}
                            id={`cmdk-item-${item.id}`}
                            ref={isActive ? activeRef : undefined}
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            onClick={() => navigate(item)}
                            onMouseEnter={() => setActive(globalIdx)}
                            className={cn(
                              "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150",
                              isActive ? "bg-[var(--background-subtle)]" : "hover:bg-[var(--background-subtle)]/40"
                            )}
                          >
                            {/* Number shortcut */}
                            {globalIdx < 9 && (
                              <span className={cn(
                                "hidden h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-mono font-medium sm:flex",
                                isActive ? "bg-[var(--foreground)]/15 text-[var(--foreground)]" : "bg-[var(--background-subtle)] text-[var(--muted)]"
                              )}>
                                {globalIdx + 1}
                              </span>
                            )}

                            {/* Icon */}
                            <div className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
                              isActive ? "bg-[var(--foreground)]/10 text-[var(--foreground)]" : "bg-[var(--background-subtle)] text-[var(--muted)] group-hover:text-[var(--foreground)]"
                            )}>
                              <ItemIcon className="h-4 w-4" />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium text-[var(--foreground)]">
                                  {debouncedQuery ? <HighlightText text={item.label} query={debouncedQuery} /> : item.label}
                                </p>
                                <span className={cn(
                                  "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                                  isActive ? "bg-[var(--foreground)]/10 text-[var(--foreground)]" : "bg-[var(--background-subtle)] text-[var(--muted)]"
                                )}>
                                  {item.group}
                                </span>
                                {isFav && <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />}
                              </div>
                              <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                                {debouncedQuery ? <HighlightText text={item.subtitle} query={debouncedQuery} /> : item.subtitle}
                              </p>
                              {item.detail && (
                                <p className="mt-0.5 truncate text-[11px] text-[var(--muted)] opacity-70">{item.detail}</p>
                              )}
                            </div>

                            {/* Favorite toggle */}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                              className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md opacity-0 transition-all duration-150 group-hover:opacity-100",
                                isFav ? "text-amber-400 hover:bg-amber-400/10" : "text-[var(--muted)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)]"
                              )}
                              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                            >
                              <Star className={cn("h-3.5 w-3.5", isFav && "fill-amber-400")} />
                            </button>

                            {/* Arrow */}
                            <ArrowRight className={cn(
                              "h-4 w-4 shrink-0 transition-all duration-200",
                              isActive ? "translate-x-0 text-[var(--foreground)] opacity-100" : "translate-x-1 opacity-0"
                            )} />
                          </button>
                        );
                      })}
                    </section>
                  ))
                )}
              </div>

              {/* ── Footer ──────────────────────────────────── */}
              <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline">↑↓ Navigate</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">↵ Open</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">⌘1-9 Jump</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-0.5">
                    <Command className="h-3 w-3" /><span>K</span>
                  </span>
                </div>
                <span className="hidden sm:inline">
                  {totalItems > 0 ? `${active + 1} / ${totalItems}` : debouncedQuery ? "0 results" : ""}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CmdKContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   TRIGGER
   ═══════════════════════════════════════════════════════════════════════ */

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const ctx = useContext(CmdKContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.open()}
      aria-label="Open command palette"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm text-[var(--muted)] transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--foreground)]",
        className
      )}
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-[10px] sm:inline-flex">
        <Command className="h-3 w-3" /><span>K</span>
      </kbd>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOOK
   ═══════════════════════════════════════════════════════════════════════ */

export function useCommandPalette() {
  const context = useContext(CmdKContext);
  if (!context) throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return context;
}
