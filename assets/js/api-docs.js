/* Vetro API documentation page: copy buttons, current-section highlight in the side menu, locale number format. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const T = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);
  const lang = () => (window.VetroI18n && window.VetroI18n.lang) || 'en';

  /* ---------- numbers ---------- */
  const fmtAll = () => $$('[data-n]').forEach((n) => { n.textContent = Number(n.dataset.n).toLocaleString(lang() === 'ru' ? 'ru-RU' : 'en-US'); });
  fmtAll();
  document.addEventListener('langchange', fmtAll);

  /* ---------- copy buttons ---------- */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* no clipboard permission: fall back */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.append(ta); ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e) { return false; }
  }
  $$('.copy-btn').forEach((btn) => {
    let t = 0;
    btn.addEventListener('click', async () => {
      const code = $('code', btn.closest('.codeblock'));
      if (!code) return;
      const ok = await copyText(code.textContent);
      btn.textContent = ok ? T('apid.copied', 'Copied') : T('apid.copyfail', 'Select and copy');
      btn.classList.toggle('is-done', ok);
      clearTimeout(t);
      t = setTimeout(() => { btn.textContent = T('apid.copy', 'Copy'); btn.classList.remove('is-done'); }, 1600);
    });
  });

  /* ---------- side menu: current section ---------- */
  const nav = $('#docsNav');
  if (nav) {
    const links = $$('a[href^="#"]', nav);
    const secs = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
    let ticking = false;
    let shown = '';
    const update = () => {
      ticking = false;
      let cur = null;
      secs.forEach((s) => { if (s.getBoundingClientRect().top <= 170) cur = s; });
      const id = cur ? cur.id : '';
      if (id === shown) return;
      shown = id;
      links.forEach((a) => {
        const on = a.hash === `#${id}`;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        // on phones the menu is a horizontal strip: keep the current chip in view without scrolling the page
        if (on && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
      });
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();
