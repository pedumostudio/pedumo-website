export type DocArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export const docArticles: DocArticle[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    category: "Overview",
    summary:
      "How to evaluate, onboard and ship your first engagement with Pedumo — from first call to first deploy.",
    sections: [
      {
        heading: "Book a strategic consultation",
        body: "Every engagement begins with a 30-minute consultation. Come with the problem; leave with a clearer path. No obligation, no sales script.",
      },
      {
        heading: "Discovery & scope",
        body: "We produce a written statement of work with measurable acceptance criteria, a risk register and a delivery plan. You approve before a line of code is written.",
      },
      {
        heading: "Delivery cadence",
        body: "Weekly demos, a public changelog and a shared repository keep you in control. We optimize for your confidence, not just our velocity.",
      },
      {
        heading: "Handover & support",
        body: "You own everything we build — code, infrastructure, credentials and documentation. Post-launch support is a first-class service, not an upsell.",
      },
    ],
  },
  {
    slug: "api-overview",
    title: "API Overview",
    category: "Developers",
    summary:
      "How Pedumo-built platforms expose versioned, documented APIs for partners and internal tools.",
    sections: [
      {
        heading: "Versioning",
        body: "All public APIs are versioned in the URL (/v1, /v2). Breaking changes ship as a new version; old versions are supported for at least 12 months.",
      },
      {
        heading: "Authentication",
        body: "Bearer tokens with scoped permissions, short-lived access tokens and refresh rotation. Webhook signatures use HMAC-SHA256 with per-endpoint secrets.",
      },
      {
        heading: "Rate limiting",
        body: "Per-key rate limits with standard headers (X-RateLimit-Limit, Remaining, Reset). 429 responses include Retry-After.",
      },
      {
        heading: "Errors",
        body: "Consistent error envelope with a machine-readable code, a human message and a request id for support.",
      },
    ],
  },
  {
    slug: "authentication",
    title: "Authentication",
    category: "Developers",
    summary:
      "Patterns we use for authentication and session management in Pedumo-built products.",
    sections: [
      {
        heading: "Session strategy",
        body: "HttpOnly, SameSite=Lax cookies for web; short-lived JWTs with refresh rotation for mobile and APIs.",
      },
      {
        heading: "MFA",
        body: "TOTP and passkeys supported from day one for admin and high-privilege roles.",
      },
      {
        heading: "SSO",
        body: "SAML and OIDC integrations for enterprise customers, with SCIM provisioning on request.",
      },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture Principles",
    category: "Engineering",
    summary:
      "The principles that shape every system we build — from data models to deployment topology.",
    sections: [
      {
        heading: "Bounded contexts",
        body: "Clear ownership boundaries between domains, with explicit contracts at the seams.",
      },
      {
        heading: "Event-driven where it pays",
        body: "Asynchronous events for cross-domain communication; synchronous calls only inside a bounded context.",
      },
      {
        heading: "Observable by default",
        body: "Metrics, logs and traces emitted from the first commit, with dashboards reviewed weekly.",
      },
    ],
  },
  {
    slug: "deployment",
    title: "Deployment",
    category: "DevOps",
    summary:
      "How we deploy to Cloudflare Pages, Vercel and container platforms with zero-downtime releases.",
    sections: [
      {
        heading: "Preview environments",
        body: "Every pull request gets an isolated preview with seeded data, so stakeholders can review before merge.",
      },
      {
        heading: "Progressive delivery",
        body: "Canary and blue-green strategies for stateful services; instant rollback on regression.",
      },
      {
        heading: "Immutable artifacts",
        body: "Builds produce immutable images or static bundles promoted through environments — never rebuilt per stage.",
      },
    ],
  },
  {
    slug: "faq",
    title: "Documentation FAQ",
    category: "Overview",
    summary: "Answers to the questions developers ask most when evaluating Pedumo.",
    sections: [
      {
        heading: "Do you provide SDKs?",
        body: "Yes — TypeScript and Python SDKs are generated from our OpenAPI specs and published to npm and PyPI.",
      },
      {
        heading: "Can I self-host?",
        body: "For Pedumo-built platforms, yes. We deliver container images and Helm charts with documented values.",
      },
      {
        heading: "How do I report a bug in a Pedumo-built system?",
        body: "Through our Responsible Disclosure page for security issues, or your dedicated support channel for functional bugs.",
      },
    ],
  },
];
