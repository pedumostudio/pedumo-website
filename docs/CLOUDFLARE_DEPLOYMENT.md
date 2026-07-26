# Deploying PEDUMO to Cloudflare Pages (Free Plan)

PEDUMO is a Next.js 16 App Router site with server API routes, dynamic and
static pages, ISR-friendly routes, RSS, an optional Postgres-backed form
store and a full SEO/accessibility surface. It deploys to Cloudflare Pages
via the **OpenNext Cloudflare** adapter, which is the current
officially-supported path for Next.js 16 on Cloudflare.

> The older `@cloudflare/next-on-pages` adapter only supports Next ≤ 15.5,
> so this project uses `@opennextjs/cloudflare` (installed as a dependency)
> to keep Next.js 16 intact.

## Prerequisites

- A Cloudflare account (Free Plan is sufficient).
- Node.js 20+ for local builds.
- A Cloudflare account ID and (for CLI deploys) an API token with
  **Workers Scripts: Edit** and **Pages: Edit** permissions.

The repository already includes:

- `@opennextjs/cloudflare` and `wrangler` in `package.json`.
- A `wrangler.jsonc` with `nodejs_compat`, static-assets binding and
  observability enabled.
- A `public/_headers` file mirroring the security headers so they apply at
  the Cloudflare edge regardless of how the build is served.
- A `public/.well-known/security.txt` responsible-disclosure pointer.

## 1. Connect the GitHub repository to Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git** and select this repository.
2. Configure the build:

   | Field                     | Value                              |
   | ------------------------- | ---------------------------------- |
   | Framework preset          | `None`                             |
   | Build command             | `npx opennextjs-cloudflare build`  |
   | Build output directory    | `.open-next/assets`                |
   | Node.js version (env)     | `NODE_VERSION=20`                  |

3. In **Settings → Environment variables**, add the variables you need
   (all optional — the site is fully functional without any of them):

   | Variable                  | Purpose                                            |
   | ------------------------- | -------------------------------------------------- |
   | `DATABASE_URL`            | Postgres connection string. If omitted, forms still deliver via LiveForm and `/api/health` reports `db: "not-configured"`. |
   | `LIVEFORM_ENDPOINT`       | Override the LiveForm form URL for email delivery. |
   | `AUTH_SECRET`             | HMAC secret for the optional session-cookie auth. If omitted, auth routes return 503 and the marketing site is unaffected. |
   | `NEXT_PUBLIC_GA4_ID`      | Google Analytics 4 measurement id.                 |
   | `NEXT_PUBLIC_CLARITY_ID`  | Microsoft Clarity project id.                      |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible site domain.                       |
   | `NEXT_PUBLIC_SENTRY_DSN`  | Sentry browser DSN for client error monitoring.    |
   | `NEXT_PUBLIC_RELEASE`     | Release label surfaced on `/api/status.json`.      |

   > Secrets (`DATABASE_URL`, `AUTH_SECRET`, `LIVEFORM_ENDPOINT`) are best
   > stored with `wrangler secret put <NAME>` or as **encrypted** Pages
   > variables so they never appear in build logs.

4. In **Settings → Builds & deployments → Compatibility flags**, add
   `nodejs_compat` (the same flag is already declared in `wrangler.jsonc`
   for CLI deploys; the dashboard setting covers Pages builds).

5. Save and deploy. Cloudflare will run the build command, upload
   `.open-next/assets` as the Pages site, and deploy the OpenNext Worker
   that handles SSR, API routes and the image route.

## 2. CLI deploy (alternative)

```bash
# one-time login
npx wrangler login

# build the OpenNext bundle
npx opennextjs-cloudflare build

# preview locally (optional)
npx wrangler pages dev .open-next/assets

# deploy to Cloudflare Pages
npx opennextjs-cloudflare deploy
```

`opennextjs-cloudflare deploy` reads `wrangler.jsonc` for the project name,
compatibility flags and assets directory, and uploads both the static
assets and the SSR Worker.

## 3. Local development

```bash
npm install
npm run dev          # Next.js dev server (matches production routing)
npm run build        # plain `next build` — used by the platform preview
node --test tests/*.test.mjs   # unit tests (Node built-in runner)
```

The plain `next build` remains the default for local and platform-preview
builds; only the Cloudflare Pages build command uses the OpenNext adapter.

## 4. Security headers

Security headers are applied in two places:

- `next.config.ts` — used by the Next.js server in local / non-Pages hosts.
- `public/_headers` — applied directly by Cloudflare Pages at the edge.

Both include `Content-Security-Policy`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy` and immutable caching for
`/videos/*`, `/images/*` and `/pedumoceo.jpg`. `X-Frame-Options` and
`frame-ancestors` are intentionally omitted so the site can be embedded by
review iframes; add clickjacking protection with a Cloudflare Transform
Rule if your deployment policy requires it.

## 5. Postgres on Cloudflare (optional)

If you want the optional form store on Cloudflare, use a serverless
Postgres that accepts HTTP pooled connections from Workers (for example
Neon) and set `DATABASE_URL` to its pooled connection string. Without it,
the site is fully production-ready: every page renders, every form
delivers via LiveForm, and `/api/health` returns
`{"ok":true,"db":"not-configured"}`.

## 6. Verifying the deployment

After the first deploy, confirm:

- `https://<your-domain>/api/health` returns `{"ok":true}` with a `db`
  field that is `connected`, `not-configured` or `error`.
- `https://<your-domain>/api/status.json` returns the service status
  payload.
- `curl -I https://<your-domain>/` shows the `Content-Security-Policy`
  header (from `public/_headers`).
- `https://<your-domain>/.well-known/security.txt` returns 200.
- `https://<your-domain>/sitemap.xml` lists every route.
- Submitting the contact form returns `{"ok":true}` and the email arrives
  via LiveForm.
- `https://<your-domain>/blog/rss.xml` serves `application/rss+xml`.

## 7. Free Plan limits

- 500 builds/month, 1 concurrent build — ample for a marketing site.
- Workers: 100,000 requests/day included — well above marketing traffic.
- No paid features are required by this project.

## 8. Troubleshooting

- **"build output directory contains links to files that can't be
  accessed"** — this error comes from pointing Pages at a Next.js
  `.next` directory. Use the OpenNext build command and the
  `.open-next/assets` output directory as shown above.
- **API route returns 503 "Authentication is not configured"** — expected
  when `AUTH_SECRET` is unset; the marketing site still works.
- **CSP blocks a third-party script** — the default CSP allows `'self'`,
  `https:` for `connect-src`/`img-src`/`font-src` and `'unsafe-inline'`
  for scripts/styles. Add specific hosts via a Cloudflare Transform Rule
  if a provider requires it.
