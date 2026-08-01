import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
      <GridBackdrop />
      <GlowOrbs />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Reveal>
              <Badge dot>{eyebrow}</Badge>
            </Reveal>
          ) : null}
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--muted)]">
                {description}
              </p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal delay={0.18} className="mt-8 flex flex-wrap gap-3">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
