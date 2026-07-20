// search-worker.ts — Web Worker for off-main-thread search
// Uses standard postMessage API for maximum compatibility

import { SearchEngine } from "./search-engine";
import type { SearchDoc, SearchOptions, ScoredDoc } from "./types";

const engine = new SearchEngine();
let isReady = false;

self.addEventListener("message", (event: MessageEvent) => {
  const { type, query, options, docs } = event.data;

  switch (type) {
    case "buildIndex": {
      engine.buildIndex(docs as SearchDoc[]);
      isReady = true;
      self.postMessage({ type: "indexBuilt", count: docs.length });
      break;
    }

    case "search": {
      if (!isReady) {
        self.postMessage({ type: "searchResults", results: [] });
        return;
      }
      const results = engine.search(query as string, options as SearchOptions);
      self.postMessage({ type: "searchResults", results });
      break;
    }

    case "getSuggestions": {
      if (!isReady) {
        self.postMessage({ type: "suggestions", suggestions: [] });
        return;
      }
      const { prefix, limit } = event.data;
      const suggestions = engine.getSuggestions(prefix as string, limit as number);
      self.postMessage({ type: "suggestions", suggestions });
      break;
    }

    default:
      self.postMessage({
        type: "error",
        message: "Unknown worker command"
    });
  }
});

export {};
