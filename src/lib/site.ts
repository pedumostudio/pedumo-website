/**
 * Founder portrait source.
 *
 * IMPORTANT: This must be the AUTHENTIC founder photograph at
 * `public/pedumoceo.jpg`. Never substitute an AI-generated portrait,
 * a placeholder SVG, an external GitHub blob URL, or any other
 * non-photographic source here.
 */
export const FOUNDER_IMAGE = "/pedumoceo.jpg";

export const siteConfig = {
  name: "Pedumo",
  legalName: "Pedumo Technologies",
  tagline: "Engineering Intelligent Business Solutions.",
  description:
    "Pedumo is a software engineering and AI automation company. We help startups, SMEs, enterprises, NGOs and governments build modern software, automate operations and strengthen security.",
  url: "https://pedumo.com",
  ogImage: "/og.png",
  email: "ceo@pedumo.com",
  bookingEmail: "booking@pedumo.com",
  supportEmail: "support@pedumo.com",
  partnershipsEmail: "partners@pedumo.com",
  securityEmail: "security@pedumo.com",
  locale: "en_US",
  founder: "Balogun Adeolu",
  founderLinks: {
    linkedin: "https://www.linkedin.com/in/balogunadeolu",
    github: "https://github.com/balogunadeolu",
    x: "https://x.com/balogunpedumo",
    website: "https://www.balogunadeolu.com",
    email: "ceo@pedumo.com",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/pedumo",
    github: "https://github.com/pedumostudio",
    youtube: "https://youtube.com/@pedumostudios",
    facebook: "https://facebook.com/pedumostudios",
    instagram: "https://instagram.com/pedumostudios",
    tiktok: "https://tiktok.com/@pedumostudios",
    x: "https://x.com/pedumolabs",
    whatsapp: "https://whatsapp.com/channel/pedumostudios",
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
  { label: "Company", href: "/about" },
];

export const companyNav: NavItem[] = [
  { label: "About", href: "/about", description: "The Pedumo story, mission and vision." },
  { label: "Founder", href: "/founder", description: "Meet Balogun Adeolu, Founder & Engineer." },
  { label: "Technologies", href: "/technologies", description: "The stack we build production systems on." },
  { label: "Open Source", href: "/open-source", description: "Our contributions to the ecosystem." },
  { label: "Insights", href: "/insights", description: "Engineering notes and industry analysis." },
  { label: "Careers", href: "/careers", description: "Build the future of software with us." },
];

export const footerNav = {
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
    { label: "All products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  Resources: [
    { label: "Blog", href: "/insights" },
    { label: "Documentation", href: "/docs" },
    { label: "API reference", href: "/docs/api-overview" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Resource Center", href: "/resources" },
    { label: "Status", href: "/status" },
    { label: "Open Source", href: "/open-source" },
    { label: "Pedumo Studio", href: "/studio" },
  ],
  Trust: [
    { label: "Security", href: "/security" },
    { label: "Trust Center", href: "/trust-center" },
    { label: "Responsible Disclosure", href: "/responsible-disclosure" },
    { label: "Technologies", href: "/technologies" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;
