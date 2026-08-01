import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useHashRoute } from "@/hooks/useHashRoute";
import { HomePage } from "@/pages/HomePage";
import { FounderPage } from "@/pages/FounderPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { AboutPage } from "@/pages/AboutPage";
import { CaseStudiesPage } from "@/pages/CaseStudiesPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { ContactPage } from "@/pages/ContactPage";
import { BookPage } from "@/pages/BookPage";
import { SecurityPage } from "@/pages/SecurityPage";
import { NotFoundPage, PrivacyPage, StatusPage, TermsPage } from "@/pages/SimplePages";

function resolvePage(path: string) {
  switch (path) {
    case "/":
      return <HomePage />;
    case "/founder":
      return <FounderPage />;
    case "/services":
      return <ServicesPage />;
    case "/about":
      return <AboutPage />;
    case "/case-studies":
      return <CaseStudiesPage />;
    case "/insights":
      return <InsightsPage />;
    case "/contact":
      return <ContactPage />;
    case "/book":
      return <BookPage />;
    case "/security":
      return <SecurityPage />;
    case "/status":
      return <StatusPage />;
    case "/privacy":
      return <PrivacyPage />;
    case "/terms":
      return <TermsPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const { path, section } = useHashRoute();

  // Track previous path so in-page section jumps don't force a top scroll flash
  useEffect(() => {
    if (section) {
      const timer = window.setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path, section]);

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header path={path} />
      <main id="main" className="flex-1">
        {resolvePage(path)}
      </main>
      <Footer />
    </div>
  );
}
