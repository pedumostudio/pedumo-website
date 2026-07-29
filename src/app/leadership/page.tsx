import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "How Balogun Adeolu thinks about leadership — decision-making, team-building, trust, and the discipline of execution.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "Leadership — Balogun Adeolu",
    description: "How Balogun Adeolu thinks about leadership — decision-making, team-building, trust, and the discipline of execution.",
    url: "/leadership",
  },
};

const leadershipPhilosophy = [
  {
    title: "How I Make Decisions",
    text: "I start with the outcome, not the activity. What is the measurable result we are trying to achieve? Then I work backward — what is the simplest path to that result? What are the risks? What are the trade-offs? I prefer reversible decisions made quickly and irreversible decisions made deliberately. I write down my reasoning so the team can challenge it and so future-me can understand it.",
  },
  {
    title: "How I Build Teams",
    text: "I build teams around clarity and trust. Everyone knows what they are responsible for, what success looks like, and how their work connects to the mission. I hire for judgment and character as much as skill — because the hardest problems are not technical, they are human. I create environments where people can disagree openly, fail honestly, and recover fast.",
  },
  {
    title: "How I Earn Trust",
    text: "Trust is not a declaration. It is a pattern of consistent action over time. I show up. I deliver on commitments. I am honest when things go wrong — and things always go wrong. I do not overpromise. I do not cut corners. I do the work that nobody sees, because that is the work that determines whether the system survives reality.",
  },
  {
    title: "How I Lead",
    text: "I lead from the work, not from a distance. I review architecture. I care about security posture. I read the code. I set the standard — and I hold myself to it first. The team knows that the expectations I set are expectations I meet myself. Leadership is not about being the smartest person in the room. It is about being the most accountable.",
  },
];

const personalPrinciples = [
  {
    principle: "The standard you walk past is the standard you accept.",
    context: "If I see something that is not good enough, I say something. If I accept mediocrity from myself or my team, I am teaching people that mediocrity is acceptable.",
  },
  {
    principle: "Do the hard work, especially when no one is watching.",
    context: "The decisions that matter most are the ones nobody sees. The test you write when you could skip it. The documentation you maintain when nobody asked. The security review you do because it is right, not because it is required.",
  },
  {
    principle: "Be honest about what you do not know.",
    context: "I would rather say 'I don't know, but I will find out' than pretend. Honesty builds trust faster than confidence. And the people who trust you will give you the time to find the right answer.",
  },
  {
    principle: "The long game always wins.",
    context: "Short-term thinking is tempting. It is also the most expensive kind of thinking. I optimize for the relationship, not the transaction. For the decade, not the quarter. For the system that survives, not the feature that ships.",
  },
  {
    principle: "Your reputation is built in the moments when it is easier to compromise.",
    context: "Everyone does the right thing when it is easy. Integrity is what you do when it costs you something. That is the moment that defines your reputation — and your reputation is the most valuable asset you will ever build.",
  },
  {
    principle: "Technology without discipline is just chaos arriving faster.",
    context: "The most impressive technology in the world is worthless if the team that built it cannot maintain it, the system that runs it cannot survive failures, and the people who depend on it cannot trust it.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Leadership", path: "/leadership" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Leadership Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              How I think about the work.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Leadership is not about being the smartest person in the room. It is about
              being the most accountable. The most consistent. The most willing to do the
              hard work that nobody sees.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Philosophy Sections ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {leadershipPhilosophy.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05}>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  {section.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Personal Principles ── */}
      <Section className="!py-24 bg-[var(--background-subtle)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Personal Principles
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Short ideas. Powerful standards.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-10">
            {personalPrinciples.map((p, i) => (
              <Reveal key={p.principle} delay={i * 0.05}>
                <div className="border-l-2 border-accent-500 pl-6">
                  <p className="text-xl font-medium leading-snug sm:text-2xl">
                    &ldquo;{p.principle}&rdquo;
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {p.context}
                  </p>
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
              See these principles in action.
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Read the story of how these principles were forged, or explore the
              ventures they have built.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/story" size="lg">
                My Story
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
