# Pedumo Production Audit and Release Notes

Date: 2026-08-05
Branch: `arena/019fd290-pedumo-website`

## Verified repository context before this work

- Current repository: `/home/user/pedumo-website`
- Current branch: `arena/019fd290-pedumo-website`
- Starting commit reported by the checkout: `9184a5f7ab3f9a38d46638d4480953b05d80bb17`
- Remote: `origin https://github.com/pedumo/pedumo-website.git`

## Phase 1 audit findings

### Broken links / missing pages

- Active internal route scan found no missing route bases for `/`, `/services`, `/insights`, `/open-source`, `/journal`, `/founder`, `/about`, `/case-studies`, `/security`, `/contact`, `/book`, `/status`, `/privacy`, and `/terms`.
- Public asset scan found no missing referenced public assets.
- GitHub API returned `200` for `pedumo/pedumo-website`.
- GitHub API returned `404` for the pending `pedumolab/pedumo-docs`, `pedumo-cloud`, `pedumo-security`, `pedumo-ai`, and `pedumo-labs` repositories.

### Dead pages / missing pages

- Required pages exist: `/insights`, `/open-source`, `/journal`, `/founder`, `/contact`, `/privacy`, `/terms`, `/status`.
- Unknown routes render the SPA fallback and the app-level not-found page.

### Duplicate code / duplicated components

- Social/trust links were centralized in `src/lib/site.ts` to avoid duplicated URL definitions.
- Footer duplicate href check found no duplicated footer hrefs after the footer revision.

### Unused JavaScript / CSS / assets / fonts

- TypeScript `noUnusedLocals` validation passed.
- Google Fonts were removed from `index.html`, `public/_headers`, and `src/worker.ts`; the site now uses system font fallback from the CSS stack.
- Required public assets are present: `icon.svg`, `og.png`, `pedumoceo.jpg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `_headers`, and `.well-known/security.txt`.
- Full CSS coverage could not be measured without a browser coverage tool. I could not verify this.

### SEO weaknesses found and addressed

- SearchAction needed a real search experience; `/insights` now has a client-side knowledge hub search.
- Breadcrumb structured data was not generated consistently; the SEO component now adds WebSite, WebPage and BreadcrumbList schema where applicable.
- Static Organization and WebSite schema were updated in `index.html`.
- Sitemap and robots are present.

### Performance bottlenecks found and addressed

- External Google Fonts were a render dependency and were removed.
- Production build output is single-file and currently about 431.64 kB uncompressed / 122.17 kB gzip.
- Lighthouse could not run because Chrome/Chromium is not installed in the sandbox. I could not verify Lighthouse scores.

### Accessibility and mobile findings

- Skip link, semantic landmarks, reduced-motion CSS and focus states exist.
- Contact email channels now use semantic `address` markup and explicit ARIA labels.
- Route HTTP checks passed through Vite preview.
- Browser-based keyboard, screen reader and breakpoint verification at 320px, 375px, 414px, 768px, 1024px and 1440px could not be executed because no Chrome/Chromium browser is available. I could not verify this.

### Social link findings

- Active source/config scan found no `ceo@pedumo.com`, Facebook, Instagram, TikTok, Discord, Spotify, YouTube, `pedumostudio`, `pedumolabs`, or `balogunpedumo` references.
- `https://github.com/pedumolab` verified via fetch page and GitHub API context.
- `https://dev.to/pedumo` verified via fetch page.
- `https://x.com/pedumolab` verified via fetch page.
- `https://balogunadeolu.com` verified via fetch page.
- `https://medium.com/@balogunadeolu` returned Medium 404 content through fetch page. I could not verify this as a working Medium profile.
- `https://www.linkedin.com/company/pedumo` returned HTTP 403 through fetch tooling. I could not verify this.
- `https://pedumo.com` fetched successfully, but production content did not reflect the latest local build at audit time. Deployment could not be verified.

## Changes implemented

### Phase A — Perfect the website

- Restored `Founder` in primary navigation.
- Reworked `/founder` with biography, mission, vision, engineering philosophy, experience, timeline and links.
- Reworked `/contact` with separate channels:
  - General enquiries: `contact@pedumo.com`
  - Business bookings: `booking@pedumo.com`
  - Future partnerships: `partnerships@pedumo.com`
- Rebuilt footer groups: Products, Engineering, Open Source, Resources, Company, Legal, Support, Newsletter and Social.
- Removed duplicated footer hrefs.
- Removed Google Fonts dependency.
- Expanded SEO structured data with WebSite, WebPage, BreadcrumbList and SearchAction support.
- Added a real search UI to `/insights` to support SearchAction.

### Phase B — Living engineering platform

- Added Engineering Operating Brief with rotating:
  - Engineering Tip of the Day
  - AI Today
  - Cybersecurity Alert
  - Weekly Engineering Principle
- Updated homepage articles section label to Latest Articles / Engineering Insights.
- Reworked Latest GitHub Activity to fetch live public commit activity from `pedumo/pedumo-website`.
- Reworked repository cards to show live data only when a repository exists:
  - Stars
  - Forks
  - Language
  - License
  - Updated
  - Contributors
- Pending repositories display `Repository pending.` and no fabricated metrics.
- Reworked `/journal` to show PEDUMO website articles and explicit pending status for DEV.to and Medium feed integrations.
- Reworked `/insights` as a professional searchable knowledge hub with Software Engineering, AI, Cloud, Cybersecurity, Architecture, DevSecOps, Automation, Engineering Principles, Whitepapers, Checklists, Downloads and Case Studies.
- Newsletter remains disabled and displays `Newsletter backend not configured.`

## Validation performed

```bash
npm ci
npx tsc --noEmit
npm run build
npm audit --audit-level=low
git diff --check
```

Additional checks:

- Vite preview route checks for all primary routes returned HTTP 200.
- Internal link scan found no missing route bases.
- Public asset scan found no missing public assets.
- Forbidden social/email scan found no active forbidden references.
- GitHub API checks verified existing and pending repository states.
- Lighthouse was attempted and failed because Chrome/Chromium is missing.

## Validation results

- TypeScript: passed.
- Production build: passed.
- npm audit: zero vulnerabilities.
- git diff whitespace check: passed.
- Internal route checks: passed.
- Public asset checks: passed.
- Lighthouse: failed to run due missing Chrome/Chromium.
- Deployment: not verified.
