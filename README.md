# Minuite Pe — Website

> **Two divisions. One brand.** Night-time food delivery (8 PM–4 AM) + a full-service digital agency.

---

## Quick Start

Requirements: Node.js 22 or newer and npm.

```bash
# Install dependencies
npm ci

# Start the Express server
npm start
```

Then open `http://localhost:3000` in your browser. The readiness endpoint is available at `http://localhost:3000/health`.

### Docker

```bash
docker compose up --build
```

The application is then available at `http://localhost:3000`.

### Validation

```bash
npm test
```

GitHub Actions runs the test suite for pushes and pull requests. Pushes to `main` also build and publish the image to GitHub Container Registry.

---

## Project Structure

```
minuitepe/
├── index.html              # Home page (both divisions intro)
├── food.html               # Minuite Pe Food — night delivery
├── digital.html            # Minuite Pe Digital — agency
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── offline.html            # PWA offline fallback page
├── manifest.json           # PWA Web App Manifest
├── sw.js                   # Service Worker (cache strategy)
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Crawler directives
│
├── css/
│   └── style.css           # Master stylesheet (design tokens + all components)
│
├── js/
│   └── main.js             # All JavaScript (navbar, animations, cart, forms…)
│
├── images/
│   ├── food/               # Food section images
│   ├── digital/            # Digital agency images
│   └── icons/              # PWA icons (icon-72 through icon-512)
│
└── docs/
    ├── architecture.md     # Site architecture & design decisions
    ├── seo-guide.md        # SEO implementation details
    ├── components.md       # CSS component reference
    ├── javascript.md       # JavaScript module reference
    └── deployment.md       # Deployment & hosting guide
```

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `index.html` | Brand intro, division cards, about, contact |
| Food | `food.html` | Menu, ordering, delivery areas, partners |
| Digital | `digital.html` | Services, portfolio, pricing, free audit |
| Privacy | `privacy.html` | GDPR/privacy policy |
| Terms | `terms.html` | Terms of service |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS (custom properties, grid, flexbox) |
| Server | Node.js + Express |
| Scripts | Vanilla JavaScript (ES2020, no frameworks) |
| Fonts | Google Fonts — Poppins + Inter |
| PWA | Web App Manifest + Service Worker |
| SEO | JSON-LD Schema, Open Graph, Twitter Cards |

The frontend has no build step; Express serves it directly from `public/`.

---

## Key Features

- **Live open/closed status** — automatically shows "Open Now" or "Closed" based on the 8 PM–4 AM window
- **Menu filter + mini cart** — category tabs filter food items; cart tallies and routes to WhatsApp order
- **Scroll animations** — IntersectionObserver-based reveal (respects `prefers-reduced-motion`)
- **Sticky navbar** — blur backdrop, mobile hamburger, keyboard-accessible dropdowns
- **PWA ready** — installable on Android/iOS, offline fallback page, cache-first asset strategy
- **Form validation** — inline error messages, accessible error announcements via `aria-live`
- **Responsive** — mobile-first, tested down to 320 px wide

---

## Customisation Checklist

Before going live, replace every placeholder in the codebase:

- [ ] `+91 XXXX-XXXXXX` → real WhatsApp / phone number (search across all HTML files)
- [ ] `hello@minuitepe.com` → real email
- [ ] `https://www.minuitepe.com` → real domain (in all `<link rel="canonical">`, Schema, and sitemap)
- [ ] Google Maps iframe `src` URLs → embed links centred on your actual address
- [ ] `images/icons/icon-*.png` → real PWA icons (generate at [realfavicongenerator.net](https://realfavicongenerator.net))
- [ ] `images/og-home.jpg`, `og-food.jpg`, `og-digital.jpg` → real OG images (1200×630 px)
- [ ] Pricing figures in `digital.html` → your actual pricing
- [ ] Partner restaurant names in `food.html` → real partners
- [ ] Case study metrics in `digital.html` → real client results
- [ ] `lastmod` dates in `sitemap.xml` → keep updated on each deploy

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Samsung Internet 14+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## Docs

Full documentation is in the `/docs` folder:

- [`docs/architecture.md`](docs/architecture.md) — design system & architecture
- [`docs/seo-guide.md`](docs/seo-guide.md) — SEO implementation
- [`docs/components.md`](docs/components.md) — CSS component reference
- [`docs/javascript.md`](docs/javascript.md) — JavaScript module reference
- [`docs/deployment.md`](docs/deployment.md) — hosting & deployment guide

---

## License

© 2024 Minuite Pe. All rights reserved.
