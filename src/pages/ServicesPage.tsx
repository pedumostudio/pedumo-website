import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/seo";
import { capabilities } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Nine engineering disciplines under one accountable partner — software, AI automation, cloud, cybersecurity, data, DevOps, transformation, analytics and resilience."
        path="/services"
      />
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Nine disciplines.{" "}
            <span className="gradient-text">One engineering standard.</span>
          </>
        }
        description="Every capability an organization needs to build, secure and scale intelligent systems — delivered by a partner who owns outcomes end to end."
      >
        <ButtonLink href="/book">
          Book a Consultation
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <div className="space-y-6">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.slug} delay={Math.min(i * 0.03, 0.12)}>
              <article
                id={cap.slug}
                className="scroll-mt-28 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-brand-300">{cap.index}</span>
                      <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                        <cap.icon className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {cap.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-[var(--muted)]">{cap.definition}</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Problems we solve
                      </p>
                      <ul className="mt-3 space-y-2">
                        {cap.problems.map((p) => (
                          <li key={p} className="flex gap-2 text-sm leading-relaxed">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Outcomes
                      </p>
                      <ul className="mt-3 space-y-2">
                        {cap.outcomes.map((o) => (
                          <li key={o} className="flex gap-2 text-sm leading-relaxed">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Representative stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cap.stack.map((s) => (
                          <Badge key={s}>{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          title="One partner across the full stack"
          description="Stop coordinating five vendors who each own a slice and none who own the outcome. Pedumo engineers software, infrastructure, data and security under a single standard."
        />
      </Section>

      <CTASection />
    </>
  );
}
