import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/services": "Engineering",
  "/insights": "Engineering Knowledge Hub",
  "/open-source": "Open Source",
  "/journal": "Engineering Journal",
  "/founder": "Founder",
  "/about": "About",
  "/case-studies": "Case Studies",
  "/security": "Security",
  "/contact": "Contact",
  "/book": "Book a Consultation",
  "/status": "Status",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function baseStructuredData(path: string, fullTitle: string, description: string) {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/insights?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  if (path !== "/") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: routeLabels[path] || fullTitle.replace(` · ${siteConfig.name}`, ""),
          item: url,
        },
      ],
    });
  }

  graph.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  });

  return graph;
}

export function Seo({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`;
    const url = `${siteConfig.url}${path === "/" ? "" : path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "theme-color", "#060912");
    upsertMeta("name", "color-scheme", "dark");
    upsertMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${siteConfig.name} — ${siteConfig.tagline}`);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:locale", siteConfig.locale);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", siteConfig.socialHandles.x);
    upsertMeta("name", "twitter:creator", siteConfig.socialHandles.x);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", `${siteConfig.name} — ${siteConfig.tagline}`);
    upsertLink("canonical", url);

    const scriptId = "pedumo-jsonld";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const provided = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    const graph = [...baseStructuredData(path, fullTitle, description), ...provided];
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(graph);
    document.head.appendChild(script);
  }, [title, description, path, image, type, jsonLd]);

  return null;
}
