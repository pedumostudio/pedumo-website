export type RoadmapItem = {
  title: string;
  description: string;
  status: "released" | "in-progress" | "planned" | "vision";
  quarter?: string;
  progress?: number;
  votes?: number;
};

export const roadmap: RoadmapItem[] = [
  {
    title: "Pedumo Studio launch",
    description: "Tutorials, analysis and studio-quality video across engineering, AI and security.",
    status: "released",
    quarter: "Q1 2026",
    progress: 100,
  },
  {
    title: "Public Trust Center & Status page",
    description: "Transparent commitments, live service status and incident history.",
    status: "released",
    quarter: "Q1 2026",
    progress: 100,
  },
  {
    title: "Product demos with live mock data",
    description: "Interactive dashboards for analytics, security, CRM and AI assistant.",
    status: "in-progress",
    quarter: "Q2 2026",
    progress: 65,
    votes: 142,
  },
  {
    title: "Documentation hub v1",
    description: "Getting started, API references, architecture guides and deployment playbooks.",
    status: "in-progress",
    quarter: "Q2 2026",
    progress: 50,
    votes: 210,
  },
  {
    title: "Open-source UI kit release",
    description: "Accessible React component library used across our client work, published under MIT.",
    status: "planned",
    quarter: "Q3 2026",
    progress: 20,
    votes: 318,
  },
  {
    title: "Partner program portal",
    description: "Self-serve onboarding, deal registration and co-marketing assets for partners.",
    status: "planned",
    quarter: "Q3 2026",
    progress: 10,
    votes: 88,
  },
  {
    title: "AI automation marketplace",
    description: "A curated library of reusable, evaluated automation workflows for common operations.",
    status: "vision",
    quarter: "2027",
    progress: 0,
    votes: 421,
  },
  {
    title: "Pedumo Cloud — managed secure hosting",
    description: "Opinionated, secure-by-default hosting for Pedumo-built platforms with built-in observability.",
    status: "vision",
    quarter: "2027",
    progress: 0,
    votes: 276,
  },
];
