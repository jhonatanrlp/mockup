/* ============================================================
   NOVIDÁRIO — JavaScript Principal
   v2 — filtros reais, URL params, busca, cores por segmento
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     UTILITÁRIOS
  ══════════════════════════════════════════ */

  /** Inline SVG placeholder — sem dependência de arquivo externo */
  const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F0EDE8'/%3E%3Crect x='160' y='130' width='80' height='80' rx='8' fill='%23D5CFC8'/%3E%3Crect x='130' y='220' width='140' height='60' rx='8' fill='%23D5CFC8'/%3E%3C/svg%3E`;

  /** Conserta onerror de todas as imagens para usar placeholder inline */
  function fixBrokenImages() {
    document.querySelectorAll('img[onerror]').forEach(img => {
      img.removeAttribute('onerror');
      img.addEventListener('error', () => {
        if (!img.dataset.fallback) {
          img.dataset.fallback = '1';
          img.src = PLACEHOLDER_SVG;
          img.style.objectFit = 'contain';
          img.style.padding = '1rem';
          img.style.background = '#F0EDE8';
        }
      }, { once: true });
    });
  }

  /** Lê parâmetros da query string atual */
  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  /** Exibe toast de feedback */
  function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ══════════════════════════════════════════
     HEADER — scroll shadow
  ══════════════════════════════════════════ */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════════════════════════════════════
     DROPDOWN ÁREAS — toggle / fecha ao clicar fora / ESC
  ══════════════════════════════════════════ */
  (function initAreasDropdown() {
    const dropdown = document.getElementById('nav-areas');
    const trigger  = document.getElementById('areas-trigger');
    const panel    = document.getElementById('areas-panel');
    if (!dropdown || !trigger || !panel) return;

    const open  = () => { dropdown.classList.add('open');    trigger.setAttribute('aria-expanded','true'); };
    const close = () => { dropdown.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); };

    trigger.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', e => { if (!dropdown.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  })();

  /* ══════════════════════════════════════════
     MENU MOBILE
  ══════════════════════════════════════════ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ══════════════════════════════════════════
     SEARCH OVERLAY — abre com botão / fecha com ESC ou clique fora
  ══════════════════════════════════════════ */
  (function initSearch() {
    const openBtn  = document.getElementById('search-open-btn');
    const overlay  = document.getElementById('search-overlay');
    const input    = document.getElementById('search-input');
    if (!openBtn || !overlay || !input) return;

    function openSearch() {
      overlay.classList.add('open');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 50);
    }
    function closeSearch() {
      overlay.classList.remove('open');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openSearch);

    /* Fecha clicando no fundo escuro */
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeSearch();
    });

    /* Fecha com ESC */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    });

    /* Enter busca */
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        const isRoot = !window.location.pathname.includes('/pages/');
        const base   = isRoot ? 'pages/produtos.html' : 'produtos.html';
        window.location.href = `${base}?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  })();

  /* ══════════════════════════════════════════
     YEAR no footer
  ══════════════════════════════════════════ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════
     NEWSLETTER
  ══════════════════════════════════════════ */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (!email || !email.value.includes('@')) {
        showToast('Por favor, insira um e-mail válido.');
        return;
      }
      showToast('Inscrição realizada! Obrigado 🙌');
      email.value = '';
    });
  }

  /* ══════════════════════════════════════════
     ANIMAÇÃO DE ENTRADA (IntersectionObserver)
  ══════════════════════════════════════════ */
  const animTargets = document.querySelectorAll(
    '.product-card:not(.is-hidden), .segment-card, .blog-card, .collection-card, .download-card, .stat-item, .team-card'
  );
  if ('IntersectionObserver' in window && animTargets.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
      obs.observe(el);
    });
  }

  /* ══════════════════════════════════════════
     GALERIA DE PRODUTO (thumbnail click)
  ══════════════════════════════════════════ */
  const thumbs  = document.querySelectorAll('.product-gallery__thumb');
  const mainImg = document.querySelector('.product-gallery__main img');
  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.querySelector('img')?.src;
        if (src) {
          mainImg.style.opacity = '0';
          setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 180);
          mainImg.style.transition = 'opacity 0.18s ease';
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     FILTROS REAIS — produtos.html
     Funciona com data-area, data-material,
     data-colecao, data-tipo nos cards
  ══════════════════════════════════════════ */
  const productsGrid = document.getElementById('products-grid');

  if (productsGrid) {

    /* ── Estado do filtro ── */
    const state = {
      area:     new Set(),
      material: new Set(),
      colecao:  new Set(),
      tipo:     new Set(),
      query:    '',
    };

    /* ── Elementos ── */
    const countEl        = document.getElementById('products-count');
    const activeChipsEl  = document.getElementById('active-filters');
    const clearAllBtn    = document.getElementById('clear-filters');
    const noResultsEl    = document.getElementById('no-results');
    const searchInputEl  = document.getElementById('search-input');
    const sortSelect     = document.getElementById('sort-select');

    /* ── Todos os cards de produto ── */
    const allCards = Array.from(productsGrid.querySelectorAll('.product-card'));

    /* ── Aplicar filtros e re-renderizar ── */
    function applyFilters() {
      let visible = 0;

      allCards.forEach(card => {
        const cardArea     = card.dataset.area     || '';
        const cardMaterial = card.dataset.material || '';
        const cardColecao  = card.dataset.colecao  || '';
        const cardTipo     = card.dataset.tipo     || '';
        const cardName     = (card.querySelector('.product-card__name')?.textContent || '').toLowerCase();

        const matchArea     = state.area.size === 0     || state.area.has(cardArea);
        const matchMaterial = state.material.size === 0 || [...cardMaterial.split(',')].some(m => state.material.has(m.trim()));
        const matchColecao  = state.colecao.size === 0  || state.colecao.has(cardColecao);
        const matchTipo     = state.tipo.size === 0     || state.tipo.has(cardTipo);
        const matchQuery    = state.query === ''        || cardName.includes(state.query);

        const show = matchArea && matchMaterial && matchColecao && matchTipo && matchQuery;
        card.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });

      /* Contador */
      if (countEl) {
        countEl.textContent = `${visible} produto${visible !== 1 ? 's' : ''}`;
      }

      /* No-results */
      if (noResultsEl) noResultsEl.classList.toggle('show', visible === 0);

      /* Chips */
      renderChips();
    }

    /* ── Renderiza chips dos filtros ativos ── */
    function renderChips() {
      if (!activeChipsEl) return;
      activeChipsEl.innerHTML = '';

      const allActive = [
        ...Array.from(state.area,     v => ({ key: 'area',     val: v, label: labelFor('area', v) })),
        ...Array.from(state.material, v => ({ key: 'material', val: v, label: labelFor('material', v) })),
        ...Array.from(state.colecao,  v => ({ key: 'colecao',  val: v, label: v })),
        ...Array.from(state.tipo,     v => ({ key: 'tipo',     val: v, label: v })),
        ...(state.query ? [{ key: 'query', val: state.query, label: `"${state.query}"` }] : []),
      ];

      allActive.forEach(({ key, val, label }) => {
        const chip = document.createElement('span');
        chip.className = 'filter-chip';
        chip.innerHTML = `${label}<span class="filter-chip__x">×</span>`;
        chip.addEventListener('click', () => removeFilter(key, val));
        activeChipsEl.appendChild(chip);
      });

      /* Botão limpar tudo — visível só se houver chips */
      if (clearAllBtn) {
        clearAllBtn.style.display = allActive.length ? '' : 'none';
      }
    }

    /** Labels legíveis para cada valor de filtro */
    const AREA_LABELS = {
      'area-externa': 'Área Externa',
      'educacional':  'Educacional',
      'corporativo':  'Corporativo',
      'alimentacao':  'Alimentação',
      'interiores':   'Interiores',
    };
    function labelFor(key, val) {
      if (key === 'area') return AREA_LABELS[val] || val;
      return val;
    }

    /* ── Remove filtro pelo chip ── */
    function removeFilter(key, val) {
      if (key === 'query') {
        state.query = '';
        if (searchInputEl) searchInputEl.value = '';
      } else {
        state[key].delete(val);
        /* Desmarca checkbox correspondente */
        const cb = productsGrid.closest('section')
          ?.querySelector(`input[data-filter="${key}"][value="${val}"]`);
        if (cb) cb.checked = false;

        /* Desmarca seg-pill se for área */
        if (key === 'area') {
          document.querySelectorAll(`.seg-pill[data-area="${val}"]`)
            .forEach(p => p.classList.remove('active'));
        }
      }
      applyFilters();
    }

    /* ── Ouve checkboxes de filtro ── */
    document.querySelectorAll('input[data-filter]').forEach(cb => {
      cb.addEventListener('change', () => {
        const key = cb.dataset.filter;
        const val = cb.value;
        if (cb.checked) state[key].add(val);
        else             state[key].delete(val);
        applyFilters();
      });
    });

    /* ── Seg-pills (atalhos de segmento) ── */
    document.querySelectorAll('.seg-pill[data-area]').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const area = pill.dataset.area;
        const isActive = pill.classList.toggle('active');

        /* Sincroniza com o checkbox correspondente */
        const cb = document.querySelector(`input[data-filter="area"][value="${area}"]`);
        if (cb) cb.checked = isActive;

        if (isActive) state.area.add(area);
        else           state.area.delete(area);
        applyFilters();
      });
    });

    /* ── Busca inline ── */
    if (searchInputEl) {
      searchInputEl.addEventListener('input', () => {
        state.query = searchInputEl.value.trim().toLowerCase();
        applyFilters();
      });
    }

    /* ── Limpar todos os filtros ── */
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        state.area.clear();
        state.material.clear();
        state.colecao.clear();
        state.tipo.clear();
        state.query = '';
        if (searchInputEl) searchInputEl.value = '';
        document.querySelectorAll('input[data-filter]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.seg-pill').forEach(p => p.classList.remove('active'));
        applyFilters();
      });
    }

    /* ── Ordenação ── */
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const val = sortSelect.value;
        const cards = Array.from(allCards);

        cards.sort((a, b) => {
          const nameA = a.querySelector('.product-card__name')?.textContent || '';
          const nameB = b.querySelector('.product-card__name')?.textContent || '';
          if (val === 'az') return nameA.localeCompare(nameB, 'pt');
          if (val === 'za') return nameB.localeCompare(nameA, 'pt');
          return 0; // padrão / mais recentes = ordem original
        });

        /* Re-inserir na DOM na nova ordem */
        cards.forEach(c => productsGrid.appendChild(c));
        applyFilters(); /* re-aplica sem resetar estado */
      });
    }

    /* ── Filtra accordion lateral ── */
    document.querySelectorAll('.filter-group__title').forEach(title => {
      title.addEventListener('click', () => {
        const group = title.closest('.filter-group');
        const options = group?.querySelector('.filter-group__options');
        if (!options) return;
        const isCollapsed = options.style.display === 'none';
        options.style.display = isCollapsed ? '' : 'none';
        const chevron = title.querySelector('.chevron');
        if (chevron) chevron.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(-90deg)';
      });
    });

    /* ── Inicialização: lê ?segmento= e ?q= da URL ── */
    (function initFromURL() {
      const params = getParams();
      const seg = params.get('segmento');
      const q   = params.get('q');

      if (seg) {
        state.area.add(seg);
        /* Marca checkbox */
        const cb = document.querySelector(`input[data-filter="area"][value="${seg}"]`);
        if (cb) cb.checked = true;
        /* Marca pill */
        const pill = document.querySelector(`.seg-pill[data-area="${seg}"]`);
        if (pill) pill.classList.add('active');
      }

      if (q) {
        state.query = q.toLowerCase();
        if (searchInputEl) searchInputEl.value = q;
      }

      applyFilters();
    })();
  }

  /* ══════════════════════════════════════════
     BUSCA no header (páginas sem products-grid)
     Redireciona para produtos.html?q=
  ══════════════════════════════════════════ */
  const headerSearchInput = document.getElementById('search-input');
  if (headerSearchInput && !productsGrid) {
    headerSearchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = headerSearchInput.value.trim();
        if (!q) return;
        // Descobre o prefixo de caminho (root ou pages/)
        const isRoot = !window.location.pathname.includes('/pages/');
        const base   = isRoot ? 'pages/produtos.html' : 'produtos.html';
        window.location.href = `${base}?q=${encodeURIComponent(q)}`;
      }
    });
  }

  /* ══════════════════════════════════════════
     SMOOTH SCROLL para âncoras
  ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const headerTotal = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-total')
        ) || 120;
        const top = target.getBoundingClientRect().top + window.scrollY - headerTotal - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════════
     NAV LINK ATIVO
  ══════════════════════════════════════════ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href && href === currentPath) link.classList.add('active');
  });

  /* ══════════════════════════════════════════
     FORMULÁRIO DE CONTATO
  ══════════════════════════════════════════ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) { btn.textContent = 'Enviando…'; btn.disabled = true; }
      setTimeout(() => {
        showToast('Mensagem enviada! Em breve retornaremos.');
        contactForm.reset();
        if (btn) { btn.textContent = 'Enviar mensagem'; btn.disabled = false; }
      }, 1200);
    });
  }

  /* ══════════════════════════════════════════
     QTY +/- (produto detalhe)
  ══════════════════════════════════════════ */
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-wrap')?.querySelector('.qty-input');
      if (!input) return;
      const step = btn.dataset.action === 'inc' ? 1 : -1;
      input.value = Math.max(1, parseInt(input.value) + step);
    });
  });

  /* ══════════════════════════════════════════
     TABS (data-tabs)
  ══════════════════════════════════════════ */
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs   = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.hidden = true);
        tab.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.hidden = false;
      });
    });
  });

  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  fixBrokenImages();

})();
