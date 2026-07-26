"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
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

/* ── External store (useSyncExternalStore) ───────────────────────────── */

const consentListeners = new Set<() => void>();

function subscribeConsent(listener: () => void): () => void {
  consentListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    consentListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

function notifyConsentChange(): void {
  consentListeners.forEach((l) => l());
}

// Cache the client snapshot so useSyncExternalStore gets a stable reference.
let cachedSnapshot: CookieConsent | null = null;
let cachedRaw: string | null = null;

function getConsentSnapshot(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = readStored();
  return cachedSnapshot;
}

function getServerConsentSnapshot(): CookieConsent | null {
  return null;
}

export function CookieProvider({ children }: { children: ReactNode }) {
  // Runtime overrides applied via explicit user actions (accept/reject/reset).
  const [override, setOverride] = useState<{ consent: CookieConsent; decided: boolean } | null>(
    null,
  );

  // Read persisted consent through useSyncExternalStore: the server snapshot
  // is always the default (stable SSR), the client snapshot reflects storage.
  // This is the purpose-built React primitive for external, mutable stores and
  // avoids both hydration mismatches and setState-in-effect.
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const consent = override?.consent ?? stored ?? { essential: true, analytics: false };
  const hasDecided = override?.decided ?? stored !== null;

  const persist = useCallback((next: CookieConsent) => {
    setOverride({ consent: next, decided: true });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    notifyConsentChange();
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
    setOverride({ consent: { essential: true, analytics: false }, decided: false });
    notifyConsentChange();
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
