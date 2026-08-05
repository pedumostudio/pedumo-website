# Pedumo Website

Pedumo's public website is an engineering platform, not a static agency brochure. It demonstrates engineering thinking, public repository activity, founder visibility, contact discipline, knowledge assets and production-oriented delivery practices.

## Production Phases

### Phase A — Website quality foundation

Implemented in this repository:

- Clean navigation with Founder visibility restored
- Professional footer groups: Products, Engineering, Open Source, Resources, Company, Legal, Support, Newsletter and Social
- Contact channels separated for general enquiries, business bookings and future partnerships
- Founder page with biography, mission, vision, engineering philosophy, experience, timeline and links
- SEO metadata, Open Graph, Twitter/X cards, canonical URLs, sitemap, robots and structured data improvements
- Public Open Graph image asset
- Reduced external render dependency by removing Google Fonts
- Accessible focus states, skip link, semantic landmarks, reduced-motion handling and labeled forms

### Phase B — Living engineering platform

Implemented in this repository where verification is possible:

- Engineering Insights populated from structured local content
- Engineering Operating Brief with rotating tip, AI insight, cybersecurity alert and weekly principle
- Public GitHub repository metadata adapter for repository cards
- Public GitHub commit activity adapter for latest PEDUMO Website activity
- Knowledge Hub sections for Software Engineering, AI, Cloud, Cybersecurity, Architecture, DevSecOps, Automation, Engineering Principles, Whitepapers, Checklists, Downloads and Case Studies
- Journal page with PEDUMO website articles and explicit pending status for DEV.to and Medium feed integrations
- Newsletter UI that remains disabled until a backend exists

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Cloudflare Workers static assets with SPA fallback
- LiveForm integration for contact and consultation forms only
- Public unauthenticated GitHub API for repository metadata and commit activity

## Routes

- `/` — homepage with live engineering platform sections
- `/insights` — searchable engineering knowledge hub
- `/open-source` — featured repository listing with live public GitHub metadata where repositories exist
- `/journal` — PEDUMO articles plus pending external feed integrations
- `/services` — engineering capabilities
- `/case-studies` — internal lab and concept project examples
- `/about` — company mission and values
- `/founder` — founder biography, mission, vision, philosophy, experience, timeline and links
- `/security` — security disclosure and posture
- `/contact` — separated contact channels and inquiry form
- `/book` — consultation request form
- `/privacy`, `/terms`, `/status` — operational/legal pages

## Contact Channels

- General enquiries: <contact@pedumo.com>
- Business bookings: <booking@pedumo.com>
- Future partnerships: <partnerships@pedumo.com>
- Responsible disclosure: <security@pedumo.com>

## Newsletter Status

The newsletter UI intentionally does **not** submit email addresses. It displays:

> Newsletter backend not configured.

Subscriptions should only be enabled after an email provider, consent workflow, storage policy and backend endpoint are configured.

## External Profiles

Official links used by the site:

- Website: <https://pedumo.com>
- LinkedIn: <https://www.linkedin.com/company/pedumo>
- GitHub: <https://github.com/pedumolab>
- X: <https://x.com/pedumolab>
- DEV Community: <https://dev.to/pedumo>
- Medium: <https://medium.com/@balogunadeolu>
- Founder Website: <https://balogunadeolu.com>

Unsupported networks such as Facebook, Instagram, TikTok, Discord, Spotify and YouTube are not displayed.

## Development

```bash
npm ci
npx tsc --noEmit
npm run build
npm run preview -- --host 0.0.0.0
```

## Validation Checklist

Before release, verify:

1. `npm ci`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm audit --audit-level=low`
5. Internal navigation for every route listed above
6. Footer links and social links
7. Contact and booking forms
8. Disabled newsletter state
9. Mobile layout at 320px, 375px, 414px, 768px, 1024px and 1440px
10. Metadata, canonical URLs, sitemap and robots file
11. Public GitHub API behavior for live metadata and pending repositories

## Integration Notes

Future integrations should connect data already modeled in `src/lib/content.ts`:

- Authenticated GitHub API if higher rate limits are needed
- DEV.to feed aggregation for `/journal`
- Medium feed aggregation for `/journal`
- Email subscription backend for newsletter
- Real downloadable whitepapers, checklists and templates

Do not display stars, commits, contributor counts, subscriber success, downloads or external feed entries unless they are fetched from a configured integration or manually verified.
