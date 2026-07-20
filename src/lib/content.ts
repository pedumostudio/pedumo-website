import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Boxes,
  Workflow,
  BrainCircuit,
  Bot,
  Cloud,
  GitBranch,
  ShieldCheck,
  Plug,
  Database,
  BarChart3,
  Palette,
  Compass,
  RefreshCcw,
  Gauge,
  LifeBuoy,
  Rocket,
  Building2,
  Landmark,
  HeartHandshake,
  Store,
  Search,
  PenTool,
  Layers,
  TestTube2,
  Radar,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    icon: Code2,
    summary:
      "Production-grade systems built by engineers who own outcomes, not just tickets. Clean architecture, tested code, documented decisions.",
    outcomes: ["Maintainable codebases", "Faster release cycles", "Lower defect rates"],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    icon: Layers,
    summary:
      "Fast, accessible web products engineered on modern React and Next.js foundations that scale with your business.",
    outcomes: ["Sub-second load times", "SEO-ready by default", "Conversion-focused UX"],
  },
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    icon: Building2,
    summary:
      "Mission-critical platforms with role-based access, auditability and integrations across your existing tools.",
    outcomes: ["Regulatory readiness", "Single source of truth", "Reduced operational cost"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    icon: Workflow,
    summary:
      "We map your operations and replace repetitive manual work with reliable, observable automated workflows.",
    outcomes: ["Hours recovered weekly", "Fewer human errors", "Scalable operations"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    icon: BrainCircuit,
    summary:
      "Practical AI embedded into your products and processes — grounded, evaluated and safe for real business use.",
    outcomes: ["Augmented teams", "Faster decisions", "Measurable ROI"],
  },
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    icon: Bot,
    summary:
      "Agentic and rule-based automations that connect your systems, tools and data with human oversight where it matters.",
    outcomes: ["24/7 operations", "Auto-triaged work", "Consistent quality"],
  },
  {
    slug: "cloud-engineering",
    title: "Cloud Engineering",
    icon: Cloud,
    summary:
      "Resilient cloud infrastructure designed for cost efficiency, elasticity and uptime you can build a business on.",
    outcomes: ["High availability", "Predictable spend", "Elastic scale"],
  },
  {
    slug: "devops",
    title: "DevOps",
    icon: GitBranch,
    summary:
      "Automated pipelines, infrastructure as code and observability so your team ships confidently and often.",
    outcomes: ["Reliable deployments", "Fast rollbacks", "Full visibility"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    icon: ShieldCheck,
    summary:
      "Security engineered in from day one — threat modeling, hardening, encryption and continuous monitoring.",
    outcomes: ["Reduced attack surface", "Compliance alignment", "Customer trust"],
  },
  {
    slug: "api-development",
    title: "API Development",
    icon: Plug,
    summary:
      "Versioned, documented and rate-limited APIs that make your platform a foundation partners can rely on.",
    outcomes: ["Faster integrations", "Developer-friendly", "Stable contracts"],
  },
  {
    slug: "database-engineering",
    title: "Database Engineering",
    icon: Database,
    summary:
      "Data models, indexing and query design that stay fast and correct as your data grows into the millions.",
    outcomes: ["Query performance", "Data integrity", "Scalable schemas"],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    icon: BarChart3,
    summary:
      "Turn raw operational data into dashboards and signals leaders actually use to make decisions.",
    outcomes: ["Clear KPIs", "Real-time insight", "Better forecasting"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: Palette,
    summary:
      "Research-led product design that reduces friction, increases adoption and looks unmistakably premium.",
    outcomes: ["Higher adoption", "Lower support load", "Brand credibility"],
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting",
    icon: Compass,
    summary:
      "Senior guidance on architecture, hiring, technology choices and roadmaps from people who have shipped.",
    outcomes: ["De-risked decisions", "Clear roadmaps", "Aligned teams"],
  },
  {
    slug: "application-modernization",
    title: "Application Modernization",
    icon: RefreshCcw,
    summary:
      "Migrate legacy systems to modern, maintainable architectures without stopping the business.",
    outcomes: ["Reduced tech debt", "New capabilities", "Lower maintenance"],
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    icon: Gauge,
    summary:
      "We profile, measure and eliminate bottlenecks across frontend, backend and infrastructure.",
    outcomes: ["Faster experiences", "Lower infra cost", "Higher conversion"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    icon: LifeBuoy,
    summary:
      "Long-term partnership with SLAs, proactive monitoring and a team that already knows your system.",
    outcomes: ["Peace of mind", "Rapid response", "Continuous improvement"],
  },
];

export type Solution = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
};

export const solutions: Solution[] = [
  {
    slug: "digital-products",
    title: "Digital Product Engineering",
    icon: Rocket,
    description:
      "From zero to launch: we design and build web and mobile products that customers love and that scale.",
    points: [
      "Discovery and product strategy",
      "Design systems and accessible UI",
      "Full-stack build with CI/CD",
      "Analytics and iteration",
    ],
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    icon: Bot,
    description:
      "Combine AI, workflow engines and integrations to remove repetitive work and scale operations.",
    points: [
      "Process mapping and audit",
      "AI + rules-based workflows",
      "Human-in-the-loop controls",
      "Monitoring and reporting",
    ],
  },
  {
    slug: "cloud-modernization",
    title: "Cloud & Modernization",
    icon: Cloud,
    description:
      "Move legacy systems to resilient, cost-efficient cloud architectures with zero-downtime strategies.",
    points: [
      "Architecture assessment",
      "Incremental migration",
      "Infrastructure as code",
      "Cost and performance tuning",
    ],
  },
  {
    slug: "security-compliance",
    title: "Security & Compliance",
    icon: ShieldCheck,
    description:
      "Protect your customers and your reputation with security engineered into every layer.",
    points: [
      "Threat modeling",
      "Hardening and encryption",
      "Access control and auditing",
      "Continuous monitoring",
    ],
  },
  {
    slug: "data-platforms",
    title: "Data & Analytics Platforms",
    icon: BarChart3,
    description:
      "Unify data sources into trusted platforms that power reporting, forecasting and AI.",
    points: [
      "Data modeling and pipelines",
      "Warehouses and dashboards",
      "Real-time analytics",
      "Governance and quality",
    ],
  },
  {
    slug: "platform-scaling",
    title: "Platform Scaling",
    icon: Gauge,
    description:
      "Re-architect for growth so your platform stays fast and reliable as demand multiplies.",
    points: [
      "Load and capacity planning",
      "Caching and query design",
      "Observability",
      "Reliability engineering",
    ],
  },
];

export type Industry = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
};

export const industries: Industry[] = [
  {
    slug: "startups",
    title: "Startups & Founders",
    icon: Rocket,
    description:
      "Ship a credible MVP fast, then scale it into a fundable, defensible product with the right foundations.",
  },
  {
    slug: "smes",
    title: "SMEs",
    icon: Store,
    description:
      "Automate operations, digitize workflows and compete with larger players using leaner technology.",
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    icon: Building2,
    description:
      "Modernize legacy systems, integrate tools and deliver secure platforms your teams can rely on.",
  },
  {
    slug: "government",
    title: "Government",
    icon: Landmark,
    description:
      "Accessible, secure and auditable digital services built for citizens and public sector standards.",
  },
  {
    slug: "ngos",
    title: "NGOs & Nonprofits",
    icon: HeartHandshake,
    description:
      "Maximize impact per dollar with efficient, transparent systems for programs, donors and reporting.",
  },
  {
    slug: "fintech",
    title: "Fintech & Commerce",
    icon: BarChart3,
    description:
      "High-integrity, high-availability platforms for payments, commerce and financial operations.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    description:
      "We align on your goals, constraints and success metrics before a line of code is written.",
  },
  {
    number: "02",
    title: "Research",
    icon: Radar,
    description:
      "Users, competitors and technical feasibility — we de-risk the plan with evidence.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    icon: PenTool,
    description:
      "Accessible, on-brand interfaces designed as systems, validated with prototypes.",
  },
  {
    number: "04",
    title: "Architecture",
    icon: Layers,
    description:
      "We design for scale, security and change so the system endures beyond launch.",
  },
  {
    number: "05",
    title: "Development",
    icon: Code2,
    description:
      "Tested, reviewed code shipped in short cycles with visibility at every step.",
  },
  {
    number: "06",
    title: "Testing",
    icon: TestTube2,
    description:
      "Automated and manual testing across functionality, performance and security.",
  },
  {
    number: "07",
    title: "Deployment",
    icon: Rocket,
    description:
      "Automated, observable releases with safe rollouts and instant rollbacks.",
  },
  {
    number: "08",
    title: "Continuous Support",
    icon: LifeBuoy,
    description:
      "We stay on as a long-term partner — monitoring, improving and evolving the product.",
  },
];

export type TechCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Boxes,
    items: ["Python", "Node.js", "Firebase", "Supabase"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    items: ["Cloudflare", "DigitalOcean", "Vercel"],
  },
  {
    title: "AI & Automation",
    icon: BrainCircuit,
    items: ["OpenAI", "Anthropic", "Google AI", "n8n"],
  },
  {
    title: "Security",
    icon: ShieldCheck,
    items: ["OWASP Best Practices", "Authentication", "Encryption", "Monitoring"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "Redis", "Analytics", "Pipelines"],
  },
];

export const coreValues = [
  {
    title: "Engineering Excellence",
    description:
      "We hold ourselves to a high bar: tested code, clean architecture and decisions we can defend.",
    icon: Code2,
  },
  {
    title: "Integrity",
    description:
      "We tell you what we would do if it were our own money. No inflated scopes, no hidden trade-offs.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "We adopt what works, not what is loud. Emerging technology in service of real outcomes.",
    icon: BrainCircuit,
  },
  {
    title: "Long-Term Partnerships",
    description:
      "We optimize for the relationship, not the transaction. Most of our work is with returning partners.",
    icon: HeartHandshake,
  },
  {
    title: "Security First",
    description:
      "Security is designed in from day one, never bolted on. Your customers' trust is the asset.",
    icon: ShieldCheck,
  },
  {
    title: "User-Centered Design",
    description:
      "Software only creates value when people use it. We design for the humans on both sides.",
    icon: Palette,
  },
  {
    title: "Scalability",
    description:
      "We build for where you are going, not only where you are today — without over-engineering.",
    icon: Gauge,
  },
];

export type CaseStudy = {
  slug: string;
  label: "Concept Project" | "Internal Product" | "Prototype" | "Innovation Lab";
  title: string;
  tagline: string;
  industry: string;
  problem: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  outcomes: { label: string; value: string }[];
  lessons: string[];
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "orbit-ops",
    label: "Concept Project",
    title: "OrbitOps",
    tagline: "An operations command center for scaling SMEs.",
    industry: "SME Operations",
    problem:
      "Growing businesses run operations across spreadsheets, chat and disconnected tools, losing hours to manual reconciliation and error-prone handoffs.",
    solution:
      "A unified operations platform that centralizes tasks, approvals and reporting, with automation replacing repetitive manual steps and a clean dashboard giving leaders live visibility.",
    architecture: [
      "Next.js App Router frontend with server components",
      "PostgreSQL data core with row-level access control",
      "n8n-driven automation workflows for approvals",
      "Event-driven notifications and audit logging",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "n8n", "Tailwind CSS"],
    outcomes: [
      { label: "Manual work targeted", value: "-60%" },
      { label: "Reporting latency", value: "Real-time" },
      { label: "Single source of truth", value: "1 platform" },
    ],
    lessons: [
      "Unify operations before adding automation — automation on chaos automates chaos.",
      "Row-level access control is not optional when multiple teams share one source of truth.",
      "Audit logging pays for itself the first time a stakeholder asks 'who changed what, when?'.",
    ],
    accent: "from-brand-500 to-accent-500",
  },
  {
    slug: "sentinel-ai",
    label: "Innovation Lab",
    title: "Sentinel AI",
    tagline: "An AI triage layer for customer operations.",
    industry: "Customer Operations",
    problem:
      "Support teams are overwhelmed by high inbound volume, with slow first responses and inconsistent routing hurting customer experience.",
    solution:
      "An AI triage layer that classifies, prioritizes and drafts responses with a human-in-the-loop, escalating sensitive cases and learning from agent corrections.",
    architecture: [
      "Retrieval-grounded LLM pipeline with evaluation harness",
      "Confidence thresholds routing to human review",
      "Vector store over knowledge base and past tickets",
      "Observability dashboard for accuracy and drift",
    ],
    technologies: ["Anthropic", "OpenAI", "Python", "Next.js", "PostgreSQL"],
    outcomes: [
      { label: "First-response time", value: "Faster" },
      { label: "Human oversight", value: "Always on" },
      { label: "Consistency", value: "Standardized" },
    ],
    lessons: [
      "Confidence thresholds and human handoff are the difference between a demo and a deployment.",
      "An evaluation harness built on real tickets catches regressions no unit test will.",
      "Observability for AI is a product feature, not an afterthought.",
    ],
    accent: "from-accent-500 to-brand-500",
  },
  {
    slug: "vault-shield",
    label: "Prototype",
    title: "VaultShield",
    tagline: "Security posture monitoring for growing platforms.",
    industry: "Cybersecurity",
    problem:
      "Fast-moving teams ship quickly but lack continuous visibility into misconfigurations, exposed secrets and dependency risk.",
    solution:
      "A security posture dashboard that continuously scans configuration, dependencies and access, surfacing prioritized, actionable findings mapped to OWASP guidance.",
    architecture: [
      "Scheduled scanners for config, secrets and dependencies",
      "Severity scoring and prioritized remediation queue",
      "Encrypted findings store with access controls",
      "Alerting via email and workflow integrations",
    ],
    technologies: ["Node.js", "OWASP", "PostgreSQL", "Cloudflare", "Next.js"],
    outcomes: [
      { label: "Vulnerability visibility", value: "Continuous" },
      { label: "Remediation guidance", value: "Prioritized" },
      { label: "Coverage", value: "Full stack" },
    ],
    lessons: [
      "Prioritization is the product — raw findings without severity overwhelm teams.",
      "Encrypted findings stores are non-negotiable; the scanner itself becomes a target.",
      "Map every finding to remediation steps, or it is noise.",
    ],
    accent: "from-brand-600 to-accent-400",
  },
  {
    slug: "insight-grid",
    label: "Internal Product",
    title: "InsightGrid",
    tagline: "A decision dashboard turning raw data into signals.",
    industry: "Data Analytics",
    problem:
      "Leaders drown in dashboards yet still lack the few signals that actually drive decisions, while data lives in silos.",
    solution:
      "A unified analytics layer that consolidates sources, models key metrics and presents a focused decision dashboard with forecasts and anomaly alerts.",
    architecture: [
      "ETL pipelines consolidating multiple sources",
      "Modeled metrics layer with governance",
      "Forecasting and anomaly detection jobs",
      "Fast, cached dashboard with role-based views",
    ],
    technologies: ["Python", "PostgreSQL", "Next.js", "Google AI", "Vercel"],
    outcomes: [
      { label: "Data sources unified", value: "Many → 1" },
      { label: "Decision signals", value: "Focused" },
      { label: "Forecasting", value: "Built-in" },
    ],
    lessons: [
      "A modeled metrics layer prevents the 'two dashboards, two numbers' failure mode.",
      "Cached aggregations keep leadership dashboards fast as data grows.",
      "Forecasting is only valuable when paired with anomaly alerts.",
    ],
    accent: "from-accent-600 to-brand-500",
  },
];

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  readingTime: string;
  date: string;
  body: string[];
  sections?: { heading: string; text: string }[];
};

export const blogCategories = [
  "AI",
  "Automation",
  "Cybersecurity",
  "Software Engineering",
  "Cloud",
  "DevOps",
  "SaaS",
  "Startup",
  "Product Updates",
  "Case Studies",
  "Engineering",
] as const;

export const authors: Record<
  string,
  { name: string; role: string; bio: string; slug: string }
> = {
  "balogun-adeolu": {
    name: "Balogun Adeolu",
    role: "Founder & Software Engineer",
    bio: "Founder of Pedumo. Writes about engineering leadership, secure systems and building technology companies that last.",
    slug: "balogun-adeolu",
  },
  "pedumo-engineering": {
    name: "Pedumo Engineering",
    role: "Engineering Team",
    bio: "Collective writing from the Pedumo engineering team on architecture, automation, security and delivery.",
    slug: "pedumo-engineering",
  },
};

export const insights: Insight[] = [
  {
    slug: "engineering-for-longevity",
    title: "Engineering for Longevity: Building Software That Lasts",
    excerpt:
      "Why the cheapest software to build is rarely the cheapest to own — and how to design systems that stay valuable for years.",
    category: "Engineering",
    tags: ["architecture", "maintainability", "total-cost-of-ownership"],
    author: "balogun-adeolu",
    featured: true,
    readingTime: "6 min read",
    date: "2026-01-14",
    body: [
      "Most software costs are incurred after launch, not before it. The decisions that determine total cost of ownership are made early: how the system is structured, how it is tested, and how clearly its intent is documented.",
      "Longevity is not about predicting the future perfectly. It is about designing for change — clear boundaries, explicit contracts and automated checks that let a team modify the system with confidence years later.",
      "At Pedumo, we treat maintainability as a first-class requirement. A feature that ships fast but cannot be safely changed is a liability disguised as progress.",
    ],
    sections: [
      {
        heading: "The real cost curve",
        text: "Most software costs are incurred after launch, not before it. The decisions that determine total cost of ownership are made early: how the system is structured, how it is tested, and how clearly its intent is documented.",
      },
      {
        heading: "Designing for change",
        text: "Longevity is not about predicting the future perfectly. It is about designing for change — clear boundaries, explicit contracts and automated checks that let a team modify the system with confidence years later.",
      },
      {
        heading: "Maintainability as a requirement",
        text: "At Pedumo, we treat maintainability as a first-class requirement. A feature that ships fast but cannot be safely changed is a liability disguised as progress.",
      },
    ],
  },
  {
    slug: "practical-ai-for-business",
    title: "Practical AI for Business: Beyond the Hype",
    excerpt:
      "A grounded framework for adopting AI where it creates measurable value, with the guardrails that make it safe.",
    category: "AI",
    tags: ["ai", "automation", "evaluation", "governance"],
    author: "pedumo-engineering",
    readingTime: "7 min read",
    date: "2026-01-06",
    body: [
      "The question is rarely whether AI can do something — it is whether AI should, and whether the result is reliable enough to trust in production.",
      "We start with the process, not the model. Where is time lost? Where is judgment repetitive? Those are the places automation and augmentation pay off, provided you build evaluation and human oversight into the loop.",
      "Grounded AI, measured against real tasks with humans in control of consequential decisions, is what separates durable value from expensive experiments.",
    ],
  },
  {
    slug: "security-as-a-foundation",
    title: "Security as a Foundation, Not a Feature",
    excerpt:
      "How threat modeling, encryption and monitoring designed in from day one protect both customers and reputation.",
    category: "Cybersecurity",
    tags: ["security", "owasp", "encryption", "monitoring"],
    author: "pedumo-engineering",
    readingTime: "5 min read",
    date: "2025-12-18",
    body: [
      "Security added at the end is expensive and fragile. Security designed in from the start is cheaper, stronger and largely invisible to users.",
      "We model threats before we build, encrypt sensitive data by default, enforce least-privilege access and monitor continuously. None of this is exotic — it is disciplined engineering.",
      "The payoff is trust. In a market where a single breach can end a company, security is not a cost center. It is a competitive advantage.",
    ],
  },
  {
    slug: "cloud-cost-discipline",
    title: "Cloud Cost Discipline: Engineering Your Way Out of Waste",
    excerpt:
      "Most cloud bills are 30–50% waste. The fix is architectural, not administrative — and it compounds every month.",
    category: "Cloud",
    tags: ["cloud", "finops", "performance", "architecture"],
    author: "pedumo-engineering",
    readingTime: "6 min read",
    date: "2026-02-02",
    body: [
      "Cloud waste rarely comes from one big mistake. It accumulates: oversized instances that were 'temporary', orphaned storage, chatty services generating egress fees, environments that never sleep.",
      "The durable fix is architectural. Right-size by measurement, cache aggressively at the edge, design data flows to minimize egress, and make cost a visible engineering metric with an owner.",
      "Treat cloud spend the way you treat performance: profile, fix the biggest bottleneck, and repeat. The savings fund the next initiative.",
    ],
  },
  {
    slug: "data-foundations-before-ai",
    title: "Why Data Foundations Decide Whether AI Succeeds",
    excerpt:
      "Organizations skip straight to models and wonder why results disappoint. The unglamorous truth: data engineering is the multiplier.",
    category: "AI",
    tags: ["data-engineering", "ai", "governance", "pipelines"],
    author: "pedumo-engineering",
    readingTime: "5 min read",
    date: "2026-02-16",
    body: [
      "Every disappointing AI initiative we have examined shared a root cause: the underlying data was fragmented, inconsistent or simply wrong. No model compensates for that.",
      "Before AI, invest in the foundations — a modeled source of truth, pipelines with quality checks, clear ownership and lineage. This work is measurable and pays off even if you never ship a model.",
      "When the foundations exist, AI projects stop being experiments and start being deployments. The order of operations is the strategy.",
    ],
  },
  {
    slug: "resilience-is-a-feature",
    title: "Resilience Is a Feature: Designing for the Worst Day",
    excerpt:
      "Outages, breaches and data loss are not edge cases — they are eventualities. The organizations that survive rehearse.",
    category: "DevOps",
    tags: ["resilience", "incident-response", "backups", "continuity"],
    author: "balogun-adeolu",
    readingTime: "6 min read",
    date: "2026-03-03",
    body: [
      "Every system fails eventually. The difference between an incident and a catastrophe is preparation: tested backups, rehearsed playbooks and recovery objectives that were validated before they were needed.",
      "We design for the worst day from day one — failover that has actually been triggered, backups that have actually been restored, and a chain of command that knows its first three moves.",
      "Resilience is not paranoia. It is the feature your customers assume you have — until the day that assumption is tested.",
    ],
  },
];

export const faqs = [
  {
    question: "What kind of companies do you work with?",
    answer:
      "We partner with startups, SMEs, enterprises, NGOs and government organizations. What our partners share is a need for software they can trust and a team that treats their business like its own.",
  },
  {
    question: "How do you price engagements?",
    answer:
      "We scope each engagement to your goals — fixed-scope projects for well-defined work, and retained partnerships for ongoing product development and support. You always know what you are paying for and why.",
  },
  {
    question: "Do you only build, or do you also maintain?",
    answer:
      "Both. We optimize for long-term partnerships. Most of our work involves maintaining and evolving systems over time, with SLAs, monitoring and a team that already understands your product.",
  },
  {
    question: "Can you work with our existing team and codebase?",
    answer:
      "Yes. We frequently embed with in-house teams, modernize legacy systems and improve existing codebases. We adapt to your workflow rather than forcing ours.",
  },
  {
    question: "How do you approach AI responsibly?",
    answer:
      "We ground AI in your data, evaluate it against real tasks and keep humans in control of consequential decisions. We deploy AI where it creates measurable value — not because it is fashionable.",
  },
  {
    question: "Where are you located and how do you collaborate?",
    answer:
      "We work with international businesses and collaborate remotely with clear communication, regular demos and full visibility into progress. Time zone overlap and async discipline keep projects moving.",
  },
];

export const stats: { value: number; suffix?: string; prefix?: string; label: string }[] = [
  { value: 11, suffix: "+", label: "Engineered products & services" },
  { value: 8, suffix: "-step", label: "Delivery method on every engagement" },
  { value: 100, suffix: "%", label: "Ownership of outcomes" },
  { value: 24, suffix: "/7", label: "Monitoring on supported systems" },
];

export const studioTopics = [
  { title: "Software Engineering", icon: Code2, description: "Deep dives on building real systems." },
  { title: "AI Automation", icon: Bot, description: "Practical automation from the field." },
  { title: "Cybersecurity", icon: ShieldCheck, description: "Defending modern applications." },
  { title: "Technology News", icon: Radar, description: "Signal over noise for builders." },
  { title: "Product Engineering", icon: Boxes, description: "From idea to shipped product." },
  { title: "Developer Tutorials", icon: PenTool, description: "Hands-on, no-fluff walkthroughs." },
  { title: "Business Technology", icon: BarChart3, description: "Tech decisions for leaders." },
  { title: "Video Production", icon: Palette, description: "Studio-quality technical media." },
];

export const openSourceProjects = [
  {
    name: "pedumo/ui-kit",
    description:
      "An accessible React component library with sensible defaults, used as the foundation for our client work.",
    language: "TypeScript",
    focus: "Design System",
  },
  {
    name: "pedumo/flow-nodes",
    description:
      "Reusable automation nodes and templates for building reliable workflows on n8n.",
    language: "TypeScript",
    focus: "Automation",
  },
  {
    name: "pedumo/secure-starters",
    description:
      "Hardened application starters with OWASP-aligned defaults, auth and encryption baked in.",
    language: "TypeScript",
    focus: "Security",
  },
  {
    name: "pedumo/perf-lens",
    description:
      "A lightweight performance profiling toolkit for finding bottlenecks in web applications.",
    language: "TypeScript",
    focus: "Performance",
  },
];

export const careers = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Remote · Full-time",
    description:
      "Own features end to end across modern React, Node and cloud infrastructure for international clients.",
  },
  {
    title: "AI Automation Engineer",
    type: "Remote · Full-time",
    description:
      "Design grounded AI workflows and integrations with evaluation and human-in-the-loop controls.",
  },
  {
    title: "Product Designer (UI/UX)",
    type: "Remote · Contract",
    description:
      "Craft accessible, premium interfaces as systems and validate them with users and prototypes.",
  },
  {
    title: "DevOps / Platform Engineer",
    type: "Remote · Full-time",
    description:
      "Build reliable pipelines, infrastructure as code and observability for production systems.",
  },
];
