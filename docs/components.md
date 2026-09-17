# CSS Component Reference

All components live in `css/style.css`. This page documents every reusable class and how to use it.

---

## Buttons

```html
<!-- Variants -->
<a class="btn btn--food">Food CTA</a>
<a class="btn btn--digital">Digital CTA</a>
<a class="btn btn--outline-food">Outline Food</a>
<a class="btn btn--outline-digital">Outline Digital</a>
<a class="btn btn--outline-white">Outline White (dark bg)</a>

<!-- Sizes -->
<a class="btn btn--food btn--sm">Small</a>
<a class="btn btn--food">Default</a>
<a class="btn btn--food btn--lg">Large</a>
<a class="btn btn--food btn--xl">Extra Large</a>
```

All buttons have hover lift, box-shadow glow, and an active press scale effect.

---

## Section Labels (pill badges above headings)

```html
<span class="section-label section-label--food">Food Label</span>
<span class="section-label section-label--digital">Digital Label</span>
<span class="section-label section-label--white">White Label (dark bg)</span>
```

---

## Section Headers

```html
<div class="section-header section-header--center">
  <span class="section-label section-label--food">Category</span>
  <h2 class="section-title">Main Heading</h2>
  <p class="section-subtitle section-subtitle--center">Supporting copy.</p>
</div>
```

For left-aligned, remove `section-header--center` and `section-subtitle--center`.
For dark backgrounds, add `section-title--white` and `section-subtitle--white`.

---

## Cards

```html
<!-- Basic card -->
<div class="card">
  <div class="card__img-placeholder">🍔</div>
  <!-- or: <img class="card__img" src="…" alt="…" /> -->
  <div class="card__body">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</div>
```

Cards have hover lift and shadow increase by default.

---

## Testimonial Cards

```html
<div class="testimonial-card">                        <!-- food accent -->
<div class="testimonial-card testimonial-card--digital"> <!-- digital accent -->

  <div class="stars">★★★★★</div>
  <p class="testimonial-card__quote">Quote text here.</p>
  <div class="testimonial-card__author">
    <div class="testimonial-card__avatar">R</div>      <!-- initial -->
    <div>
      <div class="testimonial-card__name">Name</div>
      <div class="testimonial-card__role">Role, Company</div>
    </div>
  </div>
</div>
```

---

## Badges / Status

```html
<!-- Open/closed status -->
<span class="badge badge--open badge--dot">Open Now</span>
<span class="badge badge--closed badge--dot">Closed</span>

<!-- Generic -->
<span class="badge">Any badge</span>
```

The `badge--open` variant animates a green pulsing dot via `@keyframes pulse-green`.

---

## Tags (inline category pills)

```html
<span class="tag tag--food">Fast Food</span>
<span class="tag tag--digital">SEO</span>
```

---

## Steps / Process

```html
<div class="steps steps--connected">   <!-- remove --connected to hide dashes -->
  <div class="step">
    <div class="step__number step__number--food">1</div>  <!-- or --digital -->
    <div class="step__icon">📱</div>
    <h3 class="step__title">Step Title</h3>
    <p class="step__desc">Step description.</p>
  </div>
  <!-- repeat for each step -->
</div>
```

`steps--connected` draws a dashed line between steps on desktop. Lines are hidden on mobile.

---

## Pricing Cards

```html
<div class="pricing-card">                          <!-- basic -->
<div class="pricing-card pricing-card--featured">   <!-- highlighted, shows "Most Popular" ribbon -->

  <div class="pricing-card__tier">Basic</div>
  <div class="pricing-card__price"><sup>₹</sup>9,999</div>
  <div class="pricing-card__period">one-time</div>
  <ul class="pricing-card__features">
    <li class="pricing-card__feature">
      <span class="check">✓</span> Included feature
    </li>
    <li class="pricing-card__feature">
      <span class="cross">✗</span> Not included
    </li>
  </ul>
  <a class="btn btn--digital" href="#">Get Started</a>
</div>
```

---

## Icon Box

```html
<div class="icon-box icon-box--food">🍔</div>
<div class="icon-box icon-box--digital">💻</div>
<div class="icon-box icon-box--white">✓</div>    <!-- use on dark backgrounds -->
```

---

## Forms

```html
<form>
  <div class="form-group">
    <label class="form-label" for="field-id">Label *</label>
    <input class="form-input" type="text" id="field-id" name="field" required />
  </div>

  <div class="form-row">          <!-- 2-column row (stacks on mobile) -->
    <div class="form-group">…</div>
    <div class="form-group">…</div>
  </div>

  <div class="form-group">
    <label class="form-label" for="msg">Message</label>
    <textarea class="form-textarea" id="msg" rows="4"></textarea>
  </div>

  <div class="form-group">
    <label class="form-label" for="sel">Select</label>
    <select class="form-select" id="sel">
      <option>Option 1</option>
    </select>
  </div>

  <button type="submit" class="btn btn--digital btn--lg">Submit</button>
</form>
```

Form inputs on dark backgrounds: add inline style `background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);color:white`.

---

## Dividers

```html
<div class="divider divider--food"></div>            <!-- left-aligned -->
<div class="divider divider--digital divider--center"></div>  <!-- centred -->
```

---

## Layouts

```html
<!-- Auto-fit grids -->
<div class="grid grid--2">…</div>   <!-- 2-col (min 280px per col) -->
<div class="grid grid--3">…</div>   <!-- 3-col (min 240px per col) -->
<div class="grid grid--4">…</div>   <!-- 4-col (min 200px per col) -->

<!-- Section wrappers -->
<section class="section">…</section>
<section class="section section--light">…</section>     <!-- off-white bg -->
<section class="section section--dark">…</section>      <!-- navy bg -->
<section class="section section--food-light">…</section>
<section class="section section--digital-light">…</section>

<!-- Container widths -->
<div class="container">…</div>           <!-- max 1200px -->
<div class="container container--wide">…</div>   <!-- max 1400px -->
<div class="container container--narrow">…</div> <!-- max 760px, for legal pages -->
```

---

## Scroll Animations

```html
<!-- Fade up (default) -->
<div class="animate-in">…</div>

<!-- Slide in from left or right -->
<div class="animate-in animate-in--left">…</div>
<div class="animate-in animate-in--right">…</div>

<!-- Stagger delays -->
<div class="animate-in animate-delay-1">…</div>   <!-- +100ms -->
<div class="animate-in animate-delay-2">…</div>   <!-- +200ms -->
<div class="animate-in animate-delay-3">…</div>   <!-- +300ms -->
<div class="animate-in animate-delay-4">…</div>   <!-- +400ms -->
<div class="animate-in animate-delay-5">…</div>   <!-- +500ms -->
```

JS adds `.visible` via IntersectionObserver when the element enters the viewport.

---

## Utility Classes

```
.text-center / .text-left
.mt-sm / .mt-md / .mt-lg / .mt-xl
.mb-sm / .mb-md / .mb-lg / .mb-xl
.gap-sm / .gap-md / .gap-lg
.sr-only          ← visually hidden but accessible to screen readers
.hidden           ← display:none
.flex .flex--center .flex--between .flex--gap
.highlight--food / .highlight--digital / .highlight--white
```

---

## Decorative Elements

```html
<!-- Gradient orb (decorative blurred circle, aria-hidden) -->
<div class="orb orb--food" style="width:400px;height:400px;top:10%;right:-5%;" aria-hidden="true"></div>
<div class="orb orb--digital" style="width:300px;height:300px;bottom:0;left:0;" aria-hidden="true"></div>

<!-- Floating animation -->
<div class="float-element">…</div>            <!-- 4s float cycle -->
<div class="float-element float-element--slow">…</div>   <!-- 6s -->
<div class="float-element float-element--fast">…</div>   <!-- 3s -->
```

---

## Global UI Elements

These are injected/activated by JavaScript and require their IDs in the HTML:

```html
<!-- Scroll-to-top button (in body, near closing tag) -->
<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">↑</button>

<!-- Toast notification container -->
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<!-- WhatsApp floating button -->
<a href="https://wa.me/91XXXXXXXXXX" class="whatsapp-float" aria-label="Chat on WhatsApp">💬</a>
```
