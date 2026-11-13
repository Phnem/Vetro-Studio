/* Vetro mascot on the site: mounts every [data-mascot="<scene>"] element.
   Needs assets/js/mascot-core.js (window.VetroMascot) loaded first. See docs/mascot.md.
     data-mascot="hello"        scene id (question, think, shrug, search, sad, hello, coffee)
     data-mascot-theme="light"  palette of the character (light | dark), chosen per panel, not by page theme
   The character is decorative (aria-hidden); the text next to it carries the meaning. */
(() => {
  'use strict';
  const M = window.VetroMascot;
  const nodes = Array.from(document.querySelectorAll('[data-mascot]'));
  if (!M || !nodes.length) return;

  const STILL = { question: 2, think: 2.5, shrug: 2, search: 1, sad: 4.6, hello: 1.5, coffee: 0.25 };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FRAME_MS = 1000 / 30;

  const mount = (el, i) => {
    const scene = el.dataset.mascot;
    if (!M.SCENES[scene]) return;
    const theme = el.dataset.mascotTheme === 'dark' ? 'dark' : 'light';
    const uid = `${scene}-${i}-${Math.random().toString(36).slice(2, 6)}`;
    const draw = (t, enter) => { M.setTheme(theme); el.innerHTML = M.sceneSvg(scene, t, 300, enter, uid); };
    el.setAttribute('aria-hidden', 'true');
    el.classList.add('is-mounted');

    if (reduceMotion) { draw(STILL[scene] ?? 1, 1); return; }

    let raf = 0; let t0 = 0; let last = 0;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME_MS) return;
      last = now;
      const s = (now - t0) / 1000;
      draw(Math.max(0, s - 0.5), Math.min(1, s / 0.5));          // 0.5 s entrance, then the loop
    };
    draw(STILL[scene] ?? 1, 1);                                   // something to see before the first frame
    new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { t0 = performance.now(); last = 0; raf = requestAnimationFrame(frame); }
    }, { rootMargin: '80px' }).observe(el);
  };

  window.VetroMascotMount = (el, i = 0) => mount(el, i);   // for panels created after load (empty/error states)
  nodes.forEach(mount);
})();
