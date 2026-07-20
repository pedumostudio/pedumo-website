import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Pedumo account to access the partner portal, resource library and saved dashboards.",
  alternates: { canonical: "/auth/register" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Create your account"
        description="Join the Pedumo partner portal. No credit card required."
      />
      <Section className="!pt-4 !pb-20">
        <div className="mx-auto max-w-md">
          <AuthForm mode="register" />
        </div>
      </Section>
    </>
  );
}
