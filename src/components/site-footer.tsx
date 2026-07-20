import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { CookiePreferencesButton } from "@/components/cookie-banner";
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/social-icons";
import { footerNav, siteConfig } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon },
  { label: "GitHub", href: siteConfig.socials.github, icon: GitHubIcon },
  { label: "X", href: siteConfig.socials.x, icon: XIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, icon: YouTubeIcon },
  { label: "TikTok", href: siteConfig.socials.tiktok, icon: TikTokIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, icon: FacebookIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background-subtle)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
  {siteConfig.description}
</p>
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                Enterprise insights delivered quarterly
              </p>
              <NewsletterForm />
              <p className="mt-2 text-xs text-[var(--muted)]">
                Quarterly. Unsubscribe anytime. No spam, ever.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Pedumo on ${s.label}`}
                  className="inline-grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-all duration-300 hover:scale-105 hover:border-brand-500/40 hover:text-brand-500"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                  {group}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                         href={link.href}
                          prefetch
                        className="text-[13.5px] text-[var(--muted)] transition-all duration-300 hover:scale-105 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:text-[var(--foreground)]"
                      >
                        {link.label}
                      </Link>
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
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved worldwide.
            </p>
            <CookiePreferencesButton />
          </div>
          <p className="font-medium text-[var(--foreground)]">
  {siteConfig.tagline}
</p>
        </div>
      </div>
    </footer>
  );
}
