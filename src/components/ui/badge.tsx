import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-3.5 py-1.5 text-xs font-medium text-[var(--muted)]",
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500/40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
        </span>
      )}
      {children}
    </span>
  );
}
