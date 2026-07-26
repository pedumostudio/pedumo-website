import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  ShieldCheck,
  Compass,
  Globe,
  BrainCircuit,
  Cloud,
  Target,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CTASection } from "@/components/cta-section";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { Reveal } from "@/components/motion";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { siteConfig, FOUNDER_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder — Balogun Adeolu",
  description:
    "Meet Balogun Adeolu, Founder & Software Engineer at Pedumo — the engineering leadership behind the company's standards, security posture and long-term partnerships.",
  alternates: { canonical: "/founder" },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Balogun Adeolu",
  jobTitle: "Founder & Software Engineer",
  image: `${siteConfig.url}${FOUNDER_IMAGE}`,
  worksFor: { "@type": "Organization", name: siteConfig.legalName },
  url: siteConfig.founderLinks.website,
  sameAs: [
    siteConfig.founderLinks.linkedin,
    siteConfig.founderLinks.github,
    siteConfig.founderLinks.x,
    siteConfig.founderLinks.website,
  ],
};

const principles = [
  {
    icon: Code2,
    title: "Engineering-led",
    description:
      "Decisions are grounded in how systems actually behave in production, not slideware.",
  },
  {
    icon: ShieldCheck,
    title: "Trust as strategy",
    description:
      "Long-term relationships are the business model. Integrity is not optional.",
  },
  {
    icon: Compass,
    title: "Business-first",
    description:
      "Technology is a means. The goal is always a measurable outcome for the partner.",
  },
];

const expertise = [
  { icon: Code2, label: "Software architecture & full-stack engineering" },
  { icon: ShieldCheck, label: "Cybersecurity & secure systems design" },
  { icon: BrainCircuit, label: "AI automation & intelligent workflows" },
  { icon: Cloud, label: "Cloud infrastructure & DevOps" },
  { icon: Target, label: "Digital transformation strategy" },
];

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <section className="relative overflow-hidden pb-12 pt-16">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-4xl border border-[var(--border)] shadow-[0_50px_120px_-40px_rgba(33,64,232,0.4)] lg:mx-0">
              <div className="relative aspect-[3/2] w-full sm:aspect-[4/3] lg:aspect-[5/6]">
                <Image
                  src={FOUNDER_IMAGE}
                  alt="Balogun Adeolu, Founder & Software Engineer at Pedumo, seated at his executive desk in front of the Pedumo brand wall"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-black/40 p-5 backdrop-blur-md">
                  <p className="text-lg font-semibold text-white">Balogun Adeolu</p>
                  <p className="text-sm text-white/70">Founder &amp; Software Engineer</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Badge dot>Executive Leadership</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Balogun Adeolu
            </h1>
            <p className="mt-3 text-lg text-brand-500">Founder &amp; Software Engineer</p>

            <blockquote className="mt-7 border-l-2 border-brand-500 pl-6 text-xl font-medium leading-relaxed">
              &ldquo;I want Pedumo to be judged by one question: would our partners hire
              us again? Everything we do is designed so the answer is yes.&rdquo;
            </blockquote>

            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Balogun founded Pedumo on a simple conviction: organizations deserve
              technology partners who are as accountable for outcomes as they are for
              code. He works close to the systems he ships — reviewing architecture,
              security posture and delivery quality directly, not from a distance.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              His focus is execution: turning ambiguous requirements into secure,
              well-tested systems that run in production and keep running. He sets the
              engineering standard every engagement is held to — written scope, verifiable
              progress, and ownership that does not end at handoff.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={siteConfig.founderLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.github}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.x}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-4 w-4" /> X
              </ButtonLink>
              <ButtonLink
                href={`mailto:${siteConfig.founderLinks.email}`}
                variant="outline"
              >
                Email
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.website}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4" /> Website
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise */}
      <Section className="border-t border-[var(--border)] !py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            align="left"
            eyebrow="Expertise"
            title="Where the founder's depth lies"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {expertise.map((e, i) => (
              <Reveal key={e.label} delay={(i % 2) * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4">
                  <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <e.icon className="h-5 w-5" />
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
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/about" variant="outline" size="sm">
            Read the Pedumo story
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
