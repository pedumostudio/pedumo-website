/// <reference lib="webworker" />

import { SearchEngine } from "./search-engine";
import type { SearchDoc, WorkerInbound, WorkerOutbound } from "./types";

/* ═══════════════════════════════════════════════════════════════════════
   SEARCH WORKER
   Runs the hybrid SearchEngine off the main thread. Instantiated by the
   command palette via `new Worker(new URL("./search-worker.ts", import.meta.url))`.
   ═══════════════════════════════════════════════════════════════════════ */

const ctx = self as unknown as DedicatedWorkerGlobalScope;

const engine = new SearchEngine();
let ready = false;
let index: SearchDoc[] = [];

function post(message: WorkerOutbound): void {
  ctx.postMessage(message);
}

ctx.addEventListener("message", (event: MessageEvent<WorkerInbound>) => {
  const data = event.data;
  if (!data || typeof data !== "object") return;

  if (data.type === "buildIndex") {
    index = data.docs;
    engine.buildIndex(index);
    ready = true;
    post({ type: "indexReady", count: index.length });
    return;
  }

  if (data.type === "search") {
    if (!ready) {
      post({ type: "searchResults", results: [], query: data.query });
      return;
    }
    const results = engine.search(data.query, data.options);
    post({ type: "searchResults", results, query: data.query });
  }
});
