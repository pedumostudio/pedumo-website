"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
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
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 transition-all duration-300",
            scrolled
              ? "glass h-14 border border-[var(--border)] shadow-sm"
              : "h-14 border border-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
              BA
            </span>
            <span className="hidden text-sm font-medium text-[var(--muted)] sm:inline">
              Balogun Adeolu
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-[var(--foreground)]",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden rounded-full border border-[var(--border)] bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90 sm:inline-flex"
            >
              Get in Touch
            </Link>
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
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--background-subtle)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-base font-medium text-[var(--background)]"
                >
                  Get in Touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
