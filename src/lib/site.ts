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
  tagline: "Engineering Intelligent Business Solutions.",
  description:
    "Pedumo is a technology engineering and AI automation partner. We build secure software, cloud infrastructure, data intelligence and cyber resilience for startups, enterprises and governments.",
  url: "https://pedumo.com",
  ogImage: "https://pedumo.com/og.png",
  email: "ceo@pedumo.com",
  bookingEmail: "booking@pedumo.com",
  supportEmail: "support@pedumo.com",
  securityEmail: "security@pedumo.com",
  locale: "en_US",
  founder: "Balogun Adeolu",
  founderTitle: "Founder & Software Engineer",
  founderLinks: {
    linkedin: "https://www.linkedin.com/in/balogunpedumo",
    x: "https://x.com/balogunpedumo",
    youtube: "https://youtube.com/@balogunpedumo",
    instagram: "https://instagram.com/balogunpedumo",
    facebook: "https://facebook.com/balogunpedumo",
    whatsapp: "https://wa.me/message/balogunpedumo",
    github: "https://github.com/balogunadeolu",
    website: "https://www.balogunadeolu.com",
    email: "ceo@pedumo.com",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/pedumo",
    github: "https://github.com/pedumostudio",
    x: "https://x.com/pedumolabs",
    facebook: "https://facebook.com/pedumostudios",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", description: "Nine engineering disciplines." },
  { label: "Case Studies", href: "/case-studies", description: "How we think, demonstrated." },
  { label: "About", href: "/about", description: "Mission, vision and values." },
  { label: "Founder", href: "/founder", description: "Meet Balogun Adeolu." },
  { label: "Insights", href: "/insights", description: "Engineering notes for leaders." },
  { label: "Contact", href: "/contact", description: "Start a conversation." },
];

export const footerNav = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder", href: "/founder" },
    { label: "Contact", href: "/contact" },
    { label: "Book Consultation", href: "/book" },
  ],
  Capabilities: [
    { label: "All services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Security", href: "/security" },
  ],
  Resources: [
    { label: "Insights", href: "/insights" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
