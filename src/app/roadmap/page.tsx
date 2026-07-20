import type { Metadata } from "next";
import { CheckCircle2, Loader2, CircleDot, Telescope } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { roadmap, type RoadmapItem } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The Pedumo public roadmap: what we've shipped, what we're building now, and where we're heading. Transparent progress with version history.",
  alternates: { canonical: "/roadmap" },
};

const columns: {
  key: RoadmapItem["status"];
  label: string;
  icon: typeof CheckCircle2;
  accent: string;
}[] = [
  { key: "released", label: "Released", icon: CheckCircle2, accent: "text-accent-500" },
  { key: "in-progress", label: "In progress", icon: Loader2, accent: "text-brand-500" },
  { key: "planned", label: "Planned", icon: CircleDot, accent: "text-amber-500" },
  { key: "vision", label: "Future vision", icon: Telescope, accent: "text-[var(--muted)]" },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title={
          <>
            Transparent progress,{" "}
            <span className="font-display italic font-normal">in the open</span>
          </>
        }
        description="What we've shipped, what we're building now, and where we're heading. Vote on what matters to you — priorities update quarterly."
      >
        <ButtonLink href="/changelog" variant="outline">
          Read the changelog
        </ButtonLink>
      </PageHero>

      <Section className="!pt-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {columns.map((col, ci) => {
            const items = roadmap.filter((i) => i.status === col.key);
            return (
              <Reveal key={col.key} delay={ci * 0.06}>
                <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div className={`flex items-center gap-2 ${col.accent}`}>
                      <col.icon className="h-4 w-4" />
                      <span className="text-sm font-semibold">{col.label}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    {items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] p-4"
                      >
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                          {item.description}
                        </p>
                        {(item.progress !== undefined || item.quarter || item.votes) && (
                          <div className="mt-3 space-y-2">
                            {item.quarter && (
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                                {item.quarter}
                              </p>
                            )}
                            {item.progress !== undefined && item.progress > 0 && item.progress < 100 && (
                              <div>
                                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--muted)]">
                                  <span>progress</span>
                                  <span>{item.progress}%</span>
                                </div>
                                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
                                  <div
                                    className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700"
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {item.votes !== undefined && (
                              <button
                                type="button"
                                className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs text-[var(--muted)] transition-colors hover:border-brand-500/40 hover:text-brand-500"
                              >
                                <span>▲</span>
                                {item.votes}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-[var(--muted)]">
            Want something on the roadmap?{" "}
            <a href="/contact" className="text-brand-500 underline-grow">
              Tell us what matters to you
            </a>
            .
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
