import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/social-icons";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading } from "@/components/section";
import { TechMarquee } from "@/components/marquee";
import { ProcessTimeline } from "@/components/process-timeline";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { caseStudies, faqs, insights, industries } from "@/lib/content";
import {
  capabilities,
  businessOutcomes,
  trustPillars,
} from "@/lib/capabilities";
import { siteConfig } from "@/lib/site";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Sparkline({ className }: { className?: string }) {
  // deterministic pseudo-random walk so SSR matches client
  const pts = Array.from({ length: 24 }, (_, i) => {
    const v = 8 + Math.abs(Math.sin(i * 0.8) * 10) + (i % 5) * 1.2;
    return `${(i / 23) * 100},${28 - v}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className={className}>
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />

      {/* Trusted technology stack */}
      <Section className="!py-10">
        <Reveal className="mb-8 text-center">
          <p className="text-sm font-medium text-[var(--muted)]">
            Built on the technologies trusted by the world&apos;s best engineering teams
          </p>
        </Reveal>
        <TechMarquee />
      </Section>

      {/* Editorial positioning statement */}
      <Section className="!py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-500">
              Who we are
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.75rem] md:leading-[1.22]">
              Pedumo is a technology engineering and AI automation partner. We design the
              architecture, write the code, secure the infrastructure and stay to operate
              it —{" "}
              <span className="font-display italic font-normal text-[var(--muted)]">
                so the systems your organization depends on are never a gamble.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--muted)]">
            {industries.map((ind) => (
              <span key={ind.slug} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-500" />
                {ind.title}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Capabilities — editorial numbered index */}
      <Section id="capabilities" className="border-t border-[var(--border)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                align="left"
                eyebrow="Capabilities"
                title="Nine disciplines. One accountable partner."
                description="Every capability an organization needs to build, secure and scale intelligent systems — under a single engineering standard."
              />
              <Reveal className="mt-8">
                <ButtonLink href="/services" variant="outline">
                  Explore all capabilities
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.slug} delay={Math.min(i * 0.03, 0.15)}>
                <Link
                  href={`/services#${cap.slug}`}
                  className="group flex items-baseline gap-5 py-6 transition-colors hover:bg-[var(--background-subtle)] sm:gap-8 sm:px-4"
                >
                  <span className="font-mono text-sm text-brand-500">{cap.index}</span>
                  <span className="flex-1">
                    <span className="underline-grow inline-block text-2xl font-medium tracking-tight transition-colors group-hover:text-brand-500 sm:text-3xl">
                      {cap.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                      {cap.outcomes[0]}. {cap.outcomes[1]}.
                    </span>
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500 sm:block" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Business outcomes — editorial 2x2 */}
      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Business Outcomes"
          title="What partnership with Pedumo changes"
          description="We measure ourselves against the outcomes leadership is accountable for — not activity, deliverables or hours."
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-x-16 gap-y-12 sm:grid-cols-2">
          {businessOutcomes.map((o, i) => (
            <Reveal key={o.metric} delay={(i % 2) * 0.08}>
              <div className="border-l-2 border-brand-500 pl-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-500">
                  {o.metric}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{o.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Enterprise trust panel */}
      <Section id="trust">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-14 sm:px-12 sm:py-16 shadow-elev-3">
            <div
              aria-hidden
              className="bg-grid-fine pointer-events-none absolute inset-0 opacity-15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 10% 10%, rgba(48,102,255,0.08), transparent 50%)",
              }}
            />
            <div className="relative">
              <div className="max-w-2xl">
                <Badge className="border-neutral-800 bg-neutral-900/60 text-neutral-300" dot>
                  Enterprise-grade by default
                </Badge>
                <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem] tracking-[-0.025em]">
                  Built to the standard enterprise and government demand
                </h2>
                <p className="mt-4 text-balance text-neutral-400 leading-relaxed text-sm sm:text-base">
                  Security, governance and resilience are not premium add-ons at Pedumo.
                  They are the default posture of every system we ship.
                </p>
              </div>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800/40 sm:grid-cols-2 lg:grid-cols-3">
                {trustPillars.map((pillar, i) => (
                  <div
                    key={pillar.title}
                    className="group relative bg-neutral-900/40 p-6 transition-colors hover:bg-neutral-900/65"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 live-dot" />
                        verified
                      </span>
                    </div>
                    <pillar.icon className="mt-5 h-5 w-5 text-brand-400" />
                    <h3 className="mt-3 text-base font-semibold text-white tracking-tight">{pillar.title}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-neutral-400">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Engineering Process */}
      <Section id="process" className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Methodology"
          title="A disciplined path from idea to impact"
          description="The same rigorous eight-step process on every engagement — so quality is a system, not a coincidence."
        />
        <ProcessTimeline />
      </Section>

      {/* Case Studies */}
      <Section id="case-studies">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Case Studies"
            title="How we think, demonstrated"
            description="Concept projects and internal products from our innovation lab — honestly labeled, fully explained."
          />
          <Reveal>
            <ButtonLink href="/case-studies" variant="outline" size="sm">
              View all
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.slice(0, 2).map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_30px_70px_-40px_rgba(48,102,255,0.5)]"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${cs.accent}`}
                />
                <div className="flex items-center justify-between">
                  <Badge>{cs.label}</Badge>
                  <ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{cs.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{cs.tagline}</p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-6">
                  {cs.outcomes.map((o) => (
                    <div key={o.label}>
                      <p className="text-sm font-semibold text-brand-500">{o.value}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{o.label}</p>
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Founder — executive leadership section */}
      <Section id="founder" className="border-t border-[var(--border)]">
        <div className="grid items-stretch gap-12 lg:grid-cols-[48fr_52fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="group relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] shadow-elev-3 transition-transform duration-500 group-hover:-translate-y-1">
                {/* Mono frame label */}
                <div className="flex items-center justify-between border-b border-white/10 bg-black px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500 live-dot" />
                    pedumo · founder
                  </span>
                  <span className="hidden sm:inline">portrait · 01</span>
                </div>
              <div className="relative aspect-[4/5] min-h-[480px] w-full sm:min-h-[560px]">
                <Image
                  src="/pedumoceo.jpg"
                  alt="Balogun Adeolu, Founder & Software Engineer at Pedumo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
                {/* Corner ticks */}
                <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/50" />
                <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/50" />
                {/* Nameplate */}
                <div className="absolute inset-x-5 bottom-5">
                  <div className="rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md">
                    <p className="font-display text-2xl italic text-white">
                      Balogun Adeolu
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      Founder &amp; Software Engineer · Pedumo
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Engineering-led", "Security-first", "Long-term partner"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3 text-white/70">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 live-dot" />
                        verified
                      </span>
                      <a
                        href={siteConfig.founderLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Balogun Adeolu on LinkedIn"
                        className="inline-grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        <LinkedInIcon className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={siteConfig.founderLinks.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Balogun Adeolu on X"
                        className="inline-grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={siteConfig.founderLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Balogun Adeolu personal website"
                        className="inline-grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        <Globe className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 flex flex-col justify-center lg:order-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-500">
              Executive Leadership
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl italic leading-[1.08] tracking-[-0.01em] sm:text-5xl md:text-[3.25rem]">
              Engineering leadership
              <br className="hidden sm:block" /> you can put in the room.
            </h2>
            <blockquote className="mt-7 border-l border-brand-500 pl-6">
              <p className="font-display text-2xl italic leading-relaxed text-[var(--foreground)] sm:text-3xl">
                &ldquo;Technology should make a business stronger, not more fragile. We
                build systems we would trust with our own company — and we stand behind
                them.&rdquo;
              </p>
            </blockquote>
            <p className="mt-7 max-w-xl leading-relaxed text-[var(--muted)]">
              Balogun founded Pedumo on the conviction that organizations deserve a
              technology partner as accountable for outcomes as for code. He sets the
              engineering bar across every engagement — security-first architecture,
              disciplined delivery and the long-term thinking that turns projects into
              partnerships.
            </p>

            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)]">
              {[
                { k: "Focus", v: "Full-stack & AI" },
                { k: "Standard", v: "OWASP ASVS L2" },
                { k: "Approach", v: "Outcomes-first" },
              ].map((d) => (
                <div key={d.k} className="bg-[var(--card)] p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {d.k}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">{d.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/founder">
                Full leadership profile
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.linkedin}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.x}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Featured Insights */}
      <Section id="insights" className="bg-[var(--background-subtle)]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Insights"
            title="Thinking worth your time"
            description="Perspectives on AI, cloud, security and software architecture — written for decision-makers."
          />
          <Reveal>
            <ButtonLink href="/insights" variant="outline" size="sm">
              All insights
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        {(() => {
          const [featured, ...rest] = insights.slice(0, 4);
          return (
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Featured */}
              <Reveal>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group relative block overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition-colors hover:border-brand-500/40 sm:p-10"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(48,102,255,0.22), transparent 60%)",
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                      Featured
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {featured.category}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-balance font-display text-3xl italic leading-[1.1] tracking-[-0.01em] text-[var(--foreground)] transition-colors group-hover:text-brand-500 sm:text-4xl md:text-[2.75rem]">
                    {featured.title}
                  </h3>
                  <p className="relative mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
                    {featured.excerpt}
                  </p>
                  <div className="relative mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-3">
                      <span>{formatDate(featured.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
                      <span>{featured.readingTime}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-brand-500">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {/* Stacked list */}
              <Reveal delay={0.1} className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {rest.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group flex flex-col gap-2 py-6 transition-colors first:pt-0 last:pb-0 hover:bg-[var(--background-subtle)]/40 sm:px-4"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      <span className="text-brand-500">{post.category}</span>
                      <span>
                        {String(i + 2).padStart(2, "0")} / {String(rest.length + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium leading-snug transition-colors group-hover:text-brand-500">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>{formatDate(post.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
                      <span>{post.readingTime}</span>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 py-6 text-sm font-medium text-brand-500 sm:px-4"
                >
                  Browse all insights
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          );
        })()}
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers for decision-makers"
          description="The questions CEOs, CTOs and operations leaders ask before they choose a technology partner."
        />
        <div className="mt-14">
          <FaqAccordion items={faqs} />
        </div>
      </Section>

      <CTASection
        title="Bring us the problem. We'll bring the system."
        description="Book a strategic consultation and get a candid, senior assessment of your technology — no pressure, no jargon."
      />
    </>
  );
}
