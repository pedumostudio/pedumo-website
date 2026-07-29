import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for balogunadeolu.com.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Last updated: July 2026</p>

      <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
        <p>
          This website is the personal website of Balogun Adeolu. This privacy policy
          explains how we handle information when you visit this site.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Information We Collect</h2>
        <p>
          We collect minimal information. When you contact us via email, we store your
          message and email address for the purpose of responding to your inquiry. We do
          not sell, share, or distribute your personal information to third parties.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Analytics</h2>
        <p>
          We may use privacy-respecting analytics tools to understand how visitors use
          this website. These tools do not collect personally identifiable information
          and respect your browser&apos;s Do Not Track settings.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Cookies</h2>
        <p>
          We use essential cookies to ensure the website functions properly. We may also
          use analytics cookies with your consent. You can manage your cookie preferences
          at any time using the cookie banner.
        </p>

        <h2 className="text-xl font-semibold text-[var(--foreground)]">Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:adeolu@balogunadeolu.com" className="text-accent-500 hover:underline">
            adeolu@balogunadeolu.com
          </a>.
        </p>
      </div>
    </div>
  );
}
