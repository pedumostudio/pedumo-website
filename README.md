# Pedumo Website

Pedumo's public website is an engineering platform, not a static agency brochure. It is designed to demonstrate current engineering thinking, open-source surfaces, activity, trust signals and production discipline.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Cloudflare Workers static assets with SPA fallback
- LiveForm integration for contact and consultation forms only

## Routes

- `/` — homepage with Engineering Insights, Open Source, Latest Engineering Activity, Newsletter status, Trust Indicators and Engineering Principles
- `/insights` — knowledge hub for Pedumo engineering articles
- `/open-source` — featured repository listing prepared for GitHub integration
- `/journal` — future aggregation surface for Pedumo website, DEV.to and Medium posts
- `/services` — engineering capabilities
- `/case-studies` — internal lab and concept project examples
- `/about` — company mission and values
- `/founder` — founder profile
- `/security` — security disclosure and posture
- `/contact` — inquiry form
- `/book` — consultation request form
- `/privacy`, `/terms`, `/status` — operational/legal pages

## Newsletter Status

The newsletter UI intentionally does **not** submit email addresses. It displays:

> Newsletter backend not yet configured.

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

Unsupported networks such as Facebook, Instagram, TikTok, Discord and Spotify are not displayed.

## Development

```bash
npm ci
npm run build
npm run dev -- --host 0.0.0.0
```

## Validation Checklist

Before release, verify:

1. `npm audit --audit-level=low`
2. `npm run build`
3. Internal navigation for every route listed above
4. Footer links and social links
5. Contact and booking forms
6. Disabled newsletter state
7. Mobile layout at 320px, 375px, 768px, 1024px and desktop widths
8. Metadata, canonical URLs, sitemap and robots file

## Integration Notes

Future integrations should connect data already modeled in `src/lib/content.ts`:

- GitHub repositories and activity for `/open-source` and homepage activity
- DEV.to and Medium feeds for `/journal`
- Email subscription backend for newsletter

Do not display stars, commits, subscriber success or feed entries unless they are fetched from a configured integration or manually verified.
