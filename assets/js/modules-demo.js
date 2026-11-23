/* Vetro Modules page: a grid of live cards (the layout of designbookmark.com/motion) for the frosted-glass and motion recipes.
   Spring numbers are the module's own (animation/SKILL.md, section 2): a spring is (ζ damping ratio, T period), mass 1,
   stiffness = (2π / T)², and UI code only ever picks a token by name. Glass numbers are frostedglass/SKILL.md.
   Every card runs only while on screen, stops when the tab is hidden, and under prefers-reduced-motion every spring is
   critically damped (ζ = 1: no overshoot) and the backdrop stands still. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const T = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const px = (v) => `${v.toFixed(2)}px`;

  /* ---------- the token table: [ζ, T in seconds] ---------- */
  const TOKENS = {
    springPressIn: [1.0, 0.08],
    springSnappy: [0.86, 0.2],
    springSurface: [0.88, 0.24],
    springObject: [0.92, 0.32],
    springExit: [1.0, 0.16],
    largeSurfaceEnter: [0.92, 0.46],
    largeSurfaceExit: [1.0, 0.3],
    menuPop: [0.72, 0.28],
    sheetDismissForced: [1.0, (2 * Math.PI) / Math.sqrt(700)],   // the table gives stiffness 700, not a period
    notificationArrive: [0.8, 0.38],
    notificationRebound: [0.78, 0.3],
    notificationFling: [1.0, 0.22],
    notificationReflow: [0.72, 0.34],                           // + 8 % of period for every slot further back
  };

  class Spring {
    constructor(x = 0, eps = 0.05) { this.x = x; this.to = x; this.v = 0; this.eps = eps; this.k = 1; this.c = 1; }
    tune([zeta, period], periodScale = 1) {
      const w = (2 * Math.PI) / (period * periodScale);        // stiffness k = w², damping c = 2ζw
      this.k = w * w; this.c = 2 * (reduce ? 1 : zeta) * w;
    }
    go(to, token, v = this.v, periodScale = 1) { this.to = to; this.v = v; this.tune(token, periodScale); }
    snap(x) { this.x = x; this.to = x; this.v = 0; }
    step(dt) {
      const n = Math.max(1, Math.ceil(dt / 0.004)); const h = dt / n;   // small sub-steps keep stiff springs stable
      for (let i = 0; i < n; i += 1) {
        this.v += (-this.k * (this.x - this.to) - this.c * this.v) * h;
        this.x += this.v * h;
      }
    }
    get rest() { return Math.abs(this.x - this.to) < this.eps && Math.abs(this.v) < this.eps * 20; }
  }

  /* ---------- helpers ---------- */
  const onScreen = (el, cb) => {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver((es) => es.forEach((e) => cb(e.isIntersecting)), { threshold: 0.1 }).observe(el);
  };

  // one frame loop per stage: runs while the stage is on screen and the tab is visible, sleeps when nothing moves
  function makeLoop(stage, tick) {
    let raf = 0; let last = 0; let vis = true;
    const frame = (now) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const slow = stage.dataset.slow === '4' ? 0.25 : 1;
      if (tick(dt * slow) && vis && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (raf || !vis || document.hidden) return; last = performance.now(); raf = requestAnimationFrame(frame); };
    onScreen(stage, (v) => { vis = v; if (v) kick(); });
    document.addEventListener('visibilitychange', kick);
    return kick;
  }

  /* ---------- the controls of a card: theme, slow motion, a still backdrop ---------- */
  $$('.mc').forEach((card) => {
    const stage = $('.gl-stage', card);
    if (!stage) return;
    onScreen(stage, (v) => { stage.dataset.vis = v ? '1' : '0'; });
    $$('.mc-b', card).forEach((b) => b.addEventListener('click', () => {
      const act = b.dataset.act;
      if (act === 'theme') stage.dataset.theme = stage.dataset.theme === 'dark' ? 'light' : 'dark';
      if (act === 'slow') { const on = stage.dataset.slow !== '4'; stage.dataset.slow = on ? '4' : '1'; b.setAttribute('aria-pressed', String(on)); }
      if (act === 'pause') { const on = stage.dataset.run !== 'still'; stage.dataset.run = on ? 'still' : 'on'; b.setAttribute('aria-pressed', String(on)); }
    }));
  });

  // the filter chips of the grid
  const filter = $('#mcFilter');
  if (filter) {
    filter.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-f]');
      if (!b) return;
      $$('button', filter).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $$('.mc').forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f; });
    });
  }

  /* ==========================================================================
     Frosted glass: eight layers, each can be switched off
     ========================================================================== */
  const glass = $('#glassStage');
  if (glass) {
    const chips = $$('.layer-chips button');
    const setLayer = (b, i, on) => { b.setAttribute('aria-pressed', String(on)); glass.style.setProperty(`--l${i + 1}`, on ? '1' : '0'); };
    chips.forEach((b, i) => b.addEventListener('click', () => setLayer(b, i, b.getAttribute('aria-pressed') !== 'true')));
  }

  /* ==========================================================================
     Motion: three patterns built only from the tokens, one card each
     ========================================================================== */
  /* --- A. a window out of a dock icon (container transform) --- */
  function dockPattern(pane, ctx) {
    const win = $('.mo-win', pane); const inner = $('.mo-win-in', pane);
    const icons = $$('.mo-icon', pane); const closeBtn = $('.mo-win-close', pane);
    const S = { l: new Spring(0), t: new Spring(0), w: new Spring(0), h: new Spring(0), r: new Spring(18) };
    const press = icons.map(() => new Spring(1, 0.0005));
    let open = false; let showing = false; let from = null; let timer = 0;

    const rect = (el) => { const a = pane.getBoundingClientRect(); const b = el.getBoundingClientRect(); return { l: b.left - a.left, t: b.top - a.top, w: b.width, h: b.height }; };
    const full = () => { const a = pane.getBoundingClientRect(); return { l: 12, t: 12, w: a.width - 24, h: a.height - 24 }; };
    const goTo = (rc, r, token) => { S.l.go(rc.l, token); S.t.go(rc.t, token); S.w.go(rc.w, token); S.h.go(rc.h, token); S.r.go(r, token); };

    function openFrom(icon) {
      const f = full(); from = rect(icon);
      if (!showing) {                                          // start exactly on the icon; a window still closing keeps its velocity
        S.l.snap(from.l); S.t.snap(from.t); S.w.snap(from.w); S.h.snap(from.h); S.r.snap(from.h / 2);
        showing = true; win.classList.add('is-vis');
      }
      inner.style.width = px(f.w); inner.style.height = px(f.h);   // content keeps its final size: only the shell changes
      open = true; ctx.note('largeSurfaceEnter'); goTo(f, 30, TOKENS.largeSurfaceEnter);
      clearTimeout(timer); timer = setTimeout(() => win.classList.add('is-in'), 200 / ctx.scale());   // content after the shell gained area
      ctx.kick();
    }
    function close() {
      if (!open) return;
      open = false; clearTimeout(timer); win.classList.remove('is-in');   // on exit the content fades first
      ctx.note('largeSurfaceExit'); goTo(from, from.h / 2, TOKENS.largeSurfaceExit); ctx.kick();
    }

    icons.forEach((icon, i) => {
      const down = () => { press[i].go(0.9, TOKENS.springPressIn); ctx.note('springPressIn'); ctx.kick(); };
      const up = () => { press[i].go(1, TOKENS.springSnappy); ctx.kick(); };
      icon.addEventListener('pointerdown', down);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => icon.addEventListener(ev, up));
      icon.addEventListener('click', () => openFrom(icon));
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) close(); });

    return {
      tick(dt) {
        let busy = false;
        Object.values(S).forEach((s) => { s.step(dt); busy = busy || !s.rest; });
        press.forEach((p, i) => { p.step(dt); icons[i].style.transform = `scale(${p.x.toFixed(4)})`; busy = busy || !p.rest; });
        if (showing) {
          win.style.left = px(S.l.x); win.style.top = px(S.t.x);
          win.style.width = px(Math.max(0, S.w.x)); win.style.height = px(Math.max(0, S.h.x));
          win.style.borderRadius = px(Math.max(0, S.r.x));
          if (!open && S.w.rest && S.h.rest) { showing = false; win.classList.remove('is-vis', 'is-in'); }
        }
        return busy;
      },
      reset() {},
    };
  }

  /* --- B. the "…" popover: it grows out of the corner, nothing fades but the rows --- */
  function popPattern(pane, ctx) {
    const btn = $('.mo-more', pane); const panel = $('.mo-pop', pane);
    const W = 232; const H = 204;
    const P = new Spring(0, 0.0004);
    let open = false; let timer = 0;

    function toggle(force) {
      open = force === undefined ? !open : force;
      clearTimeout(timer);
      if (open) {
        ctx.note('menuPop'); P.go(1, TOKENS.menuPop); panel.classList.add('is-vis');
        timer = setTimeout(() => panel.classList.add('is-in'), 60 / ctx.scale());
      } else {
        ctx.note('sheetDismissForced'); P.go(0, TOKENS.sheetDismissForced); panel.classList.remove('is-in');
      }
      btn.setAttribute('aria-expanded', String(open)); ctx.kick();
    }
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
    pane.addEventListener('click', (e) => { if (open && !e.target.closest('.mo-pop')) toggle(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) toggle(false); });

    return {
      tick(dt) {
        P.step(dt);
        const p = Math.max(0, P.x);                            // overshoots a few percent on open: ζ = 0.72
        panel.style.width = px(W * p); panel.style.height = px(H * p);
        if (!open && p < 0.001 && P.rest) panel.classList.remove('is-vis', 'is-in');
        return !P.rest;
      },
      reset() { panel.style.width = '0px'; panel.style.height = '0px'; },
    };
  }

  /* --- C. a notification stack: arrive, fling, reflow as a wave (no timers) --- */
  function stackPattern(pane, ctx) {
    const box = $('.mo-stack', pane); const addBtn = $('.mo-add', pane); const dismissBtn = $('.mo-dismiss', pane);
    const MSG = [
      ['mod.demo.n1', 'Download finished', 'mod.demo.n1d', 'The chunk queue verified the file.'],
      ['mod.demo.n2', 'New episode', 'mod.demo.n2d', 'Episode 12 is out.'],
      ['mod.demo.n3', 'Sync complete', 'mod.demo.n3d', '12 titles updated.'],
      ['mod.demo.n4', 'Bedtime', 'mod.demo.n4d', 'The sleep timer ends this chapter.'],
      ['mod.demo.n5', 'Update ready', 'mod.demo.n5d', 'A new version is waiting.'],
    ];
    const MAX = 5;
    const plates = []; const leaving = [];
    let seq = 0; let drag = null;
    const width = () => box.clientWidth;

    const fill = (p) => { p.b.textContent = T(p.m[0], p.m[1]); p.s.textContent = T(p.m[2], p.m[3]); };
    function make(y) {
      const el = document.createElement('div'); el.className = 'mo-plate gl-surface is-note';
      const b = document.createElement('b'); const s = document.createElement('span'); el.append(b, s);
      const p = { el, b, s, m: MSG[seq % MSG.length], y: new Spring(y), x: new Spring(0), slot: new Spring(0, 0.003) };
      seq += 1; fill(p); box.append(el); return p;
    }
    function render(p, i) {
      const sl = Math.max(0, p.slot.x);
      p.el.style.transform = `translate(${px(p.x.x)}, ${px(p.y.x + 12 * sl)}) scale(${(1 - 0.045 * sl).toFixed(4)})`;
      p.el.style.zIndex = String(50 - Math.max(i, 0));
      p.el.style.visibility = sl > 4.6 ? 'hidden' : '';
      const o = String(clamp(1 - 1.4 * sl, 0, 1));            // text of plates behind fades; the glass never does
      p.b.style.opacity = o; p.s.style.opacity = o;
      p.el.classList.toggle('is-under', i > 0);                // a plate lying under the top one is the opaque stacked material
    }

    function add() {
      const p = make(-140); plates.unshift(p);
      p.y.go(0, TOKENS.notificationArrive); ctx.note('notificationArrive');
      plates.forEach((q, i) => { if (i > 0) q.slot.go(i, TOKENS.notificationReflow, q.slot.v, 1 + 0.08 * Math.min(i - 1, 6)); });
      while (plates.length > MAX) { plates.pop().el.remove(); }
      ctx.kick();
    }
    function dismiss(p, v) {
      const i = plates.indexOf(p);
      if (i < 0) return;
      const dir = (p.x.x || v) < 0 ? -1 : 1;
      plates.splice(i, 1); leaving.push(p);
      p.x.go(dir * (width() + 80), TOKENS.notificationFling, v); ctx.note('notificationFling');   // the finger velocity is the initial condition
      // everyone behind moves up one slot; the longer period of each plate further back makes the wave, no timers
      plates.forEach((q, k) => { if (k >= i) q.slot.go(k, TOKENS.notificationReflow, q.slot.v, 1 + 0.08 * Math.min(k - i, 6)); });
      ctx.kick();
    }

    addBtn.addEventListener('click', add);
    dismissBtn.addEventListener('click', () => { if (plates[0]) dismiss(plates[0], 1500); });

    box.addEventListener('pointerdown', (e) => {
      const el = e.target.closest('.mo-plate');
      const p = plates[0];
      if (!el || !p || p.el !== el || drag) return;
      drag = { p, id: e.pointerId, x0: e.clientX - p.x.x, lx: e.clientX, lt: performance.now(), v: 0 };
      el.setPointerCapture(e.pointerId); el.classList.add('is-drag'); ctx.kick();
    });
    box.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const now = performance.now(); const dt = Math.max(1, now - drag.lt);
      drag.v = 0.8 * drag.v + 0.2 * (((e.clientX - drag.lx) / dt) * 1000);   // px/s, smoothed
      drag.lx = e.clientX; drag.lt = now;
      drag.p.x.x = e.clientX - drag.x0; drag.p.x.to = drag.p.x.x; drag.p.x.v = 0;
    });
    const release = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const { p, v } = drag; drag = null; p.el.classList.remove('is-drag');
      if (Math.abs(p.x.x) > 0.32 * width() || Math.abs(v) > 1000) dismiss(p, v);          // the two thresholds of the spec
      else { p.x.go(0, TOKENS.notificationRebound, v); ctx.note('notificationRebound'); }
      ctx.kick();
    };
    box.addEventListener('pointerup', release); box.addEventListener('pointercancel', release);

    document.addEventListener('langchange', () => { plates.concat(leaving).forEach(fill); });

    return {
      tick(dt) {
        let busy = !!drag;
        plates.forEach((p, i) => {
          if (!(drag && drag.p === p)) p.x.step(dt);
          p.y.step(dt); p.slot.step(dt);
          busy = busy || !(p.x.rest && p.y.rest && p.slot.rest);
          render(p, i);
        });
        leaving.slice().forEach((p) => {
          p.x.step(dt); p.y.step(dt); p.slot.step(dt); render(p, -1);
          if (Math.abs(p.x.x) >= width() + 40) { p.el.remove(); leaving.splice(leaving.indexOf(p), 1); } else busy = true;
        });
        return busy;
      },
      reset() {
        for (let i = 0; i < 3; i += 1) { const p = make(0); p.slot.snap(i); plates.push(p); render(p, i); }
      },
    };
  }

  const PATTERNS = { dock: dockPattern, pop: popPattern, stack: stackPattern };
  $$('.gl-stage[data-demo]').forEach((stage) => {
    const make = PATTERNS[stage.dataset.demo];
    const pane = $('.mo-pane', stage);
    if (!make || !pane) return;
    const token = $('.mc-token', stage.closest('.mc'));
    const ctx = {
      kick: () => {},
      scale: () => (stage.dataset.slow === '4' ? 0.25 : 1),
      note(name) { const [z, t] = TOKENS[name]; if (token) token.textContent = `${name} · ζ ${z.toFixed(2)} · T ${t.toFixed(3)} s`; },
    };
    const pattern = make(pane, ctx);
    ctx.kick = makeLoop(stage, (dt) => pattern.tick(dt));
    pattern.reset();
    ctx.kick();
  });
})();
