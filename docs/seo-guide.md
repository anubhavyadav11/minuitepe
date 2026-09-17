# SEO Implementation Guide

## What's Already Implemented

Every page in the Minuite Pe site ships with a full SEO stack out of the box.

---

## 1. Meta Tags

Every HTML page has:

```html
<!-- Core -->
<title>Page-specific title (60–70 chars max)</title>
<meta name="description" content="Page-specific description (150–160 chars)" />
<meta name="keywords" content="comma, separated, keywords" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://www.minuitepe.com/PAGE.html" />

<!-- Open Graph (Facebook, LinkedIn, WhatsApp previews) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="…" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:image" content="…" />   <!-- 1200×630 px recommended -->

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="…" />
<meta name="twitter:description" content="…" />
<meta name="twitter:image" content="…" />
```

**Action required:** Replace placeholder image URLs with real OG images (1200×630 px JPG/PNG).

---

## 2. Schema Markup (JSON-LD)

### index.html — Organization + two LocalBusiness nodes

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization" },        // Parent brand
    { "@type": "LocalBusiness" },       // Food division
    { "@type": "LocalBusiness" }        // Digital division
  ]
}
```

### food.html — FoodEstablishment

```json
{
  "@type": "FoodEstablishment",
  "openingHours": "Mo-Su 20:00-04:00",
  "servesCuisine": ["Fast Food","Snacks","Beverages","Desserts"],
  "hasMenu": "https://www.minuitepe.com/food.html#menu"
}
```

### digital.html — ProfessionalService with OfferCatalog

```json
{
  "@type": "ProfessionalService",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [...]  // All 4 services listed
  }
}
```

**Action required:** Fill in `telephone`, `address`, and `geo` (latitude/longitude) in each schema block for full local SEO benefit.

---

## 3. Technical SEO

### Canonical URLs
Every page has `<link rel="canonical">` pointing to its own absolute URL. **Update all occurrences of `https://www.minuitepe.com` to your real domain before launch.**

### Semantic HTML
- Single `<h1>` per page
- Proper heading hierarchy (h1 → h2 → h3, never skipped)
- Landmark roles: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- `alt` attributes on all `<img>` elements (add descriptive alt text to real images)

### Core Web Vitals
- Fonts loaded with `font-display: swap` via Google Fonts `display=swap`
- Images use `loading="lazy"` (add to all `<img>` tags when real images are added)
- CSS is a single file with no render-blocking scripts
- JS is deferred (placed at end of `<body>`)
- No unused CSS — single file, all components used across the 3 main pages

### Page Speed Checklist
- [ ] Compress all images (use WebP format, aim < 100 KB per image)
- [ ] Add `width` and `height` attributes to all `<img>` to prevent CLS
- [ ] Enable gzip/Brotli compression on your server
- [ ] Set `Cache-Control` headers for static assets (1 year for CSS/JS with content hash)
- [ ] Use a CDN for global delivery

---

## 4. Sitemap & Robots

### sitemap.xml
Located at `/sitemap.xml`. Contains all 5 indexable pages with:
- `<loc>` — absolute URL
- `<lastmod>` — last modified date (update on each deploy)
- `<changefreq>` — crawl frequency hint
- `<priority>` — relative importance (home=1.0, main pages=0.9, legal=0.3)

**Submit to Google Search Console:** `https://search.google.com/search-console`

### robots.txt
Located at `/robots.txt`. Allows all crawlers, blocks `/js/` and `/images/icons/`, and references the sitemap.

---

## 5. Local SEO — Google Maps Optimisation

The site is built for local SEO dominance. Additional steps to take outside the website:

### Google Business Profile (GMB)
1. Create/claim your GBP listing at `business.google.com`
2. Fill every field: name, address, phone, hours, description, categories
3. Upload 10+ high-quality photos
4. Set business hours to reflect the 8 PM–4 AM window for Food
5. Add products/services (link to each division page)
6. Enable messaging

### NAP Consistency
Ensure **Name, Address, Phone** (NAP) is identical across:
- Your website footer
- Google Business Profile
- Facebook, Instagram, Justdial, Sulekha, IndiaMART
- All local directory citations

### Citation Building
Build citations on 50–100 local directories. High-value Indian directories:
- Justdial, Sulekha, IndiaMART, TradeIndia, Yellow Pages India
- Yelp India, Hotfrog, Cylex India

---

## 6. Content SEO Recommendations

### Target Keywords by Page

**index.html**
- "Minuite Pe" (branded)
- "night food delivery and digital agency"

**food.html**
- "night food delivery [city name]"
- "late night food order [city]"
- "food delivery 8pm 4am"
- "midnight food delivery near me"

**digital.html**
- "digital agency [city name]"
- "branding agency [city]"
- "Google Maps SEO [city]"
- "website design [city]"
- "local SEO agency India"

### Blog / Content Marketing (future)
Adding a blog to target long-tail keywords will significantly boost organic traffic. Recommended topics:
- "Best late-night snacks to order at midnight"
- "How to rank #1 on Google Maps in 30 days"
- "Why your restaurant needs to be on Google Maps"
- "Complete guide to local SEO for small businesses in India"

---

## 7. Monitoring & Tracking

Add the following before launch:

```html
<!-- Google Analytics 4 — add inside <head> on all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Google Search Console verification — add inside <head> on index.html only -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**Tools to set up:**
1. Google Search Console — monitor rankings, indexing, Core Web Vitals
2. Google Analytics 4 — track traffic, conversions, user behaviour
3. Google Business Profile Insights — monitor Maps views, calls, direction requests
