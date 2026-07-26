"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/content";

const budgets = ["< $10k", "$10k – $30k", "$30k – $75k", "$75k+", "Not sure yet"];

const inputClass =
  "h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted)] focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/35";
const labelClass = "mb-1.5 block text-sm font-medium text-[var(--foreground)]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Message received</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Thank you. A member of our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Contact form"
      noValidate
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-brand-500" aria-hidden>*</span>
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email <span className="text-brand-500" aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" name="company" className={inputClass} placeholder="Company Inc." />
        </div>
        <div>
          <label htmlFor="service" className={labelClass}>
            Service of interest
          </label>
          <select id="service" name="service" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelClass}>
            Estimated budget
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            How can we help? <span className="text-brand-500" aria-hidden>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted)] focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/35"
            placeholder="Tell us about your project, goals and timeline."
          />
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
        aria-busy={status === "loading"}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_22px_-10px_rgba(33,64,232,0.75)] transition-[background-color,box-shadow] hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
