import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/social-icons";
import { RepositoryGrid } from "@/components/open-source-repositories";
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
        description="Pedumo's public engineering surface connects to the public GitHub API when metadata is available. Missing repositories stay clearly marked as pending rather than showing fabricated activity."
      >
        <ButtonLink href={siteConfig.socials.github} external>
          <GitHubIcon className="h-4 w-4" />
          View GitHub Organization
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <SectionHeading
          eyebrow="Featured repositories"
          title="PEDUMO open-source surfaces"
          description="Repository cards are backed by a public GitHub metadata adapter and remain safe when rate limits, network failures or pending repositories prevent live data from loading."
        />
        <div className="mt-12">
          <RepositoryGrid showNotice />
        </div>
      </Section>

      <CTASection
        title="Let's Build Your Next Software Product"
        description="If your product needs architecture, security and delivery discipline from the first commit, Pedumo can help."
      />
    </>
  );
}
