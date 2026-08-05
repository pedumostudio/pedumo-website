import type { ComponentType, SVGProps } from "react";
import { Globe } from "lucide-react";
import { footerNav, officialLinks, siteConfig, type OfficialLink } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";
import { DevToIcon, GitHubIcon, LinkedInIcon, MediumIcon, XIcon } from "@/components/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const socialIconByLabel: Record<OfficialLink["label"], SocialIcon> = {
  Website: Globe,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Medium: MediumIcon,
  "DEV.to": DevToIcon,
  X: XIcon,
};

const socialLinks = officialLinks.map((link) => ({
  ...link,
  icon: socialIconByLabel[link.label],
}));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-subtle)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 xl:grid-cols-[0.9fr_1.6fr]">
          <div className="space-y-7">
            <div>
              <a href={hrefOf("/")} className="inline-flex items-center gap-2.5" aria-label="Pedumo Home">
                <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-glow">
                  P
                </span>
                <span className="text-[15px] font-semibold tracking-tight">{siteConfig.name}</span>
              </a>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                {siteConfig.tagline} Secure software products, scalable cloud infrastructure,
                responsible AI systems and engineering practices built for long-term trust.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Newsletter
              </p>
              <NewsletterForm className="mt-3 max-w-md" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Social Links
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--muted)] transition-colors hover:border-brand-400/45 hover:text-brand-300"
                    aria-label={`Pedumo on ${social.label}`}
                  >
                    <social.icon className="h-4 w-4" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
            {Object.entries(footerNav).map(([group, links]) => (
              <nav key={group} aria-label={`${group} footer navigation`}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {group}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => {
                    const external = "external" in link && link.external;
                    return (
                      <li key={`${group}-${link.href}-${link.label}`}>
                        <a
                          href={external ? link.href : hrefOf(link.href)}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-sm text-[var(--foreground)]/85 transition-colors hover:text-brand-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
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
