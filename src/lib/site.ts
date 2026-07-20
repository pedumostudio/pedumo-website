export const siteConfig = {
  name: "Pedumo",
  legalName: "Pedumo Technologies Limited",

  tagline: "Engineering Intelligence for Modern Business.",

  description:
    "Pedumo is a global AI engineering, enterprise software, cybersecurity and cloud infrastructure company helping startups, businesses, governments and enterprises build intelligent software, automate operations, strengthen security and accelerate digital transformation.",

  url: "https://pedumo.com",
  ogImage: "/og.png",

  email: "ceo@pedumo.com",
  bookingEmail: "booking@pedumo.com",
  supportEmail: "support@pedumo.com",
  partnershipsEmail: "partners@pedumo.com",
  securityEmail: "security@pedumo.com",

  locale: "en_US",

  founder: "Balogun Adeolu",

  founded: "2026",

  headquarters: "Remote-first",

  country: "United States",

  timezone: "America/New_York",

  language: "English",

  founderLinks: {
    linkedin: "https://www.linkedin.com/in/balogunadeolu",
    x: "https://x.com/balogunpedumo",
    website: "https://balogunpedumo.vercel.app",
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/balogunadeolu",
    github: "https://github.com/pedumostudio",
    youtube: "https://youtube.com/@pedumostudio",
    facebook: "https://facebook.com/pedumostudio",
    instagram: "https://instagram.com/pedumostudio",
    x: "https://x.com/balogunpedumo",
    tiktok: "https://tiktok.com/@pedumostudio",
    threads: "https://threads.net/@pedumostudio",
    medium: "https://medium.com/@pedumostudio",
    bluesky: "https://bsky.app/profile/pedumo.com",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Studio", href: "/studio" },
  { label: "Company", href: "#" },
];

export const companyNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "The Pedumo story, mission and vision.",
  },
  {
    label: "Founder",
    href: "/founder",
    description: "Meet Balogun Adeolu, Founder & Engineer.",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "The technologies powering our products.",
  },
  {
    label: "Open Source",
    href: "/open-source",
    description: "Projects we contribute to the developer community.",
  },
  {
    label: "Insights",
    href: "/insights",
    description: "Engineering articles, research and product updates.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Build the future of software with us.",
  },
];

export const footerNav: Record<string, readonly NavItem[]> = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/founder" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
    { label: "Book Consultation", href: "/book" },
  ],

  Products: [
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Request Demo", href: "/demo" },
    { label: "Case Studies", href: "/case-studies" },
  ],

  Resources: [
    { label: "Insights", href: "/insights" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api-overview" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Resource Center", href: "/resources" },
    { label: "System Status", href: "/status" },
    { label: "Open Source", href: "/open-source" },
    { label: "Pedumo Studio", href: "/studio" },
  ],

  Trust: [
    { label: "Security", href: "/security" },
    { label: "Trust Center", href: "/trust-center" },
    {
      label: "Responsible Disclosure",
      href: "/responsible-disclosure",
    },
    { label: "Technologies", href: "/technologies" },
  ],

  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;