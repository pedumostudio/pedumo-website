// search-index.ts — Builds the lightweight search index from content sources

import type { SearchDoc } from "./types";
import { normalize, tokenize } from "./search-engine";

import {
  services,
  solutions,
  industries,
  caseStudies,
  insights,
  faqs,
  careers,
  openSourceProjects,
  studioTopics,
} from "@/lib/content";
import { products } from "@/lib/products";

/* ═══════════════════════════════════════════════════════════════════════
   INDEX BUILDER
   ═══════════════════════════════════════════════════════════════════════ */

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  const add = (
    id: string,
    label: string,
    subtitle: string,
    href: string,
    group: string,
    searchCorpus: string,
    keywords: string[],
    icon?: SearchDoc["icon"],
    detail?: string
  ) => {
    docs.push({
      id,
      label,
      subtitle,
      href,
      group,
      icon,
      tokens: tokenize(label),
      normLabel: normalize(label),
      normSubtitle: normalize(subtitle),
      normCorpus: normalize(searchCorpus),
      keywords: keywords.map((k) => normalize(k)),
      detail,
    });
  };

  // ── Pages ─────────────────────────────────────────────────────
  add("page-home", "Home", "Landing page", "/", "Pages", "home landing page", ["home", "landing", "start"]);
  add("page-services", "Services", "Nine disciplines", "/services", "Pages", "services nine disciplines engineering", ["services", "engineering", "disciplines"]);
  add("page-products", "Products", "Engineered products", "/products", "Pages", "products engineered solutions", ["products", "solutions", "software"]);
  add("page-solutions", "Solutions", "Outcome-focused", "/solutions", "Pages", "solutions outcome focused", ["solutions", "outcomes", "results"]);
  add("page-industries", "Industries", "Who we serve", "/industries", "Pages", "industries who we serve sectors", ["industries", "sectors", "clients"]);
  add("page-case-studies", "Case Studies", "Proof of capability", "/case-studies", "Pages", "case studies proof of capability portfolio", ["case studies", "portfolio", "work", "projects"]);
  add("page-security", "Security", "Security & resilience", "/security", "Pages", "security resilience protection", ["security", "resilience", "protection", "cybersecurity"]);
  add("page-trust-center", "Trust Center", "Commitments & controls", "/trust-center", "Pages", "trust center commitments controls compliance", ["trust", "compliance", "controls"]);
  add("page-status", "Status", "Service availability", "/status", "Pages", "status service availability uptime", ["status", "uptime", "availability"]);
  add("page-changelog", "Changelog", "Release history", "/changelog", "Pages", "changelog release history updates", ["changelog", "updates", "releases"]);
  add("page-pricing", "Pricing", "Engagement models", "/pricing", "Pages", "pricing engagement models cost", ["pricing", "cost", "plans"]);
  add("page-founder", "Founder", "Leadership profile", "/founder", "Pages", "founder leadership profile balogun adeolu", ["founder", "leadership", "ceo"]);
  add("page-about", "About", "The Pedumo story", "/about", "Pages", "about the pedumo story company", ["about", "company", "story"]);
  add("page-insights", "Insights", "Engineering notes", "/insights", "Pages", "insights engineering notes blog articles", ["insights", "blog", "articles", "engineering"]);
  add("page-careers", "Careers", "Open roles", "/careers", "Pages", "careers open roles jobs hiring", ["careers", "jobs", "hiring", "work"]);
  add("page-partners", "Partners", "Partner program", "/partners", "Pages", "partners partner program collaboration", ["partners", "collaboration", "alliance"]);
  add("page-press", "Press", "Media kit", "/press", "Pages", "press media kit news", ["press", "media", "news"]);
  add("page-docs", "Documentation", "Coming soon", "/docs", "Pages", "documentation docs coming soon api reference", ["docs", "documentation", "api", "reference"]);

  // ── Actions ───────────────────────────────────────────────────
  add("action-book", "Book Consultation", "Start a conversation", "/book", "Actions", "book consultation start a conversation meeting", ["book", "consultation", "meeting", "call"]);
  add("action-contact", "Contact", "Get in touch", "/contact", "Actions", "contact get in touch email message", ["contact", "email", "message", "reach"]);

  // ── Services ──────────────────────────────────────────────────
  for (const s of services) {
    add(
      `service-${s.slug}`, s.title,
      s.summary.slice(0, 90) + (s.summary.length > 90 ? "..." : ""),
      `/services#${s.slug}`, "Services",
      [s.title, s.summary, s.slug, ...(s.outcomes ?? [])].join(" "),
      [s.slug, ...(s.outcomes ?? [])], s.icon, s.outcomes?.join(" • ")
    );
  }

  // ── Products ──────────────────────────────────────────────────
  for (const p of products) {
    add(
      `product-${p.slug}`, p.name, p.tagline,
      `/products/${p.slug}`, "Products",
      [p.name, p.tagline, p.summary, ...(p.problems ?? []), ...(p.stack ?? []), ...(p.outcomes ?? [])].join(" "),
      [p.slug, ...(p.stack ?? []), ...(p.outcomes ?? [])], p.icon, p.outcomes?.join(" • ")
    );
  }

  // ── Solutions ─────────────────────────────────────────────────
  for (const s of solutions) {
    add(
      `solution-${s.slug}`, s.title, s.description,
      `/solutions#${s.slug}`, "Solutions",
      [s.title, s.description, ...(s.points ?? [])].join(" "),
      [s.slug, ...(s.points ?? [])], s.icon, s.points?.join(" • ")
    );
  }

  // ── Industries ────────────────────────────────────────────────
  for (const i of industries) {
    add(
      `industry-${i.slug}`, i.title, i.description,
      `/industries#${i.slug}`, "Industries",
      [i.title, i.description].join(" "), [i.slug], i.icon
    );
  }

  // ── Case Studies ────────────────────────────────────────────────
  for (const c of caseStudies) {
    add(
      `case-${c.slug}`, c.title, c.tagline,
      `/case-studies#${c.slug}`, "Case Studies",
      [c.title, c.tagline, c.industry, c.problem, c.solution, ...(c.architecture ?? []), ...(c.technologies ?? []), ...(c.lessons ?? [])].join(" "),
      [c.slug, c.industry, ...(c.technologies ?? [])], undefined, c.technologies?.join(" • ")
    );
  }

  // ── Insights ────────────────────────────────────────────────────
  for (const i of insights) {
    add(
      `insight-${i.slug}`, i.title, i.excerpt,
      `/insights/${i.slug}`, "Insights",
      [i.title, i.excerpt, i.category, ...(i.tags ?? []), ...(i.body ?? []), ...(i.sections?.map((s) => `${s.heading} ${s.text}`) ?? [])].join(" "),
      [i.category, ...(i.tags ?? []), i.author ?? ""], undefined, i.category
    );
  }

  // ── Careers ─────────────────────────────────────────────────────
  for (const c of careers) {
    add(
      `career-${c.title.toLowerCase().replace(/\s+/g, "-")}`, c.title, c.type,
      `/careers`, "Careers",
      [c.title, c.type, c.description].join(" "),
      ["job", "hiring", "role"], undefined,
      c.description.slice(0, 100) + (c.description.length > 100 ? "..." : "")
    );
  }

  // ── FAQ ─────────────────────────────────────────────────────────
  for (let idx = 0; idx < faqs.length; idx++) {
    const f = faqs[idx];
    add(
      `faq-${idx}`, f.question, "FAQ",
      `/faq#faq-${idx}`, "FAQ",
      [f.question, f.answer].join(" "),
      ["faq", "question", "help"], undefined,
      f.answer.slice(0, 120) + (f.answer.length > 120 ? "..." : "")
    );
  }

  // ── Studio Topics ───────────────────────────────────────────────
  for (const t of studioTopics) {
    add(
      `studio-${t.title.toLowerCase().replace(/\s+/g, "-")}`, t.title, t.description,
      `/studio`, "Studio",
      [t.title, t.description].join(" "),
      ["studio", "content", "video"], t.icon
    );
  }

  // ── Open Source ────────────────────────────────────────────────
  for (const o of openSourceProjects) {
    add(
      `oss-${o.name.toLowerCase().replace(/\s+/g, "-")}`, o.name, o.description,
      `/open-source`, "Open Source",
      [o.name, o.description, o.language, o.focus].join(" "),
      [o.language, o.focus, "open source", "github"], undefined,
      `${o.language} • ${o.focus}`
    );
  }

  return docs;
}
