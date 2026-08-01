import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";
import { insights } from "@/lib/content";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InsightsPage() {
  return (
    <>
      <Seo
        title="Insights"
        description="Perspectives on AI, cloud, security and software architecture — written for decision-makers."
        path="/insights"
      />
      <PageHero
        eyebrow="Insights"
        title="Thinking worth your time"
        description="Practical notes on AI, cloud, security and architecture for leaders who ship systems that matter."
      />
      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                  <span className="font-medium text-brand-300">{post.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
