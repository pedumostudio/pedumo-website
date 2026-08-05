import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/seo";
import { insights } from "@/lib/content";
import { siteConfig } from "@/lib/site";

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
  description: "Pedumo's central knowledge hub for engineering strategy, secure APIs, responsible AI and scalable cloud infrastructure.",
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
  return (
    <>
      <Seo
        title="Engineering Insights"
        description="Pedumo's knowledge hub for engineering strategy, secure APIs, responsible AI and scalable cloud infrastructure."
        path="/insights"
        jsonLd={insightsSchema}
      />
      <PageHero
        eyebrow="Knowledge Hub"
        title={
          <>
            Engineering Insights for <span className="gradient-text">systems that matter</span>
          </>
        }
        description="A central knowledge base for leaders and engineers who want secure, scalable and maintainable software products."
      >
        <ButtonLink href="/journal" variant="outline">
          Engineering Journal
          <ArrowRight className="h-4 w-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <SectionHeading
          eyebrow="Latest Articles"
          title="Return here for Pedumo engineering writing"
          description="Articles are stored in a structured content model so website publishing, Medium, DEV.to and GitHub-backed updates can be connected later without redesigning the knowledge hub."
        />
        <div className="mx-auto mt-12 max-w-4xl space-y-5">
          {insights.map((post, i) => (
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

      <CTASection
        title="Let's Build Your Next Software Product"
        description="Use the knowledge hub to evaluate how Pedumo thinks, then bring us the product or platform that needs disciplined execution."
      />
    </>
  );
}
