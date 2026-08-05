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

export function FounderPage() {
  return (
    <>
      <Seo
        title="Founder — Balogun Adeolu"
        description="Meet Balogun Adeolu, Founder & Software Engineer at Pedumo — the engineering leadership behind the company's standards, security posture and long-term partnerships."
        path="/founder"
        jsonLd={founderSchema}
      />

      <section className="relative overflow-hidden pb-12 pt-16">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16">
          {/* Portrait fully visible — no overlay cards, blur labels, or floating text */}
          <Reveal>
            <FounderPortrait priority sizes="(max-width: 1024px) 92vw, 42vw" />
          </Reveal>

          <Reveal delay={0.1}>
            <Badge dot>Executive Leadership</Badge>
            {/* Name and title live outside the image as surrounding content */}
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {siteConfig.founder}
            </h1>
            <p className="mt-3 text-lg text-brand-300">{siteConfig.founderTitle}</p>

            <blockquote className="mt-7 border-l-2 border-brand-400 pl-6 text-xl font-medium leading-relaxed">
              “I want Pedumo to be judged by one question: would our partners hire us again?
              Everything we do is designed so the answer is yes.”
            </blockquote>

            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Balogun founded Pedumo on a simple conviction: organizations deserve technology
              partners who are as accountable for outcomes as they are for code. He works close to
              the systems he ships — reviewing architecture, security posture and delivery quality
              directly, not from a distance.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              His focus is execution: turning ambiguous requirements into secure, well-tested
              systems that run in production and keep running. He sets the engineering standard
              every engagement is held to — written scope, verifiable progress, and ownership that
              does not end at handoff.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
            eyebrow="Expertise"
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
          eyebrow="Leadership philosophy"
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
