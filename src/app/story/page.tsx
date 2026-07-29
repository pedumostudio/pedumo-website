import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { FOUNDER_IMAGE } from "@/lib/site";
import { timeline } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Story",
  description:
    "The story of Balogun Adeolu — from Idowa to building technology companies that serve organizations worldwide. A journey shaped by discipline, trust, and the conviction that technology should make people stronger.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Story — Balogun Adeolu",
    description: "The story of Balogun Adeolu — from Idowa to building technology companies that serve organizations worldwide.",
    url: "/story",
    type: "profile",
  },
};

export default function StoryPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Story", path: "/story" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-12 pt-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl lg:mx-0">
              <div className="relative aspect-[3/4] w-full sm:aspect-[4/3] lg:aspect-[5/6]">
                <Image
                  src={FOUNDER_IMAGE}
                  alt="Balogun Adeolu"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              My Story
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              From Idowa to building technology{" "}
              <span className="accent-text">companies that last</span>.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              I grew up in a town where people measured things by whether they lasted — not by how
              quickly they arrived. That rhythm shaped everything about how I build technology, lead
              teams, and found companies.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The Story ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Childhood
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              I was born and raised in Idowa, a town in the Ijebu area of Ogun State, Nigeria.
              It was a place where people built things with their hands — and built them to last.
              There was no venture capital. No pitch decks. Just craftsmanship, patience, and the
              quiet conviction that the work you do today should serve someone tomorrow.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Those values were not taught in a classroom. They were lived. You watched people
              build, repair, and maintain. You saw what happened when things were built well and
              when they were not. That observation became the foundation for how I think about
              technology.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="!py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Why Technology
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              I discovered software engineering and cybersecurity not as academic subjects, but as
              disciplines that could protect people and organizations. I realized that code could
              be a commitment to the people who depend on it — not just a tool, but a
              responsibility.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              The more I learned, the more I saw the gap between what technology could be and what
              it usually was. Systems that were fragile. Security that was bolted on. Teams that
              shipped fast but could not maintain what they built. I knew there had to be a better
              way — and I wanted to build it.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="!py-24 bg-[var(--background-subtle)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The Journey
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Years of deep technical work across full-stack engineering, cybersecurity, cloud
              infrastructure, and data systems. Not just learning how to build — but how to build
              things that last. How to make decisions that compound over years instead of days.
              How to earn trust and keep it.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              I made mistakes. I built things that did not work. I learned that the cheapest
              software to build is rarely the cheapest to own — and that the most important
              decisions are the ones nobody sees. The threat model you write before the first line
              of code. The test you write when nobody is watching. The documentation you maintain
              because the next person deserves it.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="!py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Founding Pedumo
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              In 2024, I founded Pedumo on a simple conviction: organizations deserve a technology
              partner as accountable for outcomes as for code. A company built around discipline,
              trust, and execution — not hype.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Pedumo is not just a company. It is a proof of concept for a way of building. A
              demonstration that you can ship fast without cutting corners. That security is not a
              feature but a foundation. That the best technology partners are the ones who stay
              after the launch.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Timeline ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Timeline
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The arc so far
            </h2>
          </Reveal>
          <div className="mt-12">
            {timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full border-2 border-accent-500 bg-[var(--background)]" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--border)]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="-mt-0.5 flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-500">
                      {event.year}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="!py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              This is the beginning.
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              The story continues. Every system I build, every team I lead, every company I
              found is a chapter — and the best ones are still ahead.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/leadership" size="lg">
                Leadership Philosophy
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/ventures" variant="outline" size="lg">
                Ventures
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
