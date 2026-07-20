// index.ts — Barrel export for the command palette system

export { CommandPaletteProvider, CommandPaletteTrigger, useCommandPalette } from "./command-palette";
export { buildSearchIndex } from "./search-index";
export { SearchEngine, parseQuery, generateAIAnswer, normalize, tokenize, levenshtein } from "./search-engine";
export { loadRecent, saveRecent, loadUsage, saveUsage, loadFavorites, saveFavorites, loadAnalytics, saveAnalytics } from "./storage";
export type { SearchDoc, ScoredDoc, GroupedSection, ParsedQuery, HistoryEntry, UsageEntry, Analytics, AIAnswer, SearchOptions } from "./types";
