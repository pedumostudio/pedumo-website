import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   COMMAND PALETTE — SHARED TYPES
   Source of truth for the search subsystem (index, engine, worker,
   storage and the palette UI).
   ═══════════════════════════════════════════════════════════════════════ */

/** A single searchable document in the command palette index. */
export type SearchDoc = {
  /** Stable unique id (used for favorites, usage, analytics keys). */
  id: string;
  /** Primary display label. */
  label: string;
  /** Secondary line shown under the label. */
  subtitle: string;
  /** Optional third line with extra context. */
  detail?: string;
  /** Destination route. */
  href: string;
  /** Grouping bucket (must align with GROUP_ORDER in the palette). */
  group: string;
  /** Optional per-item icon; falls back to the group icon. */
  icon?: LucideIcon;
  /** Freeform keywords to widen recall. */
  keywords: string[];

  // ── Precomputed normalized fields for fast matching ──
  /** Lowercased label. */
  normLabel: string;
  /** Lowercased subtitle. */
  normSubtitle: string;
  /** Lowercased combined corpus (label + subtitle + detail + keywords). */
  normCorpus: string;
  /** Tokenized corpus (unique lowercased tokens). */
  tokens: string[];
  /** Static importance weight (0..1) used as a tie-breaker / prior. */
  weight: number;
};

/** A document with its computed relevance score. */
export type ScoredDoc = {
  doc: SearchDoc;
  score: number;
  /** Optional per-signal breakdown (useful for debugging / analytics). */
  signals?: {
    bm25?: number;
    semantic?: number;
    prefix?: number;
    fuzzy?: number;
    prior?: number;
  };
};

/** A rendered group section in the palette listbox. */
export type GroupedSection = {
  group: string;
  items: SearchDoc[];
  /** Flat indices (into the scored results array) for each item. */
  indices: number[];
};

/** Persisted recent-navigation entry. */
export type HistoryEntry = {
  id: string;
  label: string;
  href: string;
  group: string;
  ts: number;
};

/** Persisted usage-frequency entry. */
export type UsageEntry = {
  id: string;
  label: string;
  href: string;
  group: string;
  ts: number;
  count: number;
};

/** Persisted anonymous, local-only analytics. */
export type Analytics = {
  searches: { query: string; ts: number; results: number }[];
  clicks: { id: string; ts: number; query: string }[];
};

/** Options accepted by the search engine / worker. */
export type SearchOptions = {
  maxResults: number;
  favorites: string[];
  usage: UsageEntry[];
  recent: HistoryEntry[];
  enableSemantic: boolean;
  enableBM25: boolean;
};

/** A concise AI-style synthesized answer with citations. */
export type AIAnswer = {
  answer: string;
  confidence: number;
  sources: { id: string; label: string; href: string }[];
};

/* ── Worker message protocol ─────────────────────────────────────────── */

export type WorkerInbound =
  | { type: "buildIndex"; docs: SearchDoc[] }
  | { type: "search"; query: string; options: SearchOptions };

export type WorkerOutbound =
  | { type: "indexReady"; count: number }
  | { type: "searchResults"; results: ScoredDoc[]; query: string };
