export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60 ${className}`}
    />
  );
}

export function GlowOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-brand-600/12 blur-3xl animate-pulse-slow" />
      <div className="absolute -right-20 top-28 h-80 w-80 rounded-full bg-accent-500/8 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-brand-500/8 blur-3xl" />
    </div>
  );
}
