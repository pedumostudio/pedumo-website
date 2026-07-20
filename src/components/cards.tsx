import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_20px_50px_-30px_rgba(48,102,255,0.6)]",
        className,
      )}
    >
      <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500 transition-colors group-hover:border-brand-500/40">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
    </div>
  );
}

export function LinkCard({
  href,
  icon: Icon,
  title,
  description,
  meta,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  meta?: string[];
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-brand-500/40 hover:shadow-[0_20px_50px_-30px_rgba(48,102,255,0.6)]"
    >
      <div className="flex items-start justify-between">
        <div className="inline-grid h-11 w-11 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500 transition-colors group-hover:border-brand-500/40">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {description}
      </p>
      {meta && meta.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meta.map((m) => (
            <span
              key={m}
              className="rounded-md border border-[var(--border)] bg-[var(--background-subtle)] px-2 py-1 text-[11px] font-medium text-[var(--muted)]"
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
