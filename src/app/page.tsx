import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, FOUNDER_IMAGE } from "@/lib/site";
import { journalEntries, recognition } from "@/lib/content";

export default function HomePage() {
  const recentJournal = journalEntries.slice(0, 3);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-screen editorial. Portrait + bold statement.
          No overlays. No badges. No text on the photograph.
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:pt-0">
          {/* Left: Statement */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:py-24">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Technology Founder · Software Architect · Builder
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-8 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[4rem] lg:text-[4.5rem]">
                I build companies around{" "}
                <span className="font-semibold">discipline, trust</span> and{" "}
                <span className="accent-text font-semibold">execution</span> — not hype.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
                Technology should make an organization stronger, not more fragile.
                Every system I build, every team I lead, every company I found
                is designed to earn that trust — and keep it.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/story" size="lg">
                  My Story
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/leadership" variant="outline" size="lg">
                  Leadership Philosophy
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right: Portrait — clean, full-bleed, no overlays */}
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl sm:aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src={FOUNDER_IMAGE}
                  alt="Balogun Adeolu"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EDITORIAL STATEMENT
          ═══════════════════════════════════════════════════════════ */}
      <Section className="!py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              What I believe
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-balance text-2xl font-medium leading-snug tracking-tight text-[var(--foreground)] sm:text-3xl md:text-[2.25rem] md:leading-[1.25]">
              The most important technology decisions are not about frameworks or platforms.
              They are about{" "}
              <span className="font-semibold">who you trust to build</span>,{" "}
              whether the architecture can survive reality,
              and if the people behind it will still be there when it matters.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          QUICK NAVIGATION — Editorial cards
          ═══════════════════════════════════════════════════════════ */}
      <Section className="section-divider !py-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Story",
              href: "/story",
              title: "My Journey",
              description: "From Idowa to building technology companies that serve organizations worldwide.",
            },
            {
              label: "Thinking",
              href: "/thinking",
              title: "What I Believe",
              description: "Technology, people, business, execution — the principles that guide every decision.",
            },
            {
              label: "Ventures",
              href: "/ventures",
              title: "What I Build",
              description: "Pedumo and the companies, projects and initiatives that define my work.",
            },
            {
              label: "Journal",
              href: "/journal",
              title: "What I Write",
              description: "Professional articles on technology, leadership, cybersecurity and engineering.",
            },
          ].map((card, i) => (
            <Reveal key={card.label} delay={i * 0.05}>
              <Link
                href={card.href}
                className="group flex h-full flex-col bg-[var(--card)] p-8 transition-colors hover:bg-[var(--background-subtle)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-500">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors group-hover:text-accent-500">
                  {card.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          RECOGNITION
          ═══════════════════════════════════════════════════════════ */}
      <Section className="!py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Recognition
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Milestones
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {recognition.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group flex items-start gap-6 py-6 sm:px-4">
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-accent-500 sm:w-20">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          RECENT JOURNAL
          ═══════════════════════════════════════════════════════════ */}
      <Section className="!py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Journal
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Recent thinking
            </h2>
          </Reveal>
          <Reveal>
            <ButtonLink href="/journal" variant="outline" size="sm">
              All articles
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {recentJournal.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.05}>
              <Link
                href={`/journal/${entry.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors hover:bg-[var(--background-subtle)]/40 sm:px-4"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span className="accent-text">{entry.category}</span>
                  <span>{entry.date}</span>
                </div>
                <h3 className="text-lg font-medium leading-snug transition-colors group-hover:text-accent-500 sm:text-xl">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {entry.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT CTA
          ═══════════════════════════════════════════════════════════ */}
      <Section className="section-divider !py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Get in touch
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s build something that matters.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-[var(--muted)]">
              Whether you need a technology partner, a strategic advisor, or a speaker
              for your next event — I&apos;d like to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contact" size="lg">
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.personalLinks.linkedin}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
