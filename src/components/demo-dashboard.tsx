"use client";

import { useState } from "react";
import { BarChart3, Users, ShieldCheck, Bot, Activity } from "lucide-react";
import { Reveal } from "@/components/motion";
import {
  demoActivity,
  demoChartSeries,
  demoKpis,
  demoTableRows,
  type DemoTab,
} from "@/lib/demo";
import { cn } from "@/lib/utils";

const tabs: { key: DemoTab; label: string; icon: typeof BarChart3 }[] = [
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "crm", label: "CRM", icon: Users },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "ai", label: "AI Assistant", icon: Bot },
];

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / span) * 100}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function DemoDashboard() {
  const [tab, setTab] = useState<DemoTab>("analytics");
  const kpis = demoKpis[tab];
  const series = demoChartSeries[tab];
  const rows = demoTableRows[tab];

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--card)] shadow-[0_40px_120px_-40px_rgba(48,102,255,0.35)]">
      {/* Chrome */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-3 font-mono text-xs text-[var(--muted)]">
            pedumo · console · demo
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-500">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500 live-dot" />
          live
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-[var(--border)] px-4 py-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              tab === t.key
                ? "bg-brand-500/10 text-brand-500"
                : "text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid gap-px bg-[var(--border)] sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[var(--background-elevated)] p-5">
            <p className="text-xs text-[var(--muted)]">{k.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{k.value}</p>
            <p className="mt-1 font-mono text-[10px] text-accent-500">{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid gap-px bg-[var(--border)] lg:grid-cols-[1.6fr_1fr]">
        <div className="bg-[var(--background-elevated)] p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              12-week trend
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
              <Activity className="h-3.5 w-3.5" /> updated now
            </span>
          </div>
          <div className="mt-4 h-44 text-brand-500">
            <Sparkline data={series} className="h-full w-full" />
          </div>
        </div>
        <div className="bg-[var(--background-elevated)] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Recent activity
          </p>
          <ul className="mt-3 space-y-2.5">
            {demoActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 font-mono text-[10px] text-[var(--muted)]">
                  {a.time}
                </span>
                <span className="flex-1 leading-relaxed text-[var(--muted)]">
                  <span className="font-mono text-[var(--foreground)]">{a.actor}</span>{" "}
                  {a.action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--background-elevated)] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Detail
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background-subtle)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Region</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rows.map((r) => (
                <tr key={r.name} className="transition-colors hover:bg-[var(--background-subtle)]">
                  <td className="px-4 py-2.5 font-medium">{r.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-[var(--muted)]">
                    {r.region}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs",
                        r.status === "Operational" || r.status === "Clear" || r.status === "Live" || r.status === "Won" || r.status === "Patched"
                          ? "text-accent-500"
                          : r.status === "Degraded" || r.status === "Review"
                            ? "text-amber-500"
                            : "text-brand-500",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function DemoSection() {
  return (
    <Reveal>
      <DemoDashboard />
    </Reveal>
  );
}
