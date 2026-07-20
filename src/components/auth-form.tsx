"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch(
        mode === "login" ? "/api/auth/login" : "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
      window.location.href = "/account";
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-brand-500";

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7">
      <div className="mb-6 flex items-center gap-2">
        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold">
            {mode === "login" ? "Sign in to Pedumo" : "Create your Pedumo account"}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {mode === "login"
              ? "Access your dashboard and saved resources."
              : "Join the partner portal and resource library."}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              className={inputClass + " pl-9"}
              placeholder="you@company.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              id="auth-password"
              name="password"
              type="password"
              required
              minLength={8}
              className={inputClass + " pl-9"}
              placeholder="At least 8 characters"
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-sm font-medium text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
      >
        {status === "loading"
          ? "Please wait…"
          : mode === "login"
            ? "Sign in"
            : "Create account"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-5 text-center text-sm text-[var(--muted)]">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/auth/register" className="text-brand-500 underline-grow">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-500 underline-grow">
              Sign in
            </Link>
          </>
        )}
      </p>
      {mode === "login" && (
        <p className="mt-2 text-center text-xs text-[var(--muted)]">
          <Link href="/auth/forgot" className="underline-grow">
            Forgot your password?
          </Link>
        </p>
      )}
    </form>
  );
}
