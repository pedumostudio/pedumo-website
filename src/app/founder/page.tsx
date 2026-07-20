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
import { LinkedInIcon, XIcon } from "@/components/social-icons";
import { siteConfig } from "@/lib/site";

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
  image: `${siteConfig.url}/pedumoceo.jpg`,
  worksFor: { "@type": "Organization", name: siteConfig.legalName },
  url: siteConfig.founderLinks.website,
  sameAs: [
    siteConfig.founderLinks.linkedin,
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
      <section className="relative overflow-hidden pb-16 pt-20 sm:pt-24 lg:pt-28">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border-strong)] shadow-elev-3 lg:mx-0">
              <div className="relative aspect-[4/5] min-h-[440px] w-full sm:min-h-[550px]">
                <Image
                  src="/pedumoceo.jpg"
                  alt="Balogun Adeolu, Founder & Software Engineer at Pedumo, seated at his executive desk"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/75 p-5">
                  <p className="font-display text-xl italic text-white">Balogun Adeolu</p>
                  <p className="mt-0.5 text-sm text-white/75">Founder &amp; Software Engineer</p>
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

            <blockquote className="mt-7 border-l border-brand-500 pl-6">
              <p className="font-display text-2xl italic leading-relaxed text-[var(--foreground)] sm:text-3xl">
                &ldquo;I want Pedumo to be judged by one question: would our partners hire
                us again? Everything we do is designed so the answer is yes.&rdquo;
              </p>
            </blockquote>

            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Balogun founded Pedumo on a simple conviction: organizations deserve
              technology partners who are as accountable for outcomes as they are for
              code. An engineer at heart, he leads with a hands-on understanding of what
              it takes to build systems that are secure, scalable and genuinely useful.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              His role is to set the bar — for engineering quality, for honesty with
              clients, and for the long-term thinking that turns a project into a
              partnership. The company, not the individual, is what he is building to
              last.
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
                href={siteConfig.founderLinks.x}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-4 w-4" /> X (Twitter)
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.website}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4" /> Personal Website
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
            title="Technical expertise & core specializations"
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
          title="Operational philosophy & conviction"
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
