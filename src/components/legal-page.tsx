import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Last updated: ${updated}`} />
      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[var(--muted)]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
