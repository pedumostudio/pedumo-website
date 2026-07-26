import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ConsultationForm } from "@/components/consultation-form";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation with Pedumo. Get a candid, senior assessment of your project, architecture and options — no obligation.",
  alternates: { canonical: "/book" },
};

const expect = [
  "A candid assessment from a senior engineer",
  "Clear thinking on architecture and approach",
  "Honest guidance on scope, cost and risk",
  "No pressure and no obligation to proceed",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title={
          <>
            A conversation worth <span className="gradient-text">your time</span>
          </>
        }
        description="Thirty focused minutes with someone who can actually assess your project. Come with a problem; leave with a clearer path forward."
      />

      <Section className="!pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold">What to expect</h2>
              <ul className="mt-6 space-y-4">
                {expect.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-500">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--muted)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm leading-relaxed text-[var(--muted)]">
                Prefer email first? Reach us any time and we&apos;ll route your request to
                the right person.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ConsultationForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
