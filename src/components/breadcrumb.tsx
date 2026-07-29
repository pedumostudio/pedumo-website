import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Renders a visible breadcrumb navigation AND injects the matching
 * schema.org BreadcrumbList structured data as a JSON-LD script.
 */
export function Breadcrumb({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("/") ? `https://balogunadeolu.com${item.path}` : item.path,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[var(--muted)]">
        {items.map((item, i) => (
          <span key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
            {i < items.length - 1 ? (
              <Link
                href={item.path}
                className="transition-colors hover:text-accent-500"
              >
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-[var(--foreground)]" aria-current="page">
                {item.name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
