/**
 * Balogun Adeolu — Personal Website Configuration
 *
 * This is the digital headquarters of a technology founder.
 * Pedumo appears as one chapter of his journey, not the whole story.
 */

export const FOUNDER_IMAGE = "/pedumoceo.jpg";
export const FOUNDER_PORTRAIT = "/portrait-1.jpg";
export const FOUNDER_PORTRAIT_2 = "/portrait-2.jpg";
export const FOUNDER_FULL = "/founder-full.png";

export const siteConfig = {
  name: "Balogun Adeolu",
  legalName: "Balogun Adeolu",
  tagline: "Technology Founder. Software Architect. Builder.",
  description:
    "Balogun Adeolu is a technology founder, software architect and cybersecurity professional building companies around discipline, trust and execution. Founder of Pedumo.",
  url: "https://balogunadeolu.com",
  ogImage: "/og.png",
  email: "adeolu@balogunadeolu.com",
  locale: "en_US",
  founder: "Balogun Adeolu",
  personalLinks: {
    linkedin: "https://www.linkedin.com/in/balogunadeolu",
    github: "https://github.com/balogunadeolu",
    x: "https://x.com/balogunpedumo",
    email: "adeolu@balogunadeolu.com",
  },
  ventures: {
    pedumo: {
      name: "Pedumo",
      url: "https://pedumo.com",
      role: "Founder & Software Architect",
      description: "Technology engineering and AI automation company.",
      linkedin: "https://www.linkedin.com/company/pedumo",
      github: "https://github.com/pedumostudio",
      x: "https://x.com/pedumolabs",
    },
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Story", href: "/story" },
  { label: "Thinking", href: "/thinking" },
  { label: "Leadership", href: "/leadership" },
  { label: "Ventures", href: "/ventures" },
  { label: "Speaking", href: "/speaking" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  Navigate: [
    { label: "Home", href: "/" },
    { label: "Story", href: "/story" },
    { label: "Thinking", href: "/thinking" },
    { label: "Leadership", href: "/leadership" },
    { label: "Ventures", href: "/ventures" },
    { label: "Speaking", href: "/speaking" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  Ventures: [
    { label: "Pedumo", href: "https://pedumo.com" },
    { label: "GitHub", href: "https://github.com/balogunadeolu" },
  ],
  Connect: [
    { label: "LinkedIn", href: siteConfig.personalLinks.linkedin },
    { label: "X", href: siteConfig.personalLinks.x },
    { label: "Email", href: `mailto:${siteConfig.personalLinks.email}` },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
