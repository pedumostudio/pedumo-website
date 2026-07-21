"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rss, Search } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { authors, blogCategories, insights, type Insight } from "@/lib/content";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function matches(post: Insight, q: string) {
  if (!q) return true;
  const hay = [
    post.title,
    post.excerpt,
    post.category,
    ...(post.tags ?? []),
    post.author ? authors[post.author]?.name ?? "" : "",
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

export function InsightsBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return insights.filter(
      (p) =>
        (category === "All" || p.category === category) && matches(p, query),
    );
  }, [query, category]);

  const featured = insights.find((p) => p.featured) ?? insights[0];

if (!featured) {
  return null;
}

const rest = filtered.filter((p) => p.slug !== featured.slug);

  const usedCategories = useMemo(() => {
    const set = new Set(insights.map((p) => p.category));
    return ["All", ...blogCategories.filter((c) => set.has(c)), ...Array.from(set).filter((c) => !blogCategories.includes(c as (typeof blogCategories)[number]))];
  }, []);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {usedCategories.slice(0, 8).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors " +
                (category === c
                  ? "border-brand-500/50 bg-brand-500/10 text-brand-500"
                  : "border-[var(--border)] bg-[var(--background-subtle)] text-[var(--muted)] hover:text-[var(--foreground)]")
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="h-10 w-full rounded-full border border-[var(--border)] bg-[var(--background-subtle)] pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-brand-500 sm:w-64"
            />
          </div>
          <a
            href="/blog/rss.xml"
            aria-label="RSS feed"
            className="inline-grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:text-brand-500"
          >
            <Rss className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Featured */}
      {category === "All" && !query && (
        <Reveal className="mb-12">
          <Link
            href={`/insights/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-brand-500/40 sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(48,102,255,0.22), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <Badge>Featured</Badge>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {featured.category}
              </span>
            </div>
            <h2 className="relative mt-4 text-balance font-display text-3xl italic leading-[1.1] tracking-[-0.01em] sm:text-4xl md:text-[2.75rem]">
              {featured.title}
            </h2>
            <p className="relative mt-4 max-w-xl leading-relaxed text-[var(--muted)]">
              {featured.excerpt}
            </p>
            <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--muted)]">
              {featured.author && (
                <span className="font-medium text-[var(--foreground)]">
                  {authors[featured.author]?.name}
                </span>
              )}
              <span>{formatDate(featured.date)}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
              <span>{featured.readingTime}</span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-medium text-brand-500">
                Read article
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      {/* Grid */}
      {rest.length === 0 ? (
        <p className="py-16 text-center text-[var(--muted)]">
          No articles match your filters.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="text-brand-500 underline-grow"
          >
            Clear filters
          </button>
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-brand-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                    {post.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>
                <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug transition-colors group-hover:text-brand-500">
                  {post.title}
                </h3>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                  {post.author && <span>{authors[post.author]?.name}</span>}
                  <span>{formatDate(post.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
                  <span>{post.readingTime}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--border)] bg-[var(--background-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/blog/rss.xml" variant="outline" size="sm">
          <Rss className="h-4 w-4" /> Subscribe via RSS
        </ButtonLink>
      </Reveal>
    </div>
  );
}
