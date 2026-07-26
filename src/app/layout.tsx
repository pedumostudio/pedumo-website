import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Geist_Mono } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  keywords: [
    "software engineering company",
    "AI automation",
    "custom software development",
    "enterprise software",
    "cybersecurity",
    "cloud engineering",
    "business automation",
    "Pedumo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@pedumolabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
  founder: { "@type": "Person", name: siteConfig.founder },
  sameAs: [
    siteConfig.socials.linkedin,
    siteConfig.socials.github,
    siteConfig.socials.youtube,
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    siteConfig.socials.x,
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
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CookieProvider>
            <CommandPaletteProvider>
              <ScrollProgress />
              <AnalyticsLoader />
              <SentryLoader />
              <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
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
