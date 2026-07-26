"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Node = { x: number; y: number; r: number };

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function Constellation({
  seed = 42,
  count = 28,
  className,
}: {
  seed?: number;
  count?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const { nodes, edges } = useMemo(() => {
    const rand = seededRand(seed);
    const ns: Node[] = Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.6 + rand() * 1.4,
    }));
    const es: Array<[number, number, number]> = [];
    const maxDist = 22;
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        const dx = ns[i].x - ns[j].x;
        const dy = ns[i].y - ns[j].y;
        const d = Math.hypot(dx, dy);
        if (d < maxDist) es.push([i, j, 1 - d / maxDist]);
      }
    }
    return { nodes: ns, edges: es };
  }, [seed, count]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g stroke="currentColor" fill="none" strokeWidth="0.12">
        {edges.map(([a, b, opacity], i) => (
          <motion.line
            key={`e-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            initial={{ opacity: 0 }}
            animate={{ opacity: reduce ? opacity * 0.35 : [0, opacity * 0.55, opacity * 0.2] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.3 }
            }
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            initial={{ opacity: 0 }}
            animate={reduce ? { opacity: 0.7 } : { opacity: [0.3, 0.9, 0.3] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.2 }
            }
          />
        ))}
      </g>
    </svg>
  );
}
