/**
 * Input sanitization helpers for public API routes.
 *
 * Goal: accept only what we need, in a shape we can safely store and forward.
 * No secrets, no HTML injection, no null-byte tricks, no over-long payloads.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const stripped = value.replace(/\0/g, "").trim();
  if (!stripped) return null;
  return stripped.slice(0, maxLen);
}

export function sanitizeEmail(value: unknown): string | null {
  const s = sanitizeString(value, 200);
  if (!s) return null;
  const lower = s.toLowerCase();
  return EMAIL_RE.test(lower) ? lower : null;
}

export function readHeaderIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (cf || fwd || "anon").slice(0, 64);
}

export function errorResponse(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}
