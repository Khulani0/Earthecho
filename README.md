# Earthecho Designs — Online Store

Static **Astro** catalogue store for handcrafted concrete planters and garden
features. **No database, no server.** Products live as content files in this
repo; orders go out over **WhatsApp**. Hosted on **Vercel**, auto-deploying on
every push to GitHub.

> Architecture in one line: **static Astro + Git-CMS admin + WhatsApp checkout, no database, hosted on Vercel.**

## Tech

- [Astro](https://astro.build) — `output: 'static'`
- `@astrojs/sitemap` — generated `sitemap-index.xml`
- Google Fonts: Fraunces (serif headings) + Inter (sans body)
- Deployed on Vercel (auto framework detection)

## Local commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Local dev server at `http://localhost:4321` |
| `npm run build`   | Build the static site to `dist/`          |
| `npm run preview` | Preview the built site locally            |

## Where things live

- `src/config.ts` — business details, contacts, WhatsApp number, delivery fee, trust badges. **Edit public settings here.**
- `.env.example` — private values (EFT bank details, form key). Copy to `.env`; set the same in Vercel.
- `src/styles/tokens.css` — design tokens (colours, fonts, spacing).
- `src/layouts/BaseLayout.astro` — page shell, SEO/OG meta, fonts.
- `src/components/` — Header, Footer, WhatsApp button, trust badges.
- `src/pages/` — one file per page/route.
- `public/` — static assets (favicon, robots.txt).

## Build phases

- **Phase 0 — Skeleton** ✅ Astro project, design tokens, header/footer shell, placeholder pages.
- **Phase 1 — Catalogue** — `products` content collection + 22 seeded products + shop grid & product pages.
- **Phase 2 — Cart** — client-side cart, quantities, delivery options.
- **Phase 3 — WhatsApp checkout** — checkout form, WhatsApp handoff, confirmation with EFT details.
- **Phase 4 — Owner admin** — Git-based CMS wired to the products collection.
- **Phase 5 — Contact form + SEO + performance**.
- **Phase 6 — Domain** — point the `.co.za` domain at Vercel.
