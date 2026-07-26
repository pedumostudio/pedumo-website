import { getDb, isDbConfigured } from "@/db";
import { statusItems } from "@/lib/status";

export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET() {
  const dbReady = isDbConfigured();
  let dbOk = false;
  if (dbReady) {
    try {
      const db = await getDb();
      if (db) {
        const { sql } = await import("drizzle-orm");
        await db.execute(sql`select 1`);
        dbOk = true;
      }
    } catch {
      dbOk = false;
    }
  }
  const allOperational = statusItems.every((s) => s.status === "operational");
  return Response.json({
    ok: true,
    status: allOperational ? "operational" : "degraded",
    db: dbReady ? (dbOk ? "connected" : "error") : "not-configured",
    uptimeMs: Date.now() - startedAt,
    version: process.env.NEXT_PUBLIC_RELEASE ?? process.env.npm_package_version ?? "dev",
    timestamp: new Date().toISOString(),
    services: statusItems.map((s) => ({
      name: s.name,
      group: s.group,
      status: s.status,
      uptime: s.uptime,
    })),
  });
}
