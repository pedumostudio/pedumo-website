import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { GitHubIcon } from "@/components/social-icons";
import { openSourceProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Pedumo contributes to the open-source ecosystem with accessible UI kits, automation nodes, hardened starters and performance tooling.",
  alternates: { canonical: "/open-source" },
};

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        eyebrow="Open Source"
        title={
          <>
            We build in the <span className="gradient-text">open</span>
          </>
        }
        description="Open source keeps our standards honest and shares what we learn. The same rigor we apply to client work lives in our public repositories."
      >
        <ButtonLink href={siteConfig.socials.github}>
          <GitHubIcon className="h-4 w-4" />
          View on GitHub
        </ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {openSourceProjects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.06}>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_20px_50px_-30px_rgba(48,102,255,0.6)]"
              >
                <div className="flex items-center gap-2 font-mono text-sm text-[var(--foreground)]">
                  <GitHubIcon className="h-4 w-4 text-brand-500" />
                  {p.name}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {p.description}
                </p>
                <div className="mt-4 flex gap-2 text-xs text-[var(--muted)]">
                  <span className="rounded-md border border-[var(--border)] px-2 py-0.5">
                    {p.language}
                  </span>
                  <span className="rounded-md border border-[var(--border)] px-2 py-0.5">
                    {p.focus}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--background-subtle)] p-6 text-sm text-[var(--muted)]">
            Repository names shown are representative of our open-source focus areas.
            Explore the organization on GitHub for the current, live projects.
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
