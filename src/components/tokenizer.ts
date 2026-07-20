// tokenizer.ts — Advanced tokenization with phonetic support and caching

import { tokenCache } from "./cache";

/* ═══════════════════════════════════════════════════════════════════════
   PHONETIC MAPPING (Soundex-style for typo tolerance)
   ═══════════════════════════════════════════════════════════════════════ */

const PHONETIC_MAP: Record<string, string> = {
  b: "1", p: "1", f: "1", v: "1",
  c: "2", s: "2", k: "2", g: "2", j: "2", q: "2", x: "2", z: "2",
  d: "3", t: "3",
  l: "4",
  m: "5", n: "5",
  r: "6",
};

function phoneticCode(word: string): string {
  if (!word) return "";
  const first = word.charAt(0);
  let code = first;
  let lastCode = PHONETIC_MAP[first] ?? "";

  for (let i = 1; i < word.length && code.length < 4; i++) {
    const c = word.charAt(i);
    const mapped = PHONETIC_MAP[c] ?? "";
    if (mapped && mapped !== lastCode) {
      code += mapped;
      lastCode = mapped;
    }
  }

  return code.padEnd(4, "0");
}

/* ═══════════════════════════════════════════════════════════════════════
   ADVANCED TOKENIZATION
   ═══════════════════════════════════════════════════════════════════════ */

export interface TokenizeOptions {
  /** Include phonetic codes */
  phonetic?: boolean;
  /** Include n-grams */
  ngrams?: boolean;
  /** N-gram size */
  ngramSize?: number;
  /** Include stemmed tokens */
  stem?: boolean;
  /** Minimum token length */
  minLength?: number;
}

export interface TokenResult {
  tokens: string[];
  phoneticCodes?: string[];
  ngrams?: string[];
  stems?: string[];
}

/** Fast char-code based normalization */
export function normalize(text: string): string {
  let out = "";
  let lastWasSpace = true;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if ((c >= 97 && c <= 122) || (c >= 48 && c <= 57)) {
      out += String.fromCharCode(c);
      lastWasSpace = false;
    } else if (c >= 65 && c <= 90) {
      out += String.fromCharCode(c + 32);
      lastWasSpace = false;
    } else if (!lastWasSpace) {
      out += " ";
      lastWasSpace = true;
    }
  }
  return out.trim();
}

/** Basic tokenization with caching */
export function tokenize(text: string): string[] {
  const cached = tokenCache.get(text);
  if (cached) return cached;

  const norm = normalize(text);
  const tokens: string[] = [];
  let start = 0;
  for (let i = 0; i <= norm.length; i++) {
    if (i === norm.length || norm.charCodeAt(i) === 32) {
      if (i > start) tokens.push(norm.slice(start, i));
      start = i + 1;
    }
  }

  tokenCache.set(text, tokens);
  return tokens;
}

/** Advanced tokenization with phonetic, n-grams, and stemming */
export function tokenizeAdvanced(text: string, options: TokenizeOptions = {}): TokenResult {
  const tokens = tokenize(text);
  const result: TokenResult = { tokens };

  const minLen = options.minLength ?? 2;
  const filtered = tokens.filter((t) => t.length >= minLen);

  if (options.phonetic) {
    result.phoneticCodes = filtered.map(phoneticCode);
  }

  if (options.ngrams && options.ngramSize) {
    const ngrams: string[] = [];
    const size = options.ngramSize;
    for (const token of filtered) {
      if (token.length >= size) {
        for (let i = 0; i <= token.length - size; i++) {
          ngrams.push(token.slice(i, i + size));
        }
      }
    }
    result.ngrams = ngrams;
  }

  if (options.stem) {
    result.stems = filtered.map(porterStem);
  }

  return result;
}

/* ═══════════════════════════════════════════════════════════════════════
   PORTER STEMMER (Simplified)
   ═══════════════════════════════════════════════════════════════════════ */

function porterStem(word: string): string {
  if (word.length <= 2) return word;

  let stem = word;

  // Step 1a: plurals
  if (stem.endsWith("ies") && stem.length > 4) stem = stem.slice(0, -3) + "y";
  else if (stem.endsWith("ied") && stem.length > 4) stem = stem.slice(0, -3) + "y";
  else if (stem.endsWith("s") && !stem.endsWith("ss") && !stem.endsWith("us") && !stem.endsWith("is")) {
    stem = stem.slice(0, -1);
  }

  // Step 1b: -ed, -ing
  if (stem.endsWith("eed") && measure(stem.slice(0, -3)) > 0) stem = stem.slice(0, -1);
  else if (stem.endsWith("ed") && hasVowel(stem.slice(0, -2))) {
    stem = stem.slice(0, -2);
    if (stem.endsWith("at") || stem.endsWith("bl") || stem.endsWith("iz")) stem += "e";
    else if (isDoubleConsonant(stem)) stem = stem.slice(0, -1);
  }
  else if (stem.endsWith("ing") && hasVowel(stem.slice(0, -3))) {
    stem = stem.slice(0, -3);
    if (stem.endsWith("at") || stem.endsWith("bl") || stem.endsWith("iz")) stem += "e";
    else if (isDoubleConsonant(stem)) stem = stem.slice(0, -1);
  }

  // Step 1c: -y
  if (stem.endsWith("y") && hasVowel(stem.slice(0, -1))) {
    stem = stem.slice(0, -1) + "i";
  }

  // Step 2: suffixes
  const step2: Array<[string, string, number]> = [
    ["ational", "ate", 0], ["tional", "tion", 0], ["enci", "ence", 0],
    ["anci", "ance", 0], ["izer", "ize", 0], ["abli", "able", 0],
    ["alli", "al", 0], ["entli", "ent", 0], ["eli", "e", 0],
    ["ousli", "ous", 0], ["ization", "ize", 0], ["ation", "ate", 0],
    ["ator", "ate", 0], ["alism", "al", 0], ["iveness", "ive", 0],
    ["fulness", "ful", 0], ["ousness", "ous", 0], ["aliti", "al", 0],
    ["iviti", "ive", 0], ["biliti", "ble", 0],
  ];

  for (const [suffix, replacement, minMeasure] of step2) {
    if (stem.endsWith(suffix) && measure(stem.slice(0, -suffix.length)) > minMeasure) {
      stem = stem.slice(0, -suffix.length) + replacement;
      break;
    }
  }

  return stem;
}

function isVowel(c: string): boolean {
  return "aeiou".includes(c);
}

function hasVowel(word: string): boolean {
  for (const c of word) if (isVowel(c)) return true;
  return false;
}

function isDoubleConsonant(word: string): boolean {
  if (word.length < 2) return false;
  const last = word.slice(-1);
  const secondLast = word.slice(-2, -1);
  return last === secondLast && !isVowel(last);
}

function measure(word: string): number {
  let m = 0;
  let inVowel = false;
  for (const c of word) {
    const v = isVowel(c);
    if (!inVowel && v) inVowel = true;
    else if (inVowel && !v) { m++; inVowel = false; }
  }
  return m;
}

/* ═══════════════════════════════════════════════════════════════════════
   DOCUMENT FINGERPRINTING
   ═══════════════════════════════════════════════════════════════════════ */

export function fingerprint(text: string): string {
  const tokens = tokenize(text).sort();
  // SimHash-style fingerprint
  let hash = 0;
  for (const token of tokens) {
    for (let i = 0; i < token.length; i++) {
      hash = ((hash << 5) - hash + token.charCodeAt(i)) | 0;
    }
  }
  return hash.toString(36);
}

export function similarityFingerprint(a: string, b: string): number {
  const fa = new Set(tokenize(a));
  const fb = new Set(tokenize(b));
  const intersection = new Set([...fa].filter((x) => fb.has(x)));
  const union = new Set([...fa, ...fb]);
  return union.size > 0 ? intersection.size / union.size : 0;
}
