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
  Search,
  PenTool,
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
    slug: "secure-sdlc-without-slowing-down",
    title: "A secure SDLC that does not slow delivery",
    excerpt:
      "How threat modeling, automated checks and review gates fit into short cycles without becoming theater.",
    date: "2026-02-12",
    category: "Security",
    readTime: "7 min",
  },
  {
    slug: "ai-that-survives-production",
    title: "AI that survives contact with production",
    excerpt:
      "Evaluation harnesses, grounding and human oversight — the difference between a demo and a system you can defend.",
    date: "2026-01-28",
    category: "AI",
    readTime: "9 min",
  },
  {
    slug: "total-cost-of-fragile-software",
    title: "The total cost of fragile software",
    excerpt:
      "Why the cheapest build often becomes the most expensive system — and how architecture choices compound.",
    date: "2026-01-10",
    category: "Engineering",
    readTime: "6 min",
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

export const processIcons = [Search, PenTool, Layers, ServerCog, Code2, TestTube2, Rocket, Activity];
