"use client";

const techLogos = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "Cloudflare",
  "Vercel",
  "OpenAI",
  "Anthropic",
  "Google AI",
  "n8n",
];

export function TechMarquee() {
  const items = [...techLogos, ...techLogos];
  return (
    <div
      className="group relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-4 group-hover:[animation-play-state:paused]">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--muted)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
