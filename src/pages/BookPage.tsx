import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";

const points = [
  "Clarify goals, constraints and success metrics",
  "Identify the fastest responsible path to production",
  "Leave with a written next-step recommendation",
];

export function BookPage() {
  return (
    <>
      <Seo
        title="Book Consultation"
        description="Book a strategic consultation with Pedumo — clarify scope, constraints and the path to production."
        path="/book"
      />
      <PageHero
        eyebrow="Strategic Consultation"
        title="Bring the hard problems"
        description="A focused working session with Pedumo engineering leadership. No slide theater — practical guidance on architecture, security, delivery and scale."
      />
      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">What you can expect</h2>
              <ul className="mt-6 space-y-4">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-[var(--muted)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-[var(--muted)]">
                Ideal for founders, CTOs and operations leaders evaluating a build, modernization,
                automation or security engagement.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm intent="book" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
