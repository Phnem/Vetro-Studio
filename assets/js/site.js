/* Vetro site behaviours: navigation, reveal, parallax, scroll-driven showcase, dialogs, releases. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);

  /* ---------- mobile sheet ---------- */
  const burger = $('.burger');
  const sheet = $('#mobileSheet');
  const setSheet = (open) => {
    if (!sheet || !burger) return;
    sheet.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
  };
  if (burger) burger.addEventListener('click', () => setSheet(!sheet.classList.contains('is-open')));
  if (sheet) sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('a')) setSheet(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setSheet(false); });
  matchMedia('(min-width: 1025px)').addEventListener('change', (e) => { if (e.matches) setSheet(false); });

  /* ---------- header + progress ---------- */
  const header = $('.site-header');
  const progress = $('.scroll-progress');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    }
    parallax(y);
    winTilt();
    showcase();
    ticking = false;
  };
  const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);

  /* ---------- reveal ---------- */
  const reveals = $$('.reveal');
  reveals.forEach((el) => {
    const sibs = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
    el.style.setProperty('--d', `${Math.max(0, sibs.indexOf(el)) % 4 * 90}ms`);
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const rio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => rio.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  /* ---------- hero parallax ---------- */
  const cluster = $('[data-parallax]');
  const heroSection = $('.col-hero, .studio-hero');
  function parallax(y) {
    if (reduceMotion || !heroSection) return;
    const v = Math.min(1, y / 700).toFixed(3);
    heroSection.style.setProperty('--sy', v);
    if (cluster) cluster.style.setProperty('--sy', v);
  }
  if (heroSection && !reduceMotion && matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('pointermove', (e) => {
      const r = heroSection.getBoundingClientRect();
      const mx = (((e.clientX - r.left) / r.width) - 0.5) * 2;
      const my = (((e.clientY - r.top) / r.height) - 0.5) * 2;
      heroSection.style.setProperty('--mx', mx.toFixed(3));
      heroSection.style.setProperty('--my', my.toFixed(3));
      if (cluster) { cluster.style.setProperty('--mx', mx.toFixed(3)); cluster.style.setProperty('--my', my.toFixed(3)); }
    });
  }

  /* ---------- window mockup tilt (VetroLook) ---------- */
  const winStage = $('[data-win-tilt]');
  function winTilt() {
    if (!winStage || reduceMotion) return;
    const r = winStage.getBoundingClientRect();
    const p = 1 - Math.min(1, Math.max(0, (r.top - innerHeight * 0.1) / (innerHeight * 0.7)));
    winStage.style.setProperty('--wp', p.toFixed(3));
  }

  /* ---------- scroll-driven showcase (Collection) ---------- */
  const stage = $('.stage-phones');
  const steps = $$('.showcase .step');
  let currentStep = null;
  function showcase() {
    if (!stage || !steps.length || !stage.offsetParent) return;
    const mid = innerHeight * 0.5;
    let best = null; let bd = Infinity;
    steps.forEach((s) => {
      const r = s.getBoundingClientRect();
      const d = Math.abs((r.top + r.bottom) / 2 - mid);
      if (d < bd) { bd = d; best = s; }
    });
    if (!best || best === currentStep) return;
    currentStep = best;
    steps.forEach((s) => s.classList.toggle('is-current', s === best));
    stage.dataset.step = best.dataset.step;
    stage.dataset.pair = best.dataset.b ? '2' : '1';
    if (window.VetroScreens) {
      const a = $('.phone-a', stage); const b = $('.phone-b', stage);
      if (a && best.dataset.a) window.VetroScreens.setScreen(a, best.dataset.a);
      if (b && best.dataset.b) window.VetroScreens.setScreen(b, best.dataset.b);
    }
  }

  /* ---------- trailer ---------- */
  const video = $('#trailerVideo');
  if (video) {
    const soundBtn = $('#trailerSound');
    const replayBtn = $('#trailerReplay');
    const label = soundBtn && $('span', soundBtn);
    const refresh = () => {
      if (!label) return;
      label.removeAttribute('data-i18n');
      label.textContent = video.muted ? T('col.trailer.soundon', 'Sound on') : T('col.trailer.soundoff', 'Sound off');
    };
    const play = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { if (!reduceMotion) play(); } else video.pause();
      }), { threshold: 0.35 }).observe(video);
    } else if (!reduceMotion) play();
    if (soundBtn) soundBtn.addEventListener('click', () => { video.muted = !video.muted; if (!video.muted) video.volume = 1; play(); refresh(); });
    if (replayBtn) replayBtn.addEventListener('click', () => { video.currentTime = 0; play(); });
    video.addEventListener('click', () => { if (video.paused) play(); else video.pause(); });
    document.addEventListener('langchange', refresh);
  }
  $$('video[data-audio-default]').forEach((v) => { v.muted = false; v.defaultMuted = false; v.volume = 1; });

  /* ---------- benchmarks ---------- */
  const charts = $$('[data-chart]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const bio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-chart'); bio.unobserve(e.target); }
    }), { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
    charts.forEach((c) => bio.observe(c));
  } else charts.forEach((c) => c.classList.add('is-chart'));

  function benchAria() {
    $$('.bars').forEach((bars) => {
      const rows = $$('.row', bars).map((r) => `${$('span', r).textContent} ${$('b', r).textContent.replace(/\s+/g, ' ').trim()}`);
      bars.setAttribute('aria-label', `${T('look.bm.aria', 'Median results: ')}${rows.join(', ')}. ${T('look.bm.lessb', 'Less is better.')}`);
    });
  }
  if ($('.bars')) { benchAria(); document.addEventListener('langchange', benchAria); }

  /* ---------- dialogs ---------- */
  $$('[data-open-dialog]').forEach((btn) => btn.addEventListener('click', () => {
    const dlg = document.getElementById(btn.dataset.openDialog);
    if (!dlg || !dlg.showModal) return;
    setSheet(false);
    dlg.showModal();
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => dlg.classList.add('is-open'));
  }));
  $$('dialog.modal').forEach((dlg) => {
    const close = () => { dlg.classList.remove('is-open'); setTimeout(() => { if (dlg.open) dlg.close(); }, 180); };
    $$('[data-close-dialog]', dlg).forEach((b) => b.addEventListener('click', close));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    dlg.addEventListener('close', () => { dlg.classList.remove('is-open'); document.body.classList.remove('no-scroll'); });
  });

  /* ---------- releases: Vetro Collection APK ---------- */
  const apkLink = $('#directApkDownload');
  if (apkLink) {
    const apkVersion = $('#apkVersionLabel'); const apkAction = $('#apkActionLabel'); const eyebrow = $('#downloadEyebrow');
    let rel = null;
    const renderApk = () => {
      if (!rel) return;
      [apkVersion, apkAction, eyebrow].forEach((el) => el.removeAttribute('data-i18n'));
      apkVersion.textContent = T('col.dl.apk.version', 'Direct APK · {tag}').replace('{tag}', rel.tag);
      eyebrow.textContent = T('col.dl.eyebrow.v', 'Android · version {v}').replace('{v}', rel.tag.replace(/^v/i, ''));
      apkAction.textContent = rel.mb ? T('col.dl.apk.mb', 'Download APK ({mb} MB)').replace('{mb}', rel.mb) : T('col.dl.apk.t', 'Download APK');
    };
    fetch('https://api.github.com/repos/Phnem/Vetro/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => {
        const assets = Array.isArray(data.assets) ? data.assets : [];
        const apk = assets.find((a) => /\.apk$/i.test(a.name || '')) || null;
        const tag = data.tag_name || data.name;
        if (apk && apk.browser_download_url) { apkLink.href = apk.browser_download_url; apkLink.setAttribute('download', apk.name || 'vetro.apk'); apkLink.removeAttribute('target'); }
        if (tag) { rel = { tag, mb: apk && apk.size ? (apk.size / 1048576).toFixed(1) : '' }; renderApk(); }
      })
      .catch(() => { /* keeps the GitHub releases link */ });
    document.addEventListener('langchange', renderApk);
  }

  /* ---------- releases: VetroLook MSI ---------- */
  const lookBtn = $('#lookPrimaryDownload');
  if (lookBtn) {
    const action = $('#lookDownloadAction'); const version = $('#lookDownloadVersion'); const format = $('#lookDownloadFormat');
    const relLink = $('#lookReleaseLink'); const sumLink = $('#lookChecksumLink');
    const fallback = 'https://github.com/Phnem/VetroLook/releases';
    let st = { kind: 'checking' };
    const size = (b) => { if (!Number.isFinite(b) || b <= 0) return ''; const u = ['B', 'KB', 'MB', 'GB']; const i = Math.min(Math.floor(Math.log(b) / Math.log(1024)), 3); return `${(b / 1024 ** i).toFixed(i > 1 ? 1 : 0)} ${u[i]}`; };
    const render = () => {
      if (st.kind === 'checking') return;
      [action, version, format].forEach((el) => el.removeAttribute('data-i18n'));
      if (st.kind === 'error') {
        action.textContent = T('look.dl.soon', 'MSI coming soon');
        version.textContent = T('look.dl.latestgh', 'Latest release on GitHub');
        format.textContent = T('look.dl.auto', 'MSI will download automatically when available');
        return;
      }
      version.textContent = T('look.dl.latest', 'Latest: {tag}').replace('{tag}', st.tag);
      if (st.kind === 'nomsi') {
        action.textContent = T('look.dl.soon', 'MSI coming soon');
        format.textContent = T('look.dl.msi.prep', 'MSI release is being prepared');
      } else {
        action.textContent = T('look.dl.get', 'Download MSI');
        format.textContent = T('look.dl.msi', 'MSI · {size}').replace('{size}', st.size);
      }
    };
    const unavailable = () => { lookBtn.href = '#download-status'; lookBtn.removeAttribute('target'); lookBtn.removeAttribute('download'); lookBtn.setAttribute('aria-disabled', 'true'); lookBtn.classList.add('is-unavailable'); };
    fetch('https://api.github.com/repos/Phnem/VetroLook/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((rel) => {
        const url = rel.html_url || fallback;
        relLink.href = url; sumLink.href = url;
        const msi = (rel.assets || []).find((a) => /\.msi$/i.test(a.name));
        if (!msi) { unavailable(); st = { kind: 'nomsi', tag: rel.tag_name || 'release' }; return; }
        lookBtn.href = msi.browser_download_url; lookBtn.removeAttribute('target'); lookBtn.setAttribute('download', ''); lookBtn.removeAttribute('aria-disabled'); lookBtn.classList.remove('is-unavailable');
        st = { kind: 'ok', tag: rel.tag_name || 'release', size: size(msi.size) };
      })
      .catch(() => { unavailable(); st = { kind: 'error' }; })
      .finally(render);
    document.addEventListener('langchange', render);
  }

  /* ---------- init ---------- */
  document.documentElement.classList.add('js');
  onScroll();
})();
