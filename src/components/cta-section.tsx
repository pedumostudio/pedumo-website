import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { GridBackdrop } from "@/components/backgrounds";

export function CTASection({
  title = "Ready to build systems you can trust?",
  description = "Book a strategic consultation. We will clarify scope, constraints and the fastest responsible path to production.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section className="!pt-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-6 py-14 text-center sm:px-12 sm:py-16">
          <GridBackdrop className="opacity-40" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-white/70">{description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/book" variant="dark" size="lg">
                Book Strategic Consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
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
