import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Pedumo website and the engagement of our services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="January 2026"
      sections={[
        {
          heading: "Acceptance of terms",
          body: (
            <p>
              By accessing this website, you agree to these Terms of Service. If you do not
              agree, please do not use the site. These terms apply to the website;
              engagements for services are governed by separate written agreements.
            </p>
          ),
        },
        {
          heading: "Use of the website",
          body: (
            <p>
              You agree to use this website lawfully and not to interfere with its
              operation or security. Content on this site is provided for general
              information and does not constitute professional advice.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              All content, branding and materials on this site are the property of{" "}
              {siteConfig.legalName} unless otherwise stated, and may not be reproduced
              without permission. Open-source projects are governed by their respective
              licenses.
            </p>
          ),
        },
        {
          heading: "Service engagements",
          body: (
            <p>
              Any services we provide are defined in a separate statement of work or
              agreement that sets out scope, deliverables, fees and responsibilities.
              Nothing on this website constitutes a binding offer.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              This website is provided &ldquo;as is&rdquo; without warranties of any kind.
              To the maximum extent permitted by law, {siteConfig.legalName} is not liable
              for any damages arising from your use of the website.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to{" "}
              <a className="text-brand-500" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
