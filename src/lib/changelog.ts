export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  kind: "Release" | "Improvement" | "Security" | "Content";
  changes: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "4.2",
    date: "2026-03-18",
    title: "Trust Center, Status and Responsible Disclosure",
    kind: "Release",
    changes: [
      "Launched the Trust Center consolidating security, compliance and resilience commitments.",
      "Published a public Status page with per-service availability indicators.",
      "Added a Responsible Disclosure policy and /.well-known/security.txt.",
    ],
  },
  {
    version: "4.1",
    date: "2026-03-04",
    title: "Products hub and pricing",
    kind: "Release",
    changes: [
      "Shipped a Products hub covering AI Automation, Cybersecurity, Cloud, Data and more.",
      "Introduced transparent, outcome-based pricing tiers with no hidden fees.",
      "Added Partner Program and Press / Media Kit pages.",
    ],
  },
  {
    version: "4.0",
    date: "2026-02-14",
    title: "Editorial redesign and enterprise security baseline",
    kind: "Release",
    changes: [
      "Rebuilt the homepage as an editorial, asymmetric layout with a live operations viewport.",
      "Introduced a distinctive serif display face paired with Geist Sans and Mono.",
      "Shipped CSP, rate limiting, input sanitization and Cloudflare Pages compatibility.",
    ],
  },
  {
    version: "3.2",
    date: "2026-01-22",
    title: "Security & Resilience page",
    kind: "Security",
    changes: [
      "Published a dedicated Security page with measurable commitments per domain.",
      "Expanded Incident Response to cover digital forensics and compromised-infrastructure recovery.",
    ],
  },
  {
    version: "3.1",
    date: "2026-01-09",
    title: "Insights and resources",
    kind: "Content",
    changes: [
      "Added three new insights on cloud cost, data foundations and digital resilience.",
      "Published downloadable resource placeholders for a checklist, framework and guide.",
    ],
  },
  {
    version: "3.0",
    date: "2025-12-12",
    title: "Founder profile and live forms",
    kind: "Improvement",
    changes: [
      "Rebuilt the founder section as an executive leadership profile.",
      "Wired all public forms to LiveForm for reliable email delivery.",
    ],
  },
];
