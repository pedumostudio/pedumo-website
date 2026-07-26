import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { sendToLiveForm } from "@/lib/liveform";
import { rateLimit, getClientKey, rateLimitHeaders } from "@/lib/ratelimit";
import { errorResponse, sanitizeEmail } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rl = rateLimit(getClientKey(request), { limit: 8, windowMs: 60_000 });
  const headers = rateLimitHeaders(rl);
  if (!rl.allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON payload.", 400);
  }
  if (!body || typeof body !== "object") {
    return errorResponse("Invalid request body.", 400);
  }
  const b = body as Record<string, unknown>;
  const email = sanitizeEmail(b.email);
  if (!email) return errorResponse("A valid email address is required.");

  const db = await getDb();
  if (db) {
    try {
      await db
        .insert(newsletterSubscribers)
        .values({ email })
        .onConflictDoNothing({ target: newsletterSubscribers.email });
    } catch {
      // Non-fatal: LiveForm forwarding below still delivers the lead.
    }
  }

  await sendToLiveForm("Newsletter Subscription", { email });

  return Response.json({ ok: true }, { headers });
}
