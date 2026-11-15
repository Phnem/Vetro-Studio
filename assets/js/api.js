/* VetroBook API page: live search against api.vetrostudio.bid, book card dialog, number formatting, charts.
   Contract: docs/books-api.md. Everything that comes from the API is written with textContent, never innerHTML. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const T = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);
  const lang = () => (window.VetroI18n && window.VetroI18n.lang) || 'en';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmtN = (n) => Number(n).toLocaleString(lang() === 'ru' ? 'ru-RU' : 'en-US');
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  const API = 'https://api.vetrostudio.bid';
  const FALLBACK = 'https://vetro-books-api.1234idelchik.workers.dev';
  /* Site key (Ultra, permanent, bound to vetrostudio.bid, www.vetrostudio.bid and phnem.github.io). It is public by design:
     protected by the domain check, the daily quota and replacement, not by secrecy. Sent only to API/FALLBACK. See docs/api-key.md. */
  const KEY = 'vk_ultra_rq4dkgxrfnoo2vaple3t2w6wk546z5tp';
  const LIMIT = 30;
  let base = API;

  /* ---------- API ---------- */
  const get = (path, signal) => fetch(base + path, { signal, headers: { Authorization: `Bearer ${KEY}` } });
  async function api(path, signal) {
    let r;
    try { r = await get(path, signal); }
    catch (e) {
      if (e.name === 'AbortError' || base === FALLBACK) throw e;
      base = FALLBACK;                                  // the main domain did not answer: use the backup once
      r = await get(path, signal);
    }
    if (!r.ok) { const err = new Error(`http_${r.status}`); err.code = r.status; throw err; }
    return r.json();
  }
  // <img> cannot send headers, so covers take the key in the query string
  const coverUrl = (b, large) => ((b.f & 1) && b.cv) ? `${base}/covers/${large ? 'large' : 'small'}/${b.id}.avif?v=${b.cv}&key=${KEY}` : null;
  const title = (b) => (lang() === 'ru' ? b.ru || b.en : b.en || b.ru) || '—';
  const author = (b) => (lang() === 'ru' ? b.ra || b.ea : b.ea || b.ra) || '';
  const initial = (s) => (String(s).trim().match(/[\p{L}\p{N}]/u) || ['V'])[0].toUpperCase();

  /* ---------- query cleaning, typo correction, ranking ----------
     The server already normalises and transliterates the query and runs AND, then OR when little is found (docs/books-api.md).
     The page adds the rest: it cleans the query the same way, fixes typos against a vocabulary built from the answers it has
     seen (the server does not), and re-ranks the results by how well titles and authors match. */
  const SPECIAL = { 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ø': 'o', 'đ': 'd', 'ł': 'l', 'ð': 'd', 'þ': 'th', 'ı': 'i', 'ħ': 'h' };
  const norm = (s) => String(s == null ? '' : s).toLowerCase()
    .replace(/й/g, '\u0001')                                  // й stays a letter of its own (война ≠ воина)
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')        // diacritics off: é→e, ё→е
    .replace(/[ßæœøđłðþıħ]/g, (c) => SPECIAL[c])
    .replace(/\u0001/g, 'й')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();                 // anything that is not a letter or digit is one space
  const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
  const translit = (s) => s.replace(/[а-я]/g, (c) => TR[c]);
  const words = (s) => { const n = norm(s); return n ? n.split(' ') : []; };
  const prep = (raw) => words(raw).slice(0, 8).map((w) => w.slice(0, 40));

  // Damerau–Levenshtein distance (insert, delete, replace, swap of neighbours); gives up above `max`
  function dl(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    const d = [];
    for (let i = 0; i <= a.length; i += 1) d[i] = [i];
    for (let j = 1; j <= b.length; j += 1) d[0][j] = j;
    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }

  const vocab = new Map();                                    // word (and its transliteration) → number of books it was seen in
  function learn(list) {
    if (vocab.size > 60000) vocab.clear();
    list.forEach((b) => {
      const seen = new Set();
      [b.ru, b.en, b.ra, b.ea].forEach((t) => words(t).forEach((w) => { seen.add(w); seen.add(translit(w)); }));
      seen.forEach((w) => vocab.set(w, (vocab.get(w) || 0) + 1));
    });
  }
  const known = (w) => { for (const v of vocab.keys()) if (v.startsWith(w)) return true; return false; };
  function fixWord(w) {
    if (w.length < 4 || known(w)) return w;                  // short words are left alone; a known prefix counts as correct
    const max = w.length < 8 ? 1 : 2;
    let best = w; let bestD = max + 1; let bestC = 0;
    vocab.forEach((c, v) => {
      if (v[0] !== w[0] || v[1] !== w[1]) return;            // the first two letters must agree
      const d = Math.min(dl(w, v, max), v.length > w.length ? dl(w, v.slice(0, w.length), max) : max + 1);   // also vs. the start of a longer word
      if (d < bestD || (d === bestD && c > bestC)) { best = v; bestD = d; bestC = c; }
    });
    return bestD <= max ? best : w;
  }

  function titleScore(f, qw, qn, authorWords) {
    if (f === qn) return 1000;
    const tw = f ? f.split(' ') : [];
    let s = 0; let covered = 0;
    qw.forEach((w) => {
      if (tw.some((x) => x.startsWith(w))) { s += 100; covered += 1; if (tw.includes(w)) s += 20; }
      else if (authorWords.some((x) => x.startsWith(w))) { s += 60; covered += 1; }
    });
    if (qw.length && covered === qw.length) s += 200;
    s -= 5 * tw.filter((x) => !qw.some((w) => x.startsWith(w))).length;
    if (qn && f.startsWith(qn)) s += 50;
    return s;
  }
  function score(b, qw) {
    const qn = qw.join(' ');
    const authorWords = [];
    [b.ra, b.ea].forEach((t) => words(t).forEach((w) => authorWords.push(w, translit(w))));
    let best = -Infinity;
    [b.ru, b.en].forEach((t) => {
      const n = norm(t);
      if (n) [n, translit(n)].forEach((f) => { best = Math.max(best, titleScore(f, qw, qn, authorWords)); });
    });
    if (best === -Infinity) best = titleScore('', qw, qn, authorWords);
    return best + ((b.f & 1) ? 15 : 0) + ((b.f & 4) ? 10 : 0);
  }
  const rank = (list, qw) => list.map((b, i) => [score(b, qw), i, b]).sort((x, y) => y[0] - x[0] || x[1] - y[1]).map((x) => x[2]);
  const top = (list, qw) => (list.length ? score(list[0], qw) : -Infinity);

  /* ---------- search ---------- */
  const form = $('#searchForm'); const input = $('#q'); const grid = $('#results');
  const statusEl = $('#searchStatus'); const stateEl = $('#searchState');
  let items = []; let ctl = null; let timer = 0; let mounted = 0;
  let fix = null;                                             // { shown, orig } while results for a corrected query are on screen

  const mountMascot = (node) => { if (window.VetroMascotMount) window.VetroMascotMount(node, 100 + mounted++); };

  function showState(scene, titleKey, titleFb, textKey, textFb) {
    stateEl.textContent = '';
    const card = el('div', 'mascot-card');
    card.dataset.mascot = scene; card.dataset.mascotTheme = 'dark';
    const copy = el('div', 'state-copy');
    copy.append(el('h3', null, T(titleKey, titleFb)), el('p', null, T(textKey, textFb)));
    stateEl.append(card, copy);
    stateEl.hidden = false;
    mountMascot(card);
  }
  const hideState = () => { stateEl.hidden = true; stateEl.textContent = ''; };
  const setStatus = (t) => { statusEl.textContent = t || ''; };

  function makeCard(b) {
    const btn = el('button', 'book-card'); btn.type = 'button'; btn.dataset.id = b.id;
    const cov = el('span', 'book-cover');
    cov.append(el('span', 'book-ph', initial(title(b))));
    const src = coverUrl(b, false);
    if (src) {
      const img = new Image(); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.width = 200; img.height = 300; img.src = src;
      img.addEventListener('error', () => img.remove());
      cov.append(img);
    }
    const meta = [author(b), b.y].filter(Boolean).join(' · ');
    btn.append(cov, el('b', 'book-title', title(b)), el('span', 'book-meta', meta));
    btn.addEventListener('click', () => openBook(b, btn));
    return btn;
  }

  function renderResults() {
    grid.textContent = '';
    if (!items.length) {
      setStatus('');
      showState('search', 'api.empty.t', 'Nothing found', 'api.empty.d', 'Try another spelling. A title in the original language or just the author’s surname often works.');
      return;
    }
    hideState();
    let msg = T('api.found', 'Found: {n}').replace('{n}', fmtN(items.length));
    if (items.length >= LIMIT) msg += ` · ${T('api.more', 'showing the first {n}, refine the query to narrow it down').replace('{n}', LIMIT)}`;
    setStatus(msg);
    if (fix) {
      const f = fix;
      statusEl.append(` · ${T('api.fix', 'Showing results for “{q}”.').replace('{q}', f.shown)} `);
      const back = el('button', 'link-btn', T('api.fix.orig', 'Search for “{q}” instead').replace('{q}', f.orig));
      back.type = 'button';
      back.addEventListener('click', () => search(f.orig, true));
      statusEl.append(back);
    }
    const frag = document.createDocumentFragment();
    items.forEach((b) => frag.append(makeCard(b)));
    grid.append(frag);
  }

  function showLoading() {
    hideState(); setStatus(T('api.loading', 'Searching…'));
    grid.textContent = '';
    for (let i = 0; i < 8; i += 1) { const s = el('span', 'book-card is-skel'); s.append(el('span', 'book-cover'), el('b', 'book-title'), el('span', 'book-meta')); grid.append(s); }
  }

  async function run(qw, signal) {
    const data = await api(`/v1/search?q=${encodeURIComponent(qw.join(' '))}&limit=${LIMIT}`, signal);
    const list = Array.isArray(data.items) ? data.items : [];
    learn(list);
    return rank(list, qw);
  }

  async function search(raw, exact = false) {
    const q = raw.trim();
    if (ctl) ctl.abort();
    syncUrl(q);
    const qw = prep(raw);                                     // cleaned words: no punctuation, case or diacritics
    if (qw.join(' ').length < 2) {
      items = []; fix = null; grid.textContent = ''; hideState();
      setStatus(q ? T('api.short', 'Type at least 2 characters') : '');
      return;
    }
    ctl = new AbortController();
    showLoading();
    try {
      let list = await run(qw, ctl.signal);
      fix = null;
      // nothing found: a typo leaves no vocabulary to correct it from, so look up shortened words once, only to learn spellings
      if (!list.length && !exact) await run(qw.map((w) => (w.length >= 5 ? w.slice(0, w.length - 3) : w)), ctl.signal);
      if (!exact) {                                           // typos: check the words against what the answers have shown so far
        const fixed = qw.map(fixWord);
        if (fixed.some((w, i) => w !== qw[i])) {
          const alt = await run(fixed, ctl.signal);
          if (alt.length && top(alt, fixed) > top(list, qw)) { list = alt; fix = { shown: fixed.join(' '), orig: q }; }
        }
      }
      items = list;
      renderResults();
    } catch (e) {
      if (e.name === 'AbortError') return;
      grid.textContent = ''; setStatus('');
      if (e.code === 429) showState('think', 'api.rl.t', 'Too many requests', 'api.rl.d', 'The site’s request limit was reached. Wait a little and search again.');
      else if (e.code === 401 || e.code === 403) showState('question', 'api.auth.t', 'The catalogue refused the key', 'api.auth.d', 'The site’s access key was rejected. The key works only on vetrostudio.bid, so a copy of the page opened from another address (for example localhost) will not get results.');
      else showState('question', 'api.err.t', 'The catalogue did not answer', 'api.err.d', 'Check your connection and try again in a moment.');
    }
  }

  function syncUrl(q) {
    try {
      const u = new URL(location.href);
      if (q) u.searchParams.set('q', q); else u.searchParams.delete('q');
      history.replaceState(null, '', u);
    } catch (e) { /* history unavailable */ }
  }

  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => search(input.value), 300); });
  form.addEventListener('submit', (e) => { e.preventDefault(); clearTimeout(timer); search(input.value); });
  $$('.chip-ex').forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.q; clearTimeout(timer); search(b.dataset.q); }));
  const initialQ = new URLSearchParams(location.search).get('q');
  if (initialQ) { input.value = initialQ.slice(0, 120); search(input.value); }

  /* ---------- book card dialog ---------- */
  const dlg = $('#bookDialog');
  const nodes = { cover: $('#bookCover'), kind: $('#bookKind'), title: $('#bookTitle'), by: $('#bookBy'), chips: $('#bookChips'), secs: $('#bookSecs'), loading: $('#bookLoading'), links: $('#bookLinks') };
  const TYPES = { literary_work: ['Literary work', 'Произведение'], novel: ['Novel', 'Роман'], book_series: ['Book series', 'Серия книг'], short_story: ['Short story', 'Рассказ'], poem: ['Poem', 'Стихотворение'], audiobook: ['Audiobook', 'Аудиокнига'], non_fiction: ['Non-fiction', 'Нон-фикшен'] };
  const GENRES = { fantasy: ['Fantasy', 'Фэнтези'], scifi: ['Sci-fi', 'Фантастика'], adventure: ['Adventure', 'Приключения'], detective: ['Detective', 'Детектив'], thriller: ['Thriller', 'Триллер'], horror: ['Horror', 'Ужасы'], romance: ['Romance', 'Романтика'], drama: ['Drama', 'Драма'], history: ['History', 'История'], classic: ['Classic', 'Классика'], children: ['Children', 'Детское'], poetry: ['Poetry', 'Поэзия'], humor: ['Humour', 'Юмор'], biography: ['Biography', 'Биография'] };
  const human = (s) => { const t = String(s).replace(/_/g, ' '); return t.charAt(0).toUpperCase() + t.slice(1); };
  const pick = (map, key) => (map[key] ? map[key][lang() === 'ru' ? 1 : 0] : human(key));
  const safeUrl = (u) => (typeof u === 'string' && /^https:\/\//i.test(u) ? u : null);

  let current = null; let bookCtl = null; let lastBtn = null; let jsonUrl = null;

  function section(label, content) {
    const s = el('section', 'book-sec'); s.append(el('h3', null, label));
    s.append(content); return s;
  }
  const list = (rows) => { const ul = el('ul', 'book-list'); rows.forEach((r) => ul.append(el('li', null, r))); return ul; };
  const link = (href, text) => { const a = el('a', null, text); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };

  function renderBook() {
    const b = current; const d = b.detail || {};
    nodes.title.textContent = title(b);
    nodes.by.textContent = author(b);
    nodes.by.hidden = !author(b);
    nodes.kind.textContent = d.type ? pick(TYPES, d.type) : T('api.d.book', 'Book');

    // cover
    nodes.cover.textContent = '';
    nodes.cover.append(el('span', 'book-ph', initial(title(b))));
    const src = coverUrl(b, true);
    if (src) {
      const img = new Image(); img.alt = ''; img.decoding = 'async'; img.src = src;
      if (d.cover && d.cover.w && d.cover.h) { img.width = d.cover.w; img.height = d.cover.h; }
      img.addEventListener('error', () => img.remove());
      nodes.cover.append(img);
    }

    // chips
    nodes.chips.textContent = '';
    const chips = [];
    if (b.y) chips.push(String(b.y));
    if (d.rate && d.rate.v) chips.push(`★ ${d.rate.v}${d.rate.n ? ` · ${fmtN(d.rate.n)} ${T('api.d.ratings', 'ratings')}` : ''}`);
    (Array.isArray(d.gen) ? d.gen.slice(0, 5) : []).forEach((g) => chips.push(pick(GENRES, g)));
    chips.push(`ID ${b.id}`);
    chips.forEach((c) => nodes.chips.append(el('li', null, c)));

    // sections: only what the API returned
    nodes.secs.textContent = '';
    const desc = d.desc && d.desc.t;
    if (desc) nodes.secs.append(section(T('api.d.desc', 'About'), el('p', 'book-desc', desc)));
    const seen = new Set([title(b).toLowerCase()]);
    if (d.orig && d.orig.t && !seen.has(d.orig.t.toLowerCase())) { seen.add(d.orig.t.toLowerCase()); nodes.secs.append(section(T('api.d.orig', 'Original title'), el('p', null, d.orig.t))); }
    const alts = (d.alts || []).map((a) => a.t).filter((t) => t && !seen.has(t.toLowerCase()));
    const altsU = [...new Set(alts)].slice(0, 8);
    if (altsU.length) nodes.secs.append(section(T('api.d.alts', 'Also known as'), list(altsU)));
    if (Array.isArray(d.series) && d.series.length) {
      const rows = d.series.map((s) => `${(lang() === 'ru' ? s.ru || s.en : s.en || s.ru) || ''}${s.pos ? ` · #${s.pos}` : ''}`).filter((t) => t.trim());
      if (rows.length) nodes.secs.append(section(T('api.d.series', 'Series'), list(rows)));
    }
    const auth = [...new Set((d.authors || []).map((a) => (a.n ? `${a.n}${a.r && a.r !== 'author' ? ` (${a.r})` : ''}` : '')).filter(Boolean))].slice(0, 8);
    if (auth.length > 1) nodes.secs.append(section(T('api.d.authors', 'Authors'), list(auth)));
    if (Array.isArray(d.tr) && d.tr.length) {
      const rows = d.tr.slice(0, 6).map((t) => [t.t, t.l && t.l.toUpperCase(), t.by, t.y].filter(Boolean).join(' · '));
      nodes.secs.append(section(T('api.d.tr', 'Translations'), list(rows)));
    }
    if (Array.isArray(d.ed) && d.ed.length) {
      const rows = d.ed.slice(0, 6).map((e) => [e.pub || e.t, e.l && e.l.toUpperCase(), e.y, e.isbn && `ISBN ${e.isbn}`].filter(Boolean).join(' · '));
      nodes.secs.append(section(T('api.d.ed', 'Editions'), list(rows)));
    }

    // links
    nodes.links.textContent = '';
    const ext = d.ext || {};
    const mk = (key, href, text) => { if (ext[key]) nodes.links.append(link(href(encodeURIComponent(ext[key])), text)); };
    mk('wikidata', (v) => `https://www.wikidata.org/wiki/${v}`, 'Wikidata ↗');
    mk('openlibrary', (v) => `https://openlibrary.org/works/${v}`, 'Open Library ↗');
    mk('fantlab', (v) => `https://fantlab.ru/work${v}`, 'FantLab ↗');
    const page = d.cover && safeUrl(d.cover.page);
    if (page) nodes.links.append(link(page, `${T('api.d.coversrc', 'Cover source')} ↗`));
    // Raw JSON: the API wants the key in a header, which a plain link cannot send, so open what was already fetched
    if (jsonUrl) URL.revokeObjectURL(jsonUrl);
    jsonUrl = URL.createObjectURL(new Blob([JSON.stringify(b, null, 2)], { type: 'application/json' }));
    nodes.links.append(link(jsonUrl, `${T('api.d.json', 'Raw JSON')} ↗`));
  }

  async function openBook(b, btn) {
    lastBtn = btn; current = { ...b };
    renderBook();
    nodes.loading.textContent = T('api.d.loading', 'Loading the card…');
    nodes.loading.hidden = false;
    if (!dlg.open) {
      dlg.showModal(); document.body.classList.add('no-scroll');
      requestAnimationFrame(() => dlg.classList.add('is-open'));
    }
    if (bookCtl) bookCtl.abort();
    bookCtl = new AbortController();
    try {
      const full = await api(`/v1/books/${encodeURIComponent(b.id)}`, bookCtl.signal);
      current = full; renderBook(); nodes.loading.hidden = true;
    } catch (e) {
      if (e.name === 'AbortError') return;
      nodes.loading.hidden = false;
      nodes.loading.textContent = e.code === 429 ? T('api.d.rl', 'Too many requests, wait a little and open the card again.') : T('api.d.fail', 'The full card could not be loaded.');
      if (e.code === 401 || e.code === 403) nodes.loading.textContent = T('api.d.auth', 'The catalogue refused the site’s key.');
    }
  }
  dlg.addEventListener('close', () => { if (bookCtl) bookCtl.abort(); if (lastBtn) lastBtn.focus({ preventScroll: true }); });

  /* ---------- numbers ---------- */
  const dec = (v, d = 1) => Number(v).toLocaleString(lang() === 'ru' ? 'ru-RU' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtAll = () => {
    $$('[data-n]').forEach((n) => { n.textContent = fmtN(n.dataset.n); });
    $$('[data-pct]').forEach((n) => { n.textContent = `${dec(n.dataset.pct)}%`; });
    $$('[data-dec]').forEach((n) => { n.textContent = dec(n.dataset.dec); });
  };
  const countEls = $$('[data-count]');
  const setCount = (n, v) => { n.textContent = fmtN(v); };
  const countAll = () => countEls.forEach((n) => setCount(n, n._shown != null ? n._shown : n.dataset.count));
  function countUp(n) {
    const target = Number(n.dataset.count);
    if (reduceMotion) { n._shown = target; setCount(n, target); return; }
    const t0 = performance.now(); const dur = 1100;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      n._shown = Math.round(target * (1 - (1 - p) ** 3)); setCount(n, n._shown);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }), { threshold: 0.6 });
    countEls.forEach((n) => cio.observe(n));
  }

  // latency tracks: scaled to the slowest p95 on the chart
  const latRows = $$('.lat-row');
  const maxP = Math.max(...latRows.map((r) => Number(r.dataset.p95)));
  latRows.forEach((r) => {
    const [med, p95] = $$('.track i', r);
    med.style.setProperty('--bar', (Number(r.dataset.med) / maxP * 100).toFixed(1));
    p95.style.setProperty('--bar', (Number(r.dataset.p95) / maxP * 100).toFixed(1));
  });

  const refresh = () => { fmtAll(); countAll(); if (items.length) renderResults(); if (dlg.open && current) renderBook(); };
  document.addEventListener('langchange', refresh);
  fmtAll();
})();
