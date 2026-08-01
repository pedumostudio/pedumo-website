import { footerNav, siteConfig } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-subtle)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="space-y-6">
            <div>
              <a href={hrefOf("/")} className="inline-flex items-center gap-2.5" aria-label="Pedumo Home">
                <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-glow">
                  P
                </span>
                <span className="text-[15px] font-semibold tracking-tight">{siteConfig.name}</span>
              </a>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                {siteConfig.tagline} Secure software engineering, distributed cloud infrastructure,
                data platforms, and evaluated AI automation for mission-critical operations.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="max-w-md pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Engineering Briefings
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Quarterly notes on system resilience, AI evaluation, and edge architecture.
              </p>
              <NewsletterForm className="mt-3" />
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:text-brand-300"
                aria-label="Pedumo on LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:text-brand-300"
                aria-label="Pedumo on GitHub"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:text-brand-300"
                aria-label="Pedumo on X"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {group}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={hrefOf(link.href)}
                        className="text-sm text-[var(--foreground)]/85 transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Founder:{" "}
            <a
              href={siteConfig.founderLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 underline-offset-2 hover:underline"
            >
              {siteConfig.founder}
            </a>{" "}
            · {siteConfig.founderTitle}
          </p>
        </div>
      </div>
    </footer>
  );
}
