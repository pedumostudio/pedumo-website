import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { principles } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "The principles that guide every decision Balogun Adeolu makes — about technology, people, business, execution, innovation, and responsibility.",
  alternates: { canonical: "/thinking" },
  openGraph: {
    title: "Thinking — Balogun Adeolu",
    description: "The principles that guide every decision — about technology, people, business, execution, innovation, and responsibility.",
    url: "/thinking",
  },
};

export default function ThinkingPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Thinking", path: "/thinking" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              What I Believe
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Principles that guide every decision.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              These are not slogans. They are the standards I hold myself to — and the
              standards I hold every team and company I build to. They are tested by
              reality, not just theory.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Principles ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-4xl space-y-20">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {p.title}
                  </h2>
                </div>
                <div>
                  <p className="text-xl font-medium leading-relaxed sm:text-2xl">
                    {p.statement}
                  </p>
                  <p className="mt-4 text-[var(--muted)] leading-relaxed">
                    {p.elaboration}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="!py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              These principles in practice.
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Read how these principles shape the work I do, the companies I build, and the
              leadership I practice.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/leadership" size="lg">
                Leadership Philosophy
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/journal" variant="outline" size="lg">
                Journal
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
