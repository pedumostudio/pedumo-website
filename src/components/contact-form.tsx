import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { submitToLiveForm } from "@/lib/liveform";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

interface FormDataState {
  name: string;
  email: string;
  company: string;
  timeline?: string;
  budget?: string;
  message: string;
  _gotcha?: string;
}

export function ContactForm({
  intent = "contact",
}: {
  intent?: "contact" | "book" | "partnership" | "general";
}) {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    company: "",
    timeline: "",
    budget: "",
    message: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setErrorMessage("");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (status === "submitting") return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Validation
    if (!trimmedName) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please provide a valid work email address.");
      setStatus("error");
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setErrorMessage("Please provide a brief description of your project or inquiry (minimum 10 characters).");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitToLiveForm({
      name: trimmedName,
      email: trimmedEmail,
      company: formData.company.trim() || undefined,
      timeline: formData.timeline || undefined,
      budget: formData.budget || undefined,
      message: trimmedMessage,
      form_intent: intent,
      subject:
        intent === "book"
          ? `[Pedumo Consultation] Request from ${trimmedName}`
          : `[Pedumo Contact] Inquiry from ${trimmedName}`,
      _gotcha: formData._gotcha,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(
        result.error ||
          "We could not deliver your message right now. Your data has been preserved below. You can try again or email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-3xl border border-accent-500/30 bg-accent-500/10 p-8 text-left edge-highlight"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 text-accent-300">
          <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-white">Inquiry Received</h3>
        </div>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          Thank you, <span className="font-medium text-white">{formData.name}</span>. Your details have
          been securely transmitted to the Pedumo engineering team. We review all technical inquiries
          and respond within one business day.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                company: "",
                timeline: "",
                budget: "",
                message: "",
                _gotcha: "",
              });
              setStatus("idle");
            }}
          >
            Submit Another Request
          </Button>
          <a
            href={`mailto:${intent === "book" ? siteConfig.bookingEmail : siteConfig.email}`}
            className="text-sm font-medium text-brand-300 underline-offset-2 hover:underline"
          >
            Direct Email: {intent === "book" ? siteConfig.bookingEmail : siteConfig.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 edge-highlight sm:p-8"
      noValidate
      aria-describedby={errorMessage ? "form-error-feedback" : undefined}
    >
      {/* Honeypot field for spam prevention */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`form-name-${intent}`} className="text-sm font-medium text-[var(--foreground)]">
            Full name <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <input
            id={`form-name-${intent}`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 min-h-[44px] w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
            placeholder="Ada Lovelace"
          />
        </div>

        <div>
          <label htmlFor={`form-email-${intent}`} className="text-sm font-medium text-[var(--foreground)]">
            Work email <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <input
            id={`form-email-${intent}`}
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 min-h-[44px] w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
            placeholder="ada@company.com"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`form-company-${intent}`} className="text-sm font-medium text-[var(--foreground)]">
            Organization / Company
          </label>
          <input
            id={`form-company-${intent}`}
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            className="mt-2 min-h-[44px] w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
            placeholder="Acme Systems Corp"
          />
        </div>

        <div>
          <label htmlFor={`form-timeline-${intent}`} className="text-sm font-medium text-[var(--foreground)]">
            Target Timeline
          </label>
          <select
            id={`form-timeline-${intent}`}
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="mt-2 min-h-[44px] w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
          >
            <option value="">Select timeframe (optional)</option>
            <option value="immediate">Immediate (&lt; 1 month)</option>
            <option value="q1_q2">Next 1–3 months</option>
            <option value="exploratory">Exploratory / Roadmap planning</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`form-message-${intent}`} className="text-sm font-medium text-[var(--foreground)]">
          {intent === "book"
            ? "Project overview & objectives"
            : "How can Pedumo help your organization?"}{" "}
          <span className="text-danger" aria-hidden="true">*</span>
        </label>
        <textarea
          id={`form-message-${intent}`}
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-2 w-full resize-y rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
          placeholder={
            intent === "book"
              ? "Describe your system goals, architectural bottlenecks, scale requirements, or security objectives…"
              : "Tell us about your product, operational challenges, or engineering requirements…"
          }
        />
      </div>

      {errorMessage ? (
        <div
          id="form-error-feedback"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/10 p-3.5 text-sm text-red-200"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--muted)]">
          Protected by end-to-end TLS encryption. No spam, ever.
        </p>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-[44px] min-w-[180px] shadow-glow"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Transmitting…
            </span>
          ) : intent === "book" ? (
            "Request Consultation"
          ) : (
            "Transmit Inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
