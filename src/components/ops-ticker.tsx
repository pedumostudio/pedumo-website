"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const signals = [
  "production · eu-west-1 · 99.98% uptime",
  "14 deployments today · 0 open P1s",
  "p95 response 142ms · 3 regions live",
  "OWASP ASVS L2 · last scan clean",
  "AI eval suite passing · 412 assertions",
  "backup verified 02:14 UTC · RTO 15m",
];

export function OpsTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % signals.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2 font-mono text-xs text-[var(--muted)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
      </span>
      <span className="text-[var(--foreground)]">ops</span>
      <span className="text-[var(--border-strong)]">·</span>
      <span className="relative h-4 overflow-hidden">
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
