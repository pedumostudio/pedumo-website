import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Layers, Lightbulb, Rocket, Wrench } from "lucide-react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/cta-section";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { Reveal } from "@/components/motion";
import { caseStudies } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — ${cs.label}`,
    description: cs.tagline,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: { title: `${cs.title} — Pedumo Case Study`, description: cs.tagline },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const csUrl = `${siteConfig.url}/case-studies/${cs.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    about: cs.industry,
    description: cs.tagline,
    url: csUrl,
    creator: { "@type": "Organization", name: siteConfig.legalName },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteConfig.url}/case-studies` },
      { "@type": "ListItem", position: 3, name: cs.title, item: csUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative overflow-hidden pb-8 pt-14">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>{cs.label}</Badge>
            <span className="text-sm text-brand-500">{cs.industry}</span>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {cs.title}
          </h1>
          <p className="mt-4 text-balance text-lg text-[var(--muted)]">{cs.tagline}</p>
        </div>
      </section>

      <Section className="!pt-8">
        <div className="mx-auto max-w-4xl">
          {/* Mockup */}
          <Reveal>
            <div
              className={`relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br ${cs.accent} p-1`}
            >
              <div className="rounded-[1.35rem] bg-[var(--background-elevated)] p-6 sm:p-10">
                <div className="grid gap-3 sm:grid-cols-3">
                  {cs.outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-center"
                    >
                      <p className="text-2xl font-semibold text-brand-500">{o.value}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10">
            <Reveal>
              <Block icon={Layers} title="The business problem" body={cs.problem} />
            </Reveal>
            <Reveal>
              <Block icon={Rocket} title="Our solution" body={cs.solution} />
            </Reveal>

            <Reveal>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-semibold">Architecture</h2>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {cs.architecture.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-semibold">Lessons learned</h2>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {cs.lessons.map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-relaxed text-[var(--muted)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-xl font-semibold">Technology used</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2 text-sm font-medium text-[var(--foreground)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--background-subtle)] p-6 text-sm text-[var(--muted)]">
                <strong className="font-semibold text-[var(--foreground)]">
                  Note on transparency:
                </strong>{" "}
                This is a {cs.label.toLowerCase()} created by Pedumo to demonstrate our
                approach and capability. It does not represent a specific external client
                engagement.
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection
        title={`Have a challenge like ${cs.title}?`}
        description="Bring us the problem. We'll bring the architecture, the plan and the team to build it well."
      />
    </>
  );
}

function Block({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Layers;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}
