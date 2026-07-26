import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";

export function SimplePage({
  eyebrow,
  title,
  description,
  children,
  cta,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  cta?: { title: string; description: string };
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section className="!pt-6">
        <div className="mx-auto max-w-4xl">{children}</div>
      </Section>
      <CTASection {...(cta ?? {})} />
    </>
  );
}
