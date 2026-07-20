import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, outcome-based engagement models from Pedumo: fixed-scope projects, retained partnerships and enterprise agreements. No hidden fees.",
  alternates: { canonical: "/pricing" },
};

const tiers = [
  {
    name: "Starter",
    price: "Fixed-scope",
    cadence: "per project",
    blurb: "A well-defined build, delivered by senior engineers with a clear scope.",
    features: [
      "Discovery & written scope",
      "Design + build by senior engineers",
      "Security baseline by default",
      "Documentation & handover",
      "30-day post-launch support",
    ],
    cta: "Start a project",
    href: "/book",
    featured: false,
  },
  {
    name: "Growth",
    price: "Retained",
    cadence: "monthly partnership",
    blurb: "An embedded engineering team that ships, secures and evolves your product.",
    features: [
      "Everything in Starter",
      "Dedicated engineering capacity",
      "Weekly demos & visible changelog",
      "AI automation & cloud operations",
      "Proactive security monitoring",
      "Priority response SLA",
    ],
    cta: "Talk to us",
    href: "/book",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual agreement",
    blurb: "Mission-critical platforms for organizations with compliance and scale demands.",
    features: [
      "Everything in Growth",
      "Named technical account lead",
      "Compliance & audit support",
      "Incident response & continuity",
      "Multi-region architecture",
      "Executive reporting",
    ],
    cta: "Contact enterprise sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Transparent engagements,{" "}
            <span className="font-display italic font-normal">outcome-based</span>
          </>
        }
        description="No hidden fees, no inflated scopes. Choose the model that matches how you build — or talk to us and we'll recommend one."
      >
        <ButtonLink href="/book">Book a consultation</ButtonLink>
      </PageHero>

      <Section className="!pt-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className={
                  "relative flex h-full flex-col rounded-3xl border p-7 " +
                  (t.featured
                    ? "border-brand-500/50 bg-gradient-to-b from-brand-600/10 to-transparent shadow-[0_40px_100px_-40px_rgba(48,102,255,0.45)]"
                    : "border-[var(--border)] bg-[var(--card)]")
                }
              >
                {t.featured && (
                  <div className="absolute -top-3 left-7">
                    <Badge className="border-brand-500/40 bg-brand-500/10 text-brand-500">
                      Most chosen
                    </Badge>
                  </div>
                )}
                <h2 className="text-xl font-semibold">{t.name}</h2>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight">{t.price}</span>
                  <span className="text-sm text-[var(--muted)]">{t.cadence}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{t.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={t.href}
                  variant={t.featured ? "primary" : "outline"}
                  className="mt-6 w-full"
                >
                  {t.cta}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="text-center text-sm text-[var(--muted)]">
            Not sure which fits?{" "}
            <a href="/book" className="text-brand-500 underline-grow">
              Book a 30-minute consultation
            </a>{" "}
            and we&apos;ll recommend the right model — no obligation.
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
