import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
       prefetch
      aria-label="Go to Pedumo home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-[0_12px_28px_-10px_rgba(37,99,235,.55)] transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
          <path
            d="M5 19V6.5C5 5.67 5.67 5 6.5 5h6.25a4.75 4.75 0 0 1 0 9.5H9"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        </svg>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300">
        Pedumo
      </span>
    </Link>
  );
}
