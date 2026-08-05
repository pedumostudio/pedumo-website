import { Globe, Mail } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CTASection } from "@/components/cta-section";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { Reveal } from "@/components/motion";
import { FounderPortrait } from "@/components/founder-portrait";
import { GitHubIcon, LinkedInIcon, MediumIcon, XIcon } from "@/components/social-icons";
import { Seo } from "@/components/seo";
import { founderExpertise, founderPrinciples } from "@/lib/content";
import { FOUNDER_IMAGE, siteConfig } from "@/lib/site";

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.founder,
  jobTitle: siteConfig.founderTitle,
  email: siteConfig.founderLinks.email,
  image: `${siteConfig.url}${FOUNDER_IMAGE}`,
  worksFor: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
  url: siteConfig.founderLinks.website,
  sameAs: [siteConfig.founderLinks.website, siteConfig.founderLinks.medium],
};

const founderTimeline = [
  {
    stage: "Biography",
    title: "Founder-led engineering ownership",
    description:
      "Balogun leads Pedumo as a software engineer who stays close to architecture, security, delivery quality and long-term maintainability.",
  },
  {
    stage: "Mission",
    title: "Make business software trustworthy",
    description:
      "Pedumo exists to help organizations build systems that are secure, scalable, documented and operated with clear accountability.",
  },
  {
    stage: "Vision",
    title: "An engineering company that compounds trust",
    description:
      "The company direction is to become a durable engineering partner known for reliable systems, not short-lived marketing promises.",
  },
  {
    stage: "Experience",
    title: "Full-stack, AI, cloud and security depth",
    description:
      "The founder's operating focus spans software architecture, AI automation, cybersecurity, cloud infrastructure and DevOps delivery.",
  },
];

export function FounderPage() {
  return (
    <>
      <Seo
        title="Meet the Founder — Balogun Adeolu"
        description="Meet Balogun Adeolu, Founder & Software Engineer at Pedumo — biography, mission, vision, engineering philosophy, experience and links."
        path="/founder"
        jsonLd={founderSchema}
      />

      <section className="relative overflow-hidden pb-12 pt-16">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16">
          <Reveal>
            <FounderPortrait priority sizes="(max-width: 1024px) 92vw, 42vw" />
          </Reveal>

          <Reveal delay={0.1}>
            <Badge dot>Meet the Founder</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {siteConfig.founder}
            </h1>
            <p className="mt-3 text-lg text-brand-300">{siteConfig.founderTitle}</p>

            <blockquote className="mt-7 border-l-2 border-brand-400 pl-6 text-xl font-medium leading-relaxed">
              “Technology should make a business stronger, not more fragile. Pedumo is built around
              engineering discipline, ownership and trust.”
            </blockquote>

            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Balogun founded Pedumo on a simple conviction: organizations deserve technology
              partners who are as accountable for outcomes as they are for code. He works close to
              the systems Pedumo ships — reviewing architecture, security posture and delivery
              quality directly.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              His engineering philosophy is practical: define the business outcome, design for
              failure, secure the default path, document the decisions and keep the system
              maintainable after launch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" aria-label="Founder links">
              <ButtonLink href={siteConfig.founderLinks.website} external>
                <Globe className="h-4 w-4" /> Founder Website
              </ButtonLink>
              <ButtonLink href={siteConfig.founderLinks.medium} variant="outline" external>
                <MediumIcon className="h-4 w-4" /> Medium
              </ButtonLink>
              <ButtonLink href={siteConfig.socials.linkedin} variant="outline" external>
                <LinkedInIcon className="h-4 w-4" /> Pedumo LinkedIn
              </ButtonLink>
              <ButtonLink href={siteConfig.socials.github} variant="outline" external>
                <GitHubIcon className="h-4 w-4" /> Pedumo GitHub
              </ButtonLink>
              <ButtonLink href={siteConfig.socials.x} variant="outline" external>
                <XIcon className="h-4 w-4" /> Pedumo X
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.founderLinks.email}`} variant="outline">
                <Mail className="h-4 w-4" /> Email
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-[var(--border)] !py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            align="left"
            eyebrow="Biography, Mission & Vision"
            title="The operating story behind Pedumo"
            description="Founder visibility is part of trust. This page keeps leadership, philosophy and accountability visible instead of hiding the people behind the work."
          />
          <div className="space-y-4">
            {founderTimeline.map((item, i) => (
              <Reveal key={item.stage} delay={i * 0.05}>
                <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{item.stage}</p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            align="left"
            eyebrow="Experience"
            title="Where the founder's depth lies"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {founderExpertise.map((e, i) => (
              <Reveal key={e.label} delay={(i % 2) * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 edge-highlight">
                  <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                    <e.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium leading-snug">{e.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Engineering Philosophy"
          title="How the founder thinks about the work"
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {founderPrinciples.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 edge-highlight">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <p.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Company"
            title="The Pedumo story continues"
            description="Mission, vision and the principles behind every engagement."
            className="!mx-0"
          />
          <ButtonLink href="/about" variant="outline">
            Read the Pedumo story
          </ButtonLink>
        </div>
      </Section>

      <CTASection
        title="Work with engineering leadership that stays accountable"
        description="Book a consultation with Pedumo. Bring the hard problems — architecture, security, delivery and scale."
      />
    </>
  );
}
