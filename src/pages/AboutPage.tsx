import { Target, Eye } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";
import { coreValues, stats } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Pedumo",
  description:
    "Pedumo is a software engineering and AI automation company built to be a trustworthy long-term technology partner for organizations worldwide.",
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
  },
};

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Pedumo is a software engineering and AI automation company built to be a trustworthy long-term technology partner for organizations worldwide."
        path="/about"
        jsonLd={aboutSchema}
      />
      <PageHero
        eyebrow="About Pedumo"
        title={
          <>
            A technology partner built to <span className="gradient-text">last</span>
          </>
        }
        description="Pedumo exists because too many organizations have been burned by software that was rushed, abandoned or never truly understood their business. We built the partner we wished existed."
      >
        <ButtonLink href="/founder" variant="outline">
          Meet the founder
        </ButtonLink>
      </PageHero>

      <Section className="!pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center edge-highlight">
                <p className="gradient-text text-3xl font-semibold tabular-nums">
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 edge-highlight">
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                <Target className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">Our mission</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Pedumo helps startups, SMEs, enterprises, NGOs and government organizations
                engineer modern software, automate business operations, strengthen cybersecurity
                and accelerate growth through intelligent technology.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 edge-highlight">
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                <Eye className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">Our vision</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                To become one of the world&apos;s most trusted software engineering and AI
                automation companies — known not for the loudest promises, but for the systems that
                quietly power our partners&apos; success for years.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          align="left"
          eyebrow="Why we exist"
          title="Software should make a business stronger"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Every organization now runs on software — but most were never given a partner who
              treats that software like it matters. Systems get built to a deadline, handed over,
              and left to rot. Security is an afterthought. Documentation is a myth. When something
              breaks, no one who understands it is still around.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Pedumo is our answer. We engineer software the way it should be built: tested,
              secure, documented and owned. We stay long after launch. And we hold ourselves to the
              standard of a partner you can trust with the systems your business depends on —
              because that is exactly what we intend to be.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Core Values"
          title="The principles behind every decision"
          description="These are not posters on a wall. They are the criteria we use to decide what to build, how to build it, and what to say no to."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md edge-highlight">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <v.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
