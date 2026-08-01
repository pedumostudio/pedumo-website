import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Seo } from "@/components/seo";
import { siteConfig } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";

export function StatusPage() {
  return (
    <>
      <Seo title="Status" description="Pedumo service status." path="/status" />
      <PageHero
        eyebrow="Status"
        title="All systems operational"
        description="This static marketing build reports nominal status. Production operational telemetry lives on the Pedumo platform status surface."
      />
      <Section className="!pt-4">
        <div className="rounded-3xl border border-accent-500/25 bg-accent-500/10 p-6 sm:p-8">
          <p className="text-sm font-medium text-accent-300">Website · Operational</p>
          <p className="mt-2 text-[var(--muted)]">
            Last checked:{" "}
            {new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </Section>
    </>
  );
}

export function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Policy" description="Pedumo privacy policy." path="/privacy" />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Pedumo handles information you share with us."
      />
      <Section narrow className="!pt-4">
        <div className="space-y-5 leading-relaxed text-[var(--muted)]">
          <p>
            Pedumo Technologies (“Pedumo”) respects your privacy. This policy describes the limited
            information we collect when you use {siteConfig.url} or contact us.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Information we collect</h2>
          <p>
            When you contact us or request a consultation, we collect the details you provide —
            typically name, email, company and message content — solely to respond and operate the
            engagement.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How we use information</h2>
          <p>
            We use contact details to reply to inquiries, schedule consultations and, where relevant,
            deliver contracted services. We do not sell personal information.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Contact</h2>
          <p>
            Privacy questions:{" "}
            <a className="text-brand-300 hover:underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <Seo title="Terms of Service" description="Pedumo terms of service." path="/terms" />
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Terms governing use of the Pedumo website."
      />
      <Section narrow className="!pt-4">
        <div className="space-y-5 leading-relaxed text-[var(--muted)]">
          <p>
            By using {siteConfig.url}, you agree to these terms. The website provides general
            information about Pedumo Technologies and its services.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">No professional advice</h2>
          <p>
            Content on this site is informational and does not constitute legal, security or
            engineering advice for your specific situation. Engagements are governed by separate
            written agreements.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Acceptable use</h2>
          <p>
            You may not misuse the site, attempt unauthorized access, or use automated means to
            scrape or disrupt services.
          </p>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Contact</h2>
          <p>
            Questions:{" "}
            <a className="text-brand-300 hover:underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you requested does not exist." path="/404" />
      <PageHero
        eyebrow="404"
        title="This page does not exist"
        description="The link may be outdated, or the page may have moved."
      >
        <a
          href={hrefOf("/")}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-600 px-5 text-sm font-medium text-white shadow-glow"
        >
          Back to home
        </a>
      </PageHero>
      <CTASection />
    </>
  );
}
