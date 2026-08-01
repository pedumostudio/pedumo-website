import { useCallback, useEffect, useState } from "react";

/** Parse `#/route` or `#/route#section` from location.hash */
export function parseHash(hash: string): { path: string; section: string } {
  const raw = hash.replace(/^#/, "") || "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const [pathPart, ...sectionParts] = withSlash.split("#");
  const path = (pathPart || "/").split("?")[0] || "/";
  const section = sectionParts.join("#") || "";
  return { path, section };
}

export function useHashRoute() {
  const [{ path, section }, setRoute] = useState(() =>
    typeof window !== "undefined" ? parseHash(window.location.hash) : { path: "/", section: "" },
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) {
      window.location.hash = "#/";
    } else {
      onHash();
    }
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = to.startsWith("/") ? to : `/${to}`;
    const current = parseHash(window.location.hash);
    if (current.path !== next || current.section) {
      window.location.hash = next;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return { path, section, navigate };
}

export function hrefOf(path: string, section?: string) {
  const base = `#${path.startsWith("/") ? path : `/${path}`}`;
  return section ? `${base}#${section}` : base;
}
