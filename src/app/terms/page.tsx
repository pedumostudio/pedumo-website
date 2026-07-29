import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for balogunadeolu.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: July 2026</p>

      <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
        <p>
          This website is the personal website of Balogun Adeolu. By accessing this
          website, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Content</h2>
        <p>
          All content on this website is owned by Balogun Adeolu unless otherwise noted.
          You may not reproduce, distribute, or create derivative works from this content
          without written permission.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Links</h2>
        <p>
          This website may contain links to external websites. We are not responsible for
          the content or privacy practices of those websites.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Contact</h2>
        <p>
          If you have questions about these terms, please contact us at{" "}
          <a href="mailto:adeolu@balogunadeolu.com" className="text-accent-500 hover:underline">
            adeolu@balogunadeolu.com
          </a>.
        </p>
      </div>
    </div>
  );
}
