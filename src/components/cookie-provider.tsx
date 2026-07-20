"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
};

type CookieContextValue = {
  consent: CookieConsent;
  hasDecided: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  reset: () => void;
};

const CookieContext = createContext<CookieContextValue | undefined>(undefined);
const STORAGE_KEY = "pedumo-cookie-consent";

function readStored(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (parsed && typeof parsed.analytics === "boolean") {
      return { essential: true, analytics: parsed.analytics };
    }
  } catch {
    // ignore
  }
  return null;
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>({ essential: true, analytics: false });
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setConsent(stored);
      setHasDecided(true);
    }
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    setConsent(next);
    setHasDecided(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const acceptAll = useCallback(() => persist({ essential: true, analytics: true }), [persist]);
  const rejectOptional = useCallback(
    () => persist({ essential: true, analytics: false }),
    [persist],
  );
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConsent({ essential: true, analytics: false });
    setHasDecided(false);
  }, []);

  return (
    <CookieContext.Provider value={{ consent, hasDecided, acceptAll, rejectOptional, reset }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookies must be used within CookieProvider");
  return ctx;
}
