"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie as CookieIcon, X } from "lucide-react";
import { useCookies } from "@/components/cookie-provider";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const { hasDecided, acceptAll, rejectOptional } = useCookies();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasDecided) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [hasDecided]);

  if (hasDecided) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-4 z-[70] px-4"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:flex-row sm:items-center">
            <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
              <CookieIcon className="h-5 w-5" />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-[var(--muted)]">
              We use essential cookies to make the site work and, with your consent,
              privacy-respecting analytics to improve it. Read our{" "}
              <a href="/cookie-policy" className="text-brand-500 underline-grow">
                Cookie Policy
              </a>
              .
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={rejectOptional}
                className="inline-flex h-10 items-center rounded-full border border-[var(--border)] px-4 text-sm font-medium transition-colors hover:bg-[var(--background-subtle)]"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex h-10 items-center rounded-full bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-500"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                aria-label="Dismiss"
                className={cn(
                  "inline-grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CookiePreferencesButton() {
  const { reset } = useCookies();
  return (
    <button
      type="button"
      onClick={reset}
      className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
    >
      <CookieIcon className="h-3.5 w-3.5" />
      Cookie preferences
    </button>
  );
}
