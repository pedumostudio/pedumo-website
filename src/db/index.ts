import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const globalForDb = globalThis as typeof globalThis & {
  __pedumoDb?: NodePgDatabase<typeof schema> | null;
  __pedumoDbPromise?: Promise<NodePgDatabase<typeof schema> | null>;
};

/**
 * Lazily connects to Postgres ONLY when DATABASE_URL is set. The `pg` and
 * `drizzle-orm/node-postgres` modules are imported dynamically inside this
 * function so they are NOT part of the static module graph — this keeps the
 * Cloudflare Workers bundle clean (no `pg-cloudflare` resolution at build
 * time) while preserving full Node behaviour for local development and
 * non-edge hosts.
 *
 * On environments without a database (Cloudflare Pages Free Plan by
 * default), this resolves to null and the site still deploys and serves
 * every page; API routes skip the DB write and rely on LiveForm for lead
 * capture.
 */
export function getDb(): Promise<NodePgDatabase<typeof schema> | null> {
  if (globalForDb.__pedumoDb !== undefined) {
    return Promise.resolve(globalForDb.__pedumoDb);
  }
  if (globalForDb.__pedumoDbPromise) return globalForDb.__pedumoDbPromise;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    globalForDb.__pedumoDb = null;
    return Promise.resolve(null);
  }
  globalForDb.__pedumoDbPromise = (async () => {
    try {
      // Non-literal specifiers keep these modules OUT of the static bundle
      // graph, which is what allows the Cloudflare Workers build to succeed
      // without bundling `pg` (and its `pg-cloudflare` peer). On Node hosts
      // the runtime import resolves normally from node_modules.
      const pgSpec = "pg";
      const drizzleSpec = "drizzle-orm/node-postgres";
      const [pgMod, drizzleMod] = (await Promise.all([
        import(/* webpackIgnore: true */ pgSpec),
        import(/* webpackIgnore: true */ drizzleSpec),
      ])) as [typeof import("pg"), typeof import("drizzle-orm/node-postgres")];
      const pool = new pgMod.Pool({ connectionString: databaseUrl });
      globalForDb.__pedumoDb = drizzleMod.drizzle(pool, { schema });
      return globalForDb.__pedumoDb;
    } catch {
      globalForDb.__pedumoDb = null;
      return null;
    }
  })();
  return globalForDb.__pedumoDbPromise;
}

/** True when a DATABASE_URL is configured (the DB itself is connected lazily). */
export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Alias retained for existing call sites. */
export const isDbAvailable = isDbConfigured;
