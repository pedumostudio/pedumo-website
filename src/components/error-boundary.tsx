"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-xl px-5 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Something went wrong
            </p>
            <h2 className="mt-3 text-2xl font-semibold">We hit a snag</h2>
            <p className="mt-2 text-[var(--muted)]">
              Try refreshing, or head back home.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90"
              >
                Home
              </Link>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
