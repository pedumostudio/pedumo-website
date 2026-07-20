import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { DemoSection } from "@/components/demo-dashboard";

export const metadata: Metadata = {
  title: "Product Demos",
  description:
    "Interactive demonstrations of Pedumo-built platforms: analytics, CRM, security operations and AI assistant consoles with realistic mock data.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Demos"
        title={
          <>
            See it running,{" "}
            <span className="font-display italic font-normal">not just described</span>
          </>
        }
        description="Interactive demonstrations of Pedumo-built platforms — analytics, CRM, security operations and AI assistant consoles. Realistic mock data, real product feel."
      />

      <Section className="!pt-6">
        <DemoSection />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[var(--muted)]">
          Demonstrations use synthetic data for illustration. Real deployments surface
          live telemetry from your own systems.
        </p>
      </Section>

      <CTASection
        title="Want a tailored demo on your data?"
        description="Book a strategic consultation and we'll show you exactly how this would look with your systems wired in."
      />
    </>
  );
}
