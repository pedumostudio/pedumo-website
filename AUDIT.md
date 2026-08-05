# Pedumo Website Audit and Release Notes

Date: 2026-08-05
Branch: `arena/019fd290-pedumo-website`

## Pre-change Audit

### Broken links / missing pages

- `/open-source` was required but did not exist.
- `/journal` was required but did not exist.
- Sitemap omitted `/open-source`, `/journal`, `/privacy`, `/terms` and `/status`.
- The app used hash-only routes, while canonical metadata and sitemap used clean URLs. Direct clean-path visits could render the wrong SPA route before routing was updated.

### Incorrect social links

- GitHub pointed to `https://github.com/pedumostudio` instead of `https://github.com/pedumolab`.
- X pointed to `https://x.com/pedumolabs` instead of `https://x.com/pedumolab`.
- Facebook links were present even though they were not part of the verified social link list.
- Founder-only social links existed for networks not included in the requested verified list.

### Missing / misleading product surfaces

- Homepage did not include the requested Engineering Insights, featured repository listing, Latest Engineering Activity, newsletter status, trust indicator row and engineering principles sections.
- Newsletter form submitted to LiveForm and showed subscription success, which implied a working newsletter backend.
- `/insights` existed but was not yet positioned as a central knowledge hub.

### SEO issues

- Static metadata in `index.html` referenced outdated social URLs and Facebook.
- Open Graph image `/og.png` was referenced but no `public/og.png` asset existed.
- Dynamic SEO metadata did not set Twitter/X site and creator handles from the verified profile.
- Sitemap was incomplete.

### Performance / Lighthouse risks

- Initial dependency install was missing (`node_modules` absent), so the first build attempt failed with `vite: not found`.
- `npm audit` reported Vite/esbuild vulnerabilities before dependency updates.
- Homepage contains a canvas/SVG engineering visualization and multiple content sections; animation remains restrained and respects `prefers-reduced-motion`.

### Accessibility / mobile observations

- Existing skip link, semantic landmarks, focus states and reduced-motion handling were present.
- New route and footer structure required keyboard-accessible, overflow-safe links and minimum 44px interactive targets.

### Dead / duplicate code observations

- Newsletter submission code would become dead once the newsletter was changed to a non-operational notice.
- Branded social icons for unsupported networks were unnecessary once social links were corrected.
- `framer-motion` was listed in dependencies but not imported anywhere in `src`.

## Changes Implemented

- Added clean path routing with legacy `#/route` migration support.
- Added `/open-source` and `/journal` pages.
- Rebuilt homepage with Engineering Insights, Open Source, Latest Engineering Activity, Newsletter status, Trust Indicators and Engineering Principles sections.
- Converted the newsletter component into an honest disabled state that displays: `Newsletter backend not yet configured.`
- Updated verified social links and removed unsupported company social networks.
- Rebuilt footer around Products, Engineering, Open Source, Resources, Company, Legal, Newsletter, Social Links and Copyright.
- Updated `/insights` into a knowledge hub with the four requested seeded articles.
- Added data models for future GitHub, activity, journal and feed integrations.
- Updated SEO metadata, structured data, sitemap, robots and web manifest.
- Added a deterministic `public/og.png` Open Graph image.
- Removed unused `framer-motion` dependency.
- Updated generic scaffold package metadata to `pedumo-website`.
- Updated Vite/esbuild dependency tree until `npm audit --audit-level=low` reported zero vulnerabilities.
- Added `README.md` with route, validation and integration documentation.

## Validation Notes

Executed after implementation:

```bash
npm ci
npx tsc --noEmit
npm run build
npm audit --audit-level=low
```

Results:

- TypeScript validation completed with no errors.
- Production build completed successfully.
- `npm audit --audit-level=low` reported zero vulnerabilities.
- Clean route requests for `/`, `/services`, `/insights`, `/open-source`, `/journal`, `/about`, `/founder`, `/case-studies`, `/security`, `/contact`, `/book`, `/status`, `/privacy` and `/terms` returned the built SPA shell from Vite preview.
- Lighthouse could not run in this sandbox because no Chrome/Chromium executable is installed for the Lighthouse CLI.

Manual browser QA should still verify footer links, social links, disabled newsletter, contact forms, mobile breakpoints and metadata in the production deployment environment.
