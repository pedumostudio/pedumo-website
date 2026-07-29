import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Balogun Adeolu — for speaking engagements, strategic advisory, technology partnerships, or general inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Balogun Adeolu",
    description: "Get in touch with Balogun Adeolu.",
    url: "/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Balogun Adeolu",
  description: "Get in touch with Balogun Adeolu.",
  url: `${siteConfig.url}/contact`,
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      </div>

      {/* ── Hero ── */}
      <section className="pb-12 pt-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s build something that matters.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-lg leading-relaxed text-[var(--muted)]">
              Whether you need a technology partner, a strategic advisor, a speaker for your
              next event, or simply want to connect — I would like to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Options ── */}
      <Section className="section-divider !py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Speaking & Events",
                description: "Keynotes, panels, workshops, and interviews on technology leadership, cybersecurity, and the discipline of building companies that last.",
                email: siteConfig.personalLinks.email,
                label: "Speaking inquiry",
              },
              {
                title: "Strategic Advisory",
                description: "Technology strategy, architecture reviews, security assessments, and guidance for organizations making critical technology decisions.",
                email: siteConfig.personalLinks.email,
                label: "Advisory inquiry",
              },
              {
                title: "Technology Partnership",
                description: "For organizations looking to work with Pedumo on software engineering, AI automation, cybersecurity, or cloud infrastructure.",
                email: siteConfig.personalLinks.email,
                label: "Partnership inquiry",
                external: "https://pedumo.com/contact",
              },
              {
                title: "General Inquiry",
                description: "For anything else — a conversation, a question, or just to say hello.",
                email: siteConfig.personalLinks.email,
                label: "Send a message",
              },
            ].map((option, i) => (
              <Reveal key={option.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {option.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {option.description}
                  </p>
                  <div className="mt-6">
                    {option.external ? (
                      <a
                        href={option.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90"
                      >
                        {option.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <a
                        href={`mailto:${option.email}?subject=${encodeURIComponent(option.label)}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90"
                      >
                        {option.label}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Connect ── */}
      <Section className="!py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Connect
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "LinkedIn", href: siteConfig.personalLinks.linkedin },
              { label: "GitHub", href: siteConfig.personalLinks.github },
              { label: "X", href: siteConfig.personalLinks.x },
              { label: "Email", href: `mailto:${siteConfig.personalLinks.email}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-accent-500/40 hover:text-accent-500"
              >
                {link.label}
                {!link.href.startsWith("mailto") && <ArrowUpRight className="h-3.5 w-3.5" />}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
