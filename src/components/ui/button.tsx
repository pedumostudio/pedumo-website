import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pedumo enterprise button primitive.
 *
 * Design principles:
 * - Restrained shadows (single elevation, no glow noise on primary)
 * - Consistent height across sizes (h-9 / h-10 / h-12) for grid alignment
 * - Focus ring uses --ring token — WCAG AA compliant against light + dark
 * - Ghost variant no longer washes out on hover
 * - Adds `secondary` (foreground-inverted) and `subtle` (soft brand tint)
 */

type Variant = "primary" | "secondary" | "subtle" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base = [
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-full font-medium tracking-[-0.005em]",
  "transition-all duration-300 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "focus-visible:ring-brand-500 focus-visible:ring-offset-[var(--background)]",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50",
  "select-none [-webkit-tap-highlight-color:transparent]",
].join(" ");

const variants: Record<Variant, string> = {
  primary: [
    "bg-brand-600 text-white",
    "shadow-[0_2px_10px_rgba(37,99,235,.25)]",
    "hover:bg-brand-500 hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_14px_30px_-14px_rgba(48,102,255,0.85)]",
    "active:scale-[0.97] active:bg-brand-700",
  ].join(" "),
  secondary: [
    "bg-[var(--foreground)] text-[var(--background)]",
    "hover:opacity-90 active:scale-[0.97]",
  ].join(" "),
  subtle: [
    "bg-brand-500/10 text-brand-600 dark:text-brand-300",
    "hover:bg-brand-500/15 active:bg-brand-500/20",
  ].join(" "),
  outline: [
    "border border-[var(--border-strong)] bg-transparent text-[var(--foreground)]",
    "hover:bg-[var(--background-subtle)] hover:border-brand-500/45",
    "active:scale-[0.99]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--foreground)]",
    "hover:bg-[var(--background-subtle)]",
  ].join(" "),
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      prefetch
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
