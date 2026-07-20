import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

/**
 * Stripe-level, high-precision CTA Section.
 * Replaced cheap gradient-blobs and colorful radial glows with a highly
 * disciplined, deep black-charcoal panel with a sharp technical grid.
 * Communicates serious enterprise engineering and trust.
 */
export function CTASection({
  title = "Let's build something your business can rely on.",
  description = "Book a consultation and get a candid, senior assessment of your project — no pressure, no jargon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section className="!py-16 sm:!py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-neutral-950 px-6 py-16 text-center sm:px-16 sm:py-20 shadow-elev-3">
          {/* Subtle micro-grid pattern for technical precision */}
          <div
            aria-hidden
            className="bg-grid-fine pointer-events-none absolute inset-0 opacity-20"
          />
          {/* Executive subtle central lighting, dark and restrained */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(48, 102, 255, 0.12), transparent 75%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-[1.12] text-white tracking-[-0.022em] sm:text-4xl md:text-[2.5rem]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-neutral-400 sm:text-base sm:leading-relaxed">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/book" variant="primary" size="lg" className="bg-white text-black hover:bg-neutral-100 shadow-none">
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="lg"
                className="border-neutral-800 bg-neutral-900/50 text-white hover:bg-neutral-900 hover:border-neutral-700"
              >
                Contact engineering
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
