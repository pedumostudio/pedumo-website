"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Radio, Server, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Constellation } from "@/components/constellation";
import { OpsTicker } from "@/components/ops-ticker";

const easing = [0.22, 1, 0.36, 1] as const;

function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);
  return ref;
}

function HeroViewport() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = usePointerGlow<HTMLDivElement>();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  return (
    <div className="relative">
      {/* Outer frame with hairline + corner ticks */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black shadow-[0_60px_140px_-50px_rgba(48,102,255,0.55)]">
        {/* Top chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500 live-dot" />
            live · eu-west-1
          </span>
          <span className="hidden sm:inline">pedumo · mesh</span>
        </div>

        {/* Viewport body with grid and elegant radial backdrop as video fallback */}
        <div
          ref={glowRef}
          className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] bg-neutral-950 bg-grid-fine"
          style={{
            ["--mx" as string]: "50%",
            ["--my" as string]: "40%",
            backgroundImage: "radial-gradient(circle at center, #0a0e1c 0%, #05070f 100%)"
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            tabIndex={-1}
          >
            <source src="/videos/hero-ambient.mp4" type="video/mp4" />
          </video>

          {/* Constellation overlay */}
          <div className="pointer-events-none absolute inset-0 text-accent-400/80 mix-blend-screen">
            <Constellation seed={7} count={36} className="h-full w-full" />
          </div>

          {/* Pointer-follow glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle 180px at var(--mx) var(--my), rgba(52,231,200,0.35), transparent 70%)",
              transition: "background 0.15s ease-out",
            }}
          />

          {/* Readability vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Centered readout */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 font-mono text-[11px] text-white/80 backdrop-blur-md">
              <Readout label="uptime" value="99.98%" />
              <Readout label="p95" value="142ms" />
              <Readout label="regions" value="03" />
            </div>
          </div>

          {/* Corner ticks */}
          <CornerTicks />
        </div>
      </div>

      {/* Floating side card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easing, delay: 0.55 }}
        className="absolute -bottom-6 -left-4 hidden w-60 rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-4 shadow-2xl sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="inline-grid h-8 w-8 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold">Security posture</p>
            <p className="text-[11px] text-[var(--muted)]">OWASP ASVS L2 · verified</p>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-mono text-2xl font-semibold text-accent-500">A+</span>
          <span className="text-[11px] text-[var(--muted)]">updated 2h ago</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easing, delay: 0.7 }}
        className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--card)] px-3.5 py-2 font-mono text-[11px] shadow-xl sm:flex"
      >
        <Radio className="h-3.5 w-3.5 text-accent-500 live-dot" />
        streaming telemetry
      </motion.div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/40 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function CornerTicks() {
  const base = "absolute h-3 w-3 border-white/40";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} left-3 bottom-3 border-l border-b`} />
      <span className={`${base} right-3 bottom-3 border-r border-b`} />
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
      {/* Ambient field behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 10%, rgba(48,102,255,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(52,231,200,0.12), transparent 60%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Left: editorial text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">
              Pedumo · Engineering &amp; AI Systems
            </span>
            <span className="hidden h-px flex-1 bg-[var(--border-strong)] sm:block" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Built for the AI era
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: reduce ? 0 : 0 }}
            transition={{ duration: 0.9, ease: easing, delay: 0.08 }}
            className="mt-7 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.028em] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem]"
          >
            Engineering{" "}
            <span className="font-display italic font-normal text-[var(--foreground)]">
              intelligent systems
            </span>{" "}
            for the{" "}
            <span className="relative inline-block">
              <span className="animated-gradient-text">AI era</span>
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-accent-500/70"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 Q 50 2, 100 6 T 198 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.2 }}
            className="mt-7 max-w-xl text-[1.0625rem] leading-[1.65] text-[var(--muted)] sm:text-[1.125rem]"
          >
            Pedumo is a software engineering and AI automation partner. We design the
            architecture, ship the code, secure the infrastructure and operate the
            production systems that startups, enterprises and governments depend on —
            with the discipline expected of a Fortune 500 engineering organization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/book" size="lg">
              Book a strategic consultation
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore capabilities
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <OpsTicker />
            <div className="hidden items-center gap-5 text-xs text-[var(--muted)] sm:flex">
              <span className="inline-flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-brand-500" /> 9 disciplines
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-500" /> secure by default
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: live viewport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easing, delay: 0.35 }}
          className="lg:col-span-5"
        >
          <HeroViewport />
        </motion.div>
      </div>
    </section>
  );
}
