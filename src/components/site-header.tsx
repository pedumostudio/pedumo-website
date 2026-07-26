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

  // Close menus when the route changes — adjust state during render using a
  // state "previous value" (the React-recommended alternative to a
  // synchronous setState-in-effect). See react.dev "You Might Not Need an Effect".
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (companyOpen) setCompanyOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 transition-all duration-300",
            scrolled
              ? "glass h-14 border border-[var(--border)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)]"
              : "h-14 border border-transparent",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) =>
              item.label === "Company" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setCompanyOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setCompanyOpen((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setCompanyOpen(false);
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    aria-expanded={companyOpen}
                    aria-haspopup="true"
                  >
                    Company
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        companyOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {companyOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3"
                      >
                        <div className="glass overflow-hidden rounded-2xl border border-[var(--border)] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
                          {companyNav.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--background-subtle)]"
                            >
                              <span className="block text-sm font-medium text-[var(--foreground)]">
                                {sub.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-[var(--muted)]">
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
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-[var(--foreground)]",
                    pathname.startsWith(item.href)
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)]",
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
            <ButtonLink href="/book" size="sm" className="hidden sm:inline-flex">
              Book Consultation
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground)] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[76px] z-40 overflow-y-auto bg-[var(--background)] px-5 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-1 pt-4" aria-label="Mobile">
              {[...primaryNav.filter((i) => i.label !== "Company"), ...companyNav].map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--background-subtle)]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Contact
                </ButtonLink>
                <ButtonLink href="/book" size="lg">
                  Book Consultation
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
