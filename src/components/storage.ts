// storage.ts — IndexedDB storage with localStorage fallback

import type { HistoryEntry, UsageEntry, Analytics } from "./types";

const DB_NAME = "pedumo_cmdk";
const DB_VERSION = 1;
const STORE_RECENT = "recent";
const STORE_USAGE = "usage";
const STORE_FAVORITES = "favorites";
const STORE_ANALYTICS = "analytics";

/* ═══════════════════════════════════════════════════════════════════════
   INDEXEDDB SETUP
   ═══════════════════════════════════════════════════════════════════════ */

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_RECENT)) {
        db.createObjectStore(STORE_RECENT, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_USAGE)) {
        db.createObjectStore(STORE_USAGE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_FAVORITES)) {
        db.createObjectStore(STORE_FAVORITES, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_ANALYTICS)) {
        db.createObjectStore(STORE_ANALYTICS, { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

async function getStore(storeName: string, mode: IDBTransactionMode = "readonly"): Promise<IDBObjectStore> {
  const db = await openDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

/* ═══════════════════════════════════════════════════════════════════════
   FALLBACK: localStorage (when IndexedDB unavailable)
   ═══════════════════════════════════════════════════════════════════════ */

const LS_RECENT = "pedumo:cmdk:recent:v3";
const LS_USAGE = "pedumo:cmdk:usage:v3";
const LS_FAVORITES = "pedumo:cmdk:favorites:v3";
const LS_ANALYTICS = "pedumo:cmdk:analytics:v3";

function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   RECENT
   ═══════════════════════════════════════════════════════════════════════ */

export async function loadRecent(): Promise<HistoryEntry[]> {
  try {
    const store = await getStore(STORE_RECENT);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const results = request.result as HistoryEntry[];
        resolve(results.sort((a, b) => b.ts - a.ts).slice(0, 8));
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return lsGet<HistoryEntry[]>(LS_RECENT, []);
  }
}

export async function saveRecent(entries: HistoryEntry[]) {
  const trimmed = entries.slice(0, 8);
  try {
    const store = await getStore(STORE_RECENT, "readwrite");
    const clearReq = store.clear();
    await new Promise<void>((resolve, reject) => {
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });
    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {
    lsSet(LS_RECENT, trimmed);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   USAGE (Frequency)
   ═══════════════════════════════════════════════════════════════════════ */

export async function loadUsage(): Promise<UsageEntry[]> {
  try {
    const store = await getStore(STORE_USAGE);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const results = request.result as UsageEntry[];
        resolve(results.sort((a, b) => b.count - a.count).slice(0, 50));
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return lsGet<UsageEntry[]>(LS_USAGE, []);
  }
}

export async function saveUsage(entries: UsageEntry[]) {
  const trimmed = entries.slice(0, 50);
  try {
    const store = await getStore(STORE_USAGE, "readwrite");
    const clearReq = store.clear();
    await new Promise<void>((resolve, reject) => {
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });
    for (const entry of trimmed) {
      store.put(entry);
    }
  } catch {
    lsSet(LS_USAGE, trimmed);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   FAVORITES
   ═══════════════════════════════════════════════════════════════════════ */

export async function loadFavorites(): Promise<string[]> {
  try {
    const store = await getStore(STORE_FAVORITES);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const results = request.result as Array<{ id: string }>;
        resolve(results.map((r) => r.id));
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return lsGet<string[]>(LS_FAVORITES, []);
  }
}

export async function saveFavorites(ids: string[]) {
  try {
    const store = await getStore(STORE_FAVORITES, "readwrite");
    const clearReq = store.clear();
    await new Promise<void>((resolve, reject) => {
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });
    for (const id of ids) {
      store.put({ id });
    }
  } catch {
    lsSet(LS_FAVORITES, ids);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   ANALYTICS
   ═══════════════════════════════════════════════════════════════════════ */

export async function loadAnalytics(): Promise<Analytics> {
  try {
    const store = await getStore(STORE_ANALYTICS);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const results = request.result as Array<{ type: string; data: unknown }>;
        const searches = results
          .filter((r) => r.type === "search")
          .map((r) => r.data as Analytics["searches"][number]);
        const clicks = results
          .filter((r) => r.type === "click")
          .map((r) => r.data as Analytics["clicks"][number]);
        resolve({ searches: searches.slice(-200), clicks: clicks.slice(-200) });
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return lsGet<Analytics>(LS_ANALYTICS, { searches: [], clicks: [] });
  }
}

export async function saveAnalytics(analytics: Analytics) {
  try {
    const store = await getStore(STORE_ANALYTICS, "readwrite");
    const clearReq = store.clear();
    await new Promise<void>((resolve, reject) => {
      clearReq.onsuccess = () => resolve();
      clearReq.onerror = () => reject(clearReq.error);
    });
    for (const s of analytics.searches) {
      store.put({ type: "search", data: s });
    }
    for (const c of analytics.clicks) {
      store.put({ type: "click", data: c });
    }
  } catch {
    lsSet(LS_ANALYTICS, analytics);
  }
}
