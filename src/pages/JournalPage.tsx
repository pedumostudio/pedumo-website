import { ArrowUpRight, Rss } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Seo } from "@/components/seo";
import { insights, journalSources } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";

const journalSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Pedumo Engineering Journal",
  description: "A future aggregation surface for Pedumo website articles, DEV.to and Medium posts.",
  url: `${siteConfig.url}/journal`,
};

export function JournalPage() {
  return (
    <>
      <Seo
        title="Engineering Journal"
        description="The Pedumo Engineering Journal aggregates website articles and marks DEV.to and Medium integrations pending until feeds are configured."
        path="/journal"
        jsonLd={journalSchema}
      />
      <PageHero
        eyebrow="Engineering Journal"
        title={
          <>
            One place for <span className="gradient-text">Pedumo engineering writing</span>
          </>
        }
        description="This page includes Pedumo website articles and is prepared to aggregate DEV.to and Medium. It does not fabricate external feed posts."
      >
        <ButtonLink href="/insights" variant="outline">
          Read Website Articles
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5 text-sm leading-relaxed text-[var(--foreground)] edge-highlight sm:p-6">
          <p className="font-semibold text-warning">Integration pending.</p>
          <p className="mt-2 text-[var(--muted)]">
            DEV.to, Medium and RSS API integrations are not configured in this repository. External
            journal cards link only to verified source destinations and do not display fake posts.
          </p>
        </div>
      </Section>

      <Section id="website-articles" className="!pt-8">
        <SectionHeading
          eyebrow="PEDUMO Articles"
          title="Website articles available now"
          description="These articles come from the local Pedumo content model. External feeds remain pending until real integrations exist."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <Badge>{post.category}</Badge>
                <h2 className="mt-4 text-xl font-semibold tracking-tight">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                <a
                  href={hrefOf("/insights", post.slug)}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                >
                  Read More →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="External Sources"
          title="Prepared publishing channels"
          description="DEV.to and Medium cards are visible only as integration status surfaces. They do not claim posts exist."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {journalSources.map((source, i) => {
            const isExternal = source.href.startsWith("http");
            const href = isExternal ? source.href : hrefOf(source.href);
            return (
              <Reveal key={source.name} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                      <Rss className="h-6 w-6" aria-hidden />
                    </span>
                    <Badge>{source.status}</Badge>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight">{source.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {source.description}
                  </p>
                  <a
                    href={href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl border border-[var(--border-strong)] px-4 py-2 text-sm font-medium transition-colors hover:border-brand-400/45 hover:bg-white/[0.04] hover:text-brand-300"
                  >
                    Open source
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTASection
        title="Let's Build Your Next Software Product"
        description="Talk with Pedumo about building software people return to because it keeps getting better."
      />
    </>
  );
}
