// analytics.ts — Advanced analytics for search behavior, trends, and quality

import type { Analytics, HistoryEntry, UsageEntry } from "./types";
import { loadAnalytics, saveAnalytics } from "./storage";

/* ═══════════════════════════════════════════════════════════════════════
   ANALYTICS TRACKER
   ═══════════════════════════════════════════════════════════════════════ */

export class AnalyticsTracker {
  private analytics: Analytics = { searches: [], clicks: [] };
  private sessionStart = Date.now();
  private sessionQueries: string[] = [];
  private isLoaded = false;

  async init() {
    if (this.isLoaded) return;
    this.analytics = await loadAnalytics();
    this.isLoaded = true;
  }

  /** Track a search query */
  trackSearch(query: string, resultCount: number, latencyMs: number) {
    const entry = {
      query,
      ts: Date.now(),
      resultCount,
      latencyMs,
    };
    this.analytics.searches.push(entry as unknown as Analytics["searches"][number]);
    this.sessionQueries.push(query);

    // Trim to last 200
    if (this.analytics.searches.length > 200) {
      this.analytics.searches = this.analytics.searches.slice(-200);
    }

    saveAnalytics(this.analytics);
  }

  /** Track a click */
  trackClick(id: string, query: string, rank: number) {
    const entry = {
      id,
      ts: Date.now(),
      query,
      rank,
    };
    this.analytics.clicks.push(entry as unknown as Analytics["clicks"][number]);

    if (this.analytics.clicks.length > 200) {
      this.analytics.clicks = this.analytics.clicks.slice(-200);
    }

    saveAnalytics(this.analytics);
  }

  /** Track zero-result search */
  trackZeroResult(query: string) {
    this.trackSearch(query, 0, 0);
  }

  /** Get search trends */
  getTrends(): Array<{ query: string; count: number }> {
    const counts = new Map<string, number>();
    for (const s of this.analytics.searches) {
      const q = (s as unknown as { query: string }).query.toLowerCase().trim();
      counts.set(q, (counts.get(q) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  /** Get popular commands */
  getPopularCommands(): Array<{ command: string; count: number }> {
    const counts = new Map<string, number>();
    for (const c of this.analytics.clicks) {
      const click = c as unknown as { id: string };
      counts.set(click.id, (counts.get(click.id) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([command, count]) => ({ command, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  /** Get zero-result queries */
  getZeroResultQueries(): string[] {
    return this.analytics.searches
      .filter((s) => (s as unknown as { resultCount: number }).resultCount === 0)
      .map((s) => (s as unknown as { query: string }).query)
      .slice(-50);
  }

  /** Get average search latency */
  getAverageLatency(): number {
    const searches = this.analytics.searches.filter(
      (s) => (s as unknown as { latencyMs?: number }).latencyMs !== undefined
    ) as unknown as Array<{ latencyMs: number }>;
    if (searches.length === 0) return 0;
    return searches.reduce((sum, s) => sum + s.latencyMs, 0) / searches.length;
  }

  /** Get click-through rate */
  getClickThroughRate(): number {
    const searches = this.analytics.searches.length;
    const clicks = this.analytics.clicks.length;
    return searches > 0 ? clicks / searches : 0;
  }

  /** Get average click rank */
  getAverageClickRank(): number {
    const clicks = this.analytics.clicks as unknown as Array<{ rank: number }>;
    if (clicks.length === 0) return 0;
    return clicks.reduce((sum, c) => sum + c.rank, 0) / clicks.length;
  }

  /** Get session stats */
  getSessionStats() {
    return {
      duration: Date.now() - this.sessionStart,
      queries: this.sessionQueries.length,
      uniqueQueries: new Set(this.sessionQueries).size,
    };
  }

  /** Get all analytics */
  getAnalytics(): Analytics {
    return this.analytics;
  }
}

// Singleton instance
export const analyticsTracker = new AnalyticsTracker();
