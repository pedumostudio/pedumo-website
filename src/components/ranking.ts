// ranking.ts — Multi-stage ranking pipeline with personalization

import type { SearchDoc, ScoredDoc, UsageEntry, HistoryEntry } from "./types";

/* ═══════════════════════════════════════════════════════════════════════
   RANKING CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════ */

interface RankingWeights {
  exactMatch: number;
  bm25: number;
  semantic: number;
  popularity: number;
  usage: number;
  recency: number;
  personalization: number;
  contextual: number;
}

const DEFAULT_WEIGHTS: RankingWeights = {
  exactMatch: 2.0,
  bm25: 1.5,
  semantic: 1.0,
  popularity: 0.8,
  usage: 1.2,
  recency: 0.6,
  personalization: 0.7,
  contextual: 0.5,
};

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 1: CANDIDATE GENERATION
   ═══════════════════════════════════════════════════════════════════════ */

export interface Candidate {
  doc: SearchDoc;
  exactScore: number;
  bm25Score: number;
  semanticScore: number;
  trieBoost: number;
}

export function generateCandidates(
  docs: SearchDoc[],
  queryTokens: string[],
  rawQuery: string,
  trieIds: Set<string>
): Candidate[] {
  const candidates: Candidate[] = [];
  const qLower = rawQuery.toLowerCase();

  for (const doc of docs) {
    let exactScore = 0;
    let hasMatch = false;

    // Exact match scoring
    for (const qt of queryTokens) {
      if (doc.tokens.some((t) => t === qt)) { exactScore += 1000; hasMatch = true; }
      else if (doc.normLabel.startsWith(qt)) { exactScore += 500; hasMatch = true; }
      else if (doc.tokens.some((t) => t.startsWith(qt))) { exactScore += 350; hasMatch = true; }
      else if (doc.normLabel.includes(qt)) { exactScore += 250; hasMatch = true; }
      else if (doc.normSubtitle.includes(qt)) { exactScore += 150; hasMatch = true; }
      else if (doc.keywords.some((k) => k.includes(qt))) { exactScore += 120; hasMatch = true; }
      else if (doc.normCorpus.includes(qt)) { exactScore += 50; hasMatch = true; }
    }

    // Phrase boost
    if (qLower.length > 2) {
      if (doc.normLabel.includes(qLower)) exactScore += 300;
      if (doc.normSubtitle.includes(qLower)) exactScore += 150;
    }

    const trieBoost = trieIds.has(doc.id) ? 50 : 0;

    if (hasMatch || trieBoost > 0) {
      candidates.push({ doc, exactScore, bm25Score: 0, semanticScore: 0, trieBoost });
    }
  }

  return candidates;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 2: BM25 SCORING
   ═══════════════════════════════════════════════════════════════════════ */

export function applyBM25(
  candidates: Candidate[],
  queryTokens: string[],
  bm25Index: BM25Index
): Candidate[] {
  for (const c of candidates) {
    const idx = bm25Index.getDocIndex(c.doc.id);
    if (idx !== -1) {
      c.bm25Score = bm25Index.score(queryTokens, idx);
    }
  }
  return candidates;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 3: SEMANTIC SCORING
   ═══════════════════════════════════════════════════════════════════════ */

export function applySemantic(
  candidates: Candidate[],
  semanticScores: Map<string, number>
): Candidate[] {
  for (const c of candidates) {
    c.semanticScore = semanticScores.get(c.doc.id) ?? 0;
  }
  return candidates;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 4: POPULARITY SCORING
   ═══════════════════════════════════════════════════════════════════════ */

export function applyPopularity(
  candidates: Candidate[],
  usage: UsageEntry[]
): Map<string, number> {
  const usageMap = new Map(usage.map((u) => [u.id, u.count]));
  const scores = new Map<string, number>();

  for (const c of candidates) {
    const count = usageMap.get(c.doc.id) ?? 0;
    // Log-scaled popularity to prevent domination
    scores.set(c.doc.id, Math.log1p(count) * 10);
  }

  return scores;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 5: RECENCY SCORING
   ═══════════════════════════════════════════════════════════════════════ */

export function applyRecency(
  candidates: Candidate[],
  recent: HistoryEntry[]
): Map<string, number> {
  const now = Date.now();
  const scores = new Map<string, number>();

  for (const c of candidates) {
    const entry = recent.find((r) => r.id === c.doc.id);
    if (entry) {
      const ageHours = (now - entry.ts) / (1000 * 60 * 60);
      // Exponential decay: newer = higher score
      scores.set(c.doc.id, 100 * Math.exp(-ageHours / 168)); // 168 hours = 1 week
    } else {
      scores.set(c.doc.id, 0);
    }
  }

  return scores;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 6: PERSONALIZATION
   ═══════════════════════════════════════════════════════════════════════ */

export function applyPersonalization(
  candidates: Candidate[],
  favorites: string[],
  usage: UsageEntry[]
): Map<string, number> {
  const favSet = new Set(favorites);
  const usageMap = new Map(usage.map((u) => [u.id, u.count]));
  const scores = new Map<string, number>();

  for (const c of candidates) {
    let score = 0;
    if (favSet.has(c.doc.id)) score += 200;
    const count = usageMap.get(c.doc.id) ?? 0;
    score += Math.log1p(count) * 5;
    scores.set(c.doc.id, score);
  }

  return scores;
}

/* ═══════════════════════════════════════════════════════════════════════
   STAGE 7: CONTEXTUAL RELEVANCE
   ═══════════════════════════════════════════════════════════════════════ */

export function applyContextual(
  candidates: Candidate[],
  query: string
): Map<string, number> {
  const scores = new Map<string, number>();
  const qLower = query.toLowerCase();

  for (const c of candidates) {
    let score = 0;
    // Boost if query matches group name
    if (c.doc.group.toLowerCase().includes(qLower)) score += 30;
    // Boost if query matches keywords
    if (c.doc.keywords.some((k) => k.includes(qLower))) score += 20;
    scores.set(c.doc.id, score);
  }

  return scores;
}

/* ═══════════════════════════════════════════════════════════════════════
   FINAL STAGE: COMBINED RANKING
   ═══════════════════════════════════════════════════════════════════════ */

export function finalRank(
  candidates: Candidate[],
  popularityScores: Map<string, number>,
  recencyScores: Map<string, number>,
  personalizationScores: Map<string, number>,
  contextualScores: Map<string, number>,
  weights: RankingWeights = DEFAULT_WEIGHTS
): ScoredDoc[] {
  const scored: ScoredDoc[] = [];

  for (const c of candidates) {
    const id = c.doc.id;
    const combinedScore =
      c.exactScore * weights.exactMatch +
      c.bm25Score * weights.bm25 +
      c.semanticScore * weights.semantic +
      (popularityScores.get(id) ?? 0) * weights.popularity +
      (recencyScores.get(id) ?? 0) * weights.recency +
      (personalizationScores.get(id) ?? 0) * weights.personalization +
      (contextualScores.get(id) ?? 0) * weights.contextual +
      c.trieBoost;

    scored.push({
      doc: c.doc,
      score: combinedScore,
      bm25Score: c.bm25Score,
      semanticScore: c.semanticScore,
      exactScore: c.exactScore,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

/* ═══════════════════════════════════════════════════════════════════════
   BM25 INDEX (Inline for ranking module)
   ═══════════════════════════════════════════════════════════════════════ */

const BM25_K1 = 1.2;
const BM25_B = 0.75;

export class BM25Index {
  private docs: SearchDoc[] = [];
  private docIndexMap = new Map<string, number>();
  private df = new Map<string, number>();
  private docLengths: number[] = [];
  private avgDocLength = 0;
  private totalDocs = 0;

  addDocs(docs: SearchDoc[]) {
    this.docs = docs;
    this.totalDocs = docs.length;
    this.docIndexMap.clear();
    this.df.clear();
    this.docLengths = [];
    let totalLength = 0;

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      this.docIndexMap.set(doc.id, i);
      const tokens = new Set([...doc.tokens, ...doc.normCorpus.split(" ").filter(Boolean)]);
      const uniqueTokens = Array.from(tokens);
      this.docLengths.push(uniqueTokens.length);
      totalLength += uniqueTokens.length;

      for (const token of uniqueTokens) {
        this.df.set(token, (this.df.get(token) ?? 0) + 1);
      }
    }

    this.avgDocLength = totalLength / Math.max(docs.length, 1);
  }

  getDocIndex(id: string): number {
    return this.docIndexMap.get(id) ?? -1;
  }

  score(queryTokens: string[], docIdx: number): number {
    const doc = this.docs[docIdx];
    const docLen = this.docLengths[docIdx];
    const normLen = docLen / Math.max(this.avgDocLength, 1);
    let score = 0;

    const allTokens = [...doc.tokens, ...doc.normCorpus.split(" ").filter(Boolean)];
    const tokenFreq = new Map<string, number>();
    for (const t of allTokens) tokenFreq.set(t, (tokenFreq.get(t) ?? 0) + 1);

    for (const qt of queryTokens) {
      const freq = tokenFreq.get(qt) ?? 0;
      if (freq === 0) continue;
      const df = this.df.get(qt) ?? 0;
      const idf = Math.log((this.totalDocs - df + 0.5) / (df + 0.5) + 1);
      const numerator = freq * (BM25_K1 + 1);
      const denominator = freq + BM25_K1 * (1 - BM25_B + BM25_B * normLen);
      score += idf * (numerator / denominator);
    }

    return score;
  }
}
