import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "accent" | "success" | "warning";

const toneStyles: Record<Tone, string> = {
  neutral:
    "border-[var(--border)] bg-[var(--background-subtle)] text-[var(--muted-strong)]",
  brand:
    "border-brand-500/20 bg-brand-500/8 text-brand-700 dark:text-brand-300",
  accent:
    "border-accent-500/25 bg-accent-500/10 text-accent-600 dark:text-accent-400",
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

/**
 * Pedumo Badge — a small, disciplined pill used for eyebrows, status pips
 * and category tags. Uses a pulsing dot for live/production signals.
 */
export function Badge({
  children,
  className,
  dot = false,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.11em]",
        toneStyles[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
        </span>
      )}
      {children}
    </span>
  );
}
