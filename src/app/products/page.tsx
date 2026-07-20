import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { LinkCard } from "@/components/cards";
import { CTASection } from "@/components/cta-section";
import { Stagger, StaggerItem } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Pedumo products: AI Automation, AI Assistants, Workflow Automation, Business Software, Custom SaaS, Cloud Infrastructure, Cybersecurity, Data Analytics, API Integration, AI Video Automation and Digital Transformation.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Engineered products for{" "}
            <span className="font-display italic font-normal">intelligent operations</span>
          </>
        }
        description="Every product is built on the same foundation: secure architecture, disciplined delivery and a long-term partnership mindset."
      >
        <ButtonLink href="/book">Talk to product engineering</ButtonLink>
        <ButtonLink href="/services" variant="outline">
          See our services
        </ButtonLink>
      </PageHero>

      <Section className="!pt-8">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <StaggerItem key={p.slug}>
              <LinkCard
                href={`/products/${p.slug}`}
                icon={p.icon}
                title={p.name}
                description={p.summary}
                meta={[p.tagline.split(" ").slice(0, 3).join(" ")]}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTASection />
    </>
  );
}
