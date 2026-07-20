import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/motion";
import { statusItems, statusIncidents } from "@/lib/status";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live status of Pedumo services: platform, security, automation and data. Transparent incident history and per-service availability.",
  alternates: { canonical: "/status" },
};

const statusMeta = {
  operational: {
    label: "Operational",
    color: "bg-accent-500",
    icon: CheckCircle2,
    text: "text-accent-500",
  },
  degraded: {
    label: "Degraded",
    color: "bg-amber-500",
    icon: AlertTriangle,
    text: "text-amber-500",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-brand-500",
    icon: Wrench,
    text: "text-brand-500",
  },
} as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function StatusPage() {
  const groups = Array.from(new Set(statusItems.map((s) => s.group)));
  const allOperational = statusItems.every((s) => s.status === "operational");

  return (
    <>
      <PageHero
        eyebrow="Status"
        title={
          <>
            {allOperational ? (
              <>All systems <span className="font-display italic font-normal text-accent-500">operational</span></>
            ) : (
              <>Service <span className="font-display italic font-normal">status</span></>
            )}
          </>
        }
        description="Transparent availability for every Pedumo service, with incident history and per-service uptime. Updated continuously."
      />

      <Section className="!pt-6">
        <div className="mx-auto max-w-4xl space-y-10">
          {groups.map((group, gi) => (
            <Reveal key={group} delay={gi * 0.05}>
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {group}
                </h2>
                <div className="mt-3 divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                  {statusItems
                    .filter((s) => s.group === group)
                    .map((s) => {
                      const meta = statusMeta[s.status];
                      return (
                        <div
                          key={s.name}
                          className="flex items-center justify-between gap-4 px-5 py-3.5"
                        >
                          <span className="text-sm font-medium">{s.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="hidden font-mono text-xs text-[var(--muted)] sm:inline">
                              {s.uptime}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium ${meta.text}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.color} live-dot`} />
                              {meta.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Recent incidents
              </h2>
              <div className="mt-3 space-y-3">
                {statusIncidents.map((inc) => (
                  <div
                    key={inc.date + inc.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{inc.title}</h3>
                      <span className="font-mono text-xs text-[var(--muted)]">
                        {formatDate(inc.date)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{inc.body}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-500">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Want status updates delivered to your inbox?"
        description="Subscribe to incident notifications and our engineering changelog."
      />
    </>
  );
}
