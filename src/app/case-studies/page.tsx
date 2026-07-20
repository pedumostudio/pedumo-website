import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileCode2, MessagesSquare, ScrollText, Timer } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Concept projects, internal products and prototypes from the Pedumo innovation lab — honest demonstrations of how we architect and build.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Proof of <span className="gradient-text">capability</span>, not fiction
          </>
        }
        description="We don't invent clients or testimonials. Instead we show our thinking through concept projects and internal products — clearly labeled and fully explained."
      />

      <Section className="!pt-10">
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_30px_70px_-40px_rgba(48,102,255,0.5)]"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${cs.accent}`}
                />
                <div className="flex items-center justify-between">
                  <Badge>{cs.label}</Badge>
                  <ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold">{cs.title}</h2>
                <p className="mt-1 text-sm text-brand-500">{cs.industry}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {cs.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {cs.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--border)] bg-[var(--background-subtle)] px-2 py-1 text-[11px] font-medium text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honest proof points — commitments you can verify, not invented quotes */}
      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Proof you can test"
          title="We earn trust by being verifiable"
          description="Client testimonials will appear here as engagements complete and partners agree to be named. Until then, we offer commitments you can hold us to from day one."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {[
            {
              icon: MessagesSquare,
              title: "Talk to an engineer before you commit",
              body: "Your first conversation is with someone who can assess architecture and scope — not a salesperson reading a script.",
            },
            {
              icon: FileCode2,
              title: "You own everything we build",
              body: "Source code, infrastructure, documentation and credentials are yours from the first commit. No lock-in, ever.",
            },
            {
              icon: ScrollText,
              title: "Written scope, visible progress",
              body: "Every engagement has a written statement of work, weekly demos and a changelog you can read at any time.",
            },
            {
              icon: Timer,
              title: "One business day, guaranteed",
              body: "Every inquiry receives a substantive reply within one business day. Test it right now — that's the point.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.07}>
              <div className="flex h-full gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
