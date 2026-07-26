import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { IconCard } from "@/components/cards";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import {
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { studioTopics } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pedumo Studio",
  description:
    "Pedumo Studio is our media and education division — tutorials, analysis and studio-quality video on software engineering, AI automation, security and product.",
  alternates: { canonical: "/studio" },
};

const channels = [
  { label: "YouTube", href: siteConfig.socials.youtube, icon: YouTubeIcon, note: "Long-form tutorials & builds" },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon, note: "Analysis for technology leaders" },
  { label: "Facebook", href: siteConfig.socials.facebook, icon: FacebookIcon, note: "Community & announcements" },
  { label: "TikTok", href: siteConfig.socials.tiktok, icon: TikTokIcon, note: "Short technical explainers" },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Pedumo Studio"
        title={
          <>
            Where we <span className="gradient-text">share the craft</span>
          </>
        }
        description="Pedumo Studio is our media and education division. We turn hard-won engineering lessons into content that helps builders and leaders make better decisions."
      />

      <Section className="!pt-10">
        <SectionHeading
          align="left"
          eyebrow="What we cover"
          title="Signal for people who build"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studioTopics.map((t, i) => (
            <Reveal key={t.title} delay={(i % 4) * 0.05}>
              <IconCard icon={t.icon} title={t.title} description={t.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Follow along"
          title="Coming soon to your feed"
          description="Our channels are being built out. Follow the placeholders below to be there from the first episode."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={(i % 4) * 0.05}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-start rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-brand-500/40"
              >
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background)] text-brand-500">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{c.label}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{c.note}</p>
                <span className="mt-4 text-xs font-medium text-brand-500">
                  Placeholder · launching soon
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Want Pedumo to build with you, not just teach?"
        description="Our studio shares how we think. Our engineering team can put it to work for your business."
      />
    </>
  );
}
