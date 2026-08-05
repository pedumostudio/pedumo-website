import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/social-icons";
import { Seo } from "@/components/seo";
import { openSourceRepositories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const openSourceSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Pedumo Open Source",
  description: "Featured Pedumo repositories and public engineering work prepared for GitHub integration.",
  url: `${siteConfig.url}/open-source`,
  mainEntity: openSourceRepositories.map((repo) => ({
    "@type": "SoftwareSourceCode",
    name: repo.name,
    description: repo.description,
    codeRepository: repo.href,
    programmingLanguage: "TypeScript",
  })),
};

export function OpenSourcePage() {
  return (
    <>
      <Seo
        title="Open Source"
        description="Featured Pedumo repositories across website engineering, documentation, cloud architecture, security, AI and labs."
        path="/open-source"
        jsonLd={openSourceSchema}
      />
      <PageHero
        eyebrow="Open Source"
        title={
          <>
            Engineering in public, with <span className="gradient-text">room to verify</span>
          </>
        }
        description="Pedumo's public engineering surface is designed to connect to GitHub. Repository cards are data-driven now and ready for API-backed activity, stars, releases and commit metadata later."
      >
        <ButtonLink href={siteConfig.socials.github} external>
          <GitHubIcon className="h-4 w-4" />
          View GitHub Organization
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <div className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-5 text-sm leading-relaxed text-brand-100 edge-highlight sm:p-6">
          Public GitHub API integration is not configured in this repository yet. Repository names
          are displayed as featured open-source surfaces without fabricated stars, forks or commit
          counts.
        </div>
      </Section>

      <Section className="!pt-8">
        <SectionHeading
          eyebrow="Featured repositories"
          title="PEDUMO open-source surfaces"
          description="The structure is intentionally ready for automatic GitHub updates once API access and repository slugs are configured."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {openSourceRepositories.map((repo, i) => (
            <Reveal key={repo.id} delay={(i % 3) * 0.05}>
              <article
                id={repo.id}
                className="flex h-full scroll-mt-28 flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                    <repo.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <Badge>{repo.area}</Badge>
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight">{repo.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {repo.description}
                </p>
                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--background-sunken)] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Repository
                  </p>
                  <p className="mt-1 break-words font-mono text-sm text-brand-300">{repo.repoSlug}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{repo.status}</p>
                </div>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl border border-[var(--border-strong)] px-4 py-2 text-sm font-medium transition-colors hover:border-brand-400/45 hover:bg-white/[0.04] hover:text-brand-300"
                  aria-label={`Open ${repo.name} on GitHub`}
                >
                  Open on GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Let's Build Your Next Software Product"
        description="If your product needs architecture, security and delivery discipline from the first commit, Pedumo can help."
      />
    </>
  );
}
