// trie.ts — Optimized Trie for instant prefix search, autocomplete, and symbol lookup

import type { SearchDoc } from "./types";

/* ═══════════════════════════════════════════════════════════════════════
   TRIE NODE
   ═══════════════════════════════════════════════════════════════════════ */

interface TrieNode {
  children: Map<string, TrieNode>;
  docIds: Set<string>;
  isEnd: boolean;
  /** Frequency count for ranking suggestions */
  frequency: number;
  /** Complete word at this node (only set at end nodes) */
  word?: string;
}

function createNode(): TrieNode {
  return { children: new Map(), docIds: new Set(), isEnd: false, frequency: 0 };
}

/* ═══════════════════════════════════════════════════════════════════════
   TRIE INDEX
   ═══════════════════════════════════════════════════════════════════════ */

export class TrieIndex {
  private root: TrieNode = createNode();
  private wordCount = 0;
  private nodeCount = 1;

  /** Insert a word with associated document ID */
  insert(word: string, docId: string, frequency = 1) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, createNode());
        this.nodeCount++;
      }
      node = node.children.get(char)!;
      node.docIds.add(docId);
    }
    node.isEnd = true;
    node.word = word;
    node.frequency += frequency;
    this.wordCount++;
  }

  /** Insert all tokens from a document */
  insertDoc(doc: SearchDoc) {
    for (const token of doc.tokens) {
      this.insert(token, doc.id);
    }
    for (const keyword of doc.keywords) {
      this.insert(keyword, doc.id, 2); // Higher frequency for keywords
    }
  }

  /** Search for prefix — returns all matching doc IDs */
  searchPrefix(prefix: string): Set<string> {
    const node = this.traverse(prefix);
    if (!node) return new Set();
    return this.collectDocIds(node);
  }

  /** Get autocomplete suggestions for a prefix */
  getSuggestions(prefix: string, limit = 10): Array<{ word: string; frequency: number }> {
    const node = this.traverse(prefix);
    if (!node) return [];

    const suggestions: Array<{ word: string; frequency: number }> = [];
    this.collectWords(node, prefix, suggestions);

    // Sort by frequency (popularity) then alphabetically
    suggestions.sort((a, b) => {
      if (b.frequency !== a.frequency) return b.frequency - a.frequency;
      return a.word.localeCompare(b.word);
    });

    return suggestions.slice(0, limit);
  }

  /** Symbol lookup: find all words matching a pattern (supports * wildcard) */
  searchPattern(pattern: string): Array<{ word: string; docIds: Set<string> }> {
    const results: Array<{ word: string; docIds: Set<string> }> = [];
    this.matchPattern(this.root, pattern, 0, "", results);
    return results;
  }

  /** Fast navigation: get all words starting with each character */
  getAlphabeticalIndex(): Map<string, string[]> {
    const index = new Map<string, string[]>();
    for (const [char, child] of this.root.children) {
      const words: string[] = [];
      this.collectWords(child, char, words.map((w) => ({ word: w, frequency: 0 })));
      index.set(char, words);
    }
    return index;
  }

  /** Get stats */
  getStats() {
    return { wordCount: this.wordCount, nodeCount: this.nodeCount };
  }

  /** Clear the trie */
  clear() {
    this.root = createNode();
    this.wordCount = 0;
    this.nodeCount = 1;
  }

  /* ── Private helpers ───────────────────────────────────────── */

  private traverse(prefix: string): TrieNode | null {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    return node;
  }

  private collectDocIds(node: TrieNode): Set<string> {
    const ids = new Set(node.docIds);
    for (const child of node.children.values()) {
      for (const id of this.collectDocIds(child)) ids.add(id);
    }
    return ids;
  }

  private collectWords(
    node: TrieNode,
    prefix: string,
    results: Array<{ word: string; frequency: number }>
  ) {
    if (node.isEnd && node.word) {
      results.push({ word: node.word, frequency: node.frequency });
    }
    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, results);
    }
  }

  private matchPattern(
    node: TrieNode,
    pattern: string,
    patternIdx: number,
    current: string,
    results: Array<{ word: string; docIds: Set<string> }>
  ) {
    if (patternIdx === pattern.length) {
      if (node.isEnd && node.word) {
        results.push({ word: node.word, docIds: new Set(node.docIds) });
      }
      return;
    }

    const char = pattern[patternIdx];
    if (char === "*") {
      // Wildcard: match any character
      for (const [childChar, child] of node.children) {
        this.matchPattern(child, pattern, patternIdx + 1, current + childChar, results);
      }
      // Also match empty (zero or more)
      this.matchPattern(node, pattern, patternIdx + 1, current, results);
    } else {
      const child = node.children.get(char);
      if (child) {
        this.matchPattern(child, pattern, patternIdx + 1, current + char, results);
      }
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   COMMAND TRIE (for command completion)
   ═══════════════════════════════════════════════════════════════════════ */

export class CommandTrie {
  private root: TrieNode = createNode();
  private commands = new Map<string, { description: string; handler: string }>();

  register(command: string, description: string, handler: string) {
    let node = this.root;
    for (const char of command) {
      if (!node.children.has(char)) {
        node.children.set(char, createNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
    node.word = command;
    this.commands.set(command, { description, handler });
  }

  complete(prefix: string): Array<{ command: string; description: string }> {
    const node = this.traverse(prefix);
    if (!node) return [];

    const results: Array<{ command: string; description: string }> = [];
    this.collectCommands(node, prefix, results);
    return results;
  }

  getCommand(command: string): { description: string; handler: string } | undefined {
    return this.commands.get(command);
  }

  private traverse(prefix: string): TrieNode | null {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    return node;
  }

  private collectCommands(
    node: TrieNode,
    prefix: string,
    results: Array<{ command: string; description: string }>
  ) {
    if (node.isEnd && node.word) {
      const cmd = this.commands.get(node.word);
      if (cmd) results.push({ command: node.word, description: cmd.description });
    }
    for (const [char, child] of node.children) {
      this.collectCommands(child, prefix + char, results);
    }
  }
}
