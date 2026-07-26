import type { Metadata } from "next";
import { Mail, MapPin, Clock, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pedumo. Share your project, ask a question, or book a consultation with a senior engineer.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, title: "General", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: CalendarCheck,
    title: "Bookings",
    value: siteConfig.bookingEmail,
    href: `mailto:${siteConfig.bookingEmail}`,
  },
  { icon: MapPin, title: "Location", value: "Remote-first · Serving clients worldwide" },
  { icon: Clock, title: "Business hours", value: "Mon–Fri · 9:00–18:00 (GMT)" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="gradient-text">your project</span>
          </>
        }
        description="Tell us what you're building or the problem you need solved. You'll hear back from a real engineer, not a sales script."
      />

      <Section className="!pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              {details.map((d) => (
                <div
                  key={d.title}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
                >
                  <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{d.title}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-sm text-[var(--muted)] transition-colors hover:text-brand-500"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--muted)]">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
                <CalendarCheck className="h-6 w-6" />
                <h3 className="mt-3 text-lg font-semibold">Prefer to book directly?</h3>
                <p className="mt-1 text-sm text-white/80">
                  Reserve a consultation slot and come prepared with your questions.
                </p>
                <ButtonLink
                  href="/book"
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                >
                  Book a consultation
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
