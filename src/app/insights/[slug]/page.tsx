import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/cta-section";
import { GridBackdrop } from "@/components/backgrounds";
import { ShareBar } from "@/components/share-bar";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/motion";
import { authors, insights } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
      authors: post.author ? [authors[post.author]?.name ?? ""] : [],
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const postUrl = `${siteConfig.url}/insights/${post.slug}`;
  const author = post.author ? authors[post.author] : undefined;
  const related = insights
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = related.length
    ? related
    : insights.filter((p) => p.slug !== post.slug).slice(0, 3);
  const toc = (post.sections ?? []).map((s) => ({ heading: s.heading, id: slugify(s.heading) }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: postUrl,
    keywords: post.tags,
    articleSection: post.category,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `${siteConfig.url}/insights/author/${author.slug}`,
          jobTitle: author.role,
        }
      : { "@type": "Organization", name: siteConfig.legalName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/insights` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
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
      <section className="relative overflow-hidden pb-6 pt-14">
        <GridBackdrop />
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>{post.category}</Badge>
            {post.tags?.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--border)] bg-[var(--background-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
              >
                #{t}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            {author && (
              <Link
                href={`/insights/author/${author.slug}`}
                className="font-medium text-[var(--foreground)] hover:text-brand-500"
              >
                {author.name}
              </Link>
            )}
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      <Section className="!pt-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_240px]">
          <article>
            <p className="text-balance text-xl font-medium leading-relaxed text-[var(--foreground)]">
              {post.excerpt}
            </p>
            <div className="mt-8 space-y-6">
              {post.sections && post.sections.length > 0
                ? post.sections.map((s) => (
                    <div key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
                      <h2 className="text-2xl font-semibold tracking-tight">{s.heading}</h2>
                      <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                        {s.text}
                      </p>
                    </div>
                  ))
                : post.body.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-[var(--muted)]">
                      {para}
                    </p>
                  ))}
            </div>

            {/* Author card */}
            {author && (
              <Reveal className="mt-12">
                <div className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-gradient-to-br from-brand-600 to-brand-900">
                    {author.slug === "balogun-adeolu" ? (
                      <Image
                        src="/pedumoceo.jpg"
                        alt={author.name}
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center font-display text-xl italic text-white">
                        P
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{author.name}</p>
                    <p className="text-xs text-[var(--muted)]">{author.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {author.bio}
                    </p>
                    <Link
                      href={`/insights/author/${author.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-500"
                    >
                      View all posts
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mt-10 border-t border-[var(--border)] pt-8">
              <ShareBar url={postUrl} title={post.title} />
            </div>
          </article>

          {/* TOC + newsletter */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  On this page
                </p>
                <ul className="mt-3 space-y-2 border-l border-[var(--border)] pl-4 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-[var(--muted)] transition-colors hover:text-brand-500"
                      >
                        {t.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <p className="text-sm font-semibold">Stay in the loop</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                New insights, no noise. One email when we publish.
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Related reading
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {fallbackRelated.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-brand-500/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                  {p.category}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug transition-colors group-hover:text-brand-500">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-[var(--muted)]">{p.readingTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
