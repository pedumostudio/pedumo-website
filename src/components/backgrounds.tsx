export function GridBackdrop({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="bg-grid absolute inset-0"
        style={
          fade
            ? {
                maskImage:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
              }
            : undefined
        }
      />
    </div>
  );
}

export function GlowOrbs() {
  // Restrained: a single, static brand wash anchored to the top of the hero.
  // No floating/pulsing orbs — structure and light, not decoration.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-x-0 -top-32 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(33,64,232,0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
