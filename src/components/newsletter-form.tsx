import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { submitToLiveForm } from "@/lib/liveform";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const result = await submitToLiveForm({
      email: trimmed,
      form_intent: "newsletter",
      subject: `[Pedumo Newsletter] New Subscriber: ${trimmed}`,
      _gotcha: gotcha,
    });

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error || "Subscription failed. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-2 rounded-2xl border border-accent-500/30 bg-accent-500/10 p-4 text-sm text-accent-300 ${className}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Subscribed. You will receive engineering briefs and architecture notes.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className}`} noValidate>
      <input
        type="text"
        name="_gotcha"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for engineering insights
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="Enter work email for insights…"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setMessage("");
          }}
          className="min-h-[44px] flex-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--background-sunken)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
        />
        <Button
          type="submit"
          disabled={status === "submitting"}
          size="sm"
          className="min-h-[44px] shrink-0"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              Subscribing…
            </span>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {status === "error" && message ? (
        <p className="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </p>
      ) : null}
    </form>
  );
}
