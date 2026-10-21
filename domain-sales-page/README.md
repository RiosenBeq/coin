# Coin14.com – Domain Sales Page

Landing page for selling the premium domain **Coin14.com** and the rest of the domain portfolio.
Built with Next.js (pages router, static export) and deployed on Vercel.

## Features

- Dark, crypto-themed design inspired by Dan.com / Afternic / Atom domain landing pages
- Hero with price, "Buy now" and "Make an offer" calls to action, trust badges and domain facts
- Use cases, benefits, 3-step purchase process, filterable portfolio and FAQ
- Offer form that opens a pre-filled WhatsApp message
- SEO: meta tags, canonical URL, Open Graph / Twitter cards, JSON-LD
  (Organization, WebSite, WebPage, Product, ItemList, FAQPage), `sitemap.xml`, `robots.txt`
- Accessible: semantic headings, labelled form fields, skip link, keyboard focus styles,
  `prefers-reduced-motion` support
- Security headers (CSP, HSTS, etc.) configured in `vercel.json`

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to ./out
```

## Customisation

- `lib/site.ts` – domain name, price, contact number, portfolio domains and FAQ
- `pages/index.tsx` – page sections and SEO tags
- `styles/globals.css` – design tokens (colours, radii) and all styles
- `public/` – icons, `og-image.png`, `sitemap.xml`, `robots.txt`, `manifest.json`

When the price or portfolio changes, also update `public/og-image.png` (it shows the price)
and the `lastmod` date in `public/sitemap.xml`.
