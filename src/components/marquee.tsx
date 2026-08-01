import { techStack } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TechMarquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-3" aria-label="Technology stack">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" aria-label="Technology stack">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24" />
      <div
        className="flex w-max animate-marquee gap-3"
        style={{ animationDuration: "48s" }}
      >
        <div className="flex shrink-0 gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-3" aria-hidden="true">
          {techStack.map((tech, i) => (
            <span
              key={`${tech}-repeat-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
