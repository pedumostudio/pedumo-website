import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { techStack } from "@/lib/content";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "The production-grade stack Pedumo builds on: React, Next.js, TypeScript, Node.js, Python, cloud platforms, AI providers and OWASP-aligned security.",
  alternates: { canonical: "/technologies" },
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title={
          <>
            A stack chosen for <span className="gradient-text">longevity</span>
          </>
        }
        description="We pick technologies for reliability, hiring pool and long-term support — not novelty. These are the tools we trust in production."
      >
        <ButtonLink href="/case-studies" variant="outline">
          See them applied
        </ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat, i) => (
            <Reveal key={cat.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <cat.icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold">{cat.title}</h2>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-2.5 text-sm text-[var(--foreground)]"
                    >
                      {item}
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Security posture"
          title="Security is part of the stack, not an add-on"
          description="Every project starts with threat modeling and ships with OWASP-aligned defaults, encryption in transit and at rest, least-privilege access and continuous monitoring."
        />
      </Section>

      <CTASection />
    </>
  );
}
