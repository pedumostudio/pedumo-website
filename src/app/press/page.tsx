import type { Metadata } from "next";
import { Download, Mail, FileText } from "lucide-react";
import { SimplePage } from "@/components/simple-page";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description:
    "Press inquiries, brand assets and media resources for Pedumo. Journalists and analysts welcome.",
  alternates: { canonical: "/press" },
};

const assets = [
  { title: "Brand guidelines", description: "Logo usage, color and typography standards.", icon: FileText },
  { title: "Logo pack (SVG + PNG)", description: "Primary, mono and reversed marks on transparent backgrounds.", icon: Download },
  { title: "Founder photos", description: "High-resolution executive portraits for press use.", icon: Download },
  { title: "Product screenshots", description: "Current product and dashboard imagery for reviews.", icon: Download },
];

export default function PressPage() {
  return (
    <SimplePage
      eyebrow="Press"
      title="Press & Media Kit"
      description="Resources for journalists, analysts and content partners. For interviews, commentary and embargoed briefings, reach our press contact."
      cta={{
        title: "Working on a story?",
        description: "Email our press contact and we'll respond within one business day with assets and commentary.",
      }}
    >
      <Reveal>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-lg font-semibold">Press contact</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            For all media enquiries:{" "}
            <a className="text-brand-500" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href={`mailto:${siteConfig.email}?subject=Press enquiry`} size="sm">
              <Mail className="h-4 w-4" /> Email press
            </ButtonLink>
            <ButtonLink href="/changelog" variant="outline" size="sm">
              Read the changelog
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <h3 className="text-lg font-semibold">Media assets</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {assets.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                <a.icon className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-semibold">{a.title}</h4>
                <p className="mt-1 text-sm text-[var(--muted)]">{a.description}</p>
                <span className="mt-2 inline-block text-xs text-[var(--muted)]">
                  Available on request
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </SimplePage>
  );
}
