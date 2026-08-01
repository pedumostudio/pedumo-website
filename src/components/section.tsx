import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/motion";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  narrow?: boolean;
};

export function Section({
  as: Tag = "section",
  className,
  narrow,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("relative py-16 sm:py-20 lg:py-24", className)} {...props}>
      <div
        className={cn(
          "mx-auto w-full px-5 sm:px-8",
          narrow ? "max-w-3xl" : "max-w-7xl",
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow ? (
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
