import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-banner";
import { LinkedInIcon, GitHubIcon, XIcon } from "@/components/social-icons";
import { footerNav, siteConfig } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.personalLinks.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: siteConfig.personalLinks.github, icon: GitHubIcon },
  { label: "X", href: siteConfig.personalLinks.x, icon: XIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-subtle)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
              Balogun Adeolu
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Technology founder, software architect and cybersecurity professional.
              Building companies around discipline, trust and execution.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-accent-500/40 hover:text-accent-500"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{group}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              © {new Date().getFullYear()} Balogun Adeolu. All rights reserved.
            </p>
            <CookiePreferencesButton />
          </div>
          <p className="text-xs">
            Technology founder. Software architect. Builder.
          </p>
        </div>
      </div>
    </footer>
  );
}
