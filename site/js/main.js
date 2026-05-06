/* ============================================================
   NOVIDÁRIO — JavaScript Principal
   ============================================================ */

(function () {
  'use strict';

  /* ── Ano no footer ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Header: scroll shadow ── */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Menu mobile ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Fechar ao clicar em link */
    mobileMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Toast helper ── */
  function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ── Newsletter ── */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (!email || !email.value.includes('@')) {
        showToast('Por favor, insira um e-mail válido.');
        return;
      }
      showToast('Inscrição realizada com sucesso! Obrigado 🙌');
      email.value = '';
    });
  }

  /* ── Animação de entrada com IntersectionObserver ── */
  const animTargets = document.querySelectorAll(
    '.product-card, .segment-card, .blog-card, .collection-card, .download-card, .stat-item, .team-card'
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
      el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      obs.observe(el);
    });
  }

  /* ── Galeria de produto (thumbnail click) ── */
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  const mainImg = document.querySelector('.product-gallery__main img');

  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.querySelector('img')?.src;
        if (src) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
          }, 180);
          mainImg.style.transition = 'opacity 0.18s ease';
        }
      });
    });
  }

  /* ── Filtros: toggle grupo ── */
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

  /* ── Busca inline ── */
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (q) {
          window.location.href = `pages/produtos.html?q=${encodeURIComponent(q)}`;
        }
      }
    });
  }

  /* ── Smooth scroll para âncoras ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY;
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')) || 80;
        window.scrollTo({ top: top - offset - 16, behavior: 'smooth' });
      }
    });
  });

  /* ── Nav link ativo ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href === currentPath) link.classList.add('active');
  });

  /* ── Formulário de contato ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Enviando…';
        btn.disabled = true;
      }
      setTimeout(() => {
        showToast('Mensagem enviada! Em breve entraremos em contato.');
        contactForm.reset();
        if (btn) {
          btn.textContent = 'Enviar mensagem';
          btn.disabled = false;
        }
      }, 1200);
    });
  }

  /* ── Tabs (se existirem) ── */
  document.querySelectorAll('[data-tabs]').forEach(tabsContainer => {
    const tabs    = tabsContainer.querySelectorAll('[data-tab]');
    const panels  = tabsContainer.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.hidden = true);
        tab.classList.add('active');
        const panel = tabsContainer.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.hidden = false;
      });
    });
  });

  /* ── Quantidade produto (+ / -) ── */
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-wrap')?.querySelector('.qty-input');
      if (!input) return;
      const step = btn.dataset.action === 'inc' ? 1 : -1;
      const val  = parseInt(input.value) + step;
      input.value = Math.max(1, val);
    });
  });

})();
