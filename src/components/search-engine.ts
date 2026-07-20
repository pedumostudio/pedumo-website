// search-engine.ts — Enterprise hybrid search engine v2.0
// Integrates: BM25, Trie, Vector Search, Multi-stage Ranking, Synonyms, Typo Tolerance

import type { SearchDoc, ScoredDoc, SearchOptions, ParsedQuery } from "./types";
import { tokenize, normalize, tokenizeAdvanced, similarityFingerprint } from "./tokenizer";
import { TrieIndex } from "./trie";
import { BM25Index } from "./ranking";
import { parseQueryAdvanced } from "./parser";
import { generateAIAnswer } from "./ai";
import { queryCache, rankingCache } from "./cache";
import {
  generateCandidates,
  applyBM25,
  applySemantic,
  applyPopularity,
  applyRecency,
  applyPersonalization,
  applyContextual,
  finalRank,
} from "./ranking";

/* ═══════════════════════════════════════════════════════════════════════
   SYNONYM ENGINE
   ═══════════════════════════════════════════════════════════════════════ */

const SYNONYM_MAP: Record<string, string[]> = {
  ai: ["artificial intelligence", "llm", "gpt", "openai", "anthropic", "agent", "bot", "machine learning", "ml", "generative"],
  llm: ["ai", "artificial intelligence", "gpt", "openai", "anthropic", "model", "large language model"],
  gpt: ["ai", "llm", "openai", "anthropic", "model", "chatbot", "chatgpt"],
  agent: ["ai", "bot", "automation", "assistant", "worker"],
  bot: ["ai", "agent", "automation", "assistant", "chatbot"],
  automation: ["workflow", "auto", "robotic", "rpa", "agent", "bot", "orchestration"],
  cloud: ["hosting", "infrastructure", "server", "aws", "vercel", "digitalocean", "cloudflare", "edge", "cdn"],
  devops: ["ci", "cd", "pipeline", "deployment", "infrastructure", "platform", "sre"],
  security: ["cybersecurity", "owasp", "encryption", "auth", "authentication", "monitoring", "siem", "compliance", "hardening"],
  cybersecurity: ["security", "owasp", "encryption", "hardening", "threat", "vulnerability", "pentest"],
  analytics: ["dashboard", "reporting", "metrics", "charts", "data", "insights", "kpi", "business intelligence"],
  dashboard: ["analytics", "reporting", "metrics", "charts", "data", "insights", "visualization"],
  metrics: ["analytics", "dashboard", "reporting", "charts", "kpi", "telemetry"],
  web: ["frontend", "react", "nextjs", "application", "app", "browser", "spa"],
  api: ["integration", "rest", "graphql", "webhook", "endpoint", "interface"],
  database: ["db", "postgres", "sql", "data", "storage", "persistence"],
  design: ["ui", "ux", "interface", "visual", "creative", "product design"],
  performance: ["speed", "fast", "optimization", "cache", "latency", "throughput"],
  support: ["help", "maintenance", "sla", "monitoring", "assistance"],
  startup: ["founder", "mvp", "venture", "early stage", "seed"],
  enterprise: ["business", "corporate", "organization", "scale", "fortune 500"],
  saas: ["software as a service", "subscription", "platform", "product"],
  fintech: ["finance", "banking", "payments", "financial technology"],
  healthcare: ["health", "medical", "hospital", "clinic", "pharma"],
  government: ["public sector", "civic", "state", "federal", "municipal"],
  nonprofit: ["ngo", "charity", "foundation", "social impact"],
  consulting: ["advisory", "strategy", "expertise", "guidance"],
  migration: ["modernization", "upgrade", "transition", "refactor"],
  testing: ["qa", "quality assurance", "automation", "cypress", "playwright"],
  monitoring: ["observability", "logging", "alerting", "apm", "tracing"],
  jobs: ["careers", "hiring", "roles", "positions", "openings"],
  careers: ["jobs", "hiring", "roles", "positions", "openings"],
  pricing: ["cost", "plans", "rates", "fees", "engagement"],
  plans: ["pricing", "cost", "rates", "fees"],
  docs: ["documentation", "reference", "guide", "manual"],
  documentation: ["docs", "reference", "guide", "manual"],
  blog: ["insights", "articles", "posts", "news"],
  insights: ["blog", "articles", "posts", "news", "engineering notes"],
  about: ["company", "story", "team", "mission", "values"],
  contact: ["reach", "email", "message", "get in touch"],
  book: ["schedule", "consultation", "meeting", "appointment"],
  schedule: ["book", "consultation", "meeting", "appointment"],
};

function expandSynonyms(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    const syns = SYNONYM_MAP[token];
    if (syns) {
      for (const syn of syns) {
        for (const st of tokenize(syn)) expanded.add(st);
      }
    }
  }
  return Array.from(expanded);
}

/* ═══════════════════════════════════════════════════════════════════════
   LEVENSHTEIN + TYPO TOLERANCE
   ═══════════════════════════════════════════════════════════════════════ */

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a.length < b.length) { const tmp = a; a = b; b = tmp; }
  const m = a.length, n = b.length;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    const ai = a.charCodeAt(i - 1);
    for (let j = 1; j <= n; j++) {
      const cost = ai === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    const tmp = prev; prev = curr; curr = tmp;
  }
  return prev[n];
}

function isFuzzyMatch(a: string, b: string): boolean {
  if (a.length <= 2 || b.length <= 2) return a === b;
  const maxDist = Math.min(2, Math.floor(Math.max(a.length, b.length) * 0.35));
  return levenshtein(a, b) <= maxDist;
}

/* ═══════════════════════════════════════════════════════════════════════
   VECTOR INDEX (Semantic Search)
   ═══════════════════════════════════════════════════════════════════════ */

class VectorIndex {
  private vocab = new Map<string, number>();
  private docVectors = new Map<string, number[]>();
  private idf = new Map<string, number>();

  build(docs: SearchDoc[]) {
    const docFreq = new Map<string, number>();
    const allTokens = new Map<string, Map<string, number>>();

    for (const doc of docs) {
      const tokens = [...doc.tokens, ...doc.normCorpus.split(" ").filter(Boolean)];
      const freq = new Map<string, number>();
      for (const t of tokens) {
        freq.set(t, (freq.get(t) ?? 0) + 1);
        docFreq.set(t, (docFreq.get(t) ?? 0) + 1);
      }
      allTokens.set(doc.id, freq);
    }

    let idx = 0;
    for (const term of docFreq.keys()) {
      this.vocab.set(term, idx++);
      const df = docFreq.get(term) ?? 1;
      this.idf.set(term, Math.log(docs.length / df));
    }

    for (const doc of docs) {
      const tokens = allTokens.get(doc.id);
      if (!tokens) continue;
      const vec = new Array(this.vocab.size).fill(0);
      for (const [term, freq] of tokens) {
        const vocabIdx = this.vocab.get(term);
        if (vocabIdx === undefined) continue;
        const idf = this.idf.get(term) ?? 1;
        vec[vocabIdx] = freq * idf;
      }
      const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
      if (norm > 0) for (let i = 0; i < vec.length; i++) vec[i] /= norm;
      this.docVectors.set(doc.id, vec);
    }
  }

  querySimilarity(query: string): Map<string, number> {
    const qTokens = tokenize(query);
    const qFreq = new Map<string, number>();
    for (const t of qTokens) qFreq.set(t, (qFreq.get(t) ?? 0) + 1);

    const qVec = new Array(this.vocab.size).fill(0);
    for (const [term, freq] of qFreq) {
      const idx = this.vocab.get(term);
      if (idx === undefined) continue;
      const idf = this.idf.get(term) ?? 1;
      qVec[idx] = freq * idf;
    }

    const qNorm = Math.sqrt(qVec.reduce((sum, v) => sum + v * v, 0));
    if (qNorm > 0) for (let i = 0; i < qVec.length; i++) qVec[i] /= qNorm;

    const scores = new Map<string, number>();
    for (const [docId, dVec] of this.docVectors) {
      let dot = 0;
      for (let i = 0; i < qVec.length; i++) dot += qVec[i] * dVec[i];
      scores.set(docId, dot);
    }
    return scores;
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN SEARCH ENGINE CLASS
   ═══════════════════════════════════════════════════════════════════════ */

export class SearchEngine {
  private docs: SearchDoc[] = [];
  private docMap = new Map<string, SearchDoc>();
  private bm25 = new BM25Index();
  private trie = new TrieIndex();
  private vector = new VectorIndex();
  private isBuilt = false;
  private buildTime = 0;

  /** Build the complete search index */
  buildIndex(docs: SearchDoc[]) {
    const start = performance.now();
    this.docs = docs;
    this.docMap.clear();
    for (const doc of docs) this.docMap.set(doc.id, doc);

    this.bm25.addDocs(docs);
    this.vector.build(docs);

    this.trie.clear();
    for (const doc of docs) {
      this.trie.insertDoc(doc);
    }

    this.isBuilt = true;
    this.buildTime = performance.now() - start;
  }

  /** Incremental update: add or update a single document */
updateDoc(doc: SearchDoc) {
  if (!this.isBuilt) return;

  const existingIdx = this.docs.findIndex((d) => d.id === doc.id);

  if (existingIdx !== -1) {
    this.docs[existingIdx] = doc;
  } else {
    this.docs.push(doc);
  }

  this.docMap.set(doc.id, doc);

  // Refresh indexes
  this.bm25.addDocs(this.docs);
  this.trie.insertDoc(doc);

  // Keep semantic vector index synchronized
  this.vector.build(this.docs);
}

  /** Remove a document from the index */
removeDoc(id: string) {
  if (!this.isBuilt) return;

  const idx = this.docs.findIndex((d) => d.id === id);

  if (idx !== -1) {
    this.docs.splice(idx, 1);
    this.docMap.delete(id);

    // Refresh BM25
    this.bm25.addDocs(this.docs);

    // Rebuild trie (basic trie has no delete)
    this.trie.clear();
    for (const doc of this.docs) {
      this.trie.insertDoc(doc);
    }

    // Keep semantic vector index synchronized
    this.vector.build(this.docs);
  }
}

  /** Main search method */
  search(rawQuery: string, options: SearchOptions): ScoredDoc[] {
    if (!this.isBuilt || this.docs.length === 0) return [];

    // Check cache
    const cacheKey = `search:${rawQuery}:${options.maxResults}`;
    const cached = rankingCache.get(cacheKey) as ScoredDoc[] | undefined;
    if (cached) return cached;

    const parsed = parseQueryAdvanced(rawQuery);
    const q = parsed.terms;

    if (!q) {
      const results = this.getPersonalizedResults(options);
      rankingCache.set(cacheKey, results);
      return results;
    }

    const queryTokens = expandSynonyms(tokenize(q));
    if (queryTokens.length === 0) {
      const results = this.docs.slice(0, options.maxResults).map((doc) => ({
        doc, score: 0, bm25Score: 0, semanticScore: 0, exactScore: 0,
      }));
      rankingCache.set(cacheKey, results);
      return results;
    }

    // Stage 1: Trie prefix lookup
    const trieIds = this.trie.searchPrefix(q);

    // Stage 2: Candidate generation
    let candidates = generateCandidates(this.docs, queryTokens, q, trieIds);

    // Apply scope filter
    if (parsed.scope) {
      candidates = candidates.filter((c) =>
        c.doc.group.toLowerCase().includes(parsed.scope!.toLowerCase())
      );
    }

    // Apply boolean filters
    if (parsed.booleanQuery.must.length > 0) {
      candidates = candidates.filter((c) =>
        parsed.booleanQuery.must.every((t) =>
          c.doc.normLabel.includes(t) || c.doc.normCorpus.includes(t)
        )
      );
    }
    if (parsed.booleanQuery.mustNot.length > 0) {
      candidates = candidates.filter((c) =>
        parsed.booleanQuery.mustNot.every((t) =>
          !c.doc.normLabel.includes(t) && !c.doc.normCorpus.includes(t)
        )
      );
    }

    // Stage 3: BM25 scoring
    candidates = applyBM25(candidates, queryTokens, this.bm25);

    // Stage 4: Semantic scoring
    const semanticScores = options.enableSemantic
      ? this.vector.querySimilarity(q)
      : new Map<string, number>();
    candidates = applySemantic(candidates, semanticScores);

    // Stage 5-8: Contextual signals
    const popularityScores = applyPopularity(candidates, options.usage);
    const recencyScores = applyRecency(candidates, options.recent);
    const personalizationScores = applyPersonalization(candidates, options.favorites, options.usage);
    const contextualScores = applyContextual(candidates, q);

    // Final ranking
    const results = finalRank(
      candidates,
      popularityScores,
      recencyScores,
      personalizationScores,
      contextualScores
    );

    rankingCache.set(cacheKey, results.slice(0, options.maxResults));
    return results.slice(0, options.maxResults);
  }

  /** Get autocomplete suggestions */
  getSuggestions(prefix: string, limit = 10): Array<{ word: string; frequency: number }> {
    if (!this.isBuilt) return [];
    return this.trie.getSuggestions(prefix, limit);
  }

  /** Get index stats */
  getStats() {
    return {
      documentCount: this.docs.length,
      buildTime: this.buildTime,
      isBuilt: this.isBuilt,
      trieStats: this.trie.getStats(),
    };
  }

  /** Get personalized results (empty query) */
  private getPersonalizedResults(options: SearchOptions): ScoredDoc[] {
    const result: ScoredDoc[] = [];
    const seen = new Set<string>();

    // Favorites
    const favSet = new Set(options.favorites);
    for (const doc of this.docs) {
      if (favSet.has(doc.id) && !seen.has(doc.id)) {
        seen.add(doc.id);
        result.push({ doc, score: 1000, bm25Score: 0, semanticScore: 0, exactScore: 1000 });
      }
    }

    // Frequently used
    const usageMap = new Map(options.usage.map((u) => [u.id, u.count]));
    const frequent = [...this.docs]
      .filter((d) => usageMap.has(d.id) && !seen.has(d.id))
      .sort((a, b) => (usageMap.get(b.id) ?? 0) - (usageMap.get(a.id) ?? 0))
      .slice(0, 6);
    for (const doc of frequent) {
      seen.add(doc.id);
      result.push({ doc, score: 800, bm25Score: 0, semanticScore: 0, exactScore: 800 });
    }

    // Recent
    for (const r of options.recent) {
      const doc = this.docMap.get(r.id);
      if (doc && !seen.has(doc.id)) {
        seen.add(doc.id);
        result.push({ doc, score: 600, bm25Score: 0, semanticScore: 0, exactScore: 600 });
      }
    }

    return result.slice(0, options.maxResults);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   LEGACY EXPORTS (backward compatibility)
   ═══════════════════════════════════════════════════════════════════════ */

export { parseQueryAdvanced as parseQuery, generateAIAnswer };
export { normalize, tokenize };
