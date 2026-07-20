import type { Metadata } from "next";
import { Handshake, ShieldCheck, Globe, LineChart } from "lucide-react";
import { SimplePage } from "@/components/simple-page";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner Program",
  description:
    "Partner with Pedumo: technology, referral and delivery partnerships for agencies, consultancies and platform vendors.",
  alternates: { canonical: "/partners" },
};

const partners = [
  {
    icon: Handshake,
    title: "Technology partners",
    body: "Integrate Pedumo engineering into your platform or product for customers who need more than off-the-shelf.",
  },
  {
    icon: LineChart,
    title: "Referral partners",
    body: "Refer clients who need serious engineering and share in the success with transparent, written agreements.",
  },
  {
    icon: Globe,
    title: "Delivery partners",
    body: "Co-deliver enterprise programs with our senior engineers augmenting your team on security, AI and cloud.",
  },
  {
    icon: ShieldCheck,
    title: "Resellers & MSSPs",
    body: "Bundle Pedumo's security and resilience services into your managed offerings with white-glove support.",
  },
];

export default function PartnersPage() {
  return (
    <SimplePage
      eyebrow="Partner Program"
      title={
        <>
          Grow together,{" "}
          <span className="font-display italic font-normal">engineer together</span>
        </>
      }
      description="We work with agencies, consultancies and platform vendors who share our standards. If your clients need serious engineering, let's talk."
      cta={{
        title: "Interested in partnering?",
        description: "Tell us about your practice and the clients you serve. We'll follow up within one business day.",
      }}
    >
      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {partners.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-8">
        <ButtonLink href={`mailto:${siteConfig.partnershipsEmail}`}>
          Apply to the partner program
        </ButtonLink>
      </Reveal>
    </SimplePage>
  );
}
