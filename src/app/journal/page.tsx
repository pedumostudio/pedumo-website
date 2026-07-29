import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { journalEntries } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Professional articles on technology, leadership, cybersecurity, and engineering by Balogun Adeolu.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — Balogun Adeolu",
    description: "Professional articles on technology, leadership, cybersecurity, and engineering.",
    url: "/journal",
  },
};

export default function JournalPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              What I Write
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Thinking worth your time.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Professional articles on technology, leadership, cybersecurity, and engineering.
              Written for decision-makers who value substance over noise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Articles ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-3xl">
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {journalEntries.map((entry, i) => (
              <Reveal key={entry.slug} delay={i * 0.05}>
                <Link
                  href={`/journal/${entry.slug}`}
                  className="group block py-8 transition-colors hover:bg-[var(--background-subtle)]/40 sm:px-4"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    <span className="accent-text">{entry.category}</span>
                    <span>{entry.date}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-500 sm:text-3xl">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-[var(--muted)] leading-relaxed">
                    {entry.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-[var(--muted)]">
                    <span>{entry.readingTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
