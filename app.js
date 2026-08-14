/* ============================================================
   THE CHOCOLATE HOUSE – app.js
   All interactivity: products, search, filter, sort,
   dark mode, wishlist, modals, animations, nav
   ============================================================ */

'use strict';

/* ── Product Data ──────────────────────────────────────────── */
const PRODUCTS = [
  // Imported Drinks
  { id: 1,  name: 'CF Marvel Cola',                      price: 95,  category: 'Imported Drinks',         emoji: '🥤' },
  { id: 2,  name: 'CF Marvel Green Apple',               price: 95,  category: 'Imported Drinks',         emoji: '🍏' },
  { id: 3,  name: 'CF Marvel Grape',                     price: 95,  category: 'Imported Drinks',         emoji: '🍇' },
  { id: 4,  name: 'CF Marvel Lemon',                     price: 95,  category: 'Imported Drinks',         emoji: '🍋' },
  { id: 5,  name: 'CF Marvel Orange',                    price: 95,  category: 'Imported Drinks',         emoji: '🍊' },
  { id: 6,  name: 'CF Marvel Strawberry',                price: 95,  category: 'Imported Drinks',         emoji: '🍓' },

  // Kunafa Specials
  { id: 7,  name: 'All Khalus Biscott Kunafa Bites 30g', price: 149, category: 'Kunafa Specials',         emoji: '🥐' },
  { id: 8,  name: 'All Khalus Hazelnut Kunafa Bites 30g',price: 149, category: 'Kunafa Specials',         emoji: '🌰' },
  { id: 9,  name: 'All Khalus Pistachio Kunafa Bites 30g',price:175, category: 'Kunafa Specials',         emoji: '🟢' },
  { id: 10, name: 'Barquillo Cocoamels Kunafa Pistachio 150g', price: 699, category: 'Kunafa Specials',   emoji: '🥐' },
  { id: 11, name: 'Barquillo Cocoamels Kunafa Cheesecake 150g',price: 699, category: 'Kunafa Specials',   emoji: '🍰' },

  // Chocolates
  { id: 12, name: 'SC Creamy Milk 35g',                  price: 45,  category: 'Chocolates',              emoji: '🍫' },
  { id: 13, name: 'SC Crunchy Rice Crispy 70g',          price: 100, category: 'Chocolates',              emoji: '🍫' },
  { id: 14, name: 'SC Roasted Nut & Raisin 70g',         price: 100, category: 'Chocolates',              emoji: '🍫' },
  { id: 15, name: 'SC Nut & Raisin Dark 70g',            price: 90,  category: 'Chocolates',              emoji: '🍫' },
  { id: 16, name: 'SC Creamy Milk 70g',                  price: 90,  category: 'Chocolates',              emoji: '🍫' },
  { id: 17, name: 'SC 70% Madagascar Dark Chocolate',    price: 250, category: 'Chocolates',              emoji: '🌑' },
  { id: 18, name: 'SC Roasted Nut & Raisin 35g',         price: 50,  category: 'Chocolates',              emoji: '🍫' },

  // Premium Dark Chocolates
  { id: 19, name: 'PM 80% Roasted Almond & Pink Salt',   price: 298, category: 'Premium Dark Chocolates', emoji: '🌑' },
  { id: 20, name: 'PM 87% Dark Plain',                   price: 298, category: 'Premium Dark Chocolates', emoji: '🌑' },

  // Energy & Soft Drinks
  { id: 21, name: 'Monster Mix Flavour 500ml',           price: 150, category: 'Energy Drinks',           emoji: '⚡' },
  { id: 22, name: 'Pepsi Max Cherry',                    price: 104, category: 'Energy Drinks',           emoji: '🍒' },
  { id: 23, name: 'Pepsi Zero Sugar Strawberry',         price: 104, category: 'Energy Drinks',           emoji: '🍓' },
  { id: 24, name: 'Pepsi Zero Sugar Cream Soda',         price: 104, category: 'Energy Drinks',           emoji: '🥤' },
  { id: 25, name: 'Coke Vanilla',                        price: 340, category: 'Energy Drinks',           emoji: '🧋' },

  // Luxury Chocolates
  { id: 26, name: 'Lindt Excellence 90%',                price: 375, category: 'Luxury Chocolates',       emoji: '👑' },
  { id: 27, name: 'Ferrero Dark',                        price: 300, category: 'Luxury Chocolates',       emoji: '🍬' },
  { id: 28, name: 'Ferrero Milk',                        price: 300, category: 'Luxury Chocolates',       emoji: '🍬' },
  { id: 29, name: 'Ferrero White',                       price: 300, category: 'Luxury Chocolates',       emoji: '🍬' },
];

/* ── Category metadata (icon + id mapping) ─────────────────── */
const CATEGORY_COUNTS = {
  'all':                    PRODUCTS.length,
  'Chocolates':             PRODUCTS.filter(p => p.category === 'Chocolates').length,
  'Kunafa Specials':        PRODUCTS.filter(p => p.category === 'Kunafa Specials').length,
  'Imported Drinks':        PRODUCTS.filter(p => p.category === 'Imported Drinks').length,
  'Energy Drinks':          PRODUCTS.filter(p => p.category === 'Energy Drinks').length,
  'Premium Dark Chocolates':PRODUCTS.filter(p => p.category === 'Premium Dark Chocolates').length,
  'Luxury Chocolates':      PRODUCTS.filter(p => p.category === 'Luxury Chocolates').length,
};

/* ── State ──────────────────────────────────────────────────── */
const state = {
  theme:           'dark',
  wishlist:        new Set(),
  activeCategory:  'all',
  searchQuery:     '',
  maxPrice:        700,
  sortBy:          'default',
};

/* ── DOM References ─────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const dom = {
  html:            document.documentElement,
  navbar:          $('navbar'),
  themeToggle:     $('themeToggle'),
  themeIcon:       $('themeIcon'),
  hamburger:       $('hamburger'),
  navLinks:        $('navLinks'),
  navLinkItems:    $$('.nav-link'),
  wishlistNavBtn:  $('wishlistNavBtn'),
  wishlistCount:   $('wishlistCount'),
  searchInput:     $('searchInput'),
  searchClear:     $('searchClear'),
  categoryFilter:  $('categoryFilter'),
  priceFilter:     $('priceFilter'),
  priceValue:      $('priceValue'),
  sortFilter:      $('sortFilter'),
  resetFilters:    $('resetFilters'),
  productsGrid:    $('productsGrid'),
  resultsCount:    $('resultsCount'),
  emptyState:      $('emptyState'),
  emptyReset:      $('emptyReset'),
  footerYear:      $('footerYear'),
  wishlistModal:   $('wishlistModal'),
  wishlistItems:   $('wishlistItems'),
  modalClose:      $('modalClose'),
  quickViewModal:  $('quickViewModal'),
  quickViewClose:  $('quickViewClose'),
  quickViewContent:$('quickViewContent'),
  toast:           $('toast'),
  catCards:        $$('.category-card'),
};

/* ── Theme ──────────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('choc-theme') || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  state.theme = theme;
  dom.html.setAttribute('data-theme', theme);
  localStorage.setItem('choc-theme', theme);
  dom.themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

/* ── Navbar ─────────────────────────────────────────────────── */
function initNavbar() {
  // Scroll behaviour
  window.addEventListener('scroll', () => {
    dom.navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
  }, { passive: true });

  // Hamburger toggle
  dom.hamburger.addEventListener('click', () => {
    const isOpen = dom.navLinks.classList.toggle('open');
    dom.hamburger.classList.toggle('open', isOpen);
    dom.hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  dom.navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      dom.navLinks.classList.remove('open');
      dom.hamburger.classList.remove('open');
      dom.hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!dom.navbar.contains(e.target)) {
      dom.navLinks.classList.remove('open');
      dom.hamburger.classList.remove('open');
      dom.hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

function updateActiveNavLink() {
  const sections = ['home', 'about', 'categories', 'menu', 'gallery', 'contact'];
  const scrollY = window.scrollY + 120;
  let current = 'home';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });

  dom.navLinkItems.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

/* ── Category Counts ────────────────────────────────────────── */
function populateCategoryCounts() {
  $('cat-count-all').textContent      = CATEGORY_COUNTS['all'];
  $('cat-count-chocolates').textContent = CATEGORY_COUNTS['Chocolates'];
  $('cat-count-kunafa').textContent   = CATEGORY_COUNTS['Kunafa Specials'];
  $('cat-count-imported').textContent = CATEGORY_COUNTS['Imported Drinks'];
  $('cat-count-energy').textContent   = CATEGORY_COUNTS['Energy Drinks'];
  $('cat-count-dark').textContent     = CATEGORY_COUNTS['Premium Dark Chocolates'];
  $('cat-count-luxury').textContent   = CATEGORY_COUNTS['Luxury Chocolates'];
}

/* ── Product Filtering & Sorting ────────────────────────────── */
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Category filter
  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Price filter
  list = list.filter(p => p.price <= state.maxPrice);

  // Sort
  switch (state.sortBy) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  return list;
}

/* ── Product Card HTML ──────────────────────────────────────── */
function buildProductCard(product, index) {
  const inWishlist = state.wishlist.has(product.id);
  const heartClass = inWishlist ? 'fas fa-heart active' : 'far fa-heart';
  const wishlistActiveClass = inWishlist ? ' active' : '';

  return `
    <article class="product-card" role="listitem" data-id="${product.id}"
             style="animation-delay:${Math.min(index * 0.05, 0.4)}s"
             aria-label="${product.name}, ${product.category}, ₹${product.price}">
      <div class="product-image">
        <div class="product-emoji" aria-hidden="true">${product.emoji}</div>
        <span class="product-category-tag">${product.category}</span>
        <button
          class="wishlist-toggle${wishlistActiveClass}"
          data-id="${product.id}"
          aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}: ${product.name}"
          title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i class="${heartClass}" aria-hidden="true"></i>
        </button>
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-footer">
          <span class="product-price">₹${product.price}</span>
          <button
            class="btn-quick-view"
            data-id="${product.id}"
            aria-label="Quick view ${product.name}">
            <i class="fas fa-eye" aria-hidden="true"></i> View
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ── Render Products ─────────────────────────────────────────── */
function renderProducts() {
  const filtered = getFilteredProducts();
  dom.resultsCount.textContent = filtered.length;

  if (filtered.length === 0) {
    dom.productsGrid.innerHTML = '';
    dom.productsGrid.removeAttribute('role');
    dom.emptyState.hidden = false;
  } else {
    dom.emptyState.hidden = true;
    dom.productsGrid.setAttribute('role', 'list');
    dom.productsGrid.innerHTML = filtered
      .map((p, i) => buildProductCard(p, i))
      .join('');

    // Attach card event listeners
    dom.productsGrid.querySelectorAll('.wishlist-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleWishlist(Number(btn.dataset.id));
      });
    });

    dom.productsGrid.querySelectorAll('.btn-quick-view').forEach(btn => {
      btn.addEventListener('click', () => openQuickView(Number(btn.dataset.id)));
    });
  }
}

/* ── Search & Filter Controls ───────────────────────────────── */
function initControls() {
  // Live search with debounce
  let searchTimer;
  dom.searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    state.searchQuery = dom.searchInput.value;
    dom.searchClear.hidden = !state.searchQuery;
    searchTimer = setTimeout(renderProducts, 220);
  });

  dom.searchClear.addEventListener('click', () => {
    dom.searchInput.value = '';
    state.searchQuery = '';
    dom.searchClear.hidden = true;
    dom.searchInput.focus();
    renderProducts();
  });

  // Category filter (dropdown)
  dom.categoryFilter.addEventListener('change', () => {
    state.activeCategory = dom.categoryFilter.value;
    syncCategoryCards();
    renderProducts();
  });

  // Price range
  dom.priceFilter.addEventListener('input', () => {
    state.maxPrice = Number(dom.priceFilter.value);
    dom.priceValue.textContent = `₹${state.maxPrice}`;
    renderProducts();
  });

  // Sort
  dom.sortFilter.addEventListener('change', () => {
    state.sortBy = dom.sortFilter.value;
    renderProducts();
  });

  // Reset filters
  dom.resetFilters.addEventListener('click', resetFilters);
  dom.emptyReset.addEventListener('click', resetFilters);
}

function resetFilters() {
  state.activeCategory  = 'all';
  state.searchQuery     = '';
  state.maxPrice        = 700;
  state.sortBy          = 'default';

  dom.searchInput.value   = '';
  dom.categoryFilter.value= 'all';
  dom.priceFilter.value   = 700;
  dom.priceValue.textContent = '₹700';
  dom.sortFilter.value    = 'default';
  dom.searchClear.hidden  = true;

  syncCategoryCards();
  renderProducts();
}

/* ── Category Cards (section buttons) ───────────────────────── */
function initCategoryCards() {
  dom.catCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      state.activeCategory = cat;

      // Sync dropdown
      dom.categoryFilter.value = cat;

      // Update active card state
      syncCategoryCards();

      // Re-render products and scroll to menu
      renderProducts();
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function syncCategoryCards() {
  dom.catCards.forEach(card => {
    card.classList.toggle('active', card.dataset.category === state.activeCategory);
  });
}

/* ── Wishlist ────────────────────────────────────────────────── */
function toggleWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast(`Removed from wishlist`, 'toast-remove');
  } else {
    state.wishlist.add(productId);
    showToast(`Added to wishlist: ${product.name}`, 'toast-success');
  }

  updateWishlistCount();
  renderProducts(); // refresh heart states
}

function updateWishlistCount() {
  const count = state.wishlist.size;
  dom.wishlistCount.textContent = count;
  dom.wishlistCount.classList.toggle('show', count > 0);
}

function openWishlistModal() {
  renderWishlistModal();
  dom.wishlistModal.hidden = false;
  document.body.style.overflow = 'hidden';
  dom.modalClose.focus();
}

function closeWishlistModal() {
  dom.wishlistModal.hidden = true;
  document.body.style.overflow = '';
  dom.wishlistNavBtn.focus();
}

function renderWishlistModal() {
  if (state.wishlist.size === 0) {
    dom.wishlistItems.innerHTML = `
      <div class="wishlist-empty">
        <i class="far fa-heart"></i>
        <p>Your wishlist is empty.<br>Add products you love!</p>
      </div>`;
    return;
  }

  const items = [...state.wishlist]
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  dom.wishlistItems.innerHTML = items.map(p => `
    <div class="wishlist-item" data-id="${p.id}">
      <div class="wishlist-item-emoji" aria-hidden="true">${p.emoji}</div>
      <div class="wishlist-item-info">
        <div class="wishlist-item-name">${p.name}</div>
        <div class="wishlist-item-cat">${p.category}</div>
      </div>
      <span class="wishlist-item-price">₹${p.price}</span>
      <button class="wishlist-item-remove" data-id="${p.id}"
              aria-label="Remove ${p.name} from wishlist">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
    </div>
  `).join('');

  dom.wishlistItems.querySelectorAll('.wishlist-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleWishlist(Number(btn.dataset.id));
      renderWishlistModal();
    });
  });
}

/* ── Quick View Modal ───────────────────────────────────────── */
const PRODUCT_DESCS = {
  'Imported Drinks':         'An exotic imported beverage with a refreshing and vibrant flavour profile. Perfect for those seeking something unique beyond the ordinary.',
  'Kunafa Specials':         'A premium kunafa-inspired confection blending authentic Middle Eastern flavours with gourmet quality ingredients. Rich, indulgent, and unforgettable.',
  'Chocolates':              'A beautifully crafted milk or dark chocolate bar using quality cocoa for a smooth, satisfying taste. Perfect for everyday indulgence.',
  'Premium Dark Chocolates': 'An intensely flavourful premium dark chocolate bar with bold cocoa character. Expertly crafted for serious chocolate lovers who appreciate depth and complexity.',
  'Energy Drinks':           'A bold and refreshing energy or soft drink with distinctive imported flavours you won\'t find anywhere else. Grab one and stand out.',
  'Luxury Chocolates':       'A world-class luxury chocolate experience from one of the finest chocolatiers on the planet. The ultimate gift for yourself or someone special.',
};

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const desc = PRODUCT_DESCS[product.category] || 'A premium selection from The Chocolate House.';

  dom.quickViewContent.innerHTML = `
    <div style="padding: clamp(16px, 4vw, 28px);">
      <div class="qv-image" aria-hidden="true">${product.emoji}</div>
      <div class="qv-cat">
        <span class="section-label">${product.category}</span>
      </div>
      <h2 class="qv-name">${product.name}</h2>
      <div class="qv-price">₹${product.price}</div>
      <p class="qv-desc">${desc}</p>
      <div class="qv-actions">
        <a href="https://wa.me/91XXXXXXXXXX?text=Hello! I'd like to order: ${encodeURIComponent(product.name)} (₹${product.price})"
           class="btn btn-whatsapp"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Order ${product.name} on WhatsApp">
          <i class="fab fa-whatsapp" aria-hidden="true"></i> Order on WhatsApp
        </a>
        <button
          class="btn btn-outline qv-wishlist-btn"
          data-id="${product.id}"
          aria-label="${state.wishlist.has(product.id) ? 'Remove from' : 'Add to'} wishlist">
          <i class="${state.wishlist.has(product.id) ? 'fas' : 'far'} fa-heart" aria-hidden="true"></i>
          ${state.wishlist.has(product.id) ? 'In Wishlist' : 'Wishlist'}
        </button>
      </div>
    </div>`;

  // Wishlist button inside quick view
  dom.quickViewContent.querySelector('.qv-wishlist-btn').addEventListener('click', function () {
    toggleWishlist(Number(this.dataset.id));
    // Update button text/icon
    const inW = state.wishlist.has(product.id);
    this.innerHTML = `<i class="${inW ? 'fas' : 'far'} fa-heart" aria-hidden="true"></i> ${inW ? 'In Wishlist' : 'Wishlist'}`;
    this.setAttribute('aria-label', `${inW ? 'Remove from' : 'Add to'} wishlist`);
  });

  dom.quickViewModal.hidden = false;
  document.body.style.overflow = 'hidden';
  dom.quickViewClose.focus();
}

function closeQuickView() {
  dom.quickViewModal.hidden = true;
  document.body.style.overflow = '';
}

/* ── Modal Event Listeners ──────────────────────────────────── */
function initModals() {
  // Wishlist modal
  dom.wishlistNavBtn.addEventListener('click', openWishlistModal);
  dom.modalClose.addEventListener('click', closeWishlistModal);
  dom.wishlistModal.addEventListener('click', e => {
    if (e.target === dom.wishlistModal) closeWishlistModal();
  });

  // Quick view modal
  dom.quickViewClose.addEventListener('click', closeQuickView);
  dom.quickViewModal.addEventListener('click', e => {
    if (e.target === dom.quickViewModal) closeQuickView();
  });

  // ESC key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!dom.wishlistModal.hidden)  closeWishlistModal();
      if (!dom.quickViewModal.hidden) closeQuickView();
    }
  });
}

/* ── Toast Notification ─────────────────────────────────────── */
let toastTimer;
function showToast(message, type = '') {
  clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.className = `toast show ${type}`;
  toastTimer = setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 2800);
}

/* ── Scroll Reveal (Intersection Observer) ──────────────────── */
function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ── Add Reveal Classes to Sections ────────────────────────── */
function addRevealClasses() {
  // About section
  const aboutGrid = document.querySelector('.about-grid');
  if (aboutGrid) {
    aboutGrid.querySelector('.about-visual')?.classList.add('reveal');
    aboutGrid.querySelector('.about-content')?.classList.add('reveal', 'reveal-delay-2');
  }

  // Section headers
  $$('.section-header').forEach(el => el.classList.add('reveal'));

  // Category cards with stagger
  $$('.category-card').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  // Testimonial cards
  $$('.testimonial-card').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  // Gallery items
  $$('.gallery-item').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 2 === 1) el.classList.add('reveal-delay-1');
  });

  // Contact grid
  $$('.contact-grid > *').forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0) el.classList.add('reveal-delay-2');
  });
}

/* ── Smooth anchor scroll offset (for fixed navbar) ────────── */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 75; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Footer Year ────────────────────────────────────────────── */
function setFooterYear() {
  if (dom.footerYear) dom.footerYear.textContent = new Date().getFullYear();
}

/* ── Hero Particle Effect ───────────────────────────────────── */
function initHeroParticles() {
  const container = $('heroParticles');
  if (!container) return;
  const symbols = ['✦', '✧', '·', '∗', '⋆'];
  const count = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.setAttribute('aria-hidden', 'true');
    p.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${0.4 + Math.random() * 0.8}rem;
      color: rgba(201,162,39,${0.1 + Math.random() * 0.25});
      animation: floatShape ${5 + Math.random() * 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 6}s;
      pointer-events: none;
      user-select: none;
    `;
    container.appendChild(p);
  }
}

/* ── Navbar link for categories section ─────────────────────── */
// Adds a "Shop" quick link to WhatsApp button in nav on larger screens
function initWhatsappNavHint() {
  // Pulse the WhatsApp float button once after 3s to draw attention
  const wa = document.querySelector('.whatsapp-float');
  if (!wa) return;
  setTimeout(() => {
    wa.style.transform = 'scale(1.2)';
    setTimeout(() => { wa.style.transform = ''; }, 400);
  }, 3000);
}

/* ── Keyboard trap for modals (accessibility) ───────────────── */
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  modal.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
    // Remove handler when modal closes
    if (modal.hidden) modal.removeEventListener('keydown', handler);
  });
}

/* ── Back to top on logo click ──────────────────────────────── */
function initLogoClick() {
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', e => {
      if (logo.getAttribute('href') === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

/* ── Animate stats counter ──────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const isPercent = String(target).includes('%');
  const num = parseInt(target);

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * num);
    el.textContent = isPercent ? current + '%' : (current === num && String(target).includes('+') ? num + '+' : current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target; // ensure final value is exact
  };
  requestAnimationFrame(step);
}

function initStatsAnimation() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.stat-number').forEach(el => {
          animateCounter(el, el.textContent.trim());
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ── ============================================================
   INIT — Bootstrap everything on DOM ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Core setup
  initTheme();
  setFooterYear();

  // Navigation
  initNavbar();
  initSmoothScroll();
  initLogoClick();

  // Products
  populateCategoryCounts();
  initCategoryCards();
  initControls();
  renderProducts();

  // Modals
  initModals();

  // Visual effects
  addRevealClasses();
  initScrollReveal();
  initHeroParticles();
  initStatsAnimation();
  initWhatsappNavHint();

  // Theme toggle
  dom.themeToggle.addEventListener('click', toggleTheme);

  // Trap focus in modals for accessibility
  const modalObserver = new MutationObserver(() => {
    if (!dom.wishlistModal.hidden)  trapFocus(dom.wishlistModal);
    if (!dom.quickViewModal.hidden) trapFocus(dom.quickViewModal);
  });
  modalObserver.observe(dom.wishlistModal,  { attributes: true, attributeFilter: ['hidden'] });
  modalObserver.observe(dom.quickViewModal, { attributes: true, attributeFilter: ['hidden'] });

  // Initial nav link state
  updateActiveNavLink();

  console.log('%c🍫 The Chocolate House', 'font-size:18px; color:#C9A227; font-weight:bold;');
  console.log('%cPremium Chocolates & Imported Snacks', 'color:#6D4C41;');
});
