// types.ts — Shared types for the command palette system

import type { LucideIcon } from "lucide-react";

/** A single searchable document */
export type SearchDoc = {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  group: string;
  icon?: LucideIcon;
  /** Pre-computed normalized tokens */
  tokens: string[];
  /** Pre-computed normalized label */
  normLabel: string;
  /** Pre-computed normalized subtitle */
  normSubtitle: string;
  /** Pre-computed normalized corpus */
  normCorpus: string;
  /** Keywords for synonym expansion */
  keywords: string[];
  /** Optional detail line */
  detail?: string;
  /** Vector embedding for semantic search (pre-computed) */
  embedding?: number[];
};

/** Search result with score */
export type ScoredDoc = {
  doc: SearchDoc;
  score: number;
  /** BM25 score component */
  bm25Score: number;
  /** Semantic score component */
  semanticScore: number;
  /** Exact match score component */
  exactScore: number;
};

/** Grouped results with flat indices for keyboard nav */
export type GroupedSection = {
  group: string;
  items: SearchDoc[];
  indices: number[];
};

/** Search query with command parsing */
export type ParsedQuery = {
  /** Raw user input */
  raw: string;
  /** Search terms (after removing commands) */
  terms: string;
  /** Command prefix: > @ # / */
  command?: string;
  /** Command argument */
  commandArg?: string;
  /** Scoped group filter */
  scope?: string;
};

/** Storage shapes */
export type HistoryEntry = {
  id: string;
  label: string;
  href: string;
  group: string;
  ts: number;
};

export type UsageEntry = HistoryEntry & { count: number };

export type Analytics = {
  searches: Array<{ query: string; ts: number; resultCount: number }>;
  clicks: Array<{ id: string; ts: number; query: string }>;
};

/** AI Answer result */
export type AIAnswer = {
  answer: string;
  confidence: number;
  sources: Array<{ id: string; label: string; href: string }>;
};

/** Trie node for prefix indexing */
export type TrieNode = {
  children: Map<string, TrieNode>;
  docIds: Set<string>;
  isEnd: boolean;
};

/** Worker API surface */
export type SearchWorkerAPI = {
  buildIndex: (docs: SearchDoc[]) => void;
  search: (query: string, options: SearchOptions) => Promise<ScoredDoc[]>;
  getSuggestions: (prefix: string, limit: number) => Promise<string[]>;
  computeEmbedding: (text: string) => Promise<number[]>;
};

export type SearchOptions = {
  maxResults: number;
  favorites: string[];
  usage: UsageEntry[];
  recent: HistoryEntry[];
  enableSemantic: boolean;
  enableBM25: boolean;
};
