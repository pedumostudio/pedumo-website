"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Operating standards we build to — framed as commitments, not fabricated
// real-time telemetry. Every claim here is a practice, not a live metric.
const signals = [
  "CI/CD on every engagement",
  "OWASP ASVS-aligned reviews",
  "automated test & eval suites",
  "observability from day one",
  "verified backups · defined RTO",
  "24/7 monitoring on supported systems",
];

export function OpsTicker() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % signals.length), 3600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2 font-mono text-xs text-[var(--muted)]"
      aria-label="How Pedumo builds and operates software"
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500/40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
      </span>
      <span className="text-[var(--foreground)]">how we build</span>
      <span className="text-[var(--border-strong)]">·</span>
      <span className="relative h-4 overflow-hidden" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block whitespace-nowrap"
          >
            {signals[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
