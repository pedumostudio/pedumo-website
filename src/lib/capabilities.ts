import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Bot,
  Cloud,
  ShieldCheck,
  Database,
  GitBranch,
  RefreshCcw,
  BarChart3,
  Siren,
  Lock,
  ServerCog,
  FileCheck2,
  Activity,
  Layers,
  ClipboardCheck,
} from "lucide-react";

export type Capability = {
  slug: string;
  index: string;
  title: string;
  icon: LucideIcon;
  definition: string;
  problems: string[];
  stack: string[];
  outcomes: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "software-engineering",
    index: "01",
    title: "Software Engineering",
    icon: Code2,
    definition:
      "Design and delivery of production-grade software systems — web platforms, enterprise applications and APIs — engineered for correctness, maintainability and change.",
    problems: [
      "Legacy systems that resist change and slow every initiative",
      "Vendor codebases nobody can safely modify",
      "Products that break under real-world load and edge cases",
    ],
    stack: ["TypeScript", "React / Next.js", "Node.js", "Python", "PostgreSQL", "Test automation & CI"],
    outcomes: [
      "Faster, safer release cycles",
      "Lower defect and rework rates",
      "Systems your team can evolve for years",
    ],
  },
  {
    slug: "ai-automation",
    index: "02",
    title: "AI Automation",
    icon: Bot,
    definition:
      "Grounded AI systems and agentic workflows that remove repetitive work, augment decision-making and operate with evaluation and human oversight built in.",
    problems: [
      "Teams drowning in repetitive triage, routing and data entry",
      "AI pilots that never survive contact with production",
      "No guardrails, evaluation or auditability around model output",
    ],
    stack: ["Anthropic", "OpenAI", "Google AI", "n8n", "Retrieval pipelines", "Evaluation harnesses"],
    outcomes: [
      "Hours of manual work recovered weekly",
      "Consistent quality at 24/7 scale",
      "AI you can defend to auditors and boards",
    ],
  },
  {
    slug: "cloud-engineering",
    index: "03",
    title: "Cloud Engineering",
    icon: Cloud,
    definition:
      "Resilient, cost-efficient cloud architecture — from greenfield infrastructure to zero-downtime migration of workloads that cannot afford to fail.",
    problems: [
      "Unpredictable cloud spend with no clear owner",
      "Single points of failure discovered during outages",
      "Migrations stalled by fear of breaking production",
    ],
    stack: ["Cloudflare", "Vercel", "DigitalOcean", "Infrastructure as code", "Edge networking", "CDN & caching"],
    outcomes: [
      "Predictable, optimized cloud spend",
      "High availability by design",
      "Elastic capacity for growth",
    ],
  },
  {
    slug: "cybersecurity",
    index: "04",
    title: "Cybersecurity",
    icon: ShieldCheck,
    definition:
      "Security engineered into every layer — threat modeling, hardening, encryption, access control and continuous monitoring aligned to OWASP and recognized frameworks.",
    problems: [
      "Unknown attack surface across apps, APIs and infrastructure",
      "Compliance requirements with no technical roadmap",
      "Security treated as a launch-week afterthought",
    ],
    stack: ["OWASP ASVS", "Threat modeling", "Encryption in transit & at rest", "IAM & least privilege", "SIEM & monitoring"],
    outcomes: [
      "Reduced attack surface, measurably",
      "Audit and compliance readiness",
      "Customer and regulator trust",
    ],
  },
  {
    slug: "data-engineering",
    index: "05",
    title: "Data Engineering",
    icon: Database,
    definition:
      "Trusted data foundations — modeling, pipelines, analytics, dashboards and governance that turn fragmented operational data into a single, AI-ready source of truth.",
    problems: [
      "Critical numbers that differ between departments",
      "Slow queries and reports as data volume grows",
      "Data silos blocking analytics and AI initiatives",
      "No real-time visibility into business health",
    ],
    stack: [
      "PostgreSQL",
      "ETL / ELT pipelines",
      "Python",
      "Data modeling & warehousing",
      "Analytics & dashboards",
      "Redis",
      "Quality & lineage controls",
      "AI-ready feature stores",
    ],
    outcomes: [
      "One trusted source of truth",
      "Real-time dashboards for leadership",
      "Query performance at scale",
      "AI-ready data infrastructure",
    ],
  },
  {
    slug: "devops-platform-engineering",
    index: "06",
    title: "DevOps & Platform Engineering",
    icon: GitBranch,
    definition:
      "Delivery platforms that make shipping boring — automated pipelines, infrastructure as code, observability and safe deployment practices for engineering teams.",
    problems: [
      "Deployments that require heroics and weekend windows",
      "No visibility into what is failing or why",
      "Environments that drift and break unpredictably",
    ],
    stack: ["CI/CD automation", "Infrastructure as code", "Observability & alerting", "Container platforms", "Release engineering"],
    outcomes: [
      "Deploy on demand, roll back in seconds",
      "Full production visibility",
      "Engineering velocity without risk",
    ],
  },
  {
    slug: "digital-transformation",
    index: "07",
    title: "Digital Transformation",
    icon: RefreshCcw,
    definition:
      "Modernization of operations and legacy estates — replacing manual processes and aging systems with secure digital platforms, without stopping the business.",
    problems: [
      "Paper and spreadsheet processes that cannot scale",
      "Aging systems with rising maintenance cost and risk",
      "Digital initiatives that stall between strategy and delivery",
    ],
    stack: ["Process mapping", "Incremental migration", "Application modernization", "Change management", "Integration engineering"],
    outcomes: [
      "Operations that scale without headcount",
      "Retired legacy risk and cost",
      "Transformation that actually ships",
    ],
  },
  {
    slug: "business-intelligence",
    index: "08",
    title: "Business Intelligence & Analytics",
    icon: BarChart3,
    definition:
      "Decision infrastructure for leadership — modeled metrics, real-time dashboards, forecasting and anomaly detection that surface the signals that matter.",
    problems: [
      "Leaders deciding on instinct because data is late or wrong",
      "Dashboard sprawl with no agreed definitions",
      "No early warning when key metrics drift",
    ],
    stack: ["Metrics modeling", "Real-time dashboards", "Forecasting", "Anomaly detection", "Role-based reporting"],
    outcomes: [
      "Decisions grounded in trusted numbers",
      "Earlier detection of risk and opportunity",
      "A shared operating picture for leadership",
    ],
  },
  {
    slug: "incident-response",
    index: "09",
    title: "Incident Response & Digital Resilience",
    icon: Siren,
    definition:
      "Preparation for the worst day — response playbooks, digital forensics, compromised-infrastructure recovery, backup architecture and business continuity planning for critical systems.",
    problems: [
      "No tested plan for breach, outage or data loss",
      "No forensics capability to understand what happened",
      "Recovery objectives that exist only on paper",
      "Repeat incidents because root causes are never fixed",
    ],
    stack: [
      "Response playbooks",
      "Digital forensics & evidence preservation",
      "Compromised-infrastructure rebuild",
      "Backup & recovery architecture",
      "Chaos & failover testing",
      "Business continuity planning",
    ],
    outcomes: [
      "Minutes of downtime instead of days",
      "Forensically sound investigation",
      "Resilience regulators and customers can verify",
    ],
  },
];

export type TrustPillar = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const trustPillars: TrustPillar[] = [
  {
    title: "Security-first engineering",
    icon: Lock,
    description:
      "Threat modeling before code, OWASP-aligned defaults, dependency and secret scanning in every pipeline.",
  },
  {
    title: "Secure architecture & cloud security",
    icon: ServerCog,
    description:
      "Least-privilege access, network segmentation, encrypted transport and hardened cloud configurations by default.",
  },
  {
    title: "Data protection & governance",
    icon: FileCheck2,
    description:
      "Encryption at rest, retention policies, access auditing and data-handling aligned to regulatory expectations.",
  },
  {
    title: "Incident response & continuity",
    icon: Siren,
    description:
      "Documented playbooks, tested backups and recovery objectives that hold up under real failure, not just audits.",
  },
  {
    title: "Reliability & performance",
    icon: Activity,
    description:
      "Observability, load testing and capacity planning so platforms stay fast and available as demand multiplies.",
  },
  {
    title: "Disciplined delivery",
    icon: ClipboardCheck,
    description:
      "An eight-step methodology with reviews, demos and documentation — quality as a system, not a promise.",
  },
];

export type Outcome = {
  metric: string;
  title: string;
  description: string;
};

export const businessOutcomes: Outcome[] = [
  {
    metric: "Speed",
    title: "Ship in weeks, not quarters",
    description:
      "Disciplined scope, senior engineers and automated delivery pipelines compress time-to-value without cutting corners.",
  },
  {
    metric: "Cost",
    title: "Lower total cost of ownership",
    description:
      "Maintainable architecture and automation reduce the long tail of rework, incidents and manual operations that quietly drain budgets.",
  },
  {
    metric: "Risk",
    title: "Security and continuity by design",
    description:
      "Threat modeling, encryption, tested recovery and audit-ready controls protect revenue, reputation and regulatory standing.",
  },
  {
    metric: "Scale",
    title: "Platforms that grow with you",
    description:
      "Systems engineered for 10× demand — from first customers to national-scale workloads — without re-platforming.",
  },
];

export type Resource = {
  title: string;
  type: "Guide" | "Checklist" | "Framework";
  description: string;
  icon: LucideIcon;
};

export const resources: Resource[] = [
  {
    title: "The Executive's AI Automation Readiness Checklist",
    type: "Checklist",
    description:
      "Twenty questions to answer before funding any AI initiative — covering data readiness, guardrails, evaluation and ROI.",
    icon: ClipboardCheck,
  },
  {
    title: "Secure-by-Design Architecture Framework",
    type: "Framework",
    description:
      "The layered security model we apply to every engagement, mapped to OWASP and practical cloud controls.",
    icon: Layers,
  },
  {
    title: "Legacy Modernization Without Downtime: A Field Guide",
    type: "Guide",
    description:
      "How to migrate critical systems incrementally — strangler patterns, data cutover strategies and rollback safety.",
    icon: RefreshCcw,
  },
];
