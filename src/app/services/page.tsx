import type { Metadata } from "next";
import { AlertTriangle, Check, Cpu } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ProcessTimeline } from "@/components/process-timeline";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { capabilities } from "@/lib/capabilities";
import { services } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Nine engineering disciplines under one standard: software engineering, AI automation, cloud, cybersecurity, data engineering, DevOps, digital transformation, analytics and digital resilience.",
  alternates: { canonical: "/services" },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: capabilities.map((cap, i) => ({
    "@type": "Service",
    position: i + 1,
    name: cap.title,
    description: cap.definition,
    provider: { "@type": "Organization", name: siteConfig.legalName },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <PageHero
        eyebrow="Services & Capabilities"
        title={
          <>
            Nine disciplines. <span className="gradient-text">One standard.</span>
          </>
        }
        description="Everything an organization needs to build, secure and scale intelligent systems — delivered by one accountable engineering partner."
      >
        <ButtonLink href="/book">Book Strategic Consultation</ButtonLink>
        <ButtonLink href="/case-studies" variant="outline">
          See the work
        </ButtonLink>
      </PageHero>

      {/* Capability index */}
      <Section className="!pt-8 !pb-10">
        <Reveal>
          <nav aria-label="Capabilities" className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <a
                key={cap.slug}
                href={`#${cap.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-brand-500/40 hover:text-brand-500"
              >
                <span className="font-mono text-xs text-brand-500">{cap.index}</span>
                {cap.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </Section>

      {/* Deep capability sections */}
      <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {capabilities.map((cap, i) => (
          <section
            key={cap.slug}
            id={cap.slug}
            className="scroll-mt-28 py-16 sm:py-20"
            aria-labelledby={`${cap.slug}-title`}
          >
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <Reveal>
                  <div className="lg:sticky lg:top-32">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-brand-500">{cap.index}</span>
                      <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                        <cap.icon className="h-6 w-6" />
                      </span>
                    </div>
                    <h2
                      id={`${cap.slug}-title`}
                      className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      {cap.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-[var(--muted)]">
                      {cap.definition}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="grid gap-8">
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        <AlertTriangle className="h-4 w-4 text-brand-500" />
                        Problems it solves
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {cap.problems.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--muted)]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        <Cpu className="h-4 w-4 text-brand-500" />
                        Technologies & methods
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cap.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-1.5 text-sm text-[var(--foreground)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        <Check className="h-4 w-4 text-accent-500" />
                        Outcomes for your business
                      </h3>
                      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {cap.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm leading-relaxed"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Supporting services strip */}
      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          align="left"
          eyebrow="Also within scope"
          title="Supporting services"
          description="Specialist work we deliver inside engagements or as standalone projects."
        />
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2">
            {services
              .filter(
                (s) =>
                  !capabilities.some(
                    (c) => c.slug === s.slug || c.title === s.title,
                  ),
              )
              .map((s) => (
                <span
                  key={s.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium"
                >
                  <s.icon className="h-4 w-4 text-brand-500" />
                  {s.title}
                </span>
              ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How we deliver"
          title="Rigor you can see at every step"
          description="Our eight-step methodology keeps quality, communication and accountability consistent from discovery to continuous support."
        />
        <ProcessTimeline />
      </Section>

      <CTASection />
    </>
  );
}
