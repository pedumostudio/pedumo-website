import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { speakingEvents } from "@/lib/content";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Conferences, panels, interviews, and workshops by Balogun Adeolu — on technology, cybersecurity, leadership, and the discipline of building companies that last.",
  alternates: { canonical: "/speaking" },
  openGraph: {
    title: "Speaking — Balogun Adeolu",
    description: "Conferences, panels, interviews, and workshops by Balogun Adeolu.",
    url: "/speaking",
  },
};

const typeLabels: Record<string, string> = {
  keynote: "Keynote",
  panel: "Panel",
  interview: "Interview",
  workshop: "Workshop",
  conference: "Conference",
};

export default function SpeakingPage() {
  const upcoming = speakingEvents.filter((e) => e.status === "upcoming");
  const past = speakingEvents.filter((e) => e.status === "past");

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Speaking", path: "/speaking" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Speaking
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Conferences. Panels. Interviews. Workshops.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              I speak about technology leadership, cybersecurity, the discipline of execution,
              and what it takes to build companies that last. Every talk is designed to leave
              the audience with something they can use — not just something they heard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Upcoming ── */}
      {upcoming.length > 0 && (
        <Section className="section-divider !py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-500">
                Upcoming
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {upcoming.map((event, i) => (
                <Reveal key={event.title} delay={i * 0.05}>
                  <div className="py-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-500">
                        {typeLabels[event.type]}
                      </span>
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-green-600 dark:text-green-400">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {event.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Past ── */}
      {past.length > 0 && (
        <Section className="!py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                Past
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {past.map((event, i) => (
                <Reveal key={event.title} delay={i * 0.05}>
                  <div className="py-6">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {typeLabels[event.type]}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {event.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Invite ── */}
      <Section className="!py-24 bg-[var(--background-subtle)]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Invite me to speak.
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              I am available for keynotes, panels, workshops, and interviews on technology
              leadership, cybersecurity, AI governance, and the discipline of building
              companies that last.
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
