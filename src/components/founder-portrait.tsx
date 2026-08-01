import { useState } from "react";
import { FOUNDER_IMAGE, FOUNDER_IMAGE_SRC } from "@/lib/site";
import { cn } from "@/utils/cn";

/**
 * Founder portrait — fully visible, no overlay cards, no floating labels.
 * Name/title belong in surrounding content only.
 *
 * Image source order:
 * 1. Local public asset `/pedumoceo.jpg` (production public endpoint)
 * 2. Live site public asset `https://pedumo.com/pedumoceo.jpg`
 * Never uses GitHub blob URLs.
 */
export function FounderPortrait({
  className,
  priority = false,
  sizes = "(max-width: 1024px) 92vw, 45vw",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [src, setSrc] = useState(FOUNDER_IMAGE);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-xl overflow-hidden rounded-4xl border border-[var(--border-strong)] bg-[var(--background-sunken)] shadow-xl lg:mx-0",
        className,
      )}
    >
      {/* No gradient scrim, no name plate, no blur card — portrait only */}
      <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
        <img
          src={src}
          alt="Balogun Adeolu, Founder and Software Engineer at Pedumo, seated at his executive desk in front of the Pedumo brand wall"
          width={960}
          height={1152}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
          onError={() => {
            if (src !== FOUNDER_IMAGE_SRC) setSrc(FOUNDER_IMAGE_SRC);
          }}
        />
      </div>
    </div>
  );
}
