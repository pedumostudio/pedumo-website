import {
  Hash,
  Zap,
  Lightbulb,
  Star,
  Briefcase,
  BookOpen,
  HelpCircle,
  GitBranch,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { SearchDoc } from "./types";
import { services, solutions, industries, caseStudies, insights, faqs, careers, studioTopics, openSourceProjects } from "@/lib/content";
import { products } from "@/lib/products";

/* ═══════════════════════════════════════════════════════════════════════
   SEARCH INDEX BUILDER
   Deterministic, pure function that flattens every content source into a
   normalized SearchDoc[] used by the engine, worker and palette UI.
   ═══════════════════════════════════════════════════════════════════════ */

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "for", "in", "on", "at", "by",
  "with", "is", "are", "we", "our", "your", "you", "that", "this", "it",
  "as", "be", "from", "into",
]);

/** Lowercase, strip punctuation, collapse whitespace. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tokenize a normalized string into unique, meaningful tokens. */
export function tokenize(input: string): string[] {
  const norm = normalize(input);
  if (!norm) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tok of norm.split(" ")) {
    if (tok.length < 2) continue;
    if (STOPWORDS.has(tok)) continue;
    if (seen.has(tok)) continue;
    seen.add(tok);
    out.push(tok);
  }
  return out;
}

type RawDoc = {
  id: string;
  label: string;
  subtitle: string;
  detail?: string;
  href: string;
  group: string;
  icon?: LucideIcon;
  keywords?: string[];
  weight?: number;
};

function finalize(raw: RawDoc): SearchDoc {
  const keywords = raw.keywords ?? [];
  const corpus = [raw.label, raw.subtitle, raw.detail ?? "", keywords.join(" ")]
    .filter(Boolean)
    .join(" ");
  const normLabel = normalize(raw.label);
  const normSubtitle = normalize(raw.subtitle);
  const normCorpus = normalize(corpus);
  const tokens = tokenize(corpus);
  return {
    id: raw.id,
    label: raw.label,
    subtitle: raw.subtitle,
    ...(raw.detail !== undefined ? { detail: raw.detail } : {}),
    href: raw.href,
    group: raw.group,
    ...(raw.icon !== undefined ? { icon: raw.icon } : {}),
    keywords,
    normLabel,
    normSubtitle,
    normCorpus,
    tokens,
    weight: raw.weight ?? 0.5,
  };
}

const STATIC_PAGES: RawDoc[] = [
  { id: "page-home", label: "Home", subtitle: "Pedumo — engineering intelligent business solutions", href: "/", group: "Pages", icon: Hash, keywords: ["landing", "start"], weight: 0.9 },
  { id: "page-services", label: "Services", subtitle: "Nine engineering disciplines under one standard", href: "/services", group: "Pages", icon: Zap, keywords: ["capabilities", "engineering"], weight: 0.85 },
  { id: "page-products", label: "Products", subtitle: "Engineered products and platforms", href: "/products", group: "Pages", icon: Zap, keywords: ["platform"], weight: 0.8 },
  { id: "page-solutions", label: "Solutions", subtitle: "Outcome-focused solution sets", href: "/solutions", group: "Pages", icon: Lightbulb, keywords: ["outcomes"], weight: 0.8 },
  { id: "page-industries", label: "Industries", subtitle: "Sectors and organizations we serve", href: "/industries", group: "Pages", icon: Hash, keywords: ["sectors", "verticals"], weight: 0.75 },
  { id: "page-case-studies", label: "Case Studies", subtitle: "How we think, demonstrated", href: "/case-studies", group: "Pages", icon: Hash, keywords: ["work", "portfolio", "proof"], weight: 0.75 },
  { id: "page-security", label: "Security", subtitle: "Security and resilience posture", href: "/security", group: "Pages", icon: Hash, keywords: ["owasp", "encryption", "hardening"], weight: 0.8 },
  { id: "page-trust", label: "Trust Center", subtitle: "Commitments, controls and compliance", href: "/trust-center", group: "Pages", icon: Hash, keywords: ["compliance", "controls", "governance"], weight: 0.75 },
  { id: "page-status", label: "Status", subtitle: "Service availability indicators", href: "/status", group: "Pages", icon: Hash, keywords: ["uptime", "incidents"], weight: 0.6 },
  { id: "page-changelog", label: "Changelog", subtitle: "Release history", href: "/changelog", group: "Pages", icon: Hash, keywords: ["releases", "updates"], weight: 0.55 },
  { id: "page-roadmap", label: "Roadmap", subtitle: "What we are building next", href: "/roadmap", group: "Pages", icon: Hash, keywords: ["future", "plans"], weight: 0.55 },
  { id: "page-pricing", label: "Pricing", subtitle: "Engagement and partnership models", href: "/pricing", group: "Pages", icon: Hash, keywords: ["cost", "rates", "plans"], weight: 0.8 },
  { id: "page-founder", label: "Founder", subtitle: "Balogun Adeolu — Founder & Software Engineer", href: "/founder", group: "Pages", icon: Hash, keywords: ["leadership", "ceo", "balogun"], weight: 0.7 },
  { id: "page-about", label: "About", subtitle: "The Pedumo story, mission and vision", href: "/about", group: "Pages", icon: Hash, keywords: ["company", "mission"], weight: 0.7 },
  { id: "page-technologies", label: "Technologies", subtitle: "The stack we build production systems on", href: "/technologies", group: "Pages", icon: Hash, keywords: ["stack", "tools"], weight: 0.65 },
  { id: "page-resources", label: "Resource Center", subtitle: "Guides, frameworks and checklists", href: "/resources", group: "Pages", icon: BookOpen, keywords: ["guides", "downloads"], weight: 0.6 },
  { id: "page-docs", label: "Documentation", subtitle: "Product and API documentation", href: "/docs", group: "Pages", icon: BookOpen, keywords: ["api", "reference"], weight: 0.65 },
  { id: "page-demo", label: "Demo", subtitle: "See the platform in action", href: "/demo", group: "Pages", icon: Hash, keywords: ["preview", "sandbox"], weight: 0.6 },
  { id: "page-partners", label: "Partners", subtitle: "Partner program", href: "/partners", group: "Pages", icon: Hash, keywords: ["alliances"], weight: 0.55 },
  { id: "page-press", label: "Press", subtitle: "Media kit and press resources", href: "/press", group: "Pages", icon: Hash, keywords: ["media", "brand"], weight: 0.5 },
];

const ACTIONS: RawDoc[] = [
  { id: "action-book", label: "Book Consultation", subtitle: "Start a strategic conversation", href: "/book", group: "Actions", icon: Zap, keywords: ["contact", "meeting", "call", "consult"], weight: 0.95 },
  { id: "action-contact", label: "Contact the team", subtitle: "Get in touch with Pedumo", href: "/contact", group: "Actions", icon: Zap, keywords: ["email", "reach", "support"], weight: 0.9 },
];

/**
 * Build the complete, normalized search index from every content source.
 * Pure and deterministic — safe to call on the client and inside a worker.
 */
export function buildSearchIndex(): SearchDoc[] {
  const raw: RawDoc[] = [];

  raw.push(...STATIC_PAGES, ...ACTIONS);

  for (const s of services) {
    raw.push({
      id: `service-${s.slug}`,
      label: s.title,
      subtitle: s.summary,
      detail: s.outcomes.slice(0, 2).join(" · "),
      href: `/services#${s.slug}`,
      group: "Services",
      keywords: ["service", ...s.outcomes.flatMap((o) => o.split(" ").slice(0, 3))],
      weight: 0.7,
    });
  }

  for (const p of products) {
    raw.push({
      id: `product-${p.slug}`,
      label: p.name,
      subtitle: p.tagline,
      detail: p.summary,
      href: `/products/${p.slug}`,
      group: "Products",
      icon: p.icon,
      keywords: ["product", ...p.stack],
      weight: p.featured ? 0.75 : 0.65,
    });
  }

  for (const s of solutions) {
    raw.push({
      id: `solution-${s.slug}`,
      label: s.title,
      subtitle: s.description,
      detail: s.points.slice(0, 2).join(" · "),
      href: `/solutions#${s.slug}`,
      group: "Solutions",
      icon: s.icon,
      keywords: ["solution"],
      weight: 0.65,
    });
  }

  for (const i of industries) {
    raw.push({
      id: `industry-${i.slug}`,
      label: i.title,
      subtitle: i.description,
      href: `/industries#${i.slug}`,
      group: "Industries",
      icon: i.icon,
      keywords: ["industry", "sector"],
      weight: 0.6,
    });
  }

  for (const c of caseStudies) {
    raw.push({
      id: `case-${c.slug}`,
      label: c.title,
      subtitle: c.tagline,
      detail: `${c.label} · ${c.industry}`,
      href: `/case-studies/${c.slug}`,
      group: "Case Studies",
      icon: Star,
      keywords: ["case study", c.industry, ...c.technologies],
      weight: 0.6,
    });
  }

  for (const i of insights) {
    raw.push({
      id: `insight-${i.slug}`,
      label: i.title,
      subtitle: i.excerpt,
      detail: `${i.category} · ${i.readingTime}`,
      href: `/insights/${i.slug}`,
      group: "Insights",
      icon: BookOpen,
      keywords: ["insight", "article", i.category, ...(i.tags ?? [])],
      weight: i.featured ? 0.65 : 0.55,
    });
  }

  for (const r of careers) {
    raw.push({
      id: `career-${normalize(r.title).replace(/\s+/g, "-")}`,
      label: r.title,
      subtitle: r.description,
      detail: r.type,
      href: "/careers",
      group: "Careers",
      icon: Briefcase,
      keywords: ["career", "job", "role", "hiring"],
      weight: 0.5,
    });
  }

  faqs.forEach((f, idx) => {
    raw.push({
      id: `faq-${idx}`,
      label: f.question,
      subtitle: f.answer,
      href: "/#faq",
      group: "FAQ",
      icon: HelpCircle,
      keywords: ["faq", "question", "help"],
      weight: 0.5,
    });
  });

  for (const t of studioTopics) {
    raw.push({
      id: `studio-${normalize(t.title).replace(/\s+/g, "-")}`,
      label: t.title,
      subtitle: t.description,
      href: "/studio",
      group: "Studio",
      icon: Video,
      keywords: ["studio", "content", "media"],
      weight: 0.45,
    });
  }

  for (const o of openSourceProjects) {
    raw.push({
      id: `oss-${normalize(o.name).replace(/\s+/g, "-")}`,
      label: o.name,
      subtitle: o.description,
      detail: `${o.language} · ${o.focus}`,
      href: "/open-source",
      group: "Open Source",
      icon: GitBranch,
      keywords: ["open source", "github", o.language, o.focus],
      weight: 0.45,
    });
  }

  return raw.map(finalize);
}
