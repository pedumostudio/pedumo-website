"use client";

import { useEffect } from "react";

/**
 * Optional Sentry integration. When NEXT_PUBLIC_SENTRY_DSN is set, the Sentry
 * browser SDK is loaded lazily from the CDN and exposed on
 * window.PedumoSentry. When unset, all calls are no-ops so the marketing
 * site ships with zero third-party overhead.
 */
declare global {
  interface Window {
    PedumoSentry?: {
      captureException: (err: unknown, ctx?: Record<string, unknown>) => void;
      captureMessage: (msg: string, level?: string) => void;
    };
  }
}

export function SentryLoader() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn || typeof window === "undefined") return;
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-pedumo-sentry]",
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://js.sentry-cdn.com/7.119.0/bundle.min.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-pedumo-sentry", "1");
    s.onload = () => {
      const S = (window as unknown as { Sentry?: { init: (o: Record<string, unknown>) => void; captureException: (e: unknown, ctx?: Record<string, unknown>) => void; captureMessage: (m: string, l?: string) => void } }).Sentry;
      if (S?.init) {
        S.init({
          dsn,
          tracesSampleRate: 0.1,
          release: process.env.NEXT_PUBLIC_RELEASE ?? "unknown",
          environment: process.env.NEXT_PUBLIC_ENV ?? "production",
        });
        window.PedumoSentry = {
          captureException: (e, ctx) => S.captureException(e, ctx),
          captureMessage: (m, l) => S.captureMessage(m, l),
        };
      }
    };
    document.head.appendChild(s);
  }, []);
  return null;
}

export function reportError(error: unknown, context?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.PedumoSentry?.captureException) {
    window.PedumoSentry.captureException(error, context);
  }
  // Also send to our own telemetry endpoint (rate-limited server-side).
  if (typeof window !== "undefined") {
    try {
      const payload = {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        url: window.location.href,
        context,
      };
      fetch("/api/telemetry/error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  }
}
