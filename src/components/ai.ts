// ai.ts — Advanced AI Search Assistant with context awareness

import type { SearchDoc, AIAnswer } from "./types";
import { queryCache } from "./cache";

/* ═══════════════════════════════════════════════════════════════════════
   KNOWLEDGE BASE (Indexed content for AI answers)
   ═══════════════════════════════════════════════════════════════════════ */

interface KnowledgeEntry {
  patterns: RegExp[];
  answer: string;
  confidence: number;
  category: string;
  relatedIds: string[];
  followUps: string[];
  actions: Array<{ label: string; href: string }>;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: [
      /what.*cloud.*solution.*fintech|best.*cloud.*fintech|fintech.*infrastructure/i,
      /how.*pedumo.*help.*fintech|fintech.*service/i,
    ],
    answer: "Pedumo's Cloud Architecture & DevOps services are purpose-built for fintech. We deliver PCI-DSS compliant infrastructure on AWS/Azure with automated CI/CD, real-time monitoring, auto-scaling, and SOC 2 controls. Our fintech clients see 99.99% uptime and 40% faster deployment cycles.",
    confidence: 0.94,
    category: "Services",
    relatedIds: ["service-cloud-architecture", "service-devops", "page-security"],
    followUps: [
      "What compliance frameworks do you support?",
      "How long does fintech infrastructure setup take?",
      "Can you handle high-frequency trading workloads?",
    ],
    actions: [
      { label: "View Cloud Services", href: "/services#cloud-architecture" },
      { label: "Book Consultation", href: "/book" },
    ],
  },
  {
    patterns: [
      /best.*ai.*service|what.*ai.*pedumo|ai.*solution/i,
      /machine learning|llm|gpt|anthropic|openai.*integration/i,
    ],
    answer: "Our AI & Machine Learning service builds production-grade LLM applications, RAG pipelines, and intelligent agents. We work with OpenAI, Anthropic, and open-source models (Llama, Mistral) to create context-aware AI that understands your business domain. Typical projects include chatbots, document analysis, and predictive analytics.",
    confidence: 0.93,
    category: "Services",
    relatedIds: ["service-ai-machine-learning", "product-intellisearch", "page-insights"],
    followUps: [
      "What LLM models do you recommend?",
      "How do you handle AI data privacy?",
      "Can you build a custom AI agent?",
    ],
    actions: [
      { label: "Explore AI Services", href: "/services#ai-machine-learning" },
      { label: "See AI Products", href: "/products" },
    ],
  },
  {
    patterns: [
      /how.*pedumo.*help.*healthcare|healthcare.*solution|medical.*software|hipaa/i,
    ],
    answer: "Pedumo helps healthcare organizations with HIPAA-compliant cloud infrastructure, secure patient data platforms, AI-powered diagnostics, and interoperability solutions (FHIR/HL7). We ensure end-to-end encryption, audit logging, and compliance with FDA 21 CFR Part 11 where applicable.",
    confidence: 0.91,
    category: "Industries",
    relatedIds: ["industry-healthcare", "service-security", "service-cloud-architecture"],
    followUps: [
      "What HIPAA controls do you implement?",
      "Can you integrate with Epic or Cerner?",
      "How do you handle PHI data encryption?",
    ],
    actions: [
      { label: "Healthcare Solutions", href: "/industries#healthcare" },
      { label: "Security Overview", href: "/security" },
    ],
  },
  {
    patterns: [
      /pricing|cost|how much|engagement.*model|rate/i,
    ],
    answer: "Pedumo offers three flexible engagement models: (1) Project-based with fixed scope and timeline, (2) Monthly retainer for ongoing development, and (3) Dedicated team for long-term partnerships. Pricing depends on scope, complexity, and timeline. Most MVPs start at $15K-$50K, while enterprise engagements are customized.",
    confidence: 0.92,
    category: "Pricing",
    relatedIds: ["page-pricing", "action-book"],
    followUps: [
      "What is included in the retainer?",
      "Do you offer startup discounts?",
      "How does the dedicated team model work?",
    ],
    actions: [
      { label: "View Pricing", href: "/pricing" },
      { label: "Get a Quote", href: "/book" },
    ],
  },
  {
    patterns: [
      /contact|reach.*us|get in touch|email|phone|call/i,
    ],
    answer: "You can reach Pedumo through multiple channels: (1) Book a consultation directly from this command palette or at /book, (2) Email us at hello@pedumo.com, (3) Use the contact form at /contact. We typically respond within 24 hours for inquiries and 2 hours for existing clients.",
    confidence: 0.95,
    category: "Contact",
    relatedIds: ["action-contact", "action-book", "page-about"],
    followUps: [
      "What time zones do you work in?",
      "Do you offer on-site consultations?",
      "Can I schedule a video call?",
    ],
    actions: [
      { label: "Contact Us", href: "/contact" },
      { label: "Book Call", href: "/book" },
    ],
  },
  {
    patterns: [
      /security|secure|compliance|soc 2|owasp|penetration.*test|audit/i,
    ],
    answer: "Security is foundational at Pedumo. We follow OWASP Top 10, implement SOC 2 Type II controls, conduct quarterly penetration testing, and maintain end-to-end encryption. Our Security & Resilience service includes threat modeling, vulnerability assessments, incident response planning, and continuous security monitoring.",
    confidence: 0.90,
    category: "Security",
    relatedIds: ["service-security", "page-trust-center", "page-security"],
    followUps: [
      "What compliance certifications do you have?",
      "How often do you perform security audits?",
      "Do you offer security training?",
    ],
    actions: [
      { label: "Security Overview", href: "/security" },
      { label: "Trust Center", href: "/trust-center" },
    ],
  },
  {
    patterns: [
      /startup|mvp|minimum viable product|early stage|founder/i,
    ],
    answer: "Our Startup Engineering service helps founders build MVPs in 4-8 weeks using modern stacks (Next.js, React, Node.js, Python). We provide technical co-founder support, architecture guidance, and scalable infrastructure from day one. 90% of our startup clients raise funding within 6 months of launch.",
    confidence: 0.88,
    category: "Services",
    relatedIds: ["service-startup-engineering", "page-founder", "page-pricing"],
    followUps: [
      "What tech stack do you recommend for MVPs?",
      "How much does an MVP cost?",
      "Do you help with fundraising decks?",
    ],
    actions: [
      { label: "Startup Services", href: "/services#startup-engineering" },
      { label: "Founder Profile", href: "/founder" },
    ],
  },
  {
    patterns: [
      /mobile.*app|ios|android|react native|flutter|cross.*platform/i,
    ],
    answer: "Pedumo builds cross-platform mobile apps using React Native and Flutter with native module integration. We implement offline-first architecture, push notifications, biometric auth, and app store optimization. Our mobile apps average 4.7+ star ratings and 40% higher user retention than industry benchmarks.",
    confidence: 0.87,
    category: "Services",
    relatedIds: ["service-mobile-development", "product-omnichannel"],
    followUps: [
      "React Native or Flutter—which should I choose?",
      "Do you handle app store submissions?",
      "Can you integrate with existing backends?",
    ],
    actions: [
      { label: "Mobile Development", href: "/services#mobile-development" },
    ],
  },
  {
    patterns: [
      /api|rest|graphql|webhook|integration|microservice/i,
    ],
    answer: "Our API Development & Integration service designs RESTful and GraphQL APIs with OpenAPI specs, rate limiting, and enterprise-grade security. We build microservices with gRPC, event-driven architectures with Kafka, and third-party integrations (Stripe, Salesforce, HubSpot). All APIs include automated testing and documentation.",
    confidence: 0.89,
    category: "Services",
    relatedIds: ["service-api-development", "service-cloud-architecture"],
    followUps: [
      "REST or GraphQL—which should I choose?",
      "How do you handle API versioning?",
      "Can you integrate with legacy systems?",
    ],
    actions: [
      { label: "API Services", href: "/services#api-development" },
    ],
  },
  {
    patterns: [
      /database|postgres|mongodb|redis|data.*warehouse|etl|analytics/i,
    ],
    answer: "We design and optimize database architectures using PostgreSQL, MongoDB, Redis, and cloud data warehouses (BigQuery, Snowflake). Our Data Engineering service handles ETL pipelines, real-time analytics, and ML feature stores. We specialize in query optimization, sharding strategies, and zero-downtime migrations.",
    confidence: 0.86,
    category: "Services",
    relatedIds: ["service-data-engineering", "service-cloud-architecture"],
    followUps: [
      "SQL or NoSQL—which should I choose?",
      "How do you handle database migrations?",
      "Can you set up real-time analytics?",
    ],
    actions: [
      { label: "Data Engineering", href: "/services#data-engineering" },
    ],
  },
  {
    patterns: [
      /design|ui|ux|interface|figma|prototype|user.*experience/i,
    ],
    answer: "Our Design & UX service creates intuitive, accessible interfaces using Figma, design systems, and user research. We follow WCAG 2.1 AA standards, conduct usability testing, and deliver responsive designs that work across all devices. Every design decision is backed by user data and business goals.",
    confidence: 0.85,
    category: "Services",
    relatedIds: ["service-design-ux", "page-about"],
    followUps: [
      "What is your design process?",
      "Do you offer design systems?",
      "How do you handle accessibility?",
    ],
    actions: [
      { label: "Design Services", href: "/services#design-ux" },
    ],
  },
  {
    patterns: [
      /performance|speed|optimization|cache|latency|fast/i,
    ],
    answer: "Performance is a first-class concern at Pedumo. We implement edge caching with Cloudflare, database query optimization, code splitting, image optimization, and Core Web Vitals monitoring. Our clients typically see 60%+ improvement in page load times and 90%+ Lighthouse scores.",
    confidence: 0.84,
    category: "Services",
    relatedIds: ["service-performance-optimization", "service-cloud-architecture"],
    followUps: [
      "How do you measure performance?",
      "What caching strategies do you use?",
      "Can you optimize an existing application?",
    ],
    actions: [
      { label: "Performance Services", href: "/services#performance-optimization" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   AI ANSWER GENERATOR
   ═══════════════════════════════════════════════════════════════════════ */

export function generateAIAnswer(
  query: string,
  topDocs: SearchDoc[]
): AIAnswer | null {
  // Check cache first
  const cacheKey = `ai:${query.toLowerCase().trim()}`;
  const cached = queryCache.get(cacheKey) as AIAnswer | undefined;
  if (cached) return cached;

  const q = query.toLowerCase().trim();
  if (!q || q.length < 3) return null;

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    for (const pattern of entry.patterns) {
      if (pattern.test(q)) {
        const score = entry.confidence;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry;
        }
      }
    }
  }

  // Also check semantic similarity with top docs
  if (!bestMatch && topDocs.length > 0) {
    const semanticMatch = findSemanticMatch(q, topDocs);
    if (semanticMatch) {
      bestMatch = semanticMatch;
      bestScore = semanticMatch.confidence;
    }
  }

  if (!bestMatch || bestScore < 0.6) return null;

  const sources = topDocs
    .filter((d) => bestMatch!.relatedIds.includes(d.id))
    .slice(0, 3)
    .map((d) => ({ id: d.id, label: d.label, href: d.href }));

  // Fallback sources if none matched
  if (sources.length === 0 && topDocs.length > 0) {
    sources.push(...topDocs.slice(0, 3).map((d) => ({ id: d.id, label: d.label, href: d.href })));
  }

  const answer: AIAnswer = {
    answer: bestMatch.answer,
    confidence: bestScore,
    sources,
  };

  // Cache the result
  queryCache.set(cacheKey, answer);

  return answer;
}

/* ═══════════════════════════════════════════════════════════════════════
   SEMANTIC MATCHING (Fallback when no pattern matches)
   ═══════════════════════════════════════════════════════════════════════ */

function findSemanticMatch(query: string, docs: SearchDoc[]): KnowledgeEntry | null {
  const qTokens = new Set(query.split(/\s+/).filter((t) => t.length > 2));
  let bestDoc: SearchDoc | null = null;
  let bestOverlap = 0;

  for (const doc of docs) {
    const docTokens = new Set([...doc.tokens, ...doc.keywords]);
    const overlap = [...qTokens].filter((t) => docTokens.has(t)).length;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      bestDoc = doc;
    }
  }

  if (bestDoc && bestOverlap >= 2) {
    return {
      patterns: [],
      answer: `Based on your search, you might be interested in ${bestDoc.label}. ${bestDoc.subtitle}`,
      confidence: 0.6 + bestOverlap * 0.05,
      category: bestDoc.group,
      relatedIds: [bestDoc.id],
      followUps: [`Tell me more about ${bestDoc.label}`, `How does ${bestDoc.label} work?`],
      actions: [{ label: `View ${bestDoc.label}`, href: bestDoc.href }],
    };
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════
   FOLLOW-UP SUGGESTIONS
   ═══════════════════════════════════════════════════════════════════════ */

export function generateFollowUps(answer: AIAnswer): string[] {
  const entry = KNOWLEDGE_BASE.find((e) => e.answer === answer.answer);
  return entry?.followUps ?? [];
}

/* ═══════════════════════════════════════════════════════════════════════
   RELATED ACTIONS
   ═══════════════════════════════════════════════════════════════════════ */

export function getRelatedActions(answer: AIAnswer): Array<{ label: string; href: string }> {
  const entry = KNOWLEDGE_BASE.find((e) => e.answer === answer.answer);
  return entry?.actions ?? [];
}
