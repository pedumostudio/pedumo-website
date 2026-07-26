import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pedumo collects, uses and protects the personal information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="January 2026"
      sections={[
        {
          heading: "Overview",
          body: (
            <p>
              This Privacy Policy explains how {siteConfig.legalName} (&ldquo;Pedumo&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and safeguards
              information when you visit our website or contact us. We are committed to
              handling your data responsibly and transparently.
            </p>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <p>
              We collect information you provide directly — such as your name, email,
              company and message — when you use our contact or consultation forms or
              subscribe to updates. We may also collect limited, privacy-respecting
              analytics about how the site is used.
            </p>
          ),
        },
        {
          heading: "How we use information",
          body: (
            <p>
              We use your information to respond to inquiries, provide requested services,
              improve our website and, where you have opted in, send you occasional
              updates. We do not sell your personal information.
            </p>
          ),
        },
        {
          heading: "Data retention & security",
          body: (
            <p>
              We retain personal information only as long as necessary for the purposes
              described here. We apply appropriate technical and organizational measures —
              including encryption and access controls — to protect it.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You may request access to, correction of, or deletion of your personal
              information, and you may unsubscribe from communications at any time. To
              exercise these rights, contact us at {siteConfig.email}.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For any questions about this policy, email us at{" "}
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
