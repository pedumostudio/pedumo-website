/**
 * Cloudflare Worker edge entry point for Pedumo.
 *
 * Provides:
 * 1. Enterprise security response headers at the edge (CSP, HSTS, X-Frame-Options, etc.)
 * 2. Static asset routing with single-page application fallback via ASSETS binding
 * 3. Fast edge health probe at `/api/health` with Cloudflare data center telemetry
 * 4. Cache-Control optimization for immutable assets vs HTML documents
 */

export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' https://pedumo.com data: blob:",
    "connect-src 'self' https://liveformhq.com https://pedumo.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://liveformhq.com mailto:",
  ].join("; "),
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Edge health check endpoint
    if (url.pathname === "/api/health") {
      const colo = (request as unknown as { cf?: { colo?: string } }).cf?.colo || "EDGE";
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "pedumo-website",
          timestamp: new Date().toISOString(),
          edge_colo: colo,
          protocol: url.protocol.replace(":", ""),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            ...SECURITY_HEADERS,
          },
        },
      );
    }

    // 2. Serve static assets via Cloudflare Workers ASSETS binding
    let response: Response;
    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        // SPA fallback to root index.html
        response = await env.ASSETS.fetch(new Request(new URL("/", request.url).toString(), request));
      }
    } else {
      // Fallback when running outside full Workers Assets harness
      response = new Response("Pedumo edge worker active.", {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // 3. Clone response to append edge security & caching headers
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      if (!newHeaders.has(key)) {
        newHeaders.set(key, value);
      }
    }

    // Cache-Control headers optimization
    if (url.pathname.startsWith("/assets/") || url.pathname.endsWith(".svg") || url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg") || url.pathname.endsWith(".webmanifest")) {
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (
      url.pathname === "/" ||
      url.pathname.endsWith(".html") ||
      !url.pathname.includes(".") ||
      newHeaders.get("Content-Type")?.includes("text/html")
    ) {
      newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
