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
  TestTube2,
  Rocket,
  Building2,
  Landmark,
  HeartHandshake,
  Store,
  Target,
  Compass,
  BrainCircuit,
  Gauge,
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

export const businessOutcomes = [
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

export const trustPillars: { title: string; icon: LucideIcon; description: string }[] = [
  {
    title: "Secure by default",
    icon: Lock,
    description: "Threat modeling, least privilege and encryption applied before the first commit ships.",
  },
  {
    title: "Observable systems",
    icon: Activity,
    description: "Metrics, logs and traces wired so failures are visible in minutes, not discovered by customers.",
  },
  {
    title: "Governed delivery",
    icon: ClipboardCheck,
    description: "Written scope, review gates and audit-ready artifacts on every engagement.",
  },
  {
    title: "Resilient infrastructure",
    icon: ServerCog,
    description: "Backups, failover paths and recovery objectives that have been tested, not assumed.",
  },
  {
    title: "Composable architecture",
    icon: Layers,
    description: "Clean boundaries so the system can evolve without a rewrite every time strategy shifts.",
  },
  {
    title: "Evidence-based quality",
    icon: FileCheck2,
    description: "Automated tests, security reviews and acceptance criteria that prove readiness.",
  },
];

export const processSteps = [
  {
    id: "step-1",
    index: "01",
    title: "Discovery",
    description: "We align on your goals, constraints and success metrics before a line of code is written.",
  },
  {
    id: "step-2",
    index: "02",
    title: "Research",
    description: "Users, competitors and technical feasibility — we de-risk the plan with evidence.",
  },
  {
    id: "step-3",
    index: "03",
    title: "UI/UX Design",
    description: "Accessible, on-brand interfaces designed as systems, validated with prototypes.",
  },
  {
    id: "step-4",
    index: "04",
    title: "Architecture",
    description: "We design for scale, security and change so the system endures beyond launch.",
  },
  {
    id: "step-5",
    index: "05",
    title: "Development",
    description: "Tested, reviewed code shipped in short cycles with visibility at every step.",
  },
  {
    id: "step-6",
    index: "06",
    title: "Testing",
    description: "Automated and manual testing across functionality, performance and security.",
  },
  {
    id: "step-7",
    index: "07",
    title: "Deployment",
    description: "Automated, observable releases with safe rollouts and instant rollbacks.",
  },
  {
    id: "step-8",
    index: "08",
    title: "Continuous Support",
    description: "We stay on as a long-term partner — monitoring, improving and evolving the product.",
  },
];

export const industries = [
  { slug: "startups", title: "Startups & Founders", icon: Rocket },
  { slug: "smes", title: "SMEs", icon: Store },
  { slug: "enterprise", title: "Enterprise", icon: Building2 },
  { slug: "government", title: "Government", icon: Landmark },
  { slug: "ngos", title: "NGOs & Nonprofits", icon: HeartHandshake },
  { slug: "fintech", title: "Fintech & Commerce", icon: Gauge },
];

export const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Cloudflare",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "OpenAI",
  "Anthropic",
  "Redis",
  "Grafana",
  "GitHub Actions",
];

export const caseStudies = [
  {
    slug: "edge-ops-platform",
    title: "Edge Ops Control Plane",
    category: "Cloud & Platform",
    summary:
      "A multi-region control plane for workload orchestration with policy-as-code and live telemetry — designed so operators can ship without heroics.",
    outcomes: ["Sub-minute deploy windows", "Policy-enforced releases", "Unified observability"],
    status: "Innovation lab",
  },
  {
    slug: "secure-loan-ops",
    title: "Secure Loan Operations Suite",
    category: "Fintech & Security",
    summary:
      "An audit-ready loan operations platform with role-based access, encrypted data paths and automated compliance evidence collection.",
    outcomes: ["Reduced manual review time", "Full audit trail", "Hardened data plane"],
    status: "Innovation lab",
  },
  {
    slug: "ai-ops-assistant",
    title: "Grounded AI Ops Assistant",
    category: "AI Automation",
    summary:
      "An evaluated, human-in-the-loop assistant that triages incidents against runbooks and production signals — never free-form hallucination.",
    outcomes: ["Faster mean-time-to-triage", "Defensible AI outputs", "Operator trust"],
    status: "Innovation lab",
  },
];

export const insights = [
  {
    slug: "businesses-dont-have-a-technology-problem",
    title: "Why Most Businesses Don't Have a Technology Problem",
    excerpt:
      "Technology rarely fails in isolation. The deeper issue is usually unclear ownership, weak process design, missing operating discipline, or software that was never tied to a measurable business outcome.",
    date: "2026-08-05",
    category: "Engineering Strategy",
    readTime: "6 min",
    source: "PEDUMO Website",
    summaryPoints: [
      "Diagnose operating constraints before prescribing software.",
      "Tie every build decision to a business capability or risk reduction.",
      "Use engineering to strengthen the organization, not decorate it.",
    ],
  },
  {
    slug: "building-secure-apis",
    title: "Building Secure APIs",
    excerpt:
      "Secure APIs are designed around identity, authorization, validation, observability and abuse resistance from the first endpoint — not patched after launch week.",
    date: "2026-08-05",
    category: "Security",
    readTime: "7 min",
    source: "PEDUMO Website",
    summaryPoints: [
      "Start with threat modeling, trust boundaries and least privilege.",
      "Validate inputs, outputs and rate limits as product requirements.",
      "Instrument logs and traces so abuse patterns are visible early.",
    ],
  },
  {
    slug: "engineering-ai-responsibly",
    title: "Engineering AI Responsibly",
    excerpt:
      "Responsible AI is an engineering discipline: evaluations, grounding, human review paths, privacy controls and clear failure modes before production exposure.",
    date: "2026-08-05",
    category: "AI Engineering",
    readTime: "8 min",
    source: "PEDUMO Website",
    summaryPoints: [
      "Treat model output as probabilistic until measured and governed.",
      "Build evaluation harnesses that reflect real user and business risk.",
      "Keep humans in the loop where safety, money or reputation are affected.",
    ],
  },
  {
    slug: "cloud-infrastructure-that-scales",
    title: "Cloud Infrastructure That Scales",
    excerpt:
      "Scalable cloud platforms combine clear service boundaries, automated delivery, resilient data paths, cost visibility and recovery plans that have been tested under pressure.",
    date: "2026-08-05",
    category: "Cloud",
    readTime: "7 min",
    source: "PEDUMO Website",
    summaryPoints: [
      "Design for failure domains, not ideal-path diagrams.",
      "Automate environments so infrastructure can be reproduced and audited.",
      "Measure latency, availability and cost as first-class product signals.",
    ],
  },
];

export type OpenSourceRepository = {
  id: string;
  name: string;
  description: string;
  area: string;
  icon: LucideIcon;
  status: string;
  href: string;
  repoSlug: string;
  githubOwner: string;
  githubRepo: string;
};

export const openSourceRepositories: OpenSourceRepository[] = [
  {
    id: "pedumo-website",
    name: "PEDUMO Website",
    description:
      "The public web platform for Pedumo's engineering presence, built as a performance-focused React and Cloudflare Workers application.",
    area: "Web Platform",
    icon: Code2,
    status: "Live GitHub metadata available",
    href: "https://github.com/pedumo/pedumo-website",
    repoSlug: "pedumo/pedumo-website",
    githubOwner: "pedumo",
    githubRepo: "pedumo-website",
  },
  {
    id: "pedumo-docs",
    name: "PEDUMO Docs",
    description:
      "Documentation space for architecture notes, engineering standards and operational runbooks once the public repository is configured.",
    area: "Documentation",
    icon: FileCheck2,
    status: "GitHub repository pending",
    href: "https://github.com/pedumolab",
    repoSlug: "pedumolab/pedumo-docs",
    githubOwner: "pedumolab",
    githubRepo: "pedumo-docs",
  },
  {
    id: "pedumo-cloud",
    name: "PEDUMO Cloud",
    description:
      "Reference cloud infrastructure patterns for resilient, observable and cost-aware platforms.",
    area: "Cloud",
    icon: Cloud,
    status: "GitHub repository pending",
    href: "https://github.com/pedumolab",
    repoSlug: "pedumolab/pedumo-cloud",
    githubOwner: "pedumolab",
    githubRepo: "pedumo-cloud",
  },
  {
    id: "pedumo-security",
    name: "PEDUMO Security",
    description:
      "Security checklists, hardening guides and DevSecOps examples prepared for public release.",
    area: "Security",
    icon: ShieldCheck,
    status: "GitHub repository pending",
    href: "https://github.com/pedumolab",
    repoSlug: "pedumolab/pedumo-security",
    githubOwner: "pedumolab",
    githubRepo: "pedumo-security",
  },
  {
    id: "pedumo-ai",
    name: "PEDUMO AI",
    description:
      "Responsible AI engineering examples focused on evaluation, governance and safe automation.",
    area: "AI",
    icon: BrainCircuit,
    status: "GitHub repository pending",
    href: "https://github.com/pedumolab",
    repoSlug: "pedumolab/pedumo-ai",
    githubOwner: "pedumolab",
    githubRepo: "pedumo-ai",
  },
  {
    id: "pedumo-labs",
    name: "PEDUMO Labs",
    description:
      "Research prototypes and architecture experiments that demonstrate how Pedumo explores emerging engineering patterns.",
    area: "Research",
    icon: TestTube2,
    status: "GitHub repository pending",
    href: "https://github.com/pedumolab",
    repoSlug: "pedumolab/pedumo-labs",
    githubOwner: "pedumolab",
    githubRepo: "pedumo-labs",
  },
];

export const engineeringActivity = [
  {
    title: "Updated PEDUMO Website",
    description: "Homepage converted into a living engineering platform with insights, activity, open source and principles sections.",
    area: "Web Platform",
  },
  {
    title: "New Documentation",
    description: "Repository and platform documentation surfaces prepared for public engineering notes and runbooks.",
    area: "Documentation",
  },
  {
    title: "Security Improvements",
    description: "Security metadata, headers, responsible disclosure surfaces and secure delivery messaging reviewed.",
    area: "Security",
  },
  {
    title: "AI Research",
    description: "Responsible AI engineering guidance added to the knowledge hub for future research updates.",
    area: "AI",
  },
  {
    title: "Cloud Architecture",
    description: "Cloud infrastructure principles added for repeat visitors tracking platform architecture thinking.",
    area: "Cloud",
  },
];

export const engineeringPrinciples = [
  {
    title: "Security First",
    icon: ShieldCheck,
    description: "Threat modeling, least privilege, encryption and secure defaults are part of the first design review.",
  },
  {
    title: "Scalability by Design",
    icon: Gauge,
    description: "Systems are shaped around growth paths, failure domains and measurable performance envelopes.",
  },
  {
    title: "Automation",
    icon: RefreshCcw,
    description: "Delivery, testing, infrastructure and operational checks are automated wherever repetition creates risk.",
  },
  {
    title: "Maintainability",
    icon: Layers,
    description: "Clean boundaries, readable code and practical architecture keep systems changeable after launch.",
  },
  {
    title: "Documentation",
    icon: FileCheck2,
    description: "Decisions, runbooks and operating assumptions are written so knowledge survives handoff and growth.",
  },
  {
    title: "Performance",
    icon: Activity,
    description: "Latency, bundle weight, query cost and infrastructure efficiency are treated as product quality.",
  },
  {
    title: "Cloud Native",
    icon: Cloud,
    description: "Platforms are built for elastic infrastructure, edge delivery, observability and reproducible environments.",
  },
  {
    title: "Testing",
    icon: TestTube2,
    description: "Automated and manual verification prove behavior before releases reach customers.",
  },
  {
    title: "DevSecOps",
    icon: GitBranch,
    description: "Security, delivery and operations are integrated into one continuous engineering system.",
  },
];

export const journalSources = [
  {
    name: "PEDUMO Website Articles",
    description: "Original engineering articles published directly on pedumo.com.",
    href: "/insights",
    status: "Active",
  },
  {
    name: "DEV.to",
    description: "Future aggregation from the Pedumo DEV Community profile.",
    href: "https://dev.to/pedumo",
    status: "Integration pending.",
  },
  {
    name: "Medium",
    description: "Future aggregation from the founder's Medium publication stream.",
    href: "https://medium.com/@balogunadeolu",
    status: "Integration pending.",
  },
];

export const faqs = [
  {
    question: "Who does Pedumo partner with?",
    answer:
      "We partner with startups, SMEs, enterprises, NGOs and government organizations. What our partners share is a need for software they can trust and a team that treats their business like its own.",
  },
  {
    question: "How do engagements typically start?",
    answer:
      "Most partnerships begin with a strategic consultation. We clarify goals, constraints and success metrics, then propose a scoped path — discovery, architecture or a full build — with written deliverables.",
  },
  {
    question: "Do you only build greenfield products?",
    answer:
      "No. A large share of our work is modernization, hardening and automation of systems that already run the business. We migrate and improve without stopping operations.",
  },
  {
    question: "How do you approach security?",
    answer:
      "Security is the default posture, not a premium add-on. We apply threat modeling, least privilege, encryption and continuous monitoring aligned to OWASP ASVS and recognized frameworks.",
  },
  {
    question: "Will Pedumo stay after launch?",
    answer:
      "Yes. Continuous support is part of how we work — monitoring, iteration and ownership that does not end at handoff. Long-term partnership is the business model.",
  },
  {
    question: "Where is Pedumo based?",
    answer:
      "Pedumo works with organizations globally. Engagements are remote-first with the discipline, documentation and communication cadence enterprise partners expect.",
  },
];

export const stats = [
  { value: 9, label: "Engineering disciplines", prefix: "", suffix: "" },
  { value: 8, label: "Step delivery methodology", prefix: "", suffix: "" },
  { value: 100, label: "Secure-by-default posture", prefix: "", suffix: "%" },
  { value: 24, label: "Support & monitoring mindset", prefix: "", suffix: "/7" },
];

export const coreValues = [
  {
    title: "Accountability",
    icon: Target,
    description: "We own outcomes, not just tickets. If it ships under our name, we stand behind it.",
  },
  {
    title: "Engineering rigor",
    icon: Code2,
    description: "Tested code, documented decisions and architecture that survives real production load.",
  },
  {
    title: "Security first",
    icon: ShieldCheck,
    description: "Threat modeling and hardening are part of the build, not a week-before-launch scramble.",
  },
  {
    title: "Clarity",
    icon: Compass,
    description: "Written scope, honest status and no theater. Partners always know where things stand.",
  },
  {
    title: "Long-term thinking",
    icon: RefreshCcw,
    description: "We design for the system you will run in three years, not only the demo next month.",
  },
  {
    title: "Practical intelligence",
    icon: BrainCircuit,
    description: "AI and automation only when they create measurable value with guardrails you can defend.",
  },
];

export const founderPrinciples = [
  {
    icon: Code2,
    title: "Engineering-led",
    description: "Decisions are grounded in how systems actually behave in production, not slideware.",
  },
  {
    icon: ShieldCheck,
    title: "Trust as strategy",
    description: "Long-term relationships are the business model. Integrity is not optional.",
  },
  {
    icon: Compass,
    title: "Business-first",
    description: "Technology is a means. The goal is always a measurable outcome for the partner.",
  },
];

export const founderExpertise = [
  { icon: Code2, label: "Software architecture & full-stack engineering" },
  { icon: ShieldCheck, label: "Cybersecurity & secure systems design" },
  { icon: BrainCircuit, label: "AI automation & intelligent workflows" },
  { icon: Cloud, label: "Cloud infrastructure & DevOps" },
  { icon: Target, label: "Digital transformation strategy" },
];
export const engineeringTips = [
  {
    title: "Write the failure mode first",
    description:
      "Before implementation, describe how the feature fails, how users recover and what telemetry proves the system is healthy.",
  },
  {
    title: "Make deployments reversible",
    description:
      "A release is not production-ready until rollback, feature flags or safe disable paths have been designed and rehearsed.",
  },
  {
    title: "Keep API contracts explicit",
    description:
      "Document request shapes, response guarantees and error semantics so teams can evolve clients and services independently.",
  },
  {
    title: "Protect the operational path",
    description:
      "Admin actions, support workflows and background jobs need the same security and observability as customer-facing features.",
  },
];

export const aiTodayInsights = [
  {
    title: "Evaluation beats model enthusiasm",
    description:
      "Responsible AI systems need test sets, acceptance thresholds and human review paths before they are trusted with business decisions.",
  },
  {
    title: "Ground AI in owned knowledge",
    description:
      "Retrieval, permissions and source attribution matter more than broad prompts when AI touches private operations or customer data.",
  },
  {
    title: "Design for graceful refusal",
    description:
      "Production AI should know when not to answer, when to ask for context and when to escalate to a human operator.",
  },
];

export const cybersecurityAlerts = [
  {
    title: "Rotate stale access tokens",
    description:
      "Review GitHub, cloud, email and automation tokens. Remove unused credentials and enforce least privilege before incidents force the work.",
    severity: "Preventive",
  },
  {
    title: "Audit public storage exposure",
    description:
      "Verify that buckets, blobs, backups and generated assets do not expose private data through permissive defaults or inherited policies.",
    severity: "High impact",
  },
  {
    title: "Test the recovery path",
    description:
      "Backups are assumptions until restored. Schedule a restore drill and record the recovery time, owner and failure points.",
    severity: "Resilience",
  },
];

export const knowledgeHubSections = [
  {
    title: "Software Engineering",
    description: "Architecture, maintainability, API design, testing strategy and production delivery practices.",
    href: "/services#software-engineering",
  },
  {
    title: "AI",
    description: "Responsible AI systems, evaluation, grounding, automation and human-in-the-loop workflows.",
    href: "/services#ai-automation",
  },
  {
    title: "Cloud",
    description: "Scalable infrastructure, edge delivery, resilience, cost control and reproducible environments.",
    href: "/services#cloud-engineering",
  },
  {
    title: "Cybersecurity",
    description: "Threat modeling, secure APIs, access control, monitoring and incident readiness.",
    href: "/services#cybersecurity",
  },
  {
    title: "Architecture",
    description: "System boundaries, integration strategy, data flows and decision records for long-lived platforms.",
    href: "/insights#articles",
  },
  {
    title: "DevSecOps",
    description: "CI/CD, secure delivery, policy checks, environment drift control and operational visibility.",
    href: "/services#devops-platform-engineering",
  },
  {
    title: "Automation",
    description: "Workflow automation, internal platforms and repeatable processes that reduce human error.",
    href: "/services#digital-transformation",
  },
  {
    title: "Engineering Principles",
    description: "Security first, scalability by design, documentation, testing and maintainability guidance.",
    href: "/#principles",
  },
  {
    title: "Whitepapers",
    description: "Long-form research notes are planned for this knowledge hub. Integration pending.",
    href: "/insights#whitepapers",
  },
  {
    title: "Checklists",
    description: "Operational and security checklists are planned for download. Integration pending.",
    href: "/insights#checklists",
  },
  {
    title: "Downloads",
    description: "Downloadable templates will appear only when files exist in the repository. Integration pending.",
    href: "/insights#downloads",
  },
  {
    title: "Case Studies",
    description: "Internal lab studies and concept projects that demonstrate how Pedumo reasons about systems.",
    href: "/case-studies",
  },
];
