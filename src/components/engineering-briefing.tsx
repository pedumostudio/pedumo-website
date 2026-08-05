import { BrainCircuit, CalendarDays, Lightbulb, ShieldAlert } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import {
  aiTodayInsights,
  cybersecurityAlerts,
  engineeringPrinciples,
  engineeringTips,
} from "@/lib/content";

function dayIndex(length: number) {
  if (length <= 0) return 0;
  const start = Date.UTC(2026, 0, 1);
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((today - start) / 86_400_000) % length;
}

export function EngineeringBriefing() {
  const tip = engineeringTips[dayIndex(engineeringTips.length)];
  const ai = aiTodayInsights[dayIndex(aiTodayInsights.length)];
  const alert = cybersecurityAlerts[dayIndex(cybersecurityAlerts.length)];
  const principle = engineeringPrinciples[dayIndex(engineeringPrinciples.length)];

  const cards = [
    {
      eyebrow: "Engineering Tip of the Day",
      title: tip.title,
      description: tip.description,
      icon: Lightbulb,
      badge: "Rotates daily",
    },
    {
      eyebrow: "AI Today",
      title: ai.title,
      description: ai.description,
      icon: BrainCircuit,
      badge: "Curated",
    },
    {
      eyebrow: "Cybersecurity Alert",
      title: alert.title,
      description: alert.description,
      icon: ShieldAlert,
      badge: alert.severity,
    },
    {
      eyebrow: "Weekly Engineering Principle",
      title: principle.title,
      description: principle.description,
      icon: CalendarDays,
      badge: "Rotating",
    },
  ];

  return (
    <Section id="briefing" className="bg-[var(--background-subtle)]">
      <SectionHeading
        eyebrow="Engineering Operating Brief"
        title="Signals worth returning for"
        description="A small, curated engineering briefing that rotates automatically from Pedumo-owned guidance. It does not embed unrelated technology news."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, i) => (
          <Reveal key={card.eyebrow} delay={(i % 4) * 0.05}>
            <article className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--background-elevated)] text-brand-300">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <Badge>{card.badge}</Badge>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
                {card.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {card.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
