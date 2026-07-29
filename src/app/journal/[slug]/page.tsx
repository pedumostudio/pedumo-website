import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { journalEntries } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: `${entry.title} — Balogun Adeolu`,
      description: entry.excerpt,
      url: `/journal/${slug}`,
      type: "article",
      publishedTime: entry.date,
      authors: [siteConfig.name],
      tags: entry.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.excerpt,
    },
  };
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const currentIndex = journalEntries.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? journalEntries[currentIndex - 1] : null;
  const next = currentIndex < journalEntries.length - 1 ? journalEntries[currentIndex + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.excerpt,
    datePublished: entry.date,
    author: {
      "@type": "Person",
      name: "Balogun Adeolu",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Balogun Adeolu",
    },
    keywords: entry.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: entry.title, path: `/journal/${slug}` },
          ]}
        />
      </div>

      {/* ── Article Header ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="accent-text">{entry.category}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
              <span>{entry.date}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
              <span>{entry.readingTime}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
              {entry.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              {entry.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Article Body ── */}
      <Section className="section-divider !py-16">
        <article className="mx-auto max-w-3xl">
          {entry.sections && entry.sections.length > 0 ? (
            <div className="space-y-12">
              {entry.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {entry.body.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-[var(--border)] pt-8">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </Section>

      {/* ── Navigation ── */}
      <Section className="!py-16">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/journal/${prev.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-accent-500/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  Previous
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-accent-500">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/journal/${next.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-right transition-colors hover:border-accent-500/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  Next
                </span>
                <p className="mt-2 text-sm font-medium transition-colors group-hover:text-accent-500">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-accent-500"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
