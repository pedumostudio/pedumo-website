/**
 * Authentic founder portrait.
 * Public asset path on the Pedumo website (never a GitHub blob URL).
 * Production serves this from /public/pedumoceo.jpg → https://pedumo.com/pedumoceo.jpg
 */
export const FOUNDER_IMAGE = "/pedumoceo.jpg";

/** Absolute URL used for img src / Open Graph when the binary is hosted on pedumo.com */
export const FOUNDER_IMAGE_SRC = "https://pedumo.com/pedumoceo.jpg";

export const siteConfig = {
  name: "Pedumo",
  legalName: "Pedumo Technologies",
  tagline: "Engineering intelligent software products.",
  description:
    "Pedumo is an engineering company building secure software products, cloud platforms, AI systems and resilient digital infrastructure for organizations that need technology they can trust.",
  url: "https://pedumo.com",
  ogImage: "https://pedumo.com/og.png",
  email: "contact@pedumo.com",
  bookingEmail: "booking@pedumo.com",
  supportEmail: "support@pedumo.com",
  securityEmail: "security@pedumo.com",
  locale: "en_US",
  founder: "Balogun Adeolu",
  founderTitle: "Founder & Software Engineer",
  founderLinks: {
    website: "https://balogunadeolu.com",
    medium: "https://medium.com/@balogunadeolu",
    email: "contact@pedumo.com",
  },
  socials: {
    website: "https://pedumo.com",
    linkedin: "https://www.linkedin.com/company/pedumo",
    github: "https://github.com/pedumolab",
    x: "https://x.com/pedumolab",
    dev: "https://dev.to/pedumo",
    medium: "https://medium.com/@balogunadeolu",
  },
  socialHandles: {
    x: "@pedumolab",
  },
} as const;

export type OfficialLink = {
  label: "Website" | "GitHub" | "LinkedIn" | "Medium" | "DEV.to" | "X";
  href: string;
};

export const officialLinks: OfficialLink[] = [
  { label: "Website", href: siteConfig.socials.website },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Medium", href: siteConfig.socials.medium },
  { label: "DEV.to", href: siteConfig.socials.dev },
  { label: "X", href: siteConfig.socials.x },
];

export const trustIndicatorLinks = officialLinks.filter((link) => link.label !== "Website");

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Engineering", href: "/services", description: "Nine engineering disciplines." },
  { label: "Insights", href: "/insights", description: "Engineering articles and research notes." },
  { label: "Open Source", href: "/open-source", description: "Featured Pedumo repositories." },
  { label: "Journal", href: "/journal", description: "Publishing channels and integration status." },
  { label: "About", href: "/about", description: "Mission, vision and values." },
  { label: "Contact", href: "/contact", description: "Start a conversation." },
];

export const footerNav = {
  Products: [
    { label: "Software Products", href: "/services#software-engineering" },
    { label: "AI Systems", href: "/services#ai-automation" },
    { label: "Cloud Platforms", href: "/services#cloud-engineering" },
    { label: "Security Programs", href: "/security" },
  ],
  Engineering: [
    { label: "How PEDUMO Builds Software", href: "/#principles" },
    { label: "Capabilities", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Latest Activity", href: "/#activity" },
  ],
  "Open Source": [
    { label: "Featured Repositories", href: "/open-source" },
    { label: "PEDUMO Website", href: "/open-source#pedumo-website" },
    { label: "PEDUMO Docs", href: "/open-source#pedumo-docs" },
    { label: "GitHub Organization", href: siteConfig.socials.github, external: true },
  ],
  Resources: [
    { label: "Documentation", href: "/open-source#pedumo-docs" },
    { label: "Articles", href: "/insights" },
    { label: "Engineering Journal", href: "/journal" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/founder" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Consultation", href: "/book" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
