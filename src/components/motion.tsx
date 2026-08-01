import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li" | "article";
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const style: CSSProperties | undefined = reduced
    ? undefined
    : {
        transitionDelay: visible ? `${delay}s` : undefined,
      };

  return (
    <Tag
      ref={ref as never}
      className={cn(
        !reduced && "reveal-base",
        visible || reduced ? "reveal-in" : "reveal-out",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
