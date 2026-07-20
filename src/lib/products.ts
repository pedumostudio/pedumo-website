import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Sparkles,
  Workflow,
  Briefcase,
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Plug,
  Video,
  RefreshCcw,
} from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  summary: string;
  problems: string[];
  stack: string[];
  outcomes: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    tagline: "Grounded AI workflows that run your operations at scale.",
    icon: Bot,
    summary:
      "Agentic and rule-based automation that connects your systems, tools and data with evaluation and human oversight built in.",
    problems: [
      "Teams drowning in repetitive triage and data entry",
      "AI pilots that never survive contact with production",
      "No guardrails or auditability around model output",
    ],
    stack: ["Anthropic", "OpenAI", "Google AI", "n8n", "Retrieval pipelines", "Evaluation harnesses"],
    outcomes: [
      "Hours of manual work recovered weekly",
      "Consistent quality at 24/7 scale",
      "AI you can defend to auditors",
    ],
    featured: true,
  },
  {
    slug: "ai-assistants",
    name: "AI Assistants",
    tagline: "Purpose-built assistants for your teams and customers.",
    icon: Sparkles,
    summary:
      "Retrieval-grounded assistants for internal knowledge and customer support — fast, accurate and observable.",
    problems: [
      "Support volume outpacing headcount",
      "Internal knowledge trapped in documents and heads",
      "Inconsistent answers across channels",
    ],
    stack: ["Vector search", "Grounded LLMs", "Confidence thresholds", "Human handoff", "Analytics"],
    outcomes: [
      "Faster first response",
      "Deflected routine questions",
      "Consistent, cited answers",
    ],
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    tagline: "Replace manual handoffs with reliable, observable flows.",
    icon: Workflow,
    summary:
      "We map your operations and rebuild them as automated workflows with approvals, retries and audit trails.",
    problems: [
      "Manual handoffs causing delays and errors",
      "No visibility into where work stalls",
      "Processes that don't scale with volume",
    ],
    stack: ["n8n", "Webhooks", "Queues", "Approval engines", "Audit logging"],
    outcomes: [
      "End-to-end process visibility",
      "Fewer human errors",
      "Operations that scale",
    ],
  },
  {
    slug: "business-software",
    name: "Business Software",
    tagline: "Custom platforms that run your business, not fight it.",
    icon: Briefcase,
    summary:
      "Role-based internal software that unifies operations, approvals and reporting into one source of truth.",
    problems: [
      "Spreadsheet-driven operations",
      "Disconnected tools with manual reconciliation",
      "No single source of truth for leadership",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "RBAC", "Audit logs"],
    outcomes: [
      "One source of truth",
      "Faster approvals",
      "Lower operational cost",
    ],
  },
  {
    slug: "custom-saas",
    name: "Custom SaaS Development",
    tagline: "Ship a fundable, defensible SaaS without the technical debt.",
    icon: Code2,
    summary:
      "From MVP to scale: multi-tenant architecture, billing, auth and analytics built to grow with you.",
    problems: [
      "MVPs that can't scale past early customers",
      "Billing and auth bolted on late",
      "Technical debt blocking the roadmap",
    ],
    stack: ["Multi-tenancy", "Stripe billing", "Auth.js", "Postgres", "Observability"],
    outcomes: [
      "Investor-ready architecture",
      "Usage-based monetization",
      "Faster feature velocity",
    ],
    featured: true,
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud Infrastructure",
    tagline: "Resilient, cost-efficient cloud that scales with demand.",
    icon: Cloud,
    summary:
      "Infrastructure-as-code, edge networking and zero-downtime migration for workloads that cannot fail.",
    problems: [
      "Unpredictable cloud spend",
      "Single points of failure",
      "Migrations stalled by fear",
    ],
    stack: ["Cloudflare", "Vercel", "DigitalOcean", "IaC", "CDN & caching"],
    outcomes: [
      "Predictable spend",
      "High availability",
      "Elastic scale",
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Security engineered in from the first commit.",
    icon: ShieldCheck,
    summary:
      "Threat modeling, hardening, encryption, access control and monitoring aligned to OWASP and recognized frameworks.",
    problems: [
      "Unknown attack surface",
      "Compliance without a roadmap",
      "Security as an afterthought",
    ],
    stack: ["OWASP ASVS", "Threat modeling", "IAM", "Encryption", "SIEM"],
    outcomes: [
      "Measurably smaller attack surface",
      "Audit readiness",
      "Customer trust",
    ],
    featured: true,
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    tagline: "Decision infrastructure for leadership.",
    icon: BarChart3,
    summary:
      "Modeled metrics, real-time dashboards, forecasting and anomaly detection on a governed data foundation.",
    problems: [
      "Numbers that differ between teams",
      "Dashboard sprawl, no agreed definitions",
      "No early warning on drift",
    ],
    stack: ["Postgres", "Pipelines", "Dashboards", "Forecasting", "Anomaly detection"],
    outcomes: [
      "Trusted metrics",
      "Earlier risk detection",
      "Shared operating picture",
    ],
  },
  {
    slug: "api-integration",
    name: "API Integration",
    tagline: "Connect every system in your stack reliably.",
    icon: Plug,
    summary:
      "Versioned, documented and resilient integrations across payments, CRMs, ERPs and internal tools.",
    problems: [
      "Brittle point-to-point integrations",
      "No retries or idempotency",
      "Undocumented contracts",
    ],
    stack: ["REST & GraphQL", "Webhooks", "Queues", "Idempotency", "OpenAPI"],
    outcomes: [
      "Stable integrations",
      "Faster partner onboarding",
      "Observable data flow",
    ],
  },
  {
    slug: "ai-video-automation",
    name: "AI Video Automation",
    tagline: "Produce video content at scale, without a studio.",
    icon: Video,
    summary:
      "Automated pipelines for scripted explainers, product demos and localized content from structured inputs.",
    problems: [
      "Video production is slow and expensive",
      "Localization multiplies cost",
      "Brand consistency drifts",
    ],
    stack: ["Script generation", "TTS", "Render pipelines", "Brand templates", "Localization"],
    outcomes: [
      "10× content throughput",
      "Consistent brand",
      "Localized at marginal cost",
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    tagline: "Modernize without stopping the business.",
    icon: RefreshCcw,
    summary:
      "Incremental migration of legacy estates and manual processes into secure, scalable digital platforms.",
    problems: [
      "Aging systems with rising risk",
      "Paper processes that don't scale",
      "Initiatives that stall before delivery",
    ],
    stack: ["Strangler patterns", "Incremental migration", "Change management", "Integration"],
    outcomes: [
      "Retired legacy risk",
      "Operations that scale",
      "Transformation that ships",
    ],
  },
];
