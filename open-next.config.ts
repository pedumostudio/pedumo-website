import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge/index";

/**
 * Production configuration for Balogun Adeolu's website on Cloudflare Workers.
 *
 * Currently uses the static-assets incremental cache (no R2 bucket needed).
 * To upgrade to R2 for ISR/revalidation support:
 *
 * 1. Create the R2 bucket:
 *    npx wrangler r2 bucket create balogunadeolu-website-cache
 *
 * 2. Add the R2 binding to wrangler.jsonc:
 *    "r2_buckets": [
 *      { "binding": "NEXT_INC_CACHE_R2_BUCKET", "bucket_name": "balogunadeolu-website-cache" }
 *    ]
 *
 * 3. Switch this config to:
 *    import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 *    incrementalCache: r2IncrementalCache,
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  queue: doQueue,
  tagCache: doShardedTagCache,
  cachePurge: purgeCache({ type: "durableObject" }),
  enableCacheInterception: true,
});
