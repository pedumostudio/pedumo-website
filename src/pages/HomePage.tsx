import type { ComponentType, SVGProps } from "react";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading } from "@/components/section";
import { TechMarquee } from "@/components/marquee";
import { ProcessTimeline } from "@/components/process-timeline";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FounderPortrait } from "@/components/founder-portrait";
import { DevToIcon, GitHubIcon, LinkedInIcon, MediumIcon, XIcon } from "@/components/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { RepositoryGrid } from "@/components/open-source-repositories";
import { EngineeringActivityFeed } from "@/components/engineering-activity-feed";
import { Seo } from "@/components/seo";
import {
  businessOutcomes,
  capabilities,
  caseStudies,
  engineeringPrinciples,
  faqs,
  industries,
  insights,
  trustPillars,
} from "@/lib/content";
import { FOUNDER_IMAGE, siteConfig, trustIndicatorLinks, type OfficialLink } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const socialIconByLabel: Record<OfficialLink["label"], SocialIcon> = {
  Website: Globe,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Medium: MediumIcon,
  "DEV.to": DevToIcon,
  X: XIcon,
};

const trustIndicators = trustIndicatorLinks.map((link) => ({
  ...link,
  icon: socialIconByLabel[link.label],
}));

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
  founder: {
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: siteConfig.founderTitle,
    email: siteConfig.email,
    image: `${siteConfig.url}${FOUNDER_IMAGE}`,
    sameAs: [siteConfig.founderLinks.website, siteConfig.founderLinks.medium],
  },
  sameAs: [
    siteConfig.socials.website,
    siteConfig.socials.linkedin,
    siteConfig.socials.github,
    siteConfig.socials.x,
    siteConfig.socials.dev,
    siteConfig.socials.medium,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.bookingEmail,
    contactType: "consultation",
  },
};

export function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={[orgSchema, faqSchema]} />
      <Hero />

      <Section className="!py-10">
        <Reveal className="mb-8 text-center">
          <p className="text-sm font-medium text-[var(--muted)]">
            Built on the technologies trusted by the world&apos;s best engineering teams
          </p>
        </Reveal>
        <TechMarquee />
      </Section>

      <Section id="insights" className="border-t border-[var(--border)] bg-[var(--background-subtle)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Knowledge Hub"
            title="Engineering Insights"
            description="New engineering articles and practical architecture notes from Pedumo. The content is data-driven so future publishing and feed integrations can update this section automatically."
            className="!mx-0"
          />
          <Reveal>
            <ButtonLink href="/insights" variant="outline">
              Visit Knowledge Hub
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 4) * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:shadow-md edge-highlight">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                  <span className="font-medium text-brand-300">{post.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <a
                  href={hrefOf("/insights", post.slug)}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="open-source">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Open Source"
            title="Featured PEDUMO repositories"
            description="A public engineering surface prepared for automatic GitHub repository updates without inventing stars, forks or commit metrics."
            className="!mx-0"
          />
          <Reveal>
            <ButtonLink href="/open-source" variant="outline">
              Open Source Page
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12">
          <RepositoryGrid variant="compact" />
        </div>
      </Section>

      <Section id="activity" className="bg-[var(--background-subtle)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            align="left"
            eyebrow="Latest Engineering Activity"
            title="Signals that the platform is alive"
            description="A data-driven activity surface prepared for GitHub events, documentation releases and research updates. Current entries are manually curated until integration is configured."
            className="!mx-0"
          />
          <EngineeringActivityFeed />
        </div>
      </Section>

      <Section id="newsletter">
        <div className="grid gap-8 rounded-4xl border border-[var(--border-strong)] bg-[var(--background-sunken)] p-6 edge-highlight sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-10">
          <div>
            <Badge dot>Newsletter</Badge>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Engineering briefings without pretending a backend exists
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
              The newsletter section is intentionally visible because repeat visitors should know a
              Pedumo briefing channel is planned. It does not collect emails until the backend,
              consent workflow and email provider are configured.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Section>

      <Section id="trust-indicators" className="!pt-8">
        <SectionHeading
          eyebrow="Trust Indicators"
          title="Verify Pedumo across engineering channels"
          description="Official public destinations for Pedumo and the founder's technical writing. No unsupported social networks are displayed."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustIndicators.map((item, i) => (
            <Reveal key={item.label} delay={(i % 5) * 0.04}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[72px] items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/35 hover:bg-white/[0.04] edge-highlight"
                aria-label={`Open Pedumo ${item.label}`}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" aria-hidden />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="principles" className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="How PEDUMO Builds Software"
          title="Engineering principles that make systems trustworthy"
          description="Pedumo is not positioned as another agency or web design shop. The company is built around repeatable engineering practices that make software safer to ship and easier to operate."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engineeringPrinciples.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 3) * 0.05}>
              <article className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <principle.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {principle.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">Who we are</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.75rem] md:leading-[1.22]">
              Pedumo is a technology engineering and AI automation partner. We design the
              architecture, write the code, secure the infrastructure and stay to operate it —{" "}
              <span className="font-normal text-[var(--muted)]">
                so the systems your organization depends on are never a gamble.
              </span>
            </p>
          </Reveal>
          <Reveal
            delay={0.16}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--muted)]"
          >
            {industries.map((ind) => (
              <span key={ind.slug} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                {ind.title}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

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
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.slug} delay={Math.min(i * 0.03, 0.15)}>
                <a
                  href={hrefOf("/services", cap.slug)}
                  className="group flex items-baseline gap-5 py-6 transition-colors hover:bg-white/[0.03] sm:gap-8 sm:px-4"
                >
                  <span className="font-mono text-sm text-brand-300">{cap.index}</span>
                  <span className="flex-1">
                    <span className="underline-grow inline-block text-2xl font-medium tracking-tight transition-colors group-hover:text-brand-300 sm:text-3xl">
                      {cap.title}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                      {cap.outcomes[0]}. {cap.outcomes[1]}.
                    </span>
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300 sm:block" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          eyebrow="Business Outcomes"
          title="What partnership with Pedumo changes"
          description="We measure ourselves against the outcomes leadership is accountable for — not activity, deliverables or hours."
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-x-16 gap-y-12 sm:grid-cols-2">
          {businessOutcomes.map((o, i) => (
            <Reveal key={o.metric} delay={(i % 2) * 0.08}>
              <div className="border-l-2 border-brand-400 pl-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-300">
                  {o.metric}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{o.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="trust">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-6 py-14 sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage:
                  "radial-gradient(ellipse 70% 80% at 20% 0%, #000 20%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 80% at 20% 0%, #000 20%, transparent 80%)",
              }}
            />
            <div className="relative">
              <div className="max-w-2xl">
                <Badge className="border-white/15 bg-white/10 text-white/80" dot>
                  Enterprise-grade by default
                </Badge>
                <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
                  Built to the standard enterprise and government demand
                </h2>
                <p className="mt-4 text-balance leading-relaxed text-white/70">
                  Security, governance and resilience are not premium add-ons at Pedumo. They are
                  the default posture of every system we ship.
                </p>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trustPillars.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 edge-highlight"
                  >
                    <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-accent-400">
                      <p.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="process">
        <SectionHeading
          eyebrow="Methodology"
          title="A disciplined path from idea to impact"
          description="The same rigorous eight-step process on every engagement — so quality is a system, not a coincidence."
        />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </Section>

      <Section id="case-studies" className="bg-[var(--background-subtle)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Case Studies"
            title="How we think, demonstrated"
            description="Concept projects and internal products from our innovation lab — honestly labeled, fully explained."
            className="!mx-0"
          />
          <Reveal>
            <ButtonLink href="/case-studies" variant="outline">
              View all
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:shadow-md edge-highlight">
                <div className="flex items-center justify-between gap-3">
                  <Badge>{cs.category}</Badge>
                  <span className="text-xs text-[var(--muted)]">{cs.status}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight transition-colors group-hover:text-brand-300">
                  {cs.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {cs.summary}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {cs.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm">
                      <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                      {o}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="founder">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            {/* Portrait fully visible — no overlay cards or floating labels */}
            <FounderPortrait priority />
          </Reveal>
          <div>
            <Reveal>
              <Badge dot>Executive Leadership</Badge>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.12]">
                Engineering leadership you can put in the room.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-6 border-l-2 border-brand-400 pl-5 text-lg font-medium leading-relaxed sm:text-xl">
                “Technology should make a business stronger, not more fragile. We build systems we
                would trust with our own company — and we stand behind them.”
              </blockquote>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 leading-relaxed text-[var(--muted)]">
                Balogun founded Pedumo on the conviction that organizations deserve a technology
                partner as accountable for outcomes as for code. He sets the engineering bar across
                every engagement — security-first architecture, disciplined delivery and the
                long-term thinking that turns projects into partnerships.
              </p>
            </Reveal>
            {/* Name/title outside the image — never overlaid on the portrait */}
            <Reveal delay={0.18} className="mt-6">
              <p className="text-lg font-semibold">{siteConfig.founder}</p>
              <p className="text-sm text-brand-300">{siteConfig.founderTitle}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Focus</dt>
                  <dd className="mt-1 text-sm font-medium">Full-stack &amp; AI</dd>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Standard</dt>
                  <dd className="mt-1 text-sm font-medium">OWASP ASVS L2</dd>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Approach</dt>
                  <dd className="mt-1 text-sm font-medium">Outcomes-first</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href="/founder" variant="outline">
                Meet the founder
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.website}
                variant="ghost"
                external
                aria-label="Founder website"
              >
                <Globe className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.founderLinks.medium}
                variant="ghost"
                external
                aria-label="Founder on Medium"
              >
                <MediumIcon className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers for decision-makers"
          description="The questions CEOs, CTOs and operations leaders ask before they choose a technology partner."
        />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </Section>

      <CTASection />
    </>
  );
}
