import { useCallback, useEffect, useState } from "react";

function normalizePath(pathname: string) {
  const clean = pathname.split("?")[0] || "/";
  if (clean === "/index.html") return "/";
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean || "/";
}

/** Parse legacy `#/route` or `#/route#section` hashes kept for old shared links. */
export function parseHash(hash: string): { path: string; section: string } {
  const raw = hash.replace(/^#/, "") || "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const [pathPart, ...sectionParts] = withSlash.split("#");
  const path = normalizePath(pathPart || "/");
  const section = sectionParts.join("#") || "";
  return { path, section };
}

function routeFromLocation() {
  if (window.location.hash.startsWith("#/")) {
    return parseHash(window.location.hash);
  }

  return {
    path: normalizePath(window.location.pathname),
    section: window.location.hash.replace(/^#/, ""),
  };
}

function routeUrl(path: string, section?: string) {
  const cleanPath = normalizePath(path.startsWith("/") ? path : `/${path}`);
  return section ? `${cleanPath}#${section}` : cleanPath;
}

export function useHashRoute() {
  const [{ path, section }, setRoute] = useState(() =>
    typeof window !== "undefined" ? routeFromLocation() : { path: "/", section: "" },
  );

  useEffect(() => {
    const syncRoute = () => setRoute(routeFromLocation());

    if (window.location.hash.startsWith("#/")) {
      const legacy = parseHash(window.location.hash);
      window.history.replaceState(null, "", routeUrl(legacy.path, legacy.section));
      setRoute(legacy);
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const nextPath = normalizePath(url.pathname);
      const nextSection = url.hash.replace(/^#/, "");
      window.history.pushState(null, "", `${nextPath}${url.hash}`);
      setRoute({ path: nextPath, section: nextSection });
    };

    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    const url = routeUrl(to);
    window.history.pushState(null, "", url);
    setRoute(routeFromLocation());
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return { path, section, navigate };
}

export function hrefOf(path: string, section?: string) {
  if (path.startsWith("http") || path.startsWith("mailto:")) return path;

  const [rawPath, rawHash] = path.split("#");
  const resolvedSection = section || rawHash;
  return routeUrl(rawPath || "/", resolvedSection);
}
