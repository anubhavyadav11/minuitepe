# Site Architecture & Design System

## Overview

Minuite Pe is a **static multi-page website** (no framework, no build step) structured around a dual-brand concept:

```
Minuite Pe (parent brand)
├── Minuite Pe Food  — warm orange/red palette, emotional, urgent
└── Minuite Pe Digital — blue/purple palette, professional, results-driven
```

The two divisions share one CSS file, one JS file, and one visual language (navbar, footer, typography, spacing scale) while using distinct accent colours and tone.

---

## Design Token System

All visual values live as CSS custom properties in `css/style.css` under section `1. CSS Custom Properties`. This means any rebrand or theme tweak requires changing only these root values.

### Colour Roles

| Token | Value | Used For |
|-------|-------|----------|
| `--brand-primary` | `#1a1a2e` | Text, dark backgrounds, navbar |
| `--brand-dark` | `#0d0d1a` | Footer background |
| `--food-primary` | `#ff6b35` | Food CTAs, accents, icons |
| `--food-secondary` | `#e63946` | Food gradient endpoint |
| `--food-gradient` | orange→red | Food buttons, hero, card headers |
| `--digital-primary` | `#4361ee` | Digital CTAs, accents, icons |
| `--digital-secondary` | `#7209b7` | Digital gradient endpoint |
| `--digital-gradient` | blue→purple | Digital buttons, hero, card headers |

### Typography Scale

Fluid font sizes using `clamp()` so text scales smoothly between mobile and desktop without media query overrides.

```css
--fs-hero:  clamp(2.8rem, 7vw, 4.5rem)   /* Hero h1 */
--fs-4xl:   clamp(2.5rem, 6vw, 3.5rem)   /* Page titles */
--fs-3xl:   clamp(2rem,   5vw, 2.75rem)  /* Section titles */
--fs-2xl:   clamp(1.6rem, 4vw, 2rem)     /* Card titles */
--fs-xl:    clamp(1.3rem, 3vw, 1.5rem)   /* Subheadings */
--fs-lg:    clamp(1.1rem, 2.5vw, 1.25rem)/* Body large */
--fs-base:  clamp(0.95rem,2vw, 1rem)     /* Body default */
--fs-sm:    clamp(0.85rem,1.8vw,0.95rem) /* Small/labels */
--fs-xs:    clamp(0.7rem, 1.5vw, 0.8rem) /* Badges/captions */
```

### Spacing Scale

All spacing uses CSS custom properties for consistency:

```
--space-xs   0.25rem
--space-sm   0.5rem
--space-md   1rem
--space-lg   1.5rem
--space-xl   2rem
--space-2xl  3rem
--space-3xl  4rem
--space-4xl  6rem
--space-section  clamp(4rem, 8vw, 7rem)  ← used on every section
```

---

## Page Architecture

### Shared Structure (all pages)

```
<header>  ← sticky navbar + mobile drawer
<main>    ← page-specific content
<footer>  ← 4-column grid + bottom bar
```

### Accessibility Architecture

- Skip-to-main-content link injected by JS at page load
- All interactive elements have visible `:focus-visible` rings
- ARIA roles on nav, main, footer, forms, tabs, live regions
- `aria-label` on all icon-only links and buttons
- Status badge uses `role="status"` + `aria-label`
- Menu tabs use `role="tablist"` / `role="tab"` with `aria-selected`
- Form errors announced via `role="alert"`
- `prefers-reduced-motion` respected — animations disabled if user opts out

---

## Responsive Strategy

**Mobile-first approach.** Base styles target mobile; media queries add layout for larger screens.

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| `< 480px` | Small phones | Single column, reduced button padding |
| `< 600px` | Phones | Form rows stack to 1 column |
| `< 768px` | Tablets | Hamburger nav, 1-col grids for about/contact |
| `< 1024px` | Small desktop | Footer grid 2-col |
| `≥ 1200px` | Desktop | Full container width |

---

## Z-Index Scale

```
--z-below     -1   (background decorative elements)
--z-base       0   (normal flow)
--z-raised    10   (cards on hover)
--z-dropdown 100   (nav dropdowns)
--z-sticky   200   (fixed navbar)
--z-overlay  300   (overlays)
--z-modal    400   (modal dialogs)
--z-toast    500   (toast notifications, scroll-to-top, WhatsApp button)
```

---

## Animation System

Animations use CSS classes + IntersectionObserver (see `js/main.js` → `initScrollAnimations`).

**How to animate an element:**

1. Add class `animate-in` (fade up), `animate-in--left` (slide from left), or `animate-in--right` (slide from right)
2. Optionally add `animate-delay-1` through `animate-delay-5` for staggered reveals
3. JS observer adds `.visible` when the element enters the viewport

All animations are skipped when the user has `prefers-reduced-motion: reduce` enabled.

---

## Division Visual Identity Summary

### Minuite Pe Food

- **Primary colour:** `#ff6b35` (orange)
- **Accent:** `#e63946` (red)
- **Tone:** Energetic, urgent, warm, emotional ("Hungry at Midnight?")
- **Hero background:** Dark warm gradient (`#1a0a00` → `#2d0f00` → `#1a1a2e`)
- **Section accent colour:** `var(--food-light)` (#fff4f0) for light backgrounds

### Minuite Pe Digital

- **Primary colour:** `#4361ee` (blue)
- **Accent:** `#7209b7` (purple)
- **Tone:** Professional, results-driven, confident ("Build. Rank. Get Found.")
- **Hero background:** Dark cool gradient (`#060918` → `#0f1535` → `#1a1a2e`)
- **Section accent colour:** `var(--digital-light)` (#f0f3ff) for light backgrounds
