import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CookieProvider } from "@/components/cookie-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { AnalyticsLoader } from "@/components/analytics-loader";
import { SentryLoader } from "@/lib/sentry";
import { ErrorBoundary } from "@/components/error-boundary";
import { CommandPaletteProvider } from "@/components/command-palette";
import { siteConfig } from "@/lib/site";

// Primary sans: Inter — the enterprise standard used by leading engineering
// organizations. We ship the variable font, latin subset only, with a locked
// axis for consistent rendering across weights. Display fallback stack is
// declared in globals.css.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

// Monospace: JetBrains Mono — a clear, engineering-grade monospace with
// disciplined proportions and generous letter width for numerals and code.
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif for restrained italic accents in headlines.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  publisher: siteConfig.name,
category: "Technology",
referrer: "origin-when-cross-origin",

formatDetection: {
  email: false,
  telephone: false,
  address: false,
},

verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
},
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  keywords: [
   "AI company",
  "Artificial Intelligence",
  "Enterprise AI",
  "AI Automation",
  "AI Agents",
  "Custom Software Development",
  "Enterprise Software",
  "Cybersecurity",
  "Cloud Engineering",
  "Cloud Infrastructure",
  "Business Automation",
  "Machine Learning",
  "Data Engineering",
  "Digital Transformation",
  "Software Consulting",
  "Application Development",
  "Technology Company",
  "Enterprise Technology",
  "Automation Platform",
  "Cloud Native Development",
  "Next.js Development",
  "Pedumo",
  "Pedumo Studio",
  "Balogun Adeolu",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
  {
    url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} • ${siteConfig.tagline}`,
      type: "image/png",
    },
  ],
},
  twitter: {
  card: "summary_large_image",
  site: "@balogunpedumo",
  creator: "@balogunpedumo",
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  images: [siteConfig.ogImage],
},
  robots: {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  logo: `${siteConfig.url}/icon.svg`,
  founder: { "@type": "Person", name: siteConfig.founder },
  sameAs: [
  siteConfig.socials.linkedin,
  siteConfig.socials.github,
  siteConfig.socials.youtube,
  siteConfig.socials.facebook,
  siteConfig.socials.x,
  siteConfig.socials.instagram,
  siteConfig.socials.threads,
  siteConfig.socials.medium,
  siteConfig.socials.bluesky,
],
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "sales",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CookieProvider>
            <CommandPaletteProvider>
              <ScrollProgress />
              <AnalyticsLoader />
              <SentryLoader />
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Skip to content
              </a>
              <SiteHeader />
              <main id="main" className="min-h-screen pt-[76px]">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
              <SiteFooter />
              <CookieBanner />
            </CommandPaletteProvider>
          </CookieProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
