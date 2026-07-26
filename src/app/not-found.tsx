import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GridBackdrop, GlowOrbs } from "@/components/backgrounds";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center overflow-hidden px-5 py-24 text-center">
      <GridBackdrop />
      <GlowOrbs />
      <div className="mx-auto max-w-lg">
        <p className="gradient-text text-7xl font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This page took a different path</h1>
        <p className="mt-3 text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          {[
            { label: "Services", href: "/services" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "About", href: "/about" },
            { label: "Insights", href: "/insights" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-500">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
