import { test } from "node:test";
import assert from "node:assert/strict";

// Minimal in-memory fixed-window rate limiter (mirrors src/lib/ratelimit.ts).

const buckets = new Map();

function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1 };
  }
  existing.count += 1;
  return { allowed: existing.count <= limit, remaining: Math.max(0, limit - existing.count) };
}

test("allows requests up to the limit then blocks", () => {
  buckets.clear();
  for (let i = 0; i < 3; i++) {
    assert.equal(rateLimit("k", { limit: 3, windowMs: 60_000 }).allowed, true);
  }
  assert.equal(rateLimit("k", { limit: 3, windowMs: 60_000 }).allowed, false);
});

test("separate keys have separate limits", () => {
  buckets.clear();
  assert.equal(rateLimit("a", { limit: 1, windowMs: 60_000 }).allowed, true);
  assert.equal(rateLimit("a", { limit: 1, windowMs: 60_000 }).allowed, false);
  assert.equal(rateLimit("b", { limit: 1, windowMs: 60_000 }).allowed, true);
});
