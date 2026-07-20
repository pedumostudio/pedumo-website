import type { Metadata } from "next";
import { ShieldCheck, ServerCog, FileLock2, Siren, Gauge, ClipboardCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & Resilience",
  description:
    "Pedumo engineers security, secure architecture, cloud security, data protection, incident response and business continuity into every system we deliver.",
  alternates: { canonical: "/security" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Security & Resilience",
  description: metadata.description,
  url: `${siteConfig.url}/security`,
  about: { "@type": "Thing", name: "Cybersecurity and digital resilience" },
  provider: { "@type": "Organization", name: siteConfig.legalName },
};

const sections = [
  {
    icon: ShieldCheck,
    index: "01",
    title: "Security-first engineering",
    intro:
      "Security is designed in from the first commit — not bolted on before launch. We model threats, apply hardened defaults and verify continuously.",
    points: [
      "Threat modeling before code is written",
      "OWASP ASVS Level 2 as the default baseline",
      "Dependency and secret scanning in every pipeline",
      "Code review with security as a first-class criterion",
    ],
    metric: { k: "Baseline", v: "OWASP ASVS L2" },
  },
  {
    icon: ServerCog,
    index: "02",
    title: "Secure architecture & cloud security",
    intro:
      "Least-privilege access, encrypted transport, network segmentation and hardened cloud configurations — verified by infrastructure-as-code, not manual checklists.",
    points: [
      "Zero-trust access and identity management",
      "Encryption in transit (TLS 1.3) and at rest",
      "Immutable, reviewed infrastructure changes",
      "Hardened configurations for Cloudflare, Vercel, DigitalOcean",
    ],
    metric: { k: "Transport", v: "TLS 1.3 default" },
  },
  {
    icon: FileLock2,
    index: "03",
    title: "Data protection & governance",
    intro:
      "Data is modeled, classified and governed so you know where it lives, who can touch it, and how long it persists — with audit trails for everything that matters.",
    points: [
      "Data classification and retention policies",
      "Access logging and tamper-evident audit trails",
      "Encryption at rest with managed key rotation",
      "Lineage and quality controls for analytics and AI",
    ],
    metric: { k: "Audit", v: "Tamper-evident" },
  },
  {
    icon: Siren,
    index: "04",
    title: "Incident response & digital resilience",
    intro:
      "When something breaks, the difference between an incident and a catastrophe is rehearsal. We design, document and test the worst day before it happens.",
    points: [
      "Runbooks and escalation paths, rehearsed",
      "Backup verification and recovery-time testing",
      "Post-incident reviews with tracked hardening actions",
      "Compromised-infrastructure containment and rebuild playbooks",
    ],
    metric: { k: "RTO target", v: "< 15 minutes" },
  },
  {
    icon: Gauge,
    index: "05",
    title: "Scalable infrastructure & performance",
    intro:
      "Platforms that stay fast and available as demand multiplies — observed, load-tested and capacity-planned, not guessed.",
    points: [
      "Observability across latency, errors and saturation",
      "Load and chaos testing before major releases",
      "Edge caching and CDN for global latency",
      "Capacity planning tied to business growth",
    ],
    metric: { k: "Uptime target", v: "99.9%" },
  },
  {
    icon: ClipboardCheck,
    index: "06",
    title: "Methodology & delivery assurance",
    intro:
      "Quality is a system. Our eight-step methodology enforces review, demonstration and documentation at every phase — so security and resilience are not negotiable.",
    points: [
      "Written scope with measurable acceptance criteria",
      "Weekly demos and visible changelogs",
      "Test automation across unit, integration and security",
      "Handover documentation and knowledge transfer",
    ],
    metric: { k: "Delivery", v: "8-step method" },
  },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        eyebrow="Security & Resilience"
        title={
          <>
            Security is not a feature.{" "}
            <span className="font-display italic font-normal">It&apos;s the posture.</span>
          </>
        }
        description="Every system we build ships with security-first engineering, hardened cloud architecture, governed data, and rehearsed resilience. Here is exactly what that means in practice."
      >
        <ButtonLink href="/book">Request a security review</ButtonLink>
        <ButtonLink href="/case-studies" variant="outline">
          See it in case studies
        </ButtonLink>
      </PageHero>

      <Section className="!pt-6">
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {sections.map((s, i) => (
            <div key={s.title} className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-brand-500">{s.index}</span>
                    <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                      <s.icon className="h-6 w-6" />
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl italic leading-tight tracking-[-0.01em] sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-[var(--muted)]">{s.intro}</p>
                  <div className="mt-6 inline-flex items-baseline gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {s.metric.k}
                    </span>
                    <span className="text-lg font-semibold text-accent-500">
                      {s.metric.v}
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06 + (i % 2) * 0.04}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[var(--background-subtle)]">
        <SectionHeading
          align="left"
          eyebrow="Compliance posture"
          title="Aligned to recognized frameworks, by default"
          description="We map our engineering practices to OWASP ASVS, the CIS Controls and the NIST Cybersecurity Framework so your audit conversations start from evidence, not promises."
        />
      </Section>

      <CTASection
        title="Need a security-first build or a resilience audit?"
        description="Bring us the system. We'll return a prioritized, actionable assessment within one business day."
      />
    </>
  );
}
