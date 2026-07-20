import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { IconCard } from "@/components/cards";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { careers, coreValues } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Pedumo. We're building a world-class, remote-first software engineering team that treats craft, integrity and long-term partnerships seriously.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build software that <span className="gradient-text">matters</span>
          </>
        }
        description="We're a remote-first team of engineers, designers and builders who care about doing the work well. If that sounds like you, let's talk."
      >
        <ButtonLink href={`mailto:${siteConfig.email}?subject=Careers at Pedumo`}>
          Send us your work
        </ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <SectionHeading
          align="left"
          eyebrow="Open roles"
          title="Where we're hiring"
          description="Don't see a perfect match? We always want to hear from exceptional people."
        />
        <div className="mt-12 grid gap-4">
          {careers.map((role, i) => (
            <Reveal key={role.title} delay={(i % 4) * 0.05}>
              <div className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-brand-500/40 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="mt-1 text-sm text-brand-500">{role.type}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                    {role.description}
                  </p>
                </div>
                <ButtonLink
                  href={`mailto:${siteConfig.email}?subject=Application: ${encodeURIComponent(role.title)}`}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="How we work"
          title="The values you'll work by"
          description="Our culture is our values in practice — remote-first, high-trust and obsessed with doing right by our partners."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.slice(0, 6).map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06}>
              <IconCard icon={v.icon} title={v.title} description={v.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Don't see your role? Introduce yourself."
        description="If you're exceptional at what you do and share our standards, we want to know you exist."
      />
    </>
  );
}
