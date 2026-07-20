"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const projectTypes = [
  "New product build",
  "Existing product / feature work",
  "AI & automation",
  "Cloud & modernization",
  "Security assessment",
  "Data & analytics",
  "Other",
];
const timelines = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Exploring"];

const inputClass =
  "h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-brand-500";
const labelClass = "mb-1.5 block text-sm font-medium text-[var(--foreground)]";

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/consultation", {
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
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent-500" />
        <h3 className="mt-4 text-xl font-semibold">Consultation requested</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Thank you. We&apos;ll review your request and confirm a time that works within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={labelClass}>
            Full name <span className="text-brand-500">*</span>
          </label>
          <input id="c-name" name="name" required className={inputClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="c-email" className={labelClass}>
            Work email <span className="text-brand-500">*</span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor="c-company" className={labelClass}>
            Company
          </label>
          <input id="c-company" name="company" className={inputClass} placeholder="Company Inc." />
        </div>
        <div>
          <label htmlFor="c-role" className={labelClass}>
            Your role
          </label>
          <input id="c-role" name="role" className={inputClass} placeholder="CTO, Founder…" />
        </div>
        <div>
          <label htmlFor="c-type" className={labelClass}>
            Project type
          </label>
          <select id="c-type" name="projectType" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a type
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="c-timeline" className={labelClass}>
            Timeline
          </label>
          <select id="c-timeline" name="timeline" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a timeline
            </option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-date" className={labelClass}>
            Preferred date
          </label>
          <input id="c-date" name="preferredDate" type="date" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-details" className={labelClass}>
            What would you like to discuss?
          </label>
          <textarea
            id="c-details"
            name="details"
            rows={4}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-brand-500"
            placeholder="A few sentences on your goals and current situation."
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
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-medium text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Request consultation"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
