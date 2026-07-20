import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { GridBackdrop } from "@/components/backgrounds";
import { docArticles } from "@/lib/docs";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return docArticles.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docArticles.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Pedumo Docs`,
    description: doc.summary,
    alternates: { canonical: `/docs/${slug}` },
  };
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docArticles.find((d) => d.slug === slug);
  if (!doc) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.summary,
    mainEntityOfPage: `${siteConfig.url}/docs/${slug}`,
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative overflow-hidden pb-6 pt-14">
        <GridBackdrop />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> Documentation
          </Link>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500">
            {doc.category}
          </p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-4 max-w-2xl text-balance leading-relaxed text-[var(--muted)]">
            {doc.summary}
          </p>
        </div>
      </section>
      <Section className="!pt-4">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[200px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                On this page
              </p>
              <ul className="mt-3 space-y-2 border-l border-[var(--border)] pl-4 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slugify(s.heading)}`}
                      className="text-[var(--muted)] transition-colors hover:text-brand-500"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="space-y-8">
            {doc.sections.map((s) => (
              <div key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight">{s.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
