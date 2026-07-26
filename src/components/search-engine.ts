import type {
  SearchDoc,
  ScoredDoc,
  SearchOptions,
  AIAnswer,
} from "./types";
import { normalize, tokenize } from "./search-index";

/* ═══════════════════════════════════════════════════════════════════════
   SEARCH ENGINE
   A dependency-free hybrid ranker combining:
     • BM25 lexical scoring
     • Lightweight semantic similarity (token overlap / cosine on term sets)
     • Prefix + fuzzy (Levenshtein-bounded) matching
     • Static priors, favorites, usage frequency and recency boosts
   Runs identically on the main thread and inside a Web Worker.
   ═══════════════════════════════════════════════════════════════════════ */

const BM25_K1 = 1.5;
const BM25_B = 0.75;

/** Bounded Levenshtein distance (returns early once it exceeds `max`). */
function levenshtein(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        (prev[j] ?? 0) + 1,
        (curr[j - 1] ?? 0) + 1,
        (prev[j - 1] ?? 0) + cost,
      );
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j] ?? 0;
  }
  return prev[b.length] ?? max + 1;
}

export class SearchEngine {
  private docs: SearchDoc[] = [];
  private df = new Map<string, number>();
  private avgDocLen = 0;

  /** Build inverted document-frequency stats from the index. */
  buildIndex(docs: SearchDoc[]): void {
    this.docs = docs;
    this.df.clear();
    let totalLen = 0;
    for (const doc of docs) {
      totalLen += doc.tokens.length;
      const unique = new Set(doc.tokens);
      for (const tok of unique) {
        this.df.set(tok, (this.df.get(tok) ?? 0) + 1);
      }
    }
    this.avgDocLen = docs.length > 0 ? totalLen / docs.length : 0;
  }

  private idf(term: string): number {
    const n = this.docs.length;
    const df = this.df.get(term) ?? 0;
    return Math.log(1 + (n - df + 0.5) / (df + 0.5));
  }

  private bm25(doc: SearchDoc, qTokens: string[]): number {
    if (this.avgDocLen === 0) return 0;
    const len = doc.tokens.length || 1;
    const tf = new Map<string, number>();
    for (const t of doc.tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    let score = 0;
    for (const q of qTokens) {
      const freq = tf.get(q);
      if (!freq) continue;
      const idf = this.idf(q);
      const denom = freq + BM25_K1 * (1 - BM25_B + BM25_B * (len / this.avgDocLen));
      score += idf * ((freq * (BM25_K1 + 1)) / denom);
    }
    return score;
  }

  /** Semantic similarity via term-set cosine (cheap, no embeddings). */
  private semantic(doc: SearchDoc, qTokens: string[]): number {
    if (qTokens.length === 0) return 0;
    const docSet = new Set(doc.tokens);
    let overlap = 0;
    for (const q of qTokens) if (docSet.has(q)) overlap++;
    const denom = Math.sqrt(qTokens.length) * Math.sqrt(doc.tokens.length || 1);
    return denom > 0 ? overlap / denom : 0;
  }

  private prefixAndFuzzy(doc: SearchDoc, qTokens: string[]): { prefix: number; fuzzy: number } {
    let prefix = 0;
    let fuzzy = 0;
    for (const q of qTokens) {
      if (doc.normLabel.startsWith(q)) prefix += 3;
      else if (doc.normLabel.includes(q)) prefix += 1.5;
      else if (doc.normSubtitle.includes(q)) prefix += 0.75;

      // Bounded fuzzy against label tokens for typo tolerance.
      if (q.length >= 4) {
        const max = q.length <= 6 ? 1 : 2;
        for (const t of doc.tokens) {
          if (Math.abs(t.length - q.length) > max) continue;
          if (levenshtein(q, t, max) <= max) {
            fuzzy += 1;
            break;
          }
        }
      }
    }
    return { prefix, fuzzy };
  }

  /**
   * Rank documents for a query. When the query is empty, returns a curated
   * default set ordered by prior weight, favorites, usage and recency.
   */
  search(rawQuery: string, options: SearchOptions): ScoredDoc[] {
    const { maxResults, favorites, usage, recent, enableSemantic, enableBM25 } = options;

    const favSet = new Set(favorites);
    const usageMap = new Map(usage.map((u) => [u.id, u.count]));
    const recentMap = new Map(recent.map((r, i) => [r.id, recent.length - i]));

    // Handle command / scoped prefixes: ">", "@", "#"
    let query = rawQuery.trim();
    let scopeGroup: string | null = null;
    if (query.startsWith(">")) {
      query = query.slice(1).trim();
    } else if (query.startsWith("@")) {
      const rest = query.slice(1).trim();
      const [scope, ...terms] = rest.split(/\s+/);
      scopeGroup = scope ? normalize(scope) : null;
      query = terms.join(" ");
    } else if (query.startsWith("#")) {
      query = query.slice(1).trim();
    }

    const qNorm = normalize(query);
    const qTokens = tokenize(query);

    let pool = this.docs;
    if (scopeGroup) {
      pool = pool.filter((d) => normalize(d.group).includes(scopeGroup as string));
    }

    // Empty query → curated defaults (favorites → frequent → recent → priors)
    if (qTokens.length === 0) {
      const scored: ScoredDoc[] = pool.map((doc) => {
        let score = doc.weight;
        if (favSet.has(doc.id)) score += 5;
        const u = usageMap.get(doc.id);
        if (u) score += Math.min(u, 10) * 0.4;
        const r = recentMap.get(doc.id);
        if (r) score += r * 0.3;
        return { doc, score, signals: { prior: doc.weight } };
      });
      scored.sort((a, b) => b.score - a.score || a.doc.label.localeCompare(b.doc.label));
      return scored.slice(0, maxResults);
    }

    const results: ScoredDoc[] = [];
    for (const doc of pool) {
      const bm25 = enableBM25 ? this.bm25(doc, qTokens) : 0;
      const semantic = enableSemantic ? this.semantic(doc, qTokens) : 0;
      const { prefix, fuzzy } = this.prefixAndFuzzy(doc, qTokens);

      // Exact substring on the whole normalized corpus is a strong signal.
      const substr = qNorm && doc.normCorpus.includes(qNorm) ? 2 : 0;

      let score =
        bm25 * 1.0 +
        semantic * 4.0 +
        prefix * 1.2 +
        fuzzy * 0.8 +
        substr +
        doc.weight * 0.5;

      if (score <= 0) continue;

      if (favSet.has(doc.id)) score += 1.5;
      const u = usageMap.get(doc.id);
      if (u) score += Math.min(u, 10) * 0.15;
      const r = recentMap.get(doc.id);
      if (r) score += r * 0.1;

      results.push({
        doc,
        score,
        signals: { bm25, semantic, prefix, fuzzy, prior: doc.weight },
      });
    }

    results.sort((a, b) => b.score - a.score || a.doc.label.localeCompare(b.doc.label));
    return results.slice(0, maxResults);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   AI ANSWER GENERATION
   A grounded, extractive "Ask Pedumo" synthesizer. It never fabricates —
   it composes a concise answer from the top-matching indexed documents and
   always cites its sources. Returns null when confidence is too low.
   ═══════════════════════════════════════════════════════════════════════ */

const QUESTION_HINTS = [
  "how", "what", "why", "who", "where", "when", "can", "do", "does",
  "is", "are", "should", "which", "help",
];

export function generateAIAnswer(rawQuery: string, topDocs: SearchDoc[]): AIAnswer | null {
  const query = rawQuery.trim();
  if (query.length < 3 || topDocs.length === 0) return null;

  const qTokens = tokenize(query);
  if (qTokens.length === 0) return null;

  const qNorm = normalize(query);
  const looksLikeQuestion =
    query.includes("?") ||
    QUESTION_HINTS.includes(qTokens[0] ?? "") ||
    qTokens.length >= 3;

  // Score candidate docs specifically for answer relevance.
  const ranked = topDocs
    .map((doc) => {
      const docSet = new Set(doc.tokens);
      let overlap = 0;
      for (const t of qTokens) if (docSet.has(t)) overlap++;
      const substr = doc.normCorpus.includes(qNorm) ? 2 : 0;
      return { doc, rel: overlap + substr };
    })
    .filter((r) => r.rel > 0)
    .sort((a, b) => b.rel - a.rel);

  if (ranked.length === 0) return null;

  const best = ranked[0];
  if (!best) return null;

  // Confidence from coverage of query tokens by the best document.
  const bestSet = new Set(best.doc.tokens);
  let covered = 0;
  for (const t of qTokens) if (bestSet.has(t)) covered++;
  const coverage = covered / qTokens.length;
  const confidence = Math.max(0.35, Math.min(0.95, coverage * 0.7 + (looksLikeQuestion ? 0.2 : 0.1) + 0.1));

  if (confidence < 0.4 && !looksLikeQuestion) return null;

  // Compose a grounded answer from the best document's subtitle/detail.
  const primary = best.doc;
  const supporting = ranked.slice(1, 3).map((r) => r.doc);

  const lead = primary.subtitle
    ? primary.subtitle.replace(/\s+/g, " ").trim()
    : primary.label;
  const detail = primary.detail ? ` ${primary.detail}.` : "";

  let answer = `${primary.label}: ${lead}.${detail}`;
  if (supporting.length > 0) {
    answer += ` Related: ${supporting.map((d) => d.label).join(", ")}.`;
  }

  const sources = [primary, ...supporting].map((d) => ({
    id: d.id,
    label: d.label,
    href: d.href,
  }));

  return { answer, confidence, sources };
}
