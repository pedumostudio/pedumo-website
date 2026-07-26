import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,box-shadow,transform,border-color,color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_22px_-10px_rgba(33,64,232,0.75)] hover:bg-brand-500 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_12px_30px_-10px_rgba(33,64,232,0.85)] active:scale-[0.98]",
  secondary:
    "bg-[var(--foreground)] text-[var(--background)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:opacity-90 active:scale-[0.98]",
  outline:
    "border border-[var(--border-strong)] bg-[var(--card)]/40 text-[var(--foreground)] hover:border-brand-500/50 hover:bg-[var(--background-subtle)] active:scale-[0.98]",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--background-subtle)] active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
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
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
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
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
