import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { authors, caseStudies, insights } from "@/lib/content";
import { products } from "@/lib/products";
import { docArticles } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const routes = [
    "",
    "/services",
    "/solutions",
    "/industries",
    "/case-studies",
    "/technologies",
    "/security",
    "/trust-center",
    "/responsible-disclosure",
    "/status",
    "/changelog",
    "/pricing",
    "/partners",
    "/press",
    "/docs",
    "/products",
    "/roadmap",
    "/resources",
    "/demo",
    "/open-source",
    "/studio",
    "/insights",
    "/about",
    "/founder",
    "/careers",
    "/contact",
    "/book",
    "/privacy",
    "/terms",
    "/cookie-policy",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseRoutes = caseStudies.map((cs) => ({
    url: `${siteConfig.url}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const insightRoutes = insights.map((i) => ({
    url: `${siteConfig.url}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const docRoutes = docArticles.map((d) => ({
    url: `${siteConfig.url}/docs/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const authorRoutes = Object.values(authors).map((a) => ({
    url: `${siteConfig.url}/insights/author/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...routes,
    ...caseRoutes,
    ...insightRoutes,
    ...productRoutes,
    ...docRoutes,
    ...authorRoutes,
    {
      url: `${siteConfig.url}/blog/rss.xml`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.5,
    },
  ];
}
