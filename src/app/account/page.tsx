"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, LogOut, Settings, Bell, KeyRound, User } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion";

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => setEmail(j.email ?? null))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Your account"
        description="Manage your profile, security settings and notification preferences."
      />
      <Section className="!pt-4 !pb-20">
        <div className="mx-auto max-w-3xl">
          {loading ? (
            <p className="text-center text-[var(--muted)]">Loading…</p>
          ) : !email ? (
            <Reveal>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-brand-500" />
                <h2 className="mt-3 text-xl font-semibold">Please sign in</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Sign in to access your account and saved resources.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <Link
                    href="/auth/login"
                    className="inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-500"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex h-11 items-center rounded-full border border-[var(--border)] px-6 text-sm font-medium transition-colors hover:bg-[var(--background-subtle)]"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <AccountCard icon={User} title="Profile" value={email} />
                <AccountCard icon={ShieldCheck} title="Security" value="Password · MFA ready" />
                <AccountCard icon={Bell} title="Notifications" value="Email digest: weekly" />
                <AccountCard icon={KeyRound} title="API keys" value="None yet" />
                <AccountCard icon={Settings} title="Preferences" value="Dark mode · English" />
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-left transition-colors hover:border-red-500/40"
                >
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-red-500">
                    <LogOut className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Sign out</p>
                    <p className="text-xs text-[var(--muted)]">End this session on this device.</p>
                  </div>
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}

function AccountCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof User;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] text-brand-500">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {title}
        </p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
