import { Handshake, Mail, Shield } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { Seo } from "@/components/seo";
import { siteConfig } from "@/lib/site";

const contactChannels = [
  {
    label: "General enquiries",
    email: siteConfig.email,
    description: "Questions about Pedumo, engineering services, website content or general coordination.",
  },
  {
    label: "Business bookings",
    email: siteConfig.bookingEmail,
    description: "Consultation requests, scoping sessions and business conversations with Pedumo.",
  },
  {
    label: "Future partnerships",
    email: siteConfig.partnershipsEmail,
    description: "Partnership discussions, ecosystem collaboration and future strategic alliances.",
  },
];

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact Pedumo for general enquiries, business bookings and future partnerships."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building"
        description="Use the right channel for the conversation. Pedumo keeps general enquiries, bookings and partnership discussions separate so messages reach the correct workflow."
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
                <address className="mt-4 space-y-4 not-italic">
                  {contactChannels.map((channel) => (
                    <div key={channel.email} className="rounded-2xl border border-[var(--border)] bg-[var(--background-sunken)] p-4">
                      <p className="text-sm font-semibold text-[var(--foreground)]">{channel.label}</p>
                      <a
                        href={`mailto:${channel.email}`}
                        className="mt-1 block break-words text-sm font-medium text-brand-300 hover:underline"
                        aria-label={`${channel.label}: ${channel.email}`}
                      >
                        {channel.email}
                      </a>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                        {channel.description}
                      </p>
                    </div>
                  ))}
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
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <Handshake className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold">Response discipline</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Each address maps to a different workflow. Do not send sensitive credentials or production secrets by email.
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
