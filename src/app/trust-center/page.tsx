import type { Metadata } from "next";
import { ShieldCheck, FileLock2, Siren, Activity, ClipboardCheck, ServerCog, KeyRound, Map, LifeBuoy } from "lucide-react";
import { SimplePage } from "@/components/simple-page";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Pedumo's Trust Center: security commitments, compliance posture, incident response, data protection and resilience — the evidence behind our engineering.",
  alternates: { canonical: "/trust-center" },
};

const commitments = [
  {
    icon: ShieldCheck,
    title: "Security-first engineering",
    body: "OWASP ASVS Level 2 baseline, threat modeling before code, dependency and secret scanning in every pipeline.",
  },
  {
    icon: ServerCog,
    title: "Secure architecture & cloud security",
    body: "Least-privilege access, TLS 1.3 by default, encrypted storage, hardened cloud configurations reviewed as code.",
  },
  {
    icon: FileLock2,
    title: "Data protection & governance",
    body: "Data classification, retention policies, tamper-evident audit trails and encryption at rest with managed key rotation.",
  },
  {
    icon: Siren,
    title: "Incident response & continuity",
    body: "Documented runbooks, rehearsed recovery, post-incident hardening and a public Status page for transparency.",
  },
  {
    icon: Activity,
    title: "Reliability & performance",
    body: "Observability across latency, errors and saturation; load-tested releases; capacity planning tied to growth.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance posture",
    body: "Practices mapped to OWASP ASVS, CIS Controls and the NIST Cybersecurity Framework.",
  },
  {
    icon: KeyRound,
    title: "Encryption",
    body: "TLS 1.3 in transit, AES-256 at rest, managed key rotation, and per-tenant isolation where required.",
  },
  {
    icon: Map,
    title: "Compliance roadmap",
    body: "Active alignment with SOC 2 Type II and ISO 27001 control sets; evidence collected continuously.",
  },
  {
    icon: LifeBuoy,
    title: "Business continuity",
    body: "Documented BCP, rehearsed disaster recovery, multi-region failover paths and tested RPO/RTO targets.",
  },
];

export default function TrustCenterPage() {
  return (
    <SimplePage
      eyebrow="Trust Center"
      title={
        <>
          The evidence behind our{" "}
          <span className="font-display italic font-normal">engineering</span>
        </>
      }
      description="A single place for the commitments, controls and transparency signals that enterprise and government clients expect from a technology partner."
      cta={{
        title: "Need evidence for an audit or procurement process?",
        description: "Email our security team and we'll provide the relevant documentation under NDA.",
      }}
    >
      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {commitments.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] p-6">
          <h3 className="text-lg font-semibold">Related resources</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href="/security" variant="outline" size="sm">
              Security & Resilience
            </ButtonLink>
            <ButtonLink href="/status" variant="outline" size="sm">
              Status
            </ButtonLink>
            <ButtonLink href="/responsible-disclosure" variant="outline" size="sm">
              Responsible Disclosure
            </ButtonLink>
            <ButtonLink href="/privacy" variant="outline" size="sm">
              Privacy Policy
            </ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.securityEmail}`} variant="outline" size="sm">
              Contact Security
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </SimplePage>
  );
}
