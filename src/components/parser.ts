// parser.ts — Advanced query parser with commands, filters, booleans, intent

import type { ParsedQuery } from "./types";

/* ═══════════════════════════════════════════════════════════════════════
   COMMAND REGISTRY
   ═══════════════════════════════════════════════════════════════════════ */

interface CommandDef {
  prefix: string;
  description: string;
  examples: string[];
}

const COMMANDS: CommandDef[] = [
  { prefix: ">", description: "Execute action", examples: [">book", ">contact", ">pricing"] },
  { prefix: "@", description: "Scope to group", examples: ["@services", "@products", "@insights"] },
  { prefix: "#", description: "Filter by tag/keyword", examples: ["#security", "#ai", "#cloud"] },
  { prefix: "/", description: "Quick navigation", examples: ["/docs", "/settings", "/profile"] },
];

/* ═══════════════════════════════════════════════════════════════════════
   BOOLEAN OPERATORS
   ═══════════════════════════════════════════════════════════════════════ */

interface BooleanQuery {
  must: string[];
  should: string[];
  mustNot: string[];
  phrases: string[];
}

/* ═══════════════════════════════════════════════════════════════════════
   INTENT DETECTION
   ═══════════════════════════════════════════════════════════════════════ */

export type SearchIntent =
  | "navigate"      // User wants to go to a specific page
  | "search"        // User is searching for information
  | "action"        // User wants to perform an action
  | "help"          // User needs help
  | "filter"        // User is filtering results
  | "question";     // User is asking a question

export interface ParsedResult {
  raw: string;
  terms: string;
  command?: string;
  commandArg?: string;
  scope?: string;
  booleanQuery: BooleanQuery;
  intent: SearchIntent;
  filters: Array<{ field: string; value: string; operator: string }>;
  isQuestion: boolean;
  hasQuotedPhrase: boolean;
  quotedPhrases: string[];
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PARSER
   ═══════════════════════════════════════════════════════════════════════ */

export function parseQueryAdvanced(raw: string): ParsedResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      raw: trimmed,
      terms: "",
      booleanQuery: { must: [], should: [], mustNot: [], phrases: [] },
      intent: "search",
      filters: [],
      isQuestion: false,
      hasQuotedPhrase: false,
      quotedPhrases: [],
    };
  }

  // Detect command prefix
  let command: string | undefined;
  let commandArg: string | undefined;
  let remaining = trimmed;

  if (/^[>]/i.test(trimmed)) {
    command = ">";
    commandArg = trimmed.slice(1).trim();
    remaining = commandArg;
  } else if (/^[@]/i.test(trimmed)) {
    command = "@";
    commandArg = trimmed.slice(1).trim();
    remaining = commandArg;
  } else if (/^[#]/i.test(trimmed)) {
    command = "#";
    commandArg = trimmed.slice(1).trim();
    remaining = commandArg;
  } else if (/^[\/]/i.test(trimmed)) {
    command = "/";
    commandArg = trimmed.slice(1).trim();
    remaining = commandArg;
  }

  // Detect scoped search: group:term
  let scope: string | undefined;
  const scopeMatch = remaining.match(/^(\w+):\s*(.+)$/);
  if (scopeMatch && !command) {
    scope = scopeMatch[1].toLowerCase();
    remaining = scopeMatch[2];
  }

  // Extract quoted phrases
  const quotedPhrases: string[] = [];
  const phraseRegex = /"([^"]+)"/g;
  let match;
  while ((match = phraseRegex.exec(remaining)) !== null) {
    quotedPhrases.push(match[1]);
  }
  const withoutQuotes = remaining.replace(/"[^"]+"/g, " ");

  // Parse boolean operators
  const booleanQuery = parseBooleanQuery(withoutQuotes);

  // Detect filters: field:value, field>value, field<value
  const filters = parseFilters(remaining);

  // Detect intent
  const intent = detectIntent(trimmed, booleanQuery, quotedPhrases);

  // Check if it's a question
  const isQuestion = /^(what|how|why|when|where|who|which|can|does|is|are|will|should)\b/i.test(trimmed);

  return {
    raw: trimmed,
    terms: remaining,
    command,
    commandArg,
    scope,
    booleanQuery,
    intent,
    filters,
    isQuestion,
    hasQuotedPhrase: quotedPhrases.length > 0,
    quotedPhrases,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   BOOLEAN QUERY PARSER
   ═══════════════════════════════════════════════════════════════════════ */

function parseBooleanQuery(text: string): BooleanQuery {
  const must: string[] = [];
  const should: string[] = [];
  const mustNot: string[] = [];
  const phrases: string[] = [];

  // Split by AND, OR, NOT, -, +
  const tokens = text
    .replace(/\bAND\b/gi, " __AND__ ")
    .replace(/\bOR\b/gi, " __OR__ ")
    .replace(/\bNOT\b/gi, " __NOT__ ")
    .split(/\s+/)
    .filter(Boolean);

  let currentOp: "must" | "should" | "mustNot" = "should";

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "__AND__") {
      currentOp = "must";
      continue;
    }
    if (token === "__OR__") {
      currentOp = "should";
      continue;
    }
    if (token === "__NOT__") {
      currentOp = "mustNot";
      continue;
    }

    // Handle + prefix (must)
    if (token.startsWith("+") && token.length > 1) {
      must.push(token.slice(1));
      continue;
    }

    // Handle - prefix (must not)
    if (token.startsWith("-") && token.length > 1) {
      mustNot.push(token.slice(1));
      continue;
    }

    // Regular token
    if (currentOp === "must") must.push(token);
    else if (currentOp === "mustNot") mustNot.push(token);
    else should.push(token);
  }

  return { must, should, mustNot, phrases };
}

/* ═══════════════════════════════════════════════════════════════════════
   FILTER PARSER
   ═══════════════════════════════════════════════════════════════════════ */

interface Filter {
  field: string;
  value: string;
  operator: string;
}

function parseFilters(text: string): Filter[] {
  const filters: Filter[] = [];

  // field:value
  const colonRegex = /(\w+):([^\s]+)/g;
  let m;
  while ((m = colonRegex.exec(text)) !== null) {
    filters.push({ field: m[1], value: m[2], operator: ":" });
  }

  // field>value, field<value
  const compareRegex = /(\w+)([><])([^\s]+)/g;
  while ((m = compareRegex.exec(text)) !== null) {
    filters.push({ field: m[1], value: m[3], operator: m[2] });
  }

  return filters;
}

/* ═══════════════════════════════════════════════════════════════════════
   INTENT DETECTION
   ═══════════════════════════════════════════════════════════════════════ */

function detectIntent(raw: string, booleanQuery: BooleanQuery, phrases: string[]): SearchIntent {
  const lower = raw.toLowerCase();

  // Question patterns
  if (/^(what|how|why|when|where|who|which)\b/i.test(raw)) return "question";
  if (/\?\s*$/.test(raw)) return "question";

  // Action patterns
  if (/^(book|contact|schedule|open|go to|visit)\b/i.test(raw)) return "action";
  if (lower.startsWith(">")) return "action";

  // Navigation patterns
  if (/^(go to|open|navigate to|show me)\b/i.test(raw)) return "navigate";
  if (lower.startsWith("/")) return "navigate";

  // Help patterns
  if (/^(help|how do i|how can i|what is|explain)\b/i.test(raw)) return "help";

  // Filter patterns
  if (booleanQuery.must.length > 0 || booleanQuery.mustNot.length > 0) return "filter";
  if (lower.startsWith("@") || lower.startsWith("#")) return "filter";

  // Default
  if (phrases.length > 0) return "search";
  if (booleanQuery.should.length > 0) return "search";

  return "search";
}

/* ═══════════════════════════════════════════════════════════════════════
   LEGACY COMPATIBILITY
   ═══════════════════════════════════════════════════════════════════════ */

export function parseQuery(raw: string): ParsedQuery {
  const result = parseQueryAdvanced(raw);
  return {
    raw: result.raw,
    terms: result.terms,
    command: result.command,
    commandArg: result.commandArg,
    scope: result.scope,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   SUGGESTION GENERATOR
   ═══════════════════════════════════════════════════════════════════════ */

export function generateSearchSuggestions(
  partial: string,
  history: string[],
  trending: string[]
): string[] {
  const suggestions = new Set<string>();

  // Historical suggestions
  for (const h of history) {
    if (h.toLowerCase().startsWith(partial.toLowerCase())) {
      suggestions.add(h);
    }
  }

  // Trending suggestions
  for (const t of trending) {
    if (t.toLowerCase().startsWith(partial.toLowerCase())) {
      suggestions.add(t);
    }
  }

  // Command suggestions
  for (const cmd of COMMANDS) {
    for (const ex of cmd.examples) {
      if (ex.toLowerCase().startsWith(partial.toLowerCase())) {
        suggestions.add(ex);
      }
    }
  }

  return Array.from(suggestions).slice(0, 10);
}

/* ═══════════════════════════════════════════════════════════════════════
   QUERY EXPANSION
   ═══════════════════════════════════════════════════════════════════════ */

export function expandQuery(query: string): string[] {
  const variations: string[] = [query];

  // Singular/plural
  if (query.endsWith("s")) variations.push(query.slice(0, -1));
  else variations.push(query + "s");

  // Common suffixes
  if (query.endsWith("ing")) variations.push(query.slice(0, -3));
  if (query.endsWith("ed")) variations.push(query.slice(0, -2));

  return variations;
}
