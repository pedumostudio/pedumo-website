import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";

/**
 * Pedumo Section — the top-level page-content container. Provides a
 * consistent vertical rhythm and container width across every route.
 *
 * - `py-20 sm:py-24 lg:py-28` gives a mature, editorial cadence
 * - `max-w-7xl` matches the header/footer for column alignment
 * - `px-5 sm:px-8 lg:px-10` is the canonical horizontal inset
 */
export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  ariaLabelledby?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("relative py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {children}
      </div>
    </Tag>
  );
}

/**
 * SectionHeading — canonical eyebrow + title + description block used by
 * every marketing section. Restrained scale, generous line-height, and
 * strict tracking chosen for enterprise gravitas.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "mx-auto max-w-2xl items-center text-center"
          : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge dot tone="brand">
            {eyebrow}
          </Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.022em] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-[1.0625rem]",
              align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
