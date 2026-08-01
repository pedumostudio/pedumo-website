import { useEffect, useState, type MouseEvent } from "react";
import { processSteps } from "@/lib/content";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/motion";

/**
 * In-page step navigation must NOT use bare `#step-id` hashes.
 * This app is hash-routed (`#/path`); bare hashes are parsed as routes and 404.
 * Buttons scroll to elements within the current page instead.
 */
function scrollToStep(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ProcessTimeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = processSteps.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        const idx = processSteps.findIndex((s) => s.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((n) => n && observer.observe(n));
    return () => observer.disconnect();
  }, []);

  function onIndexClick(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    scrollToStep(id);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">Methodology</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Eight steps. One standard.
          </h3>
          <p className="mt-3 max-w-md text-[var(--muted)]">
            Every engagement runs the same path. Scroll the steps — the index tracks your position.
          </p>
        </Reveal>
        <ol className="mt-8 hidden space-y-1 lg:block">
          {processSteps.map((step, i) => (
            <li key={step.id}>
              <button
                type="button"
                onClick={(e) => onIndexClick(e, step.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  i === active
                    ? "bg-white/[0.06] text-brand-300"
                    : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--foreground)]",
                )}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="font-mono text-xs">{step.index}</span>
                <span className="font-medium">{step.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="space-y-4">
        {processSteps.map((step, i) => (
          <Reveal key={step.id} delay={Math.min(i * 0.04, 0.2)} as="li">
            <div
              id={step.id}
              className={cn(
                "rounded-3xl border bg-[var(--card)] p-6 transition-[border-color,box-shadow] duration-300 sm:p-7 edge-highlight",
                i === active ? "border-brand-400/35 shadow-md" : "border-[var(--border)]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-brand-300">{step.index}</p>
                  <h4 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h4>
                </div>
                <span className="hidden rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] sm:inline">
                  phase {step.index}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
