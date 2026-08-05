import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Pedumo Control Plane — original engineering visualization.
 * Edge → mesh → AI inference → data plane, with policy + telemetry planes.
 * Packet motion updates DOM imperatively (no React re-render per frame).
 */

type NodeDef = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  kind: "edge" | "mesh" | "ai" | "data" | "policy" | "obs";
};

const NODES: NodeDef[] = [
  { id: "edge", x: 16, y: 32, label: "Edge", sub: "ingress", kind: "edge" },
  { id: "mesh", x: 40, y: 20, label: "Service Mesh", sub: "routing", kind: "mesh" },
  { id: "ai", x: 70, y: 28, label: "AI Inference", sub: "evaluated", kind: "ai" },
  { id: "data", x: 80, y: 62, label: "Data Plane", sub: "durable", kind: "data" },
  { id: "policy", x: 48, y: 74, label: "Policy", sub: "ASVS", kind: "policy" },
  { id: "obs", x: 22, y: 66, label: "Telemetry", sub: "SLO", kind: "obs" },
];

const LINKS: { from: string; to: string; dashed?: boolean }[] = [
  { from: "edge", to: "mesh" },
  { from: "mesh", to: "ai" },
  { from: "ai", to: "data" },
  { from: "data", to: "policy" },
  { from: "policy", to: "obs" },
  { from: "obs", to: "edge" },
  { from: "mesh", to: "policy", dashed: true },
  { from: "ai", to: "obs", dashed: true },
  { from: "edge", to: "policy", dashed: true },
];

const METRICS = [
  { label: "release posture", value: "automated" },
  { label: "security gate", value: "required" },
  { label: "observability", value: "designed" },
  { label: "scaling model", value: "cloud native" },
  { label: "policy checks", value: "required" },
];

function kindColor(kind: NodeDef["kind"]) {
  switch (kind) {
    case "edge":
      return "#5a83ff";
    case "mesh":
      return "#8fadff";
    case "ai":
      return "#2fe1c1";
    case "data":
      return "#5ef0d8";
    case "policy":
      return "#f5a623";
    case "obs":
      return "#7a9aff";
  }
}

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export function EngineeringCanvas() {
  const reduced = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const [activeMetric, setActiveMetric] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [activePath, setActivePath] = useState(0);

  const packetRefs = useRef<(SVGCircleElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const hoverRef = useRef<string | null>(null);
  const pathRef = useRef(0);
  const frame = useRef<number | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, NodeDef>();
    NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  useEffect(() => {
    pathRef.current = activePath;
  }, [activePath]);

  // Imperative packet + pulse animation — avoids React reconcile every frame
  useEffect(() => {
    if (reduced) {
      LINKS.forEach((link, i) => {
        const a = nodeMap.get(link.from)!;
        const b = nodeMap.get(link.to)!;
        const t = (i * 0.13) % 1;
        const el = packetRefs.current[i];
        if (el) {
          el.setAttribute("cx", String(a.x + (b.x - a.x) * t));
          el.setAttribute("cy", String(a.y + (b.y - a.y) * t));
        }
      });
      return;
    }

    let start = performance.now();
    let last = 0;

    const loop = (now: number) => {
      if (now - last < 33) {
        frame.current = requestAnimationFrame(loop);
        return;
      }
      last = now;
      const tick = (now - start) / 1000;
      const h = hoverRef.current;
      const ap = pathRef.current;

      LINKS.forEach((link, i) => {
        const a = nodeMap.get(link.from)!;
        const b = nodeMap.get(link.to)!;
        const phase = (tick * 0.18 + i * 0.14) % 1;
        const t = ease(phase);
        const el = packetRefs.current[i];
        if (el) {
          el.setAttribute("cx", String(a.x + (b.x - a.x) * t));
          el.setAttribute("cy", String(a.y + (b.y - a.y) * t));
          const hot = ap === i || h === link.from || h === link.to;
          el.setAttribute("r", hot ? "1.05" : "0.75");
          el.setAttribute("opacity", hot ? "0.95" : "0.7");
        }

        const line = lineRefs.current[i];
        if (line) {
          const emphasized = ap === i || h === link.from || h === link.to || !h;
          line.setAttribute("stroke-opacity", emphasized ? "1" : "0.35");
          line.setAttribute("stroke-width", ap === i ? "0.55" : "0.32");
        }
      });

      NODES.forEach((n, i) => {
        const halo = haloRefs.current[i];
        if (!halo) return;
        const pulse = 1 + Math.sin(tick * 1.6 + n.x * 0.08) * 0.06;
        halo.setAttribute("r", String(6.2 * pulse));
      });

      frame.current = requestAnimationFrame(loop);
    };

    frame.current = requestAnimationFrame(loop);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduced, nodeMap]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveMetric((m) => (m + 1) % METRICS.length);
      setActivePath((p) => (p + 1) % LINKS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const metric = METRICS[activeMetric];

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--background-sunken)] shadow-xl sm:min-h-[440px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 42%, #000 25%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-[42%] top-[36%] h-48 w-48 -translate-x-1/2 rounded-full bg-brand-600/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 right-8 h-36 w-36 rounded-full bg-accent-500/8 blur-3xl"
      />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden />
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
            Pedumo control plane
          </p>
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35 sm:text-[11px]">
          edge · mesh · inference
        </p>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-x-0 bottom-0 top-11 h-[calc(100%-2.75rem)] w-full"
        role="img"
        aria-label="Distributed systems control plane: edge ingress, service mesh, AI inference, data plane, security policy and telemetry"
      >
        <defs>
          <filter id={`glow-${gid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`link-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(90,131,255,0.15)" />
            <stop offset="50%" stopColor="rgba(143,173,255,0.45)" />
            <stop offset="100%" stopColor="rgba(47,225,193,0.2)" />
          </linearGradient>
        </defs>

        <circle
          cx="48"
          cy="46"
          r="22"
          fill="none"
          stroke="rgba(90,131,255,0.08)"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.8"
        />

        {LINKS.map((link, i) => {
          const a = nodeMap.get(link.from)!;
          const b = nodeMap.get(link.to)!;
          return (
            <line
              key={`${link.from}-${link.to}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={`url(#link-${gid})`}
              strokeWidth={0.32}
              strokeDasharray={link.dashed ? "1.2 1.1" : undefined}
              strokeOpacity={1}
            />
          );
        })}

        {LINKS.map((link, i) => {
          const a = nodeMap.get(link.from)!;
          return (
            <circle
              key={`pkt-${link.from}-${link.to}`}
              ref={(el) => {
                packetRefs.current[i] = el;
              }}
              cx={a.x}
              cy={a.y}
              r={0.75}
              fill={kindColor(a.kind)}
              opacity={0.7}
              filter={`url(#glow-${gid})`}
            />
          );
        })}

        {NODES.map((n, i) => {
          const color = kindColor(n.kind);
          const isHot = hover === n.id;
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              role="img"
              aria-label={`${n.label}: ${n.sub}`}
              className="outline-none focus-visible:outline focus-visible:outline-[0.4px] focus-visible:outline-offset-1 focus-visible:outline-brand-300"
            >
              <circle
                ref={(el) => {
                  haloRefs.current[i] = el;
                }}
                cx={n.x}
                cy={n.y}
                r={6.2}
                fill={`${color}14`}
                stroke={`${color}40`}
                strokeWidth={0.28}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={isHot ? 2.55 : 2.05}
                fill={color}
                filter={`url(#glow-${gid})`}
              />
              <text
                x={n.x}
                y={n.y + 9.2}
                textAnchor="middle"
                fill="rgba(232,236,246,0.88)"
                fontSize="2.9"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontWeight="500"
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 12.4}
                textAnchor="middle"
                fill="rgba(147,156,180,0.9)"
                fontSize="2.15"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-end justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3">
        <div
          className="min-w-[7.5rem] rounded-2xl border border-white/10 bg-[#060912]/80 px-3 py-2 backdrop-blur-md sm:px-3.5 sm:py-2.5"
          aria-live="polite"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
            {metric.label}
          </p>
          <p className="mt-0.5 font-mono text-base text-white tabular-nums sm:text-lg">
            {metric.value}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#060912]/80 px-3 py-2 backdrop-blur-md sm:max-w-[14rem] sm:px-3.5 sm:py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-400">
            security posture
          </p>
          <p className="mt-0.5 text-[12px] leading-snug text-white/80 sm:text-sm">
            OWASP ASVS · continuous SDLC
          </p>
        </div>
      </div>

      <span aria-hidden className="absolute left-3 top-14 h-2.5 w-2.5 border-l border-t border-white/25" />
      <span aria-hidden className="absolute right-3 top-14 h-2.5 w-2.5 border-r border-t border-white/25" />
    </div>
  );
}
