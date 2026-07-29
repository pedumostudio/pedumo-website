import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { ventures } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "The companies, projects, and initiatives built by Balogun Adeolu — including Pedumo, a technology engineering and AI automation company.",
  alternates: { canonical: "/ventures" },
  openGraph: {
    title: "Ventures — Balogun Adeolu",
    description: "The companies, projects, and initiatives built by Balogun Adeolu.",
    url: "/ventures",
  },
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-600 dark:text-green-400",
  building: "bg-accent-500/10 text-accent-500",
  exploring: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export default function VenturesPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Ventures", path: "/ventures" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              What I Build
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Companies, projects, and initiatives.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Each venture is built on the same foundation: discipline, trust, and execution.
              Pedumo is the most visible — but it is one chapter, not the whole story.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Ventures ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          {ventures.map((venture, i) => (
            <Reveal key={venture.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {venture.name}
                  </h2>
                  <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${statusColors[venture.status]}`}>
                    {venture.status}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                  {venture.role}
                </p>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  {venture.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {venture.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                      <span className="text-[var(--muted)]">{h}</span>
                    </li>
                  ))}
                </ul>

                {venture.links && venture.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
                    {venture.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-accent-500/40 hover:text-accent-500"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Building Pedumo ── */}
      <Section className="!py-24 bg-[var(--background-subtle)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Building Pedumo
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              One chapter. Not the whole story.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Pedumo was founded in 2024 on the conviction that organizations deserve a
              technology partner as accountable for outcomes as for code. It is a technology
              engineering and AI automation company that builds secure software, cloud
              infrastructure, data intelligence and cyber resilience for organizations that
              value a trustworthy long-term partner.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Pedumo is the proof of concept for a way of building. A demonstration that you
              can ship fast without cutting corners. That security is not a feature but a
              foundation. That the best technology partners are the ones who stay after the
              launch. But it is one chapter — and the best chapters are still ahead.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <ButtonLink href="https://pedumo.com" target="_blank" rel="noopener noreferrer">
                Visit Pedumo
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="!py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Interested in working together?
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Whether through Pedumo or a new venture, I am always open to conversations
              with people who share the conviction that technology should make organizations
              stronger.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contact" size="lg">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
