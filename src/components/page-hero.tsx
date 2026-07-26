import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";
import { FadeIn } from "@/components/motion";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20" aria-labelledby="page-hero-title">
      <GridBackdrop />
      <GlowOrbs />
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <FadeIn>
          <Badge dot>{eyebrow}</Badge>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 id="page-hero-title" className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-[var(--muted)]">
            {description}
          </p>
        </FadeIn>
        {children && (
          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {children}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
