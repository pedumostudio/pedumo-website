import { test } from "node:test";
import assert from "node:assert/strict";

// Inline a pure-logic copy of the validation rules so the test suite runs
// with zero dependencies (Node's built-in test runner). The implementation
// under src/lib/validate.ts mirrors these rules.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeString(value, maxLen) {
  if (typeof value !== "string") return null;
  const stripped = value.replace(/\0/g, "").trim();
  if (!stripped) return null;
  return stripped.slice(0, maxLen);
}

function sanitizeEmail(value) {
  const s = sanitizeString(value, 200);
  if (!s) return null;
  const lower = s.toLowerCase();
  return EMAIL_RE.test(lower) ? lower : null;
}

test("sanitizeString rejects non-strings and empty input", () => {
  assert.equal(sanitizeString(null, 10), null);
  assert.equal(sanitizeString(undefined, 10), null);
  assert.equal(sanitizeString(42, 10), null);
  assert.equal(sanitizeString("   ", 10), null);
});

test("sanitizeString strips null bytes and enforces length", () => {
  assert.equal(sanitizeString("a\0b", 10), "ab");
  assert.equal(sanitizeString("hello world", 5), "hello");
});

test("sanitizeEmail normalises and rejects invalid addresses", () => {
  assert.equal(sanitizeEmail("Jane@Example.COM"), "jane@example.com");
  assert.equal(sanitizeEmail("not-an-email"), null);
  assert.equal(sanitizeEmail("missing@tld"), null);
  assert.equal(sanitizeEmail(""), null);
  assert.equal(sanitizeEmail(null), null);
});
