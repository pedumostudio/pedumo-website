import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { changelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "The Pedumo changelog: releases, improvements, security updates and new content — a transparent record of how the company and its products evolve.",
  alternates: { canonical: "/changelog" },
};

const kindColor: Record<string, string> = {
  Release: "bg-brand-500/10 text-brand-500 border-brand-500/30",
  Improvement: "bg-accent-500/10 text-accent-500 border-accent-500/30",
  Security: "bg-red-500/10 text-red-500 border-red-500/30",
  Content: "bg-amber-500/10 text-amber-500 border-amber-500/30",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title={
          <>
            Every change,{" "}
            <span className="font-display italic font-normal">in the open</span>
          </>
        }
        description="A transparent record of how Pedumo and its products evolve — releases, improvements, security updates and new content."
      />

      <Section className="!pt-6">
        <ol className="relative mx-auto max-w-3xl space-y-10 border-l border-[var(--border-strong)] pl-8">
          {changelog.map((entry, i) => (
            <Reveal as="li" key={entry.version} delay={(i % 3) * 0.05}>
              <div className="relative">
                <span className="absolute -left-[41px] top-2 inline-grid h-4 w-4 place-items-center rounded-full border-2 border-brand-500 bg-[var(--background)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 live-dot" />
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-brand-500">v{entry.version}</span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${kindColor[entry.kind]}`}
                  >
                    {entry.kind}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{formatDate(entry.date)}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{entry.title}</h2>
                <ul className="mt-3 space-y-2">
                  {entry.changes.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  );
}
