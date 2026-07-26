"use client";

import { useEffect, useRef } from "react";
import { useCookies } from "@/components/cookie-provider";

/**
 * Loads analytics providers only after the visitor has consented. All
 * provider IDs are read from NEXT_PUBLIC_* env vars so the site ships
 * with zero tracking until configured and consented.
 *
 * Supported: Google Analytics 4, Microsoft Clarity, Plausible Analytics.
 */
export function AnalyticsLoader() {
  const { consent } = useCookies();
  const loaded = useRef(false);

  useEffect(() => {
    if (!consent.analytics || loaded.current) return;
    loaded.current = true;

    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

    if (gaId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s);
      const init = document.createElement("script");
      init.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`;
      document.head.appendChild(init);
    }

    if (clarityId) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`;
      document.head.appendChild(s);
    }

    if (plausibleDomain) {
      const s = document.createElement("script");
      s.async = true;
      s.defer = true;
      s.setAttribute("data-domain", plausibleDomain);
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
  }, [consent.analytics]);

  return null;
}
