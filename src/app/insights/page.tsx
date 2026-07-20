import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { InsightsBrowser } from "@/components/insights-browser";
import { resources } from "@/lib/resources-expanded";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description:
    "Engineering notes and industry analysis from Pedumo on AI, cloud, cybersecurity, software architecture and digital transformation. Search, filter by category, and subscribe via RSS.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Blog"
        title={
          <>
            Notes from the{" "}
            <span className="font-display italic font-normal">engineering floor</span>
          </>
        }
        description="Practical perspectives for leaders and builders — no hype, no filler, just what we've learned shipping real systems. Search, filter, or subscribe."
      />

      <Section className="!pt-10">
        <InsightsBrowser />
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          align="left"
          eyebrow="Resource center"
          title="Whitepapers, guides and templates"
          description="Practical tools from our practice — being prepared for public release. Register interest and we'll send them the day they ship."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 6).map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <Badge>{r.type}</Badge>
                </div>
                <h3 className="mt-4 flex-1 text-base font-semibold leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {r.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
                  <span className="font-mono uppercase tracking-[0.14em]">{r.format}</span>
                  {r.pages && <span>{r.pages} pages</span>}
                </div>
                <a
                  href="/resources"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-400"
                >
                  <Download className="h-4 w-4" />
                  Get notified
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <a
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-500"
          >
            Browse the full resource centre
          </a>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
