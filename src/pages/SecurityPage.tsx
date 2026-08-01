import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";
import { trustPillars } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function SecurityPage() {
  return (
    <>
      <Seo
        title="Security"
        description="Security is the default posture at Pedumo — threat modeling, hardening, encryption and continuous monitoring on every engagement."
        path="/security"
      />
      <PageHero
        eyebrow="Security"
        title="Secure by default, not by exception"
        description="Threat modeling, least privilege, encryption and continuous monitoring are part of how we build — not a premium add-on or a launch-week scramble."
      />
      <Section className="!pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustPillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          title="Responsible disclosure"
          description={
            <>
              If you believe you have found a vulnerability, email{" "}
              <a
                className="font-medium text-brand-300 hover:underline"
                href={`mailto:${siteConfig.securityEmail}`}
              >
                {siteConfig.securityEmail}
              </a>
              . We investigate promptly and credit good-faith researchers.
            </>
          }
        />
      </Section>
      <CTASection />
    </>
  );
}
