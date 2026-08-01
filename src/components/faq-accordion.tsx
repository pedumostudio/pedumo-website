import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/motion";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-[var(--border)] border-y border-[var(--border)]" role="list">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <Reveal key={faq.question} delay={Math.min(i * 0.04, 0.16)} as="div">
            <div role="listitem">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium tracking-tight transition-colors hover:text-brand-300 sm:text-lg"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-300",
                      isOpen && "rotate-180 text-brand-300",
                    )}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out-quint",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 leading-relaxed text-[var(--muted)]">{faq.answer}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
