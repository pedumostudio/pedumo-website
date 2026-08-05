import { useMemo, useState } from "react";
import { ArrowRight, Download, Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/seo";
import { insights, knowledgeHubSections } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const insightsSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Pedumo Engineering Insights",
  url: `${siteConfig.url}/insights`,
  description: "Pedumo's central knowledge hub for software engineering, AI, cloud, cybersecurity, architecture, DevSecOps and automation.",
  blogPost: insights.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    url: `${siteConfig.url}/insights#${post.slug}`,
  })),
};

export function InsightsPage() {
  const [query, setQuery] = useState(() =>
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("search") || "",
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(
    () =>
      normalizedQuery
        ? knowledgeHubSections.filter((section) =>
            `${section.title} ${section.description}`.toLowerCase().includes(normalizedQuery),
          )
        : knowledgeHubSections,
    [normalizedQuery],
  );
  const filteredInsights = useMemo(
    () =>
      normalizedQuery
        ? insights.filter((post) =>
            `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalizedQuery),
          )
        : insights,
    [normalizedQuery],
  );

  return (
    <>
      <Seo
        title="Engineering Knowledge Hub"
        description="Pedumo's professional knowledge center for software engineering, AI, cloud, cybersecurity, architecture, DevSecOps, automation, principles, whitepapers, checklists, downloads and case studies."
        path="/insights"
        jsonLd={insightsSchema}
      />
      <PageHero
        eyebrow="Engineering Knowledge Hub"
        title={
          <>
            Engineering knowledge for <span className="gradient-text">systems that matter</span>
          </>
        }
        description="A central knowledge base for leaders and engineers who want secure, scalable and maintainable software products."
      >
        <ButtonLink href="/journal" variant="outline">
          Engineering Journal
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6 !pb-8">
        <form
          role="search"
          className="mx-auto flex max-w-2xl flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 edge-highlight sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="knowledge-search" className="sr-only">
            Search the Pedumo knowledge hub
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" aria-hidden />
            <input
              id="knowledge-search"
              name="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search software, AI, cloud, security…"
              className="min-h-[44px] w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] py-2 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
            />
          </div>
          <p className="self-center text-xs text-[var(--muted)]" aria-live="polite">
            {filteredSections.length + filteredInsights.length} result{filteredSections.length + filteredInsights.length === 1 ? "" : "s"}
          </p>
        </form>
      </Section>

      <Section className="!pt-8">
        <SectionHeading
          eyebrow="Knowledge Center"
          title="Browse by engineering discipline"
          description="These sections are modeled as a structured knowledge hub. Whitepapers, checklists and downloads stay marked as pending until real files or integrations exist."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section, i) => {
            const pending = /pending/i.test(section.description);
            return (
              <Reveal key={section.title} delay={(i % 3) * 0.04}>
                <article
                  id={section.title.toLowerCase().replace(/\s+/g, "-")}
                  className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
                    {pending ? <Badge>Integration pending.</Badge> : null}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {section.description}
                  </p>
                  <a
                    href={hrefOf(section.href)}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                  >
                    Open section →
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="articles" className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Latest Articles"
          title="Return here for Pedumo engineering writing"
          description="Articles are stored in a structured content model so website publishing, Medium, DEV.to and GitHub-backed updates can be connected later without redesigning the knowledge hub."
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-5">
          {filteredInsights.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <article
                id={post.slug}
                className="scroll-mt-28 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                  <Badge>{post.category}</Badge>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime} read</span>
                  <span aria-hidden>·</span>
                  <span>{post.source}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h2>
                <p className="mt-4 leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {post.summaryPoints.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--background-sunken)] p-4 text-sm leading-relaxed text-[var(--foreground)]/90"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={`#${post.slug}`}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                  aria-label={`Continue reading ${post.title}`}
                >
                  Read More →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="whitepapers">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Whitepapers", "Long-form downloadable research papers are not yet present in the repository."],
            ["Checklists", "Operational checklists will appear only after real checklist files are added."],
            ["Downloads", "Downloads are withheld until versioned files and storage policy exist."],
          ].map(([title, description]) => (
            <Reveal key={title}>
              <article id={title.toLowerCase()} className="rounded-3xl border border-warning/30 bg-warning/10 p-6 edge-highlight">
                <Download className="h-6 w-6 text-warning" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                <p className="mt-4 text-sm font-semibold text-warning">Integration pending.</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Let's Build Your Next Software Product"
        description="Use the knowledge hub to evaluate how Pedumo thinks, then bring us the product or platform that needs disciplined execution."
      />
    </>
  );
}
