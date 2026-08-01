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
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:locale", siteConfig.locale);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertLink("canonical", url);

    const scriptId = "pedumo-jsonld";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, jsonLd]);

  return null;
}
