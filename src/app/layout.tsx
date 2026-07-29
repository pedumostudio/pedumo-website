import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CookieProvider } from "@/components/cookie-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { AnalyticsLoader } from "@/components/analytics-loader";
import { ErrorBoundary } from "@/components/error-boundary";
import { siteConfig } from "@/lib/site";

const inter = localFont({
  src: [
    { path: "../../public/fonts/inter-latin.woff2", style: "normal", weight: "100 900" },
    { path: "../../public/fonts/inter-latin-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
});
const geistMono = localFont({
  src: [
    { path: "../../public/fonts/geist-mono-400.woff2", style: "normal", weight: "400" },
    { path: "../../public/fonts/geist-mono-500.woff2", style: "normal", weight: "500" },
    { path: "../../public/fonts/geist-mono-600.woff2", style: "normal", weight: "600" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Balogun Adeolu — Technology Founder & Software Architect",
    template: "%s — Balogun Adeolu",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  keywords: [
    "Balogun Adeolu",
    "technology founder",
    "software architect",
    "cybersecurity professional",
    "business strategist",
    "digital transformation leader",
    "Pedumo founder",
    "software engineering leader",
    "technology executive",
    "public speaker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Balogun Adeolu — Technology Founder & Software Architect",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Balogun Adeolu — Technology Founder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balogun Adeolu — Technology Founder & Software Architect",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@balogunpedumo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
          ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
          : undefined,
      }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f16" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ── Structured data: Person ──────────────────────────────── */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Balogun Adeolu",
  jobTitle: "Technology Founder & Software Architect",
  description: siteConfig.description,
  image: `${siteConfig.url}/pedumoceo.jpg`,
  url: siteConfig.url,
  sameAs: [
    siteConfig.personalLinks.linkedin,
    siteConfig.personalLinks.github,
    siteConfig.personalLinks.x,
  ],
  worksFor: {
    "@type": "Organization",
    name: "Pedumo",
    url: "https://pedumo.com",
  },
  knowsAbout: [
    "Software Architecture",
    "Cybersecurity",
    "AI Automation",
    "Cloud Engineering",
    "Digital Transformation",
    "Business Strategy",
  ],
};

/* ── Structured data: WebSite + SearchAction ────────────────────── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/journal?q={search_term_string}`,
    },
    queryInput: "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CookieProvider>
            <ScrollProgress />
            <AnalyticsLoader />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:outline-2 focus:outline-accent-500"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="min-h-screen pt-[76px]">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <SiteFooter />
            <CookieBanner />
          </CookieProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
