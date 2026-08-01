import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  dot?: boolean;
};

export function Badge({ className, dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-elevated)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--muted)]",
        className,
      )}
      {...props}
    >
      {dot ? (
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden />
      ) : null}
      {children}
    </span>
  );
}
