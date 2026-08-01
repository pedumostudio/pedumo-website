import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { primaryNav, siteConfig } from "@/lib/site";
import { hrefOf } from "@/hooks/useHashRoute";
import { ButtonLink } from "@/components/ui/button";

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_78%,transparent)] shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white focus:shadow-glow"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8">
        <a href={hrefOf("/")} className="group flex items-center gap-2.5" aria-label="Pedumo home">
          <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-[1.03]">
            P
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{siteConfig.name}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = path === item.href || path.startsWith(`${item.href}/`);
            return (
              <a
                key={item.href}
                href={hrefOf(item.href)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/[0.06] text-brand-300"
                    : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--foreground)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/book" size="sm">
            Book consultation
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition-colors hover:bg-white/[0.05] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-[var(--border)] bg-[var(--background)] lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8" aria-label="Mobile">
          {primaryNav.map((item) => {
            const active = path === item.href;
            return (
              <a
                key={item.href}
                href={hrefOf(item.href)}
                className={cn(
                  "flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-base font-medium",
                  active
                    ? "bg-white/[0.06] text-brand-300"
                    : "text-[var(--foreground)] hover:bg-white/[0.04]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
          <ButtonLink href="/book" className="mt-2 min-h-[44px] w-full">
            Book consultation
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
