export function GridBackdrop({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="bg-grid absolute inset-0 opacity-45"
        style={
          fade
            ? {
                maskImage:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, black 50%, transparent 100%)",
              }
            : undefined
        }
      />
    </div>
  );
}

/**
 * High-performance executive glow field.
 * Avoids animating giant CSS blurs (which triggers expensive paint cycles
 * on mobile browsers, hurting Core Web Vitals like INP and LCP).
 * Instead, uses a static, light-weight composite radial gradient.
 */
export function GlowOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[600px] opacity-40 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(48,102,255,0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(16,207,174,0.03), transparent 60%)",
        }}
      />
    </div>
  );
}
