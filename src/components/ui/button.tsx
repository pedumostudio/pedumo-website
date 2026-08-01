import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { hrefOf } from "@/hooks/useHashRoute";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-glow hover:bg-brand-500 active:bg-brand-700 border border-brand-500/30",
  outline:
    "bg-transparent text-[var(--foreground)] border border-[var(--border-strong)] hover:bg-white/[0.04] hover:border-brand-400/45",
  ghost:
    "bg-transparent text-[var(--foreground)] border border-transparent hover:bg-white/[0.05]",
  /** High-contrast inverse for dark panels / CTAs */
  dark: "bg-white text-[#060912] border border-transparent hover:bg-white/92 shadow-md",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm rounded-xl gap-1.5",
  md: "h-11 px-5 text-sm rounded-2xl gap-2",
  lg: "h-12 px-6 text-[15px] rounded-2xl gap-2",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

function baseClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-quint",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.985]",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={baseClass(variant, size, className)} {...props} />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
};

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  external,
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");
  const resolved = isExternal || href.startsWith("#") ? href : hrefOf(href);

  return (
    <a
      href={resolved}
      className={baseClass(variant, size, className)}
      {...(isExternal && !href.startsWith("mailto:")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
}
