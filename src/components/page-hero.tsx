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
    <section className="relative overflow-hidden pb-10 pt-20 sm:pt-24 lg:pt-28">
      <GridBackdrop />
      <GlowOrbs />
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <FadeIn>
          <Badge dot tone="brand">{eyebrow}</Badge>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="mt-7 text-balance text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.028em] sm:text-[3rem] md:text-[3.75rem]">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-[1.65] text-[var(--muted)] sm:text-[1.125rem]">
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
