import { isAuthConfigured, register, sessionCookieOptions } from "@/lib/auth";
import { sanitizeEmail, sanitizeString, errorResponse } from "@/lib/validate";
import { rateLimit, getClientKey, rateLimitHeaders } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rl = rateLimit(getClientKey(request), { limit: 6, windowMs: 60_000 });
  const headers = rateLimitHeaders(rl);
  if (!rl.allowed) {
    return Response.json({ ok: false, error: "Too many attempts." }, { status: 429, headers });
  }
  if (!isAuthConfigured()) {
    return Response.json(
      { ok: false, error: "Authentication is not configured on this deployment." },
      { status: 503, headers },
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON payload.", 400);
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const email = sanitizeEmail(b.email);
  const password = sanitizeString(b.password, 200);
  if (!email || !password || password.length < 8) {
    return errorResponse("Email and a password of at least 8 characters are required.");
  }
  const token = await register(email, password);
  if (!token) return errorResponse("An account with that email already exists.", 409);
  return Response.json(
    { ok: true },
    { headers: { ...headers, "Set-Cookie": sessionCookieOptions().replace("{token}", encodeURIComponent(token)) } },
  );
}
