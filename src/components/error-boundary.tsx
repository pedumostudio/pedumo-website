"use client";

import { Component, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { reportError } from "@/lib/sentry";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    reportError(error, { componentStack: info.componentStack ?? undefined });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-xl px-5 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-500">
              Something went wrong
            </p>
            <h2 className="mt-3 text-2xl font-semibold">We hit a snag</h2>
            <p className="mt-2 text-[var(--muted)]">
              Our team has been notified. Try refreshing, or head back home.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <ButtonLink href="/">Home</ButtonLink>
              <ButtonLink href="/status" variant="outline">
                Check status
              </ButtonLink>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
