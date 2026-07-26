import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Pedumo account to access the partner portal and resource library.",
  alternates: { canonical: "/auth/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Sign in"
        description="Access your saved resources, partner portal and account settings."
      />
      <Section className="!pt-4 !pb-20">
        <div className="mx-auto max-w-md">
          <AuthForm mode="login" />
        </div>
      </Section>
    </>
  );
}
