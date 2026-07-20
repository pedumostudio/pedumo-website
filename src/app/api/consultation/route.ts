import { getDb } from "@/db";
import { consultationBookings } from "@/db/schema";
import { sendToLiveForm } from "@/lib/liveform";
import { rateLimit, getClientKey, rateLimitHeaders } from "@/lib/ratelimit";
import { errorResponse, sanitizeEmail, sanitizeString } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rl = rateLimit(getClientKey(request), { limit: 6, windowMs: 60_000 });
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

  const name = sanitizeString(b.name, 160);
  const email = sanitizeEmail(b.email);
  const company = sanitizeString(b.company, 200);
  const role = sanitizeString(b.role, 120);
  const projectType = sanitizeString(b.projectType, 120);
  const timeline = sanitizeString(b.timeline, 80);
  const preferredDate = sanitizeString(b.preferredDate, 40);
  const details = sanitizeString(b.details, 5000);

  if (!name || name.length < 2) return errorResponse("A valid name is required.");
  if (!email) return errorResponse("A valid email address is required.");

  const record = { name, email, company, role, projectType, timeline, preferredDate, details };

  const db = await getDb();
  if (db) {
    try {
      await db.insert(consultationBookings).values(record);
    } catch {
      // Non-fatal: LiveForm forwarding below still delivers the lead.
    }
  }

  await sendToLiveForm("Consultation Booking", record);

  return Response.json({ ok: true }, { headers });
}
