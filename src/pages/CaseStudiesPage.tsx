import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/seo";
import { caseStudies } from "@/lib/content";

export function CaseStudiesPage() {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Concept projects and internal products from the Pedumo innovation lab — honestly labeled, fully explained."
        path="/case-studies"
      />
      <PageHero
        eyebrow="Case Studies"
        title="How we think, demonstrated"
        description="These are concept projects and internal products from our innovation lab. They are honestly labeled — not invented client logos — and fully explained so you can evaluate how we reason about hard problems."
      />
      <Section className="!pt-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <Badge>{cs.category}</Badge>
                  <span className="text-xs text-[var(--muted)]">{cs.status}</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight">{cs.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-[var(--muted)]">{cs.summary}</p>
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Outcomes
                  </p>
                  <ul className="mt-3 space-y-2">
                    {cs.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm">
                        <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
