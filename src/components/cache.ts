// cache.ts — Production LRU caching with automatic invalidation

interface CacheEntry<V> {
  value: V;
  timestamp: number;
  hits: number;
  size: number;
}

interface CacheOptions {
  maxSize?: number;
  maxEntries?: number;
  ttlMs?: number;
  onEvict?: (key: string, entry: CacheEntry<unknown>) => void;
}

export class LRUCache<K extends string, V> {
  private cache = new Map<K, CacheEntry<V>>();
  private maxEntries: number;
  private maxSize: number;
  private ttlMs: number;
  private onEvict?: (key: string, entry: CacheEntry<unknown>) => void;
  private currentSize = 0;
  private accessOrder: K[] = [];

  constructor(options: CacheOptions = {}) {
    this.maxEntries = options.maxEntries ?? 500;
    this.maxSize = options.maxSize ?? 5 * 1024 * 1024; // 5MB
    this.ttlMs = options.ttlMs ?? 5 * 60 * 1000; // 5 minutes
    this.onEvict = options.onEvict;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check TTL
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.delete(key);
      return undefined;
    }

    // Update access order
    this.touch(key);
    entry.hits++;
    return entry.value;
  }

  set(key: K, value: V, size?: number): void {
    const entrySize = size ?? this.estimateSize(value);

    // Evict if necessary
    while (
      this.cache.size >= this.maxEntries ||
      (this.currentSize + entrySize > this.maxSize && this.cache.size > 0)
    ) {
      this.evictLRU();
    }

    const entry: CacheEntry<V> = {
      value,
      timestamp: Date.now(),
      hits: 0,
      size: entrySize,
    };

    if (this.cache.has(key)) {
      const old = this.cache.get(key)!;
      this.currentSize -= old.size;
    }

    this.cache.set(key, entry);
    this.currentSize += entrySize;
    this.touch(key);
  }

  delete(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    this.currentSize -= entry.size;
    this.cache.delete(key);
    this.removeFromOrder(key);
    return true;
  }

  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.delete(key);
      return false;
    }
    return true;
  }

  clear(): void {
    if (this.onEvict) {
      for (const [key, entry] of this.cache) {
        this.onEvict(key, entry as CacheEntry<unknown>);
      }
    }
    this.cache.clear();
    this.accessOrder = [];
    this.currentSize = 0;
  }

  keys(): K[] {
    return Array.from(this.cache.keys());
  }

  size(): number {
    return this.cache.size;
  }

  hitRate(): number {
    let totalHits = 0;
    let totalAccesses = 0;
    for (const entry of this.cache.values()) {
      totalHits += entry.hits;
      totalAccesses += entry.hits + 1;
    }
    return totalAccesses > 0 ? totalHits / totalAccesses : 0;
  }

  private touch(key: K): void {
    this.removeFromOrder(key);
    this.accessOrder.push(key);
  }

  private removeFromOrder(key: K): void {
    const idx = this.accessOrder.indexOf(key);
    if (idx !== -1) this.accessOrder.splice(idx, 1);
  }

  private evictLRU(): void {
    const key = this.accessOrder.shift();
    if (!key) return;
    const entry = this.cache.get(key);
    if (entry) {
      this.currentSize -= entry.size;
      this.cache.delete(key);
      this.onEvict?.(key, entry as CacheEntry<unknown>);
    }
  }

  private estimateSize(value: unknown): number {
    try {
      return new Blob([JSON.stringify(value)]).size;
    } catch {
      return 1024;
    }
  }
}

// Global cache instances
export const queryCache = new LRUCache<string, unknown>({
  maxEntries: 200,
  ttlMs: 2 * 60 * 1000, // 2 minutes
});

export const tokenCache = new LRUCache<string, string[]>({
  maxEntries: 1000,
  ttlMs: 10 * 60 * 1000, // 10 minutes
});

export const rankingCache = new LRUCache<string, unknown>({
  maxEntries: 100,
  ttlMs: 60 * 1000, // 1 minute
});

export const aiResponseCache = new LRUCache<string, unknown>({
  maxEntries: 50,
  ttlMs: 5 * 60 * 1000, // 5 minutes
});
