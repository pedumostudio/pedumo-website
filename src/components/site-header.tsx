"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { ButtonLink } from "@/components/ui/button";
import { companyNav, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCompanyOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className={cn(
            "flex h-[56px] items-center justify-between rounded-2xl px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
            scrolled
              ? "glass-strong backdrop-blur-xl border border-[var(--border)] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_40px_-20px_rgba(15,23,42,0.35)]"
              : "border border-transparent",
          )}
        >
          <Logo className="shrink-0" />

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) =>
              item.label === "Company" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                      "text-[var(--muted)] hover:text-brand-600 dark:hover:text-brand-400",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    )}
                    aria-expanded={companyOpen}
                    aria-haspopup="menu"
                  >
                    Company
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        companyOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {companyOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.22, ease: easing }}
                        className="absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-3"
                        role="menu"
                      >
                        <div className="glass-strong backdrop-blur-xl overflow-hidden rounded-2xl border border-[var(--border)] p-3 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]">
                          {companyNav.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              prefetch
                              role="menuitem"
                              className="block rounded-xl px-4 py-3 transition-colors hover:bg-[var(--background-subtle)] focus-visible:bg-[var(--background-subtle)] focus-visible:outline-none"
                            >
                              <span className="block text-sm font-medium text-[var(--foreground)]">
                                {sub.label}
                              </span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-[var(--muted)]">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-current={
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                      ? "page"
                      : undefined
                  }
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-brand-600 dark:hover:text-brand-400",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger className="hidden md:inline-flex" />
            <ThemeToggle />
            <ButtonLink
              href="/book"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Book a Consultation
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--background-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}            
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-[var(--background)]/95 backdrop-blur-xl px-5 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-2 pt-4" aria-label="Mobile">
              {[
                ...primaryNav.filter((i) => i.label !== "Company"),
                ...companyNav,
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  className="rounded-xl px-5 py-3.5 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--background-subtle)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Contact Enterprise Team
                </ButtonLink>
                <ButtonLink href="/book" size="lg">
                  Book a Consultation
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
