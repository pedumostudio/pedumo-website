/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Suitable for a single-instance Node runtime (e.g. the preview server or a
 * single Cloudflare Worker isolate). For multi-instance production, swap this
 * for a Redis- or KV-backed limiter with the same shape.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodic cleanup so the map cannot grow without bound.
const CLEANUP_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function maybeCleanup(now: number) {
  if (now - lastCleanup < CLEANUP_MS) return;
  lastCleanup = now;
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) buckets.delete(k);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number } = { limit: 5, windowMs: 60_000 },
): RateLimitResult {
  const now = Date.now();
  maybeCleanup(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + opts.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, limit: opts.limit, remaining: opts.limit - 1, resetAt };
  }

  existing.count += 1;
  const allowed = existing.count <= opts.limit;
  return {
    allowed,
    limit: opts.limit,
    remaining: Math.max(0, opts.limit - existing.count),
    resetAt: existing.resetAt,
  };
}

export function getClientKey(request: Request): string {
  // Prefer forwarded IP set by a trusted proxy (Cloudflare, Vercel, e2b),
  // fall back to a coarse path so we still throttle per-connection.
  const fwd = request.headers.get("x-forwarded-for");
  const cf = request.headers.get("cf-connecting-ip");
  const ip = (cf || fwd?.split(",")[0]?.trim() || "anon").slice(0, 64);
  const url = new URL(request.url);
  return `${url.pathname}:${ip}`;
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}
