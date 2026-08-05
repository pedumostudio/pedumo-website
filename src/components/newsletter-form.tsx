import { MailWarning } from "lucide-react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 edge-highlight ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-warning/30 bg-warning/10 text-warning">
          <MailWarning className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">Engineering newsletter</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            Newsletter backend not configured.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="newsletter-email-disabled" className="sr-only">
          Newsletter email address
        </label>
        <input
          id="newsletter-email-disabled"
          type="email"
          inputMode="email"
          placeholder="work email"
          disabled
          aria-describedby="newsletter-disabled-note"
          className="min-h-[44px] flex-1 cursor-not-allowed rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-2.5 text-sm text-[var(--muted)] opacity-75"
        />
        <button
          type="button"
          disabled
          className="min-h-[44px] cursor-not-allowed rounded-2xl border border-[var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] opacity-75"
        >
          Subscribe
        </button>
      </div>
      <p id="newsletter-disabled-note" className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
        Email subscriptions will be enabled only after a verified email service and consent workflow
        are configured.
      </p>
    </div>
  );
}
