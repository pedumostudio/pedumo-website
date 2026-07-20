import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Plug, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";
import { docArticles } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Pedumo documentation hub: getting started, API overview, authentication, architecture, deployment and FAQ — written for builders.",
  alternates: { canonical: "/docs" },
};

const iconFor: Record<string, typeof BookOpen> = {
  Overview: BookOpen,
  Developers: Code2,
  Engineering: Plug,
  DevOps: ShieldCheck,
};

export default function DocsPage() {
  const grouped = new Map<string, typeof docArticles>();
  docArticles.forEach((d) => {
    if (!grouped.has(d.category)) grouped.set(d.category, []);
    grouped.get(d.category)!.push(d);
  });

  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title={
          <>
            Built for builders,{" "}
            <span className="font-display italic font-normal">shipping now</span>
          </>
        }
        description="Getting started, API references, architecture and deployment guides — drawn from real engagements and published as we go."
      />

      <Section className="!pt-6">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Documentation categories">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                Categories
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {Array.from(grouped.keys()).map((c) => (
                  <li key={c}>
                    <a
                      href={`#${c.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-[var(--muted)] transition-colors hover:text-brand-500"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([category, articles], i) => {
              const Icon = iconFor[category] ?? BookOpen;
              return (
                <Reveal key={category} delay={i * 0.04}>
                  <div
                    id={category.toLowerCase().replace(/\s+/g, "-")}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-xl font-semibold">{category}</h2>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {articles.map((a) => (
                        <Link
                          key={a.slug}
                          href={`/docs/${a.slug}`}
                          className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-brand-500/40"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-semibold transition-colors group-hover:text-brand-500">
                              {a.title}
                            </h3>
                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1" />
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                            {a.summary}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-subtle)] p-8">
                <h3 className="text-lg font-semibold">Be notified of new docs</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  We publish new guides regularly. Get an email when one ships.
                </p>
                <div className="mt-4">
                  <NewsletterForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
