import { getDb, isDbConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbReady = isDbConfigured();
  let dbOk = false;
  if (dbReady) {
    try {
      const db = await getDb();
      if (db) {
        await db.execute(sql`select 1`);
        dbOk = true;
      }
    } catch {
      dbOk = false;
    }
  }
  // The site is healthy as long as it can serve responses. The database is
  // optional; we surface its status for observability but do not fail the
  // health check when it is absent (e.g. Cloudflare Pages Free Plan).
  return Response.json({
    ok: true,
    db: dbReady ? (dbOk ? "connected" : "error") : "not-configured",
  });
}
