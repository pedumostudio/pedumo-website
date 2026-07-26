import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export function CTASection({
  title = "Let's build something your business can rely on.",
  description = "Book a consultation and get a candid, senior assessment of your project — no pressure, no jargon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section>
      <Reveal>
        <div role="complementary" aria-label="Call to action" className="relative overflow-hidden rounded-4xl border border-[var(--border-strong)] bg-[#05070f] px-6 py-16 text-center sm:px-16 sm:py-20">
          {/* Restrained technical grid — structure over decoration */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
          {/* Single, subtle brand wash — no competing glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(33,64,232,0.35), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/book" size="lg">
                Book Strategic Consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                size="lg"
                className="border border-white/20 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.12]"
              >
                Contact the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
