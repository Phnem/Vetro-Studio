/* Vetro API: buying a key on the site. Four steps (plan, project, terms + signature, payment) and a result view.
   - Plan switch: rebuilt in plain JS from designbookmark.com/motion#db-plan-switch. The springs are the numbers of its
     shared/tokens.css (--spring-lead 620 36, --spring-trail 190 19, --spring-pop 520 16, --spring-fade 420 32): the edge
     of the highlight that leads is stiff, the one that trails is soft; the price rolls on digit drums.
   - Signature pad: rebuilt in plain JS from Kokonut UI's "signature-pad" (https://kokonutui.com, MIT, @dorianbaffier):
     the pen tip trails the pointer on a spring, the line width follows speed, strokes taper, clearing lifts the ink off.
   - Payment: Telegram Stars opens the bot. Card (Paddle) and USDT call the billing routes of the API Worker, which do not
     exist yet: BILLING.on stays false until they do. The contract of those routes is in docs/billing-front.md.
   Everything the user types or the server returns is written with textContent, never innerHTML. */
(() => {
  'use strict';

  const buy = document.getElementById('buy');
  if (!buy) return;
  const $ = (s, r = buy) => r.querySelector(s);
  const $$ = (s, r = buy) => Array.from(r.querySelectorAll(s));
  const T = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);
  const lang = () => (window.VetroI18n && window.VetroI18n.lang) || 'en';
  const fmtN = (n) => Number(n).toLocaleString(lang() === 'ru' ? 'ru-RU' : 'en-US');
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const API = 'https://api.vetrostudio.bid';
  const BOT = 'https://t.me/VetroBook_API_bot';
  const BILLING = { on: false };                                  // flips to true when POST /v1/billing/checkout exists

  const PLANS = {
    basic: { usd: 3, stars: 100, sec: 2, min: 30, day: 2000, max: '20 / 10', covers: false, index: false },
    pro: { usd: 7, stars: 400, sec: 5, min: 120, day: 20000, max: '50 / 40', covers: true, index: false },
    ultra: { usd: 12, stars: 1500, sec: 20, min: 600, day: 200000, max: '50 / 40', covers: true, index: true },
  };
  const ORDER = ['basic', 'pro', 'ultra'];
  const NAMES = { basic: 'Basic', pro: 'Pro', ultra: 'Ultra' };
  const state = { plan: 'pro', name: '', type: 'site', desc: '', domains: [], email: '', signer: '', signature: null, signedAt: null, termsVersion: '' };

  /* ==========================================================================
     A tiny spring engine (the shape of shared/motion.js of the reference)
     ========================================================================== */
  const S = (x, k = 400, c = 30) => ({ x, v: 0, t: x, k, c });
  const tune = (s, [k, c]) => { s.k = k; s.c = reduce ? 2 * Math.sqrt(k) : c; };
  const step = (s, dt) => { s.v += (-s.k * (s.x - s.t) - s.c * s.v) * dt; s.x += s.v * dt; };
  const resting = (s) => Math.abs(s.x - s.t) < 0.002 && Math.abs(s.v) < 0.02;
  const SPR = { lead: [620, 36], trail: [190, 19], pop: [520, 16], fade: [420, 32], soft: [260, 24] };

  const comps = []; let raf = 0; let last = 0;
  function loop(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now;
    let busy = false;
    comps.forEach((c) => { for (let k = 0; k < 4; k += 1) c.frame(dt / 4); c.render(); busy = busy || c.busy(); });
    if (busy && !document.hidden) raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  document.addEventListener('visibilitychange', kick);

  // a line of text that rolls: the old one leaves upwards, the new one comes from below
  function line(node, h = 20) {
    let items = []; let cur = null;
    return {
      set(key, text, snap) {
        if (key === cur) return;
        if (snap) { items.forEach((o) => o.el.remove()); items = []; cur = null; }     // a language change swaps the text at once
        items.forEach((o) => { o.y.t = -h; o.o.t = 0; o.dead = true; });
        const sp = document.createElement('span'); sp.textContent = text; node.appendChild(sp);
        const o = { el: sp, y: S(cur == null ? 0 : h), o: S(cur == null ? 1 : 0) };
        tune(o.y, SPR.fade); tune(o.o, SPR.fade); o.y.t = 0; o.o.t = 1; items.push(o); cur = key; kick();
      },
      frame(dt) { items.forEach((o) => { step(o.y, dt); step(o.o, dt); }); items = items.filter((o) => { if (o.dead && o.o.x < 0.02) { o.el.remove(); return false; } return true; }); },
      render() { items.forEach((o) => { o.el.style.transform = `translateY(${o.y.x.toFixed(2)}px)`; o.el.style.opacity = clamp(o.o.x, 0, 1).toFixed(3); }); },
      busy() { return items.some((o) => !resting(o.y) || !resting(o.o)); },
    };
  }

  // digit drums: every column rolls to its digit, one after another; a leading zero closes its column
  function roller(node, n, px) {
    const cols = [];
    for (let i = 0; i < n; i += 1) {
      const c = el('span', 'rc'); const s = el('span', 'rs');
      [...'0123456789'].forEach((d) => s.appendChild(el('i', null, d)));
      c.appendChild(s); node.appendChild(c);
      const y = S(0); y.k = 260; y.c = reduce ? 2 * Math.sqrt(260) : 22 + i * 2;
      const w = S(0.6); tune(w, SPR.soft);
      cols.push({ c, s, y, w });
    }
    let first = true;
    return {
      set(v) {
        const str = String(v).padStart(n, '0');
        cols.forEach((col, i) => {
          const go = () => { col.y.t = Number(str[i]); kick(); };
          col.w.t = (i === 0 && n > 1 && str[0] === '0') ? 0 : 0.6;
          if (first) { col.y.x = col.y.t = Number(str[i]); col.w.x = col.w.t; } else setTimeout(go, i * 45);
        });
        first = false; kick();
      },
      frame(dt) { cols.forEach((c) => { step(c.y, dt); step(c.w, dt); }); },
      render() { cols.forEach((c) => { c.s.style.transform = `translateY(${(-c.y.x * px).toFixed(2)}px)`; const w = Math.max(0, c.w.x); c.c.style.width = `${w.toFixed(3)}em`; c.c.style.opacity = clamp(w / 0.6, 0, 1).toFixed(3); }); },
      busy() { return cols.some((c) => !resting(c.y) || !resting(c.w)); },
    };
  }

  /* ==========================================================================
     Step 1: the plan switch
     ========================================================================== */
  const seg = $('.seg'); const hl = $('#hl'); const btns = $$('.seg button');
  const price = roller($('#price'), 2, 48);
  const pname = line($('#pname'), 26); const pbill = line($('#pbill'), 20); const pcta = line($('#pctaIn'), 48);
  const featLines = {}; $$('#pfeats [data-f]').forEach((n) => { featLines[n.dataset.f] = line(n, 22); });
  const chip = $('#pchip'); const cta = $('#pcta');
  const L = S(0); const R = S(0); const SV = S(1); const CP = S(1); tune(SV, SPR.pop); tune(CP, SPR.pop);
  let plan = null;

  const yesNo = (v) => (v ? T('api.pl.yes', 'yes') : T('api.pl.no', 'no'));
  function featureText(key, p) {
    const d = PLANS[p];
    if (key === 'covers' || key === 'index') return yesNo(d[key]);
    if (key === 'max') return d.max;
    return fmtN(d[key]);
  }
  function paint(p, snap) {
    const d = PLANS[p];
    pname.set(`${p}${lang()}`, NAMES[p], snap);
    pbill.set(`${p}${lang()}`, T('buy.bill', 'or {n} ⭐ in Telegram').replace('{n}', fmtN(d.stars)), snap);
    Object.keys(featLines).forEach((k) => featLines[k].set(`${k}${p}${lang()}`, featureText(k, p), snap));
    pcta.set(`cta${lang()}`, T('buy.cta', 'Continue'), snap);
    chip.textContent = `${fmtN(d.stars)} ⭐`;
    kick();
  }
  function place(first) {
    const b = btns.find((x) => x.dataset.plan === plan); if (!b) return;
    L.t = b.offsetLeft; R.t = b.offsetLeft + b.offsetWidth;
    if (first) { L.x = L.t; R.x = R.t; L.v = 0; R.v = 0; }
    kick();
  }
  function pick(p, first) {
    if (p === plan && !first) return;
    const prev = plan; plan = p; state.plan = p;
    btns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.plan === p)));
    const right = prev && ORDER.indexOf(p) > ORDER.indexOf(prev);        // moving right: the right edge leads
    tune(L, right ? SPR.trail : SPR.lead); tune(R, right ? SPR.lead : SPR.trail);
    place(first);
    price.set(PLANS[p].usd);
    if (!first) { SV.x = 0.3; SV.t = 1; }
    paint(p);
  }
  btns.forEach((b) => b.addEventListener('click', () => pick(b.dataset.plan)));
  seg.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const i = clamp(ORDER.indexOf(plan) + (e.key === 'ArrowRight' ? 1 : -1), 0, 2);
    pick(ORDER[i]); btns[i].focus();
  });
  cta.addEventListener('pointerdown', () => { CP.x = 0.94; CP.t = 1; kick(); });
  cta.addEventListener('click', () => go(2));
  if ('ResizeObserver' in window) new ResizeObserver(() => place(true)).observe(seg);

  comps.push({
    frame(dt) { [L, R, SV, CP].forEach((s) => step(s, dt)); price.frame(dt); pname.frame(dt); pbill.frame(dt); pcta.frame(dt); Object.values(featLines).forEach((f) => f.frame(dt)); },
    render() {
      hl.style.transform = `translateX(${L.x.toFixed(2)}px)`;
      hl.style.width = `${Math.max(36, R.x - L.x).toFixed(2)}px`;
      price.render(); pname.render(); pbill.render(); pcta.render(); Object.values(featLines).forEach((f) => f.render());
      const sv = Math.max(0, SV.x); chip.style.transform = `scale(${sv.toFixed(4)})`; chip.style.opacity = clamp(sv * 1.4, 0, 1).toFixed(3);
      cta.style.transform = `scale(${CP.x.toFixed(4)})`;
    },
    busy() {
      return [L, R, SV, CP].some((s) => !resting(s)) || price.busy() || pname.busy() || pbill.busy() || pcta.busy() || Object.values(featLines).some((f) => f.busy());
    },
  });

  /* ==========================================================================
     Steps and navigation
     ========================================================================== */
  const panes = $$('.buy-pane'); const stepLis = $$('#buySteps li');
  let current = 1;
  function go(n, scroll = true) {
    current = n;
    panes.forEach((p) => { p.hidden = Number(p.dataset.pane) !== n; });
    stepLis.forEach((li) => { const s = Number(li.dataset.s); li.classList.toggle('is-on', s === n); li.classList.toggle('is-done', s < n); });
    $('#buySteps').hidden = n === 5;
    if (n === 1) { place(true); paint(plan); }
    if (n === 3) ensureTerms();
    if (n === 4) renderSummary();
    if (scroll) buy.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-back]').forEach((b) => b.addEventListener('click', () => go(Math.max(1, current - 1))));

  /* ---------- step 2: the project ---------- */
  const f = { name: $('#fName'), type: $('#fType'), desc: $('#fDesc'), domains: $('#fDomains'), domainsWrap: $('#fDomainsWrap'), email: $('#fEmail') };
  const showErr = (input, msgKey, fb) => { const e = input.closest('.fld').querySelector('.err'); e.textContent = msgKey ? T(msgKey, fb) : ''; input.setAttribute('aria-invalid', msgKey ? 'true' : 'false'); return !msgKey; };
  const HOST = /^(?=.{1,253}$)([a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;
  const parseDomains = (raw) => [...new Set(raw.split(/[\s,;]+/).map((s) => s.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/:\d+$/, '')).filter(Boolean))];
  const syncType = () => { f.domainsWrap.hidden = f.type.value !== 'site'; };
  f.type.addEventListener('change', syncType); syncType();

  function validateProject() {
    let ok = true;
    ok = showErr(f.name, f.name.value.trim().length < 2 ? 'buy.e.name' : '', 'Give the project a name.') && ok;
    ok = showErr(f.desc, f.desc.value.trim().length < 10 ? 'buy.e.desc' : '', 'Say in a sentence what it does.') && ok;
    ok = showErr(f.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? '' : 'buy.e.email', 'Enter a valid e-mail.') && ok;
    if (f.type.value === 'site') {
      const list = parseDomains(f.domains.value);
      ok = showErr(f.domains, list.length && list.every((d) => HOST.test(d)) ? '' : 'buy.e.domains', 'Enter at least one domain, such as example.com.') && ok;
    }
    return ok;
  }
  $('#fProject').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateProject()) { const bad = $('[aria-invalid="true"]', $('#fProject')); if (bad) bad.focus(); return; }
    state.name = f.name.value.trim(); state.type = f.type.value; state.desc = f.desc.value.trim(); state.email = f.email.value.trim();
    state.domains = state.type === 'site' ? parseDomains(f.domains.value) : [];
    go(3);
  });

  /* ---------- step 3: the terms and the signature ---------- */
  const box = $('#termsBox'); const verEl = $('#termsVer');
  let termsPromise = null;
  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  function ensureTerms() {
    if (termsPromise) return termsPromise;
    termsPromise = fetch('api-docs.html', { credentials: 'omit' }).then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(async (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const src = doc.getElementById('terms'); if (!src) throw new Error('no terms');
        // the version is the hash of the English source text, so it does not depend on the page language
        state.termsVersion = (await sha256(src.textContent.replace(/\s+/g, ' ').trim())).slice(0, 12);
        verEl.textContent = state.termsVersion;
        const copy = document.importNode(src, true);
        const h = copy.querySelector('h2'); if (h) h.remove();
        copy.removeAttribute('id');
        copy.querySelectorAll('details').forEach((d) => { d.open = true; });
        box.textContent = ''; box.appendChild(copy);
        if (window.VetroI18n) window.VetroI18n.apply(box);
        refreshNext3();
      })
      .catch(() => { termsPromise = null; box.textContent = T('buy.terms.fail', 'The terms could not be loaded here. Open them in a new tab, read them, then come back.'); });
    return termsPromise;
  }

  // ---- the signature pad (Kokonut UI, MIT; the numbers are the original's) ----
  function signaturePad(root, onChange) {
    const STEP = 1 / 240; const TIP_K = 2600; const TIP_C = 78; const MAX_W = 3.6; const MIN_W = 1.1; const SPEED_MIN = 1800; const W_EASE = 0.08;
    const MIN_GAP = 0.6; const TAPER = 7; const CLEAR_MS = 420; const INK = '#1e3a8a';
    root.textContent = '';
    const area = el('div', 'sig-area'); const rule = el('div', 'sig-rule'); rule.setAttribute('aria-hidden', 'true');
    const x = el('span', 'sig-x', '×'); const hint = el('span', 'sig-hint', T('buy.sign.here', 'Sign here')); hint.dataset.i18n = 'buy.sign.here'; rule.append(x, hint);
    const canvas = document.createElement('canvas'); canvas.className = 'sig-canvas'; canvas.tabIndex = 0; canvas.setAttribute('role', 'img');
    area.append(rule, canvas);
    const foot = el('div', 'sig-foot'); const status = el('p', 'sig-status'); status.setAttribute('aria-live', 'polite');
    const tools = el('div', 'sig-tools'); const undoB = el('button', 'sig-b', T('buy.undo', 'Undo')); const clearB = el('button', 'sig-b', T('buy.clear', 'Clear'));
    undoB.type = 'button'; clearB.type = 'button'; undoB.dataset.i18n = 'buy.undo'; clearB.dataset.i18n = 'buy.clear'; tools.append(undoB, clearB); foot.append(status, tools);
    root.append(area, foot);

    const s = { strokes: [], painted: 0, held: false, pressure: 0.5, usesPressure: false, tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0, width: MAX_W, raf: 0, last: 0, carry: 0, clearing: false, w: 0, h: 0 };
    const ctx = () => { const c = canvas.getContext('2d'); if (c) c.fillStyle = INK; return c; };
    const tapered = (st, i, open) => { const n = st.length; const a = Math.min(1, (i + 1) / TAPER); const b = open ? 1 : Math.min(1, (n - i) / TAPER); return st[i].w * (0.35 + 0.65 * Math.min(a, b)); };
    function quad(c, pts) {
      let area2 = 0;
      for (let k = 0; k < 8; k += 2) { const j = (k + 2) % 8; area2 += pts[k] * pts[j + 1] - pts[j] * pts[k + 1]; }
      const o = area2 >= 0 ? [0, 2, 4, 6] : [6, 4, 2, 0];
      c.moveTo(pts[o[0]], pts[o[0] + 1]);
      for (let k = 1; k < 4; k += 1) c.lineTo(pts[o[k]], pts[o[k] + 1]);
      c.closePath();
    }
    function paintStroke(c, st, from, to, open) {
      c.beginPath();
      for (let i = Math.max(from, 0); i < to; i += 1) {
        const p = st[i]; const w = st.length === 1 && !open ? p.w * 0.8 : tapered(st, i, open);
        if (i > 0) {
          const q = st[i - 1]; const qw = tapered(st, i - 1, open); const dx = p.x - q.x; const dy = p.y - q.y; const len = Math.hypot(dx, dy) || 1; const nx = -dy / len; const ny = dx / len;
          quad(c, [q.x + (nx * qw) / 2, q.y + (ny * qw) / 2, p.x + (nx * w) / 2, p.y + (ny * w) / 2, p.x - (nx * w) / 2, p.y - (ny * w) / 2, q.x - (nx * qw) / 2, q.y - (ny * qw) / 2]);
        }
        c.moveTo(p.x + w / 2, p.y); c.arc(p.x, p.y, w / 2, 0, Math.PI * 2);
      }
      c.fill();
    }
    function toSvg() {
      const paths = s.strokes.map((st) => {
        if (st.length === 1) return `<circle cx="${st[0].x.toFixed(1)}" cy="${st[0].y.toFixed(1)}" r="${(st[0].w * 0.4).toFixed(2)}"/>`;
        const left = []; const right = [];
        for (let i = 0; i < st.length; i += 1) {
          const p = st[i]; const q = st[Math.max(i - 1, 0)]; const r = st[Math.min(i + 1, st.length - 1)];
          const dx = r.x - q.x; const dy = r.y - q.y; const len = Math.hypot(dx, dy) || 1; const w = tapered(st, i, false) / 2;
          left.push(`${(p.x - (dy / len) * w).toFixed(1)} ${(p.y + (dx / len) * w).toFixed(1)}`);
          right.push(`${(p.x + (dy / len) * w).toFixed(1)} ${(p.y - (dx / len) * w).toFixed(1)}`);
        }
        return `<path d="M${left.join('L')}L${right.reverse().join('L')}Z"/>`;
      }).join('');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.round(s.w)} ${Math.round(s.h)}" fill="${INK}">${paths}</svg>`;
    }
    function redraw(fraction = 1) {
      const c = ctx(); if (!c) return;
      c.clearRect(0, 0, s.w, s.h);
      const total = s.strokes.reduce((sum, st) => sum + st.length, 0); let budget = Math.round(total * fraction);
      for (let k = 0; k < s.strokes.length && budget > 0; k += 1) { const st = s.strokes[k]; paintStroke(c, st, 0, Math.min(st.length, budget), s.held && k === s.strokes.length - 1); budget -= st.length; }
    }
    function emit() {
      const n = s.strokes.length;
      hint.style.opacity = n || s.held ? '0' : '1';
      status.textContent = n ? T('buy.signed', 'Signed') : T('buy.draw', 'Draw your signature');
      canvas.setAttribute('aria-label', `${T('buy.sig.label', 'Signature')}${n ? `, ${n}` : `, ${T('buy.empty', 'empty')}`}`);
      undoB.disabled = !n || s.clearing; clearB.disabled = !n || s.clearing;
      onChange(n ? toSvg() : null);
    }
    function fit() {
      const rect = area.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 3);
      if (!rect.width) return;                                          // the pane is hidden: fit again when it shows
      s.w = rect.width; s.h = rect.height; canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
      const c = canvas.getContext('2d'); if (c) c.setTransform(dpr, 0, 0, dpr, 0, 0); redraw();
    }
    function stepPen() {
      const ax = (s.tx - s.x) * TIP_K - s.vx * TIP_C; const ay = (s.ty - s.y) * TIP_K - s.vy * TIP_C;
      s.vx += ax * STEP; s.vy += ay * STEP; s.x += s.vx * STEP; s.y += s.vy * STEP;
      const speed = Math.hypot(s.vx, s.vy); const pressure = s.usesPressure ? 0.45 + s.pressure * 0.9 : 1;
      const goal = (MAX_W - (MAX_W - MIN_W) * clamp(speed / SPEED_MIN, 0, 1)) * pressure; s.width += (goal - s.width) * W_EASE;
      const st = s.strokes[s.strokes.length - 1]; const prev = st && st[st.length - 1];
      if (st && prev && Math.hypot(s.x - prev.x, s.y - prev.y) >= MIN_GAP) st.push({ x: s.x, y: s.y, w: s.width });
      return speed;
    }
    function stopSettling() { if (!s.raf) return false; cancelAnimationFrame(s.raf); s.raf = 0; s.last = 0; s.carry = 0; return true; }
    function tick(now) {
      s.raf = 0;
      const elapsed = s.last ? Math.min((now - s.last) / 1000, 0.05) : STEP; s.last = now; s.carry += elapsed;
      let speed = 0;
      while (s.carry >= STEP) { speed = stepPen(); s.carry -= STEP; }
      const c = ctx(); const st = s.strokes[s.strokes.length - 1];
      if (c && st) { paintStroke(c, st, s.painted - 1, st.length, true); s.painted = st.length; }
      const caughtUp = Math.hypot(s.tx - s.x, s.ty - s.y) < 0.3 && speed < 5;
      if (s.held || !caughtUp) { s.raf = requestAnimationFrame(tick); return; }
      s.last = 0; redraw(); emit();
    }
    const local = (e) => { const r = area.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    canvas.addEventListener('pointerdown', (e) => {
      if (s.clearing || (e.pointerType === 'mouse' && e.button !== 0)) return;
      e.preventDefault(); canvas.setPointerCapture(e.pointerId);
      if (stopSettling()) emit();
      const p = local(e); s.held = true; s.usesPressure = e.pointerType === 'pen'; s.pressure = e.pressure || 0.5;
      s.x = p.x; s.y = p.y; s.tx = p.x; s.ty = p.y; s.vx = 0; s.vy = 0; s.width = MAX_W;
      s.strokes.push([{ x: p.x, y: p.y, w: MAX_W }]); s.painted = 0; redraw(); hint.style.opacity = '0';
      s.raf = requestAnimationFrame(tick);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!s.held) return;
      const p = local(e); s.tx = p.x; s.ty = p.y; if (s.usesPressure) s.pressure = e.pressure;
      if (reduce) { s.x = p.x; s.y = p.y; s.vx = 0; s.vy = 0; }       // no trailing tip: the ink goes where the pointer is
    });
    const up = () => { if (!s.held) return; s.held = false; if (!s.raf) s.raf = requestAnimationFrame(tick); };
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => canvas.addEventListener(ev, up));
    function undo() { if (s.held || s.clearing || !s.strokes.length) return; stopSettling(); s.strokes.pop(); redraw(); emit(); }
    function clear() {
      if (s.held || s.clearing || !s.strokes.length) return;
      stopSettling();
      const done = () => { s.strokes = []; s.clearing = false; redraw(); emit(); };
      if (reduce) { done(); return; }
      s.clearing = true; undoB.disabled = true; clearB.disabled = true;
      const start = performance.now();
      const frame = (now) => {
        const t = clamp((now - start) / CLEAR_MS, 0, 1); const eased = t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
        redraw(1 - eased);
        if (t < 1) s.raf = requestAnimationFrame(frame); else { s.raf = 0; done(); }
      };
      s.raf = requestAnimationFrame(frame);
    }
    undoB.addEventListener('click', undo); clearB.addEventListener('click', clear);
    root.addEventListener('keydown', (e) => {
      if (e.key === 'z' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); undo(); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); clear(); }
    });
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(area); else fit();
    emit();
    return { refresh: emit };
  }

  const agree = $('#fAgree'); const signer = $('#fSigner'); const next3 = $('#next3');
  const pad = signaturePad($('#sigPad'), (svg) => { state.signature = svg; refreshNext3(); });
  function refreshNext3() { next3.disabled = !(agree.checked && signer.value.trim().length >= 2 && state.signature && state.termsVersion); }
  agree.addEventListener('change', refreshNext3); signer.addEventListener('input', refreshNext3);
  next3.addEventListener('click', () => { state.signer = signer.value.trim(); state.signedAt = new Date().toISOString(); go(4); });

  /* ---------- step 4: payment ---------- */
  function renderSummary() {
    const d = PLANS[state.plan]; const sum = $('#buySum'); sum.textContent = '';
    const row = (k, v) => { const wrap = el('div'); wrap.append(el('dt', null, k), el('dd', null, v)); sum.append(wrap); };
    row(T('buy.sum.plan', 'Plan'), `${NAMES[state.plan]} · $${d.usd} / ${T('buy.sum.30', '30 days')}`);
    row(T('buy.name', 'Project name'), state.name);
    if (state.domains.length) row(T('buy.sum.dom', 'Domains'), state.domains.join(', '));
    row(T('buy.email.s', 'E-mail'), state.email);
    row(T('buy.sum.sign', 'Signed by'), `${state.signer} · ${new Date(state.signedAt).toLocaleString(lang() === 'ru' ? 'ru-RU' : 'en-GB')}`);
    $$('.pay-opt').forEach((b) => { const m = b.dataset.method; const off = m !== 'stars' && !BILLING.on; b.disabled = off; $('.tag', b).hidden = !off; });
    $('#payMsg').hidden = true; $('#payExtra').hidden = true;
  }
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function agreementFile() {
    const d = PLANS[state.plan];
    const rows = [['Service', 'Vetro API'], ['Plan', `${NAMES[state.plan]}, $${d.usd} for 30 days`], ['Project', state.name], ['Type', state.type], ['Description', state.desc], ['Domains', state.domains.join(', ') || '-'], ['E-mail', state.email], ['Signed by', state.signer], ['Signed at (UTC)', state.signedAt], ['Terms version', `${state.termsVersion} (hash of the English text of ${location.origin}/api-docs.html#terms)`], ['Language', lang()]];
    const html = `<!doctype html><meta charset="utf-8"><title>Vetro API: agreement</title><body style="font:16px/1.5 system-ui;max-width:640px;margin:40px auto;padding:0 16px"><h1>Vetro API: accepted terms of use</h1><table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table><h2>Signature</h2><div style="border:1px solid #999;padding:8px;max-width:420px">${state.signature || ''}</div><p style="color:#666">This file is your own copy. It is not stored on the site unless an order was created.</p></body>`;
    return new Blob([html], { type: 'text/html' });
  }
  $('#dlCopy').addEventListener('click', () => {
    const a = el('a'); a.href = URL.createObjectURL(agreementFile()); a.download = `vetro-api-agreement-${state.signedAt.slice(0, 10)}.html`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
  const msg = (key, fb, bad) => { const m = $('#payMsg'); m.textContent = T(key, fb); m.classList.toggle('is-bad', !!bad); m.hidden = false; };
  async function checkout(method) {
    msg('buy.pay.wait', 'Creating the order…');
    try {
      const r = await fetch(`${API}/v1/billing/checkout`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: state.plan, method, lang: lang(), email: state.email, project: { name: state.name, type: state.type, description: state.desc, domains: state.domains }, contract: { signer: state.signer, signedAt: state.signedAt, termsVersion: state.termsVersion, signatureSvg: state.signature } }),
      });
      if (!r.ok) throw new Error(r.status);
      const data = await r.json();
      if (typeof data.url !== 'string' || !/^https:\/\//i.test(data.url)) throw new Error('bad url');
      location.assign(data.url);
    } catch (e) { msg('buy.pay.fail', 'The order could not be created. Try again in a moment, or pay in Telegram.', true); }
  }
  $$('.pay-opt').forEach((b) => b.addEventListener('click', () => {
    const m = b.dataset.method;
    if (m === 'stars') {
      window.open(`${BOT}?start=plan_${state.plan}`, '_blank', 'noopener');
      msg('buy.pay.stars', 'The bot is open in a new tab: choose the plan there and pay in Stars. Keep a copy of what you signed here.');
      $('#payExtra').hidden = false;
    } else if (BILLING.on) checkout(m);
  }));

  /* ---------- the result: ?order=<id> after a payment ---------- */
  function showOrder(id) {
    go(5, false);
    const title = $('#ordT'); const text = $('#ordD'); const keyBox = $('#keyBox'); let tries = 0;
    const set = (tk, tf, dk, df) => { title.textContent = T(tk, tf); text.textContent = T(dk, df); };
    set('buy.ord.wait', 'Waiting for the payment…', 'buy.ord.waitd', 'The key appears here as soon as the payment is confirmed. This usually takes a few seconds.');
    const poll = async () => {
      tries += 1;
      try {
        const r = await fetch(`${API}/v1/billing/order/${encodeURIComponent(id)}`);
        const data = r.ok ? await r.json() : null;
        if (data && data.status === 'paid' && typeof data.key === 'string') {
          set('buy.ord.paid', 'Your key', 'buy.ord.paidd', 'Copy it now: it is shown once, and the service stores only its hash. Send it in an Authorization header.');
          $('#keyVal').textContent = data.key; keyBox.hidden = false;
          try { const u = new URL(location.href); u.searchParams.delete('order'); history.replaceState(null, '', u); } catch (e) { /* ignore */ }
          return;
        }
        if (data && data.status === 'failed') { set('buy.ord.fail', 'The payment did not go through', 'buy.ord.faild', 'No money was taken for this order. You can start again.'); return; }
      } catch (e) { /* network: try again */ }
      if (tries < 40) setTimeout(poll, 3000); else set('buy.ord.late', 'Still waiting', 'buy.ord.lated', 'The payment is not confirmed yet. Your key will be sent to your e-mail, or write to us with the order number.');
    };
    poll();
  }
  $('#keyCopy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#keyVal').textContent); $('#keyCopy').textContent = T('buy.copied', 'Copied'); } catch (e) { /* ignore */ } });

  document.addEventListener('langchange', () => { if (plan) paint(plan, true); if (current === 4) renderSummary(); pad.refresh(); });

  const params = new URLSearchParams(location.search);
  pick(PLANS[params.get('plan')] ? params.get('plan') : 'pro', true);
  const order = params.get('order');
  if (order && /^[\w-]{6,64}$/.test(order)) { showOrder(order); buy.scrollIntoView({ block: 'start' }); }
})();
