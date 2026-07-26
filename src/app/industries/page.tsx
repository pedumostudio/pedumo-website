import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { IconCard } from "@/components/cards";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { industries, coreValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Pedumo serves startups, SMEs, enterprises, governments and NGOs — adapting engineering to each sector's context, constraints and standards.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Engineering for every <span className="gradient-text">stage and sector</span>
          </>
        }
        description="The right technology decision for a two-person startup is not the right one for a government department. We tailor our approach to yours."
      >
        <ButtonLink href="/book">Discuss your sector</ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 0.06}>
              <IconCard
                icon={industry.icon}
                title={industry.title}
                description={industry.description}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="What stays constant"
          title="Our values travel with every engagement"
          description="Whatever the sector, these principles shape how we work and what we ship."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06}>
              <IconCard icon={v.icon} title={v.title} description={v.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
