import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { EngineeringCanvas } from "@/components/home/engineering-canvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <GridBackdrop />
      <GlowOrbs />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border-brand-400/25 bg-brand-500/10 text-brand-300" dot>
                Pedumo / Technology Engineering
              </Badge>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Est. for the AI era
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance text-[2.35rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              Engineering{" "}
              <span className="gradient-text">intelligent systems</span> for the{" "}
              <span className="relative inline-block">
                <span className="animated-gradient-text">AI era</span>
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Pedumo is a technology engineering and AI automation partner. We build secure
              software, cloud infrastructure, data intelligence and cyber resilience for
              startups, enterprises and governments that cannot afford to gamble on
              technology.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book" size="lg">
              Book Strategic Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore Capabilities
            </ButtonLink>
          </Reveal>

          <Reveal
            delay={0.26}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]"
          >
            <span className="inline-flex items-center gap-2">
              <span className="font-mono text-xs text-brand-300">how we build</span>
              <span aria-hidden className="text-white/25">
                ·
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden />
              9 disciplines
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
              secure by default
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <EngineeringCanvas />
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] lg:text-left">
            observability · policy · continuous delivery
          </p>
        </Reveal>
      </div>
    </section>
  );
}
