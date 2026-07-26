import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Pedumo home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-[0.7rem]",
          "bg-gradient-to-b from-brand-500 to-brand-700 text-white",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_8px_20px_-8px_rgba(33,64,232,0.65)]",
          "transition-transform duration-300 ease-out group-hover:scale-[1.04]",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" aria-hidden>
          <path
            d="M5 19V6.5C5 5.67 5.67 5 6.5 5h6.25a4.75 4.75 0 0 1 0 9.5H9"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-[0.7rem] ring-1 ring-inset ring-white/15" />
      </span>
      <span className="text-[1.07rem] font-semibold tracking-tight text-[var(--foreground)]">
        Pedumo
      </span>
    </Link>
  );
}
