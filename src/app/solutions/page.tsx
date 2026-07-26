import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-focused solutions: digital product engineering, intelligent automation, cloud modernization, security, data platforms and platform scaling.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Built around <span className="gradient-text">business outcomes</span>
          </>
        }
        description="Our engineering, packaged into solutions that map directly to the results leaders are accountable for."
      >
        <ButtonLink href="/book">Book a consultation</ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <div className="grid gap-4 lg:grid-cols-2">
          {solutions.map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 2) * 0.08}>
              <div className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:border-brand-500/40">
                <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                  <solution.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold">{solution.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {solution.description}
                </p>
                <ul className="mt-6 grid gap-2 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
                  {solution.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-[var(--muted)]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
