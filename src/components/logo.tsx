import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="Balogun Adeolu — Home"
    >
      <span className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
        BA
      </span>
    </Link>
  );
}
