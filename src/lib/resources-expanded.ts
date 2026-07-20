import type { LucideIcon } from "lucide-react";
import {
  FileText,
  BookOpenCheck,
  BookCopy,
  Download,
  LayoutTemplate,
  Code2,
} from "lucide-react";

export type Resource = {
  title: string;
  type: "Whitepaper" | "Guide" | "eBook" | "Template" | "Developer Resource" | "Checklist";
  description: string;
  pages?: number;
  format: "PDF" | "Markdown" | "Figma";
  icon: LucideIcon;
};

export const resources: Resource[] = [
  {
    title: "The Executive's AI Automation Readiness Checklist",
    type: "Checklist",
    description:
      "Twenty questions to answer before funding any AI initiative — covering data readiness, guardrails, evaluation and ROI.",
    pages: 6,
    format: "PDF",
    icon: BookOpenCheck,
  },
  {
    title: "Secure-by-Design Architecture Framework",
    type: "Whitepaper",
    description:
      "The layered security model we apply to every engagement, mapped to OWASP ASVS and practical cloud controls.",
    pages: 28,
    format: "PDF",
    icon: FileText,
  },
  {
    title: "Legacy Modernization Without Downtime",
    type: "Guide",
    description:
      "How to migrate critical systems incrementally — strangler patterns, data cutover strategies and rollback safety.",
    pages: 42,
    format: "PDF",
    icon: BookCopy,
  },
  {
    title: "Cloud Cost Optimization Playbook",
    type: "eBook",
    description:
      "A field-tested playbook for cutting 30–50% of cloud waste through architectural, not administrative, changes.",
    pages: 64,
    format: "PDF",
    icon: BookCopy,
  },
  {
    title: "Incident Response Runbook Template",
    type: "Template",
    description:
      "A ready-to-customize runbook with escalation paths, comms templates and post-incident review structure.",
    format: "Markdown",
    icon: LayoutTemplate,
  },
  {
    title: "Secure Node.js Starter Kit",
    type: "Developer Resource",
    description:
      "A hardened Node.js + TypeScript starter with auth, rate limiting, input validation and OpenAPI out of the box.",
    format: "Markdown",
    icon: Code2,
  },
  {
    title: "Data Governance Starter Framework",
    type: "Whitepaper",
    description:
      "Classification, lineage, retention and access controls — a practical framework for organizations beginning their data journey.",
    pages: 22,
    format: "PDF",
    icon: FileText,
  },
  {
    title: "SaaS Launch Architecture Diagram",
    type: "Template",
    description:
      "A reference architecture for a multi-tenant SaaS with billing, auth, observability and edge delivery.",
    format: "Figma",
    icon: Download,
  },
];
