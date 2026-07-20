import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { Reveal } from "@/components/motion";
import { LinkedInIcon } from "@/components/social-icons";
import { authors, insights } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return Object.values(authors).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = Object.values(authors).find((a) => a.slug === slug);
  if (!author) return {};
  return {
    title: `${author.name} — Pedumo`,
    description: author.bio,
    alternates: { canonical: `/insights/author/${slug}` },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = Object.values(authors).find((a) => a.slug === slug);
  if (!author) notFound();
  const posts = insights.filter((p) => p.author === slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    url: `${siteConfig.url}/insights/author/${slug}`,
    worksFor: { "@type": "Organization", name: siteConfig.legalName },
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
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>
          <div className="mt-6 flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--border-strong)]">
              {slug === "balogun-adeolu" ? (
                <Image
                  src="/pedumoceo.jpg"
                  alt={author.name}
                  fill
                  sizes="80px"
                  priority
                  className="object-cover object-top"
                />
              ) : (
                <span className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-600 to-brand-900 font-display text-3xl italic text-white">
                  P
                </span>
              )}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500">
                Author
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {author.name}
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">{author.role}</p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--muted)]">{author.bio}</p>
          {slug === "balogun-adeolu" && (
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={siteConfig.founderLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-1.5 text-sm text-[var(--muted)] hover:text-brand-500"
              >
                <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <Link
                href="/founder"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-1.5 text-sm text-[var(--muted)] hover:text-brand-500"
              >
                Full profile
              </Link>
            </div>
          )}
        </div>
      </section>

      <Section className="!pt-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            {posts.length} article{posts.length === 1 ? "" : "s"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={`/insights/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-brand-500/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </div>
                  <h3 className="mt-3 flex-1 text-base font-semibold leading-snug transition-colors group-hover:text-brand-500">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs text-[var(--muted)]">{p.readingTime}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="py-10 text-center text-[var(--muted)]">
              No published articles from this author yet.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
