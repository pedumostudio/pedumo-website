import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Cpu, Check } from "lucide-react";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} — Pedumo`, description: p.summary },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud",
    description: p.summary,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      description: "Custom engagement; see pricing page.",
    },
    provider: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative overflow-hidden pb-8 pt-14">
        <GridBackdrop />
        <GlowOrbs />
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
              <p.icon className="h-6 w-6" />
            </span>
            <Badge dot>{p.featured ? "Flagship product" : "Product"}</Badge>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {p.name}
          </h1>
          <p className="mt-4 max-w-2xl text-balance font-display text-xl italic leading-snug text-[var(--muted)] sm:text-2xl">
            {p.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            {p.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book">Book Strategic Consultation</ButtonLink>
            <ButtonLink href="/case-studies" variant="outline">
              See related case studies
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section className="!pt-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                <AlertTriangle className="h-4 w-4 text-brand-500" /> Problems it solves
              </h2>
              <ul className="mt-4 space-y-2.5">
                {p.problems.map((pr) => (
                  <li
                    key={pr}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--muted)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {pr}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-10">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  <Cpu className="h-4 w-4 text-brand-500" /> Technologies & methods
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-1.5 text-sm text-[var(--foreground)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  <Check className="h-4 w-4 text-accent-500" /> Outcomes for your business
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {p.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm leading-relaxed"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title={`Ready to ship ${p.name}?`}
        description="Book a strategic consultation and get a candid, senior assessment of your goals within one business day."
      />
    </>
  );
}
