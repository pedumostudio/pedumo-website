import { Mail, Shield } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";
import { siteConfig } from "@/lib/site";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact Pedumo — start a conversation about software engineering, AI automation, cloud and security."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building"
        description="Share context on your product, systems or constraints. We respond within one business day."
      />
      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-5">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold">Email</h2>
                <address className="mt-2 space-y-1 not-italic">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block text-brand-300 hover:underline"
                    aria-label={`Email Pedumo at ${siteConfig.email}`}
                  >
                    Contact: {siteConfig.email}
                  </a>
                  <a
                    href={`mailto:${siteConfig.bookingEmail}`}
                    className="block text-sm text-[var(--muted)] hover:text-brand-300"
                    aria-label={`Email Pedumo bookings at ${siteConfig.bookingEmail}`}
                  >
                    Booking: {siteConfig.bookingEmail}
                  </a>
                </address>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <Shield className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold">Security</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Report vulnerabilities responsibly to{" "}
                  <a
                    href={`mailto:${siteConfig.securityEmail}`}
                    className="font-medium text-brand-300 hover:underline"
                  >
                    {siteConfig.securityEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm intent="contact" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
