import { rateLimit, getClientKey, rateLimitHeaders } from "@/lib/ratelimit";
import { sanitizeString, errorResponse } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rl = rateLimit(getClientKey(request), { limit: 30, windowMs: 60_000 });
  const headers = rateLimitHeaders(rl);
  if (!rl.allowed) {
    return Response.json({ ok: false }, { status: 429, headers });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid payload.", 400);
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const message = sanitizeString(b.message, 2000);
  const stack = sanitizeString(b.stack, 8000);
  const url = sanitizeString(b.url, 500);
  // Server-side log; structured so log shippers (Cloudflare Logpush, Datadog,
  // Sentry server SDK) can pick it up. Never echoed back to the client.
  console.error(
    JSON.stringify({
      level: "error",
      source: "client",
      message: message ?? "unknown",
      stack,
      url,
      at: new Date().toISOString(),
    }),
  );
  return Response.json({ ok: true }, { headers });
}
