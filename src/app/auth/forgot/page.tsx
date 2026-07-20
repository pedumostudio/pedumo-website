import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Request a password reset link for your Pedumo account.",
  alternates: { canonical: "/auth/forgot" },
  robots: { index: false, follow: true },
};

export default function ForgotPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Reset your password"
        description="Enter your email and we'll send a secure link to choose a new password."
      />
      <Section className="!pt-4 !pb-20">
        <div className="mx-auto max-w-md">
          <Reveal>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7">
              <div className="mb-5 flex items-center gap-2">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                  <Mail className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold">Password reset</p>
              </div>
              <label htmlFor="forgot-email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                required
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm outline-none focus:border-brand-500"
                placeholder="you@company.com"
              />
              <button
                type="button"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-brand-600 text-sm font-medium text-white transition-colors hover:bg-brand-500"
              >
                Send reset link
              </button>
              <p className="mt-4 text-center text-xs text-[var(--muted)]">
                Need help? Email{" "}
                <a className="text-brand-500" href={`mailto:${siteConfig.supportEmail}`}>
                  {siteConfig.supportEmail}
                </a>
              </p>
              <Link
                href="/auth/login"
                className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
