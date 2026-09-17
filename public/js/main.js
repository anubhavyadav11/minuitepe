/**
 * Minuite Pe — Main JavaScript
 * Handles: navbar, scroll animations, open/closed status,
 * menu filtering, cart, form handling, scroll-to-top, toast
 */

'use strict';

/* ─────────────────────────────────────────────
   1. UTILITIES
───────────────────────────────────────────── */

/**
 * Query selector shorthand
 * @param {string} selector
 * @param {Document|Element} [scope=document]
 */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/**
 * Show a toast notification
 * @param {string} message
 * @param {number} [duration=3000]
 */
function showToast(message, duration = 3000) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ─────────────────────────────────────────────
   2. NAVBAR — sticky + hamburger + dropdowns
───────────────────────────────────────────── */

function initNavbar() {
  const navbar      = $('#navbar');
  const hamburger   = $('#hamburger');
  const mobileNav   = $('#mobileNav');
  const dropdowns   = $$('.navbar__dropdown');

  if (!navbar) return;

  // ── Scroll behaviour ──
  const onScroll = debounce(() => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 10);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled

  // ── Hamburger toggle ──
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      // Prevent body scroll when mobile nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    $$('a', mobileNav).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Desktop dropdowns (keyboard + touch support) ──
  dropdowns.forEach(dropdown => {
    const toggle = $('.navbar__dropdown-toggle', dropdown);
    if (!toggle) return;

    // Mouse hover handled by CSS; handle keyboard & touch here
    toggle.addEventListener('click', (e) => {
      // Only toggle on touch / keyboard (not mouse, which CSS handles)
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));

      // Close other dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('open');
          const t = $('.navbar__dropdown-toggle', other);
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      e.stopPropagation();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      const t = $('.navbar__dropdown-toggle', d);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (hamburger && mobileNav &&
        !navbar.contains(e.target) &&
        !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ── Active nav link highlighting ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ─────────────────────────────────────────────
   3. SCROLL ANIMATIONS (IntersectionObserver)
───────────────────────────────────────────── */

function initScrollAnimations() {
  const animatedEls = $$('.animate-in, .animate-in--left, .animate-in--right');

  if (!animatedEls.length) return;

  // If user prefers reduced motion, skip animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedEls.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   4. OPEN / CLOSED STATUS INDICATOR
   Business hours: 8:00 PM (20:00) – 4:00 AM (04:00)
───────────────────────────────────────────── */

/**
 * Returns true if the food delivery service is currently open.
 * Open window: 20:00 – 04:00 (crosses midnight)
 */
function isFoodServiceOpen() {
  const now   = new Date();
  const hours = now.getHours();
  const mins  = now.getMinutes();
  const total = hours * 60 + mins; // minutes since midnight

  const openAt  = 20 * 60;  // 20:00 → 1200
  const closeAt =  4 * 60;  // 04:00 → 240

  // Open if: time >= 20:00 OR time < 04:00
  return total >= openAt || total < closeAt;
}

/**
 * Returns a human-readable countdown string like "Opens in 2h 30m"
 */
function getNextStatusChange() {
  const now   = new Date();
  const hours = now.getHours();
  const mins  = now.getMinutes();
  const total = hours * 60 + mins;

  const openAt  = 20 * 60;
  const closeAt =  4 * 60;

  let diffMins;
  let action;

  if (total >= openAt) {
    // Currently open — closes at 04:00 next day
    const closeAtAbsolute = 24 * 60 + closeAt;
    diffMins = closeAtAbsolute - total;
    action = 'Closes';
  } else if (total < closeAt) {
    // Currently open (after midnight) — closes at 04:00
    diffMins = closeAt - total;
    action = 'Closes';
  } else {
    // Currently closed — opens at 20:00
    diffMins = openAt - total;
    action = 'Opens';
  }

  const h = Math.floor(diffMins / 60);
  const m = diffMins % 60;
  const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m`;
  return `${action} in ${timeStr}`;
}

/**
 * Renders the status badge HTML
 */
function buildStatusBadge(isOpen) {
  const countdownText = getNextStatusChange();
  if (isOpen) {
    return `<span class="badge badge--open badge--dot" role="status" aria-label="Service is currently open">
              Open Now
            </span>
            <span style="margin-left:0.75rem;font-size:var(--fs-xs);color:rgba(255,255,255,0.55)">${countdownText}</span>`;
  } else {
    return `<span class="badge badge--closed badge--dot" role="status" aria-label="Service is currently closed">
              Closed
            </span>
            <span style="margin-left:0.75rem;font-size:var(--fs-xs);color:rgba(255,255,255,0.55)">${countdownText}</span>`;
  }
}

function initStatusIndicators() {
  const isOpen = isFoodServiceOpen();

  // Food hero page status
  const foodStatus = $('#food-status');
  if (foodStatus) {
    foodStatus.innerHTML = buildStatusBadge(isOpen);
  }

  // Home page division card status
  const homeStatus = $('#home-status-badge');
  if (homeStatus) {
    const isOpenLocal = isFoodServiceOpen();
    if (isOpenLocal) {
      homeStatus.innerHTML = `<span class="badge badge--open badge--dot" role="status" aria-label="Open now">Open Now — Order Tonight!</span>`;
    } else {
      homeStatus.innerHTML = `<span class="badge badge--closed badge--dot" role="status" aria-label="Currently closed">Opens at 8 PM</span>`;
    }
  }

  // Refresh every 60 seconds
  setTimeout(initStatusIndicators, 60 * 1000);
}

/* ─────────────────────────────────────────────
   5. MENU FILTERING (Food page)
───────────────────────────────────────────── */

function initMenuFilter() {
  const tabs     = $$('.menu-tab');
  const menuGrid = $('#menuGrid');

  if (!tabs.length || !menuGrid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      // Update tab styles
      tabs.forEach(t => {
        t.classList.remove('active', 'btn--food');
        t.classList.add('btn--outline-food');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active', 'btn--food');
      tab.classList.remove('btn--outline-food');
      tab.setAttribute('aria-selected', 'true');

      // Filter items
      $$('.menu-item', menuGrid).forEach(item => {
        const itemCategory = item.dataset.category;
        const show = category === 'all' || itemCategory === category;
        item.style.display = show ? '' : 'none';
        // Re-trigger animation for visible items
        if (show) {
          item.classList.remove('visible');
          requestAnimationFrame(() => item.classList.add('visible'));
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────
   6. MINI CART (Food page)
───────────────────────────────────────────── */

const cart = {
  items: [],

  add(name, price) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ name, price: Number(price), qty: 1 });
    }
    this.render();
  },

  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  buildWhatsAppMessage() {
    const lines = this.items.map(i => `• ${i.name} x${i.qty} — ₹${i.price * i.qty}`);
    lines.push(`\nTotal: ₹${this.total}`);
    return encodeURIComponent(`Hi! I'd like to order:\n\n${lines.join('\n')}`);
  },

  render() {
    const summary   = $('#cartSummary');
    const countEl   = $('#cartCount');
    const totalEl   = $('#cartTotal');
    const orderBtn  = $('#placeOrder');

    if (!summary) return;

    if (this.count > 0) {
      summary.style.display = 'block';
      if (countEl) countEl.textContent = this.count;
      if (totalEl) totalEl.textContent = this.total;
      if (orderBtn) {
        orderBtn.onclick = () => {
          const msg = this.buildWhatsAppMessage();
          window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank', 'noopener,noreferrer');
        };
      }
    } else {
      summary.style.display = 'none';
    }
  }
};

function initCart() {
  $$('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name  = btn.dataset.item;
      const price = btn.dataset.price;
      cart.add(name, price);
      showToast(`✓ ${name} added to cart!`);

      // Quick pulse animation on button
      btn.textContent = '✓ Added';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '+ Add';
        btn.disabled = false;
      }, 1200);
    });
  });
}

/* ─────────────────────────────────────────────
   7. FORM HANDLING
───────────────────────────────────────────── */

/**
 * Simple inline validation for required fields
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateForm(form) {
  let valid = true;
  $$('[required]', form).forEach(field => {
    const wrapper = field.closest('.form-group');
    const existing = wrapper && wrapper.querySelector('.form-error');
    if (existing) existing.remove();

    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = 'var(--food-secondary)';
      if (wrapper) {
        const err = document.createElement('span');
        err.className = 'form-error';
        err.style.cssText = 'color:var(--food-secondary);font-size:var(--fs-xs);margin-top:0.25rem;display:block';
        err.setAttribute('role', 'alert');
        err.textContent = 'This field is required.';
        wrapper.appendChild(err);
      }
    } else {
      field.style.borderColor = '';
    }

    // Email format check
    if (field.type === 'email' && field.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value.trim())) {
        valid = false;
        field.style.borderColor = 'var(--food-secondary)';
        if (wrapper) {
          const err = document.createElement('span');
          err.className = 'form-error';
          err.style.cssText = 'color:var(--food-secondary);font-size:var(--fs-xs);margin-top:0.25rem;display:block';
          err.setAttribute('role', 'alert');
          err.textContent = 'Please enter a valid email address.';
          wrapper.appendChild(err);
        }
      }
    }
  });
  return valid;
}

function initForms() {
  // Contact form (index.html)
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;

      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Fetch to actual backend
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      })
      .then(response => response.json())
      .then(data => {
        showToast(data.message || '✓ Message sent! We\'ll be in touch within 24 hours.', 5000);
        contactForm.reset();
      })
      .catch(error => {
        showToast('❌ Error sending message. Please try again later.', 5000);
        console.error('Error:', error);
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }

  // Audit form (digital.html)
  const auditForm = $('#auditForm');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(auditForm)) return;

      const btn = auditForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      setTimeout(() => {
        showToast('🎯 Audit request received! Expect your report within 24 hours.', 6000);
        auditForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // Clear validation styling on input
  document.addEventListener('input', (e) => {
    if (e.target.matches('.form-input, .form-textarea, .form-select')) {
      e.target.style.borderColor = '';
      const wrapper = e.target.closest('.form-group');
      const err = wrapper && wrapper.querySelector('.form-error');
      if (err) err.remove();
    }
  });
}

/* ─────────────────────────────────────────────
   8. SCROLL TO TOP BUTTON
───────────────────────────────────────────── */

function initScrollTop() {
  const btn = $('#scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, 100), { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   9. SMOOTH SCROLL for anchor links
───────────────────────────────────────────── */

function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navbarHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '70',
      10
    );

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8,
      behavior: 'smooth'
    });

    // Update URL without jumping
    history.pushState(null, '', `#${id}`);

    // Move focus to target for accessibility
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  });
}

/* ─────────────────────────────────────────────
   10. STATS COUNTER ANIMATION
───────────────────────────────────────────── */

function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const suffix = el.dataset.suffix || '';

  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = eased * target;

    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseFloat(el.dataset.count);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────────
   11. ACCORDION
───────────────────────────────────────────── */

function initAccordions() {
  $$('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      $$('.accordion-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─────────────────────────────────────────────
   12. PWA — Service Worker registration
───────────────────────────────────────────── */

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('[SW] Registered:', reg.scope))
        .catch(err => console.warn('[SW] Registration failed:', err));
    });
  }
}

/* ─────────────────────────────────────────────
   13. LIVE TIME DISPLAY (food page clock)
───────────────────────────────────────────── */

function initLiveClock() {
  const clockEl = $('#liveClock');
  if (!clockEl) return;

  const update = () => {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}`;
  };

  update();
  setInterval(update, 30000);
}

/* ─────────────────────────────────────────────
   14. RESPONSIVE ABOUT / CONTACT GRIDS
   Converts 2-col grids to 1-col on small screens
───────────────────────────────────────────── */

function initResponsiveGrids() {
  const grids = $$('.about-grid, .contact-grid, .area-grid, .audit-grid');

  const handle = () => {
    const isMobile = window.innerWidth < 768;
    grids.forEach(g => {
      if (isMobile) {
        g.style.gridTemplateColumns = '1fr';
        g.style.gap = '2rem';
      } else {
        g.style.gridTemplateColumns = '';
        g.style.gap = '';
      }
    });
  };

  handle();
  window.addEventListener('resize', debounce(handle, 150), { passive: true });
}

/* ─────────────────────────────────────────────
   15. SKIP TO MAIN CONTENT (accessibility)
───────────────────────────────────────────── */

function initSkipLink() {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.textContent = 'Skip to main content';
  skip.setAttribute('class', 'skip-link');
  skip.style.cssText = `
    position:fixed;top:-100px;left:1rem;z-index:9999;
    background:var(--brand-primary);color:white;
    padding:0.5rem 1rem;border-radius:0 0 8px 8px;
    font-weight:700;font-size:0.9rem;
    transition:top 0.2s ease;
    text-decoration:none;
  `;
  skip.addEventListener('focus', () => { skip.style.top = '0'; });
  skip.addEventListener('blur',  () => { skip.style.top = '-100px'; });
  document.body.prepend(skip);
}

/* ─────────────────────────────────────────────
   INIT — Run everything on DOMContentLoaded
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initSkipLink();
  initNavbar();
  initScrollAnimations();
  initStatusIndicators();
  initMenuFilter();
  initCart();
  initForms();
  initScrollTop();
  initSmoothScroll();
  initCounters();
  initAccordions();
  initLiveClock();
  initResponsiveGrids();
  initServiceWorker();

  // Reveal all animated elements already in view on page load
  // (handles hero content above the fold)
  requestAnimationFrame(() => {
    $$('.animate-in, .animate-in--left, .animate-in--right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });
});
