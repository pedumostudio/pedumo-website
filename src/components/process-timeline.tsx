"use client";

import { useEffect, useState } from "react";
import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function ProcessTimeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handler = () => {
      const mid = window.innerHeight * 0.45;
      let current = 0;
      processSteps.forEach((_, i) => {
        const el = document.getElementById(`step-${i + 1}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) current = i;
      });
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
      {/* Sticky index */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-500">
          Methodology
        </p>
        <h3 className="mt-3 font-display text-3xl italic leading-tight sm:text-4xl">
          Eight steps. One standard.
        </h3>
        <p className="mt-4 max-w-sm leading-relaxed text-[var(--muted)]">
          Every engagement runs the same path. Scroll the steps on the right — the index
          tracks your position.
        </p>
        <ol className="mt-8 space-y-1 border-l border-[var(--border-strong)] pl-5">
          {processSteps.map((s, i) => (
            <li key={s.number} className="relative">
              <a
                href={`#step-${i + 1}`}
                className={cn(
                  "group flex items-baseline gap-3 py-2 text-sm transition-colors",
                  active === i
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                <span
                  className={cn(
                    "absolute -left-[21px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all",
                    active === i
                      ? "border-brand-500 bg-brand-500 shadow-[0_0_0_4px_rgba(48,102,255,0.18)]"
                      : "border-[var(--border-strong)] bg-[var(--background)] group-hover:border-brand-500/60",
                  )}
                />
                <span className="font-mono text-[11px] text-brand-500">{s.number}</span>
                <span className="font-medium">{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Step panels */}
      <ol className="space-y-16">
        {processSteps.map((step, i) => (
          <li key={step.number} id={`step-${i + 1}`} className="scroll-mt-32">
            <Reveal>
              <div className="relative pl-10 sm:pl-14">
                {/* Vertical rail */}
                <span
                  aria-hidden
                  className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-brand-500/60 via-[var(--border-strong)] to-transparent"
                />
                {/* Node */}
                <span className="absolute left-0 top-2 inline-grid h-6 w-6 -translate-x-[11px] place-items-center rounded-full border border-brand-500/40 bg-[var(--background)]">
                  <span className="h-2 w-2 rounded-full bg-brand-500 live-dot" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-sm text-brand-500">{step.number}</span>
                  <h4 className="font-display text-3xl italic leading-tight tracking-[-0.01em] sm:text-4xl">
                    {step.title}
                  </h4>
                </div>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                  {step.description}
                </p>
                <div className="mt-5 flex items-center gap-3 text-xs text-[var(--muted)]">
                  <span className="inline-grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono uppercase tracking-[0.18em]">
                    phase {step.number}
                  </span>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
