import type { HistoryEntry, UsageEntry, Analytics } from "./types";

/* ═══════════════════════════════════════════════════════════════════════
   STORAGE
   SSR-safe, resilient localStorage persistence for the command palette.
   All reads/writes are wrapped so a disabled or full storage never throws.
   Async signatures keep the call sites future-proof (e.g. IndexedDB).
   ═══════════════════════════════════════════════════════════════════════ */

const KEYS = {
  recent: "pedumo:cmdk:recent",
  usage: "pedumo:cmdk:usage",
  favorites: "pedumo:cmdk:favorites",
  analytics: "pedumo:cmdk:analytics",
} as const;

function hasStorage(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function read<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    return parsed as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded / private mode — fail silently.
  }
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/* ── Recent ──────────────────────────────────────────────────────────── */

export async function loadRecent(): Promise<HistoryEntry[]> {
  const data = read<unknown>(KEYS.recent, []);
  if (!isArray(data)) return [];
  return data.filter(
    (e): e is HistoryEntry =>
      !!e &&
      typeof e === "object" &&
      typeof (e as HistoryEntry).id === "string" &&
      typeof (e as HistoryEntry).href === "string",
  );
}

export async function saveRecent(entries: HistoryEntry[]): Promise<void> {
  write(KEYS.recent, entries.slice(0, 8));
}

/* ── Usage ───────────────────────────────────────────────────────────── */

export async function loadUsage(): Promise<UsageEntry[]> {
  const data = read<unknown>(KEYS.usage, []);
  if (!isArray(data)) return [];
  return data.filter(
    (e): e is UsageEntry =>
      !!e &&
      typeof e === "object" &&
      typeof (e as UsageEntry).id === "string" &&
      typeof (e as UsageEntry).count === "number",
  );
}

export async function saveUsage(entries: UsageEntry[]): Promise<void> {
  write(KEYS.usage, entries.slice(0, 50));
}

/* ── Favorites ───────────────────────────────────────────────────────── */

export async function loadFavorites(): Promise<string[]> {
  const data = read<unknown>(KEYS.favorites, []);
  if (!isArray(data)) return [];
  return data.filter((id): id is string => typeof id === "string");
}

export async function saveFavorites(ids: string[]): Promise<void> {
  write(KEYS.favorites, ids);
}

/* ── Analytics (local-only, anonymous) ───────────────────────────────── */

const EMPTY_ANALYTICS: Analytics = { searches: [], clicks: [] };

export async function loadAnalytics(): Promise<Analytics> {
  const data = read<Analytics>(KEYS.analytics, EMPTY_ANALYTICS);
  return {
    searches: isArray(data?.searches) ? data.searches.slice(-200) : [],
    clicks: isArray(data?.clicks) ? data.clicks.slice(-200) : [],
  };
}

export async function saveAnalytics(analytics: Analytics): Promise<void> {
  write(KEYS.analytics, {
    searches: analytics.searches.slice(-200),
    clicks: analytics.clicks.slice(-200),
  });
}
