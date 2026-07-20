import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";
import { resources } from "@/lib/resources-expanded";

export const metadata: Metadata = {
  title: "Resource Center",
  description:
    "Pedumo resource centre: whitepapers, guides, eBooks, templates and developer resources on AI, cloud, security and software engineering.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Center"
        title={
          <>
            Field-tested playbooks,{" "}
            <span className="font-display italic font-normal">ready when you are</span>
          </>
        }
        description="Practical tools from our practice — whitepapers, guides, templates and developer resources. Register interest and we'll send them the day they ship."
      />

      <Section className="!pt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <Badge>{r.type}</Badge>
                </div>
                <h3 className="mt-4 flex-1 text-base font-semibold leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {r.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>{r.format}</span>
                  {r.pages && <span>{r.pages} pages</span>}
                </div>
                <a
                  href="#register"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-400"
                >
                  <Download className="h-4 w-4" />
                  Get notified
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div
            id="register"
            className="scroll-mt-28 rounded-3xl border border-[var(--border)] bg-[var(--background-subtle)] p-8"
          >
            <h2 className="text-xl font-semibold">Be first to get them</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Join the engineering notes list and we'll send the resources the day they publish.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
