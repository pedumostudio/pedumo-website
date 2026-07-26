"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--background-subtle)] text-[var(--foreground)] transition-colors hover:border-brand-500/40 hover:text-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <Moon className="block h-[18px] w-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
