/* Vetro app screens — generated UI (HTML/SVG) rendered inside animated phone mockups.
   Each screen is designed at 360×780 and scaled to the phone by a ResizeObserver (--k). */
(() => {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = (key, fallback) => (window.VetroI18n ? window.VetroI18n.t(key, fallback) : fallback);

  /* ---------- icons ---------- */
  const P = {
    home: '<path d="M4 11.5 12 4l8 7.5V20h-5.5v-5.5h-5V20H4z"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/>',
    books: '<rect x="3.5" y="4" width="4.2" height="16" rx="1"/><rect x="9.5" y="6" width="4.2" height="14" rx="1"/><path d="m15.8 6.6 3.7-1 3 12.8-3.7 1z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.6 2H4.4z"/><path d="M10 21h4"/>',
    edit: '<path d="m4 20 1-4.2L16.2 4.6l3.2 3.2L8.2 19z"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor"/>',
    play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
    pause: '<rect x="6" y="4.5" width="4.2" height="15" rx="1.2" fill="currentColor"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2" fill="currentColor"/>',
    download: '<path d="M12 4v11m-5-4 5 5 5-5M5 20h14"/>',
    bookmark: '<path d="M7 4h10v16l-5-4-5 4z"/>',
    heart: '<path d="M12 20.5S4 15.2 4 9.6A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 8 2.1c0 5.6-8 10.9-8 10.9z" fill="currentColor"/>',
    chev: '<path d="m9 5 7 7-7 7"/>',
    down: '<path d="m5 9 7 7 7-7"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    sort: '<path d="M4 8h16M7 12h10M10 16h4"/>',
    dots: '<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>',
    chart: '<path d="M4 18 9 11l4 4 7-9"/><circle cx="18" cy="17" r="3"/>',
    rew: '<path d="M5 12a7 7 0 1 0 2.2-5.1M5 4v4h4"/>',
    ff: '<path d="M19 12a7 7 0 1 1-2.2-5.1M19 4v4h-4"/>',
    next: '<path d="M18 5v14M5 5l10 7L5 19z"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3.2 3.2 3.2 13.8 0 17M12 3.5c-3.2 3.2-3.2 13.8 0 17"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 1.6-2-.4-1.2.3-2.3 1.6-2.3H17a3.5 3.5 0 0 0 3.5-3.5C20.5 7.4 16.7 3.5 12 3.5z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.8" r="1"/><circle cx="16" cy="11" r="1"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.8 20c1-3.8 3.9-5.8 7.2-5.8s6.2 2 7.2 5.8"/>',
    sync: '<path d="M20 8a8 8 0 0 0-14.2-1.4M4 16a8 8 0 0 0 14.2 1.4M4 3.8v4h4M20 20.2v-4h-4"/>',
    spark: '<path d="M12 3c.8 4.6 2.4 6.2 7 7-4.6.8-6.2 2.4-7 7-.8-4.6-2.4-6.2-7-7 4.6-.8 6.2-2.4 7-7z"/>',
    spark2: '<path d="M12 3c.8 4.6 2.4 6.2 7 7-4.6.8-6.2 2.4-7 7-.8-4.6-2.4-6.2-7-7 4.6-.8 6.2-2.4 7-7z" fill="currentColor"/>',
    clapper: '<rect x="3.5" y="9" width="17" height="11" rx="2"/><path d="m3.7 9 2.6-4.6 3.4.9L7 9.5M9.6 9l2.6-4.6 3.4.9L13 9.5M15.7 9l2.6-4.6"/>',
    tv: '<rect x="3.5" y="5.5" width="17" height="11.5" rx="2"/><path d="M8.5 20.5h7"/>',
    phones: '<path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3"/><rect x="3.5" y="14" width="4" height="6" rx="1.5"/><rect x="16.5" y="14" width="4" height="6" rx="1.5"/>',
    reader: '<path d="M4 5.5C7 4.5 9.5 5 12 7c2.5-2 5-2.5 8-1.5V19c-3-1-5.5-.5-8 1.5-2.5-2-5-2.5-8-1.5z"/><path d="M12 7v13"/>',
    timer: '<circle cx="12" cy="13.5" r="6.5"/><path d="M12 10v3.8l2.4 1.4M9.5 3.5h5"/>',
    wave: '<path d="M5 10v4M9 7v10M13 4.5v15M17 8v8M21 11v2"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    pip: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><rect x="12" y="11.5" width="6" height="4.5" rx="1" fill="currentColor"/>'
  };
  const ic = (name, extra = '') => `<svg class="ic ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;

  /* ---------- covers (SVG art) ---------- */
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const svgWrap = (vb, body, cls = '') => `<svg class="art ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;

  const covers = {
    night: () => svgWrap('0 0 100 130', `<defs><linearGradient id="gn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1340"/><stop offset="1" stop-color="#1d3bb8"/></linearGradient></defs><rect width="100" height="130" fill="url(#gn)"/><g fill="#fff" opacity=".85"><circle cx="14" cy="16" r="1"/><circle cx="40" cy="30" r=".8"/><circle cx="70" cy="12" r="1.1"/><circle cx="86" cy="36" r=".8"/><circle cx="24" cy="48" r=".7"/><circle cx="58" cy="52" r=".9"/></g><g>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${5 + i * 11.4}" y="70" width="9" height="9" rx="1.5" fill="${i % 2 ? '#ffd23f' : '#ff6b2c'}"/>`).join('')}</g><g stroke="#4f78ff" stroke-width="1" opacity=".6">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0 ${84 + i * 8}h100"/>`).join('')}</g>`),
    mars: () => svgWrap('0 0 100 130', `<rect width="100" height="130" fill="#17110f"/><rect x="9" y="8" width="82" height="100" fill="#f7efdc"/><rect x="13" y="12" width="74" height="76" fill="#17110f"/><circle cx="50" cy="48" r="23" fill="#ea4d2a"/><ellipse cx="50" cy="48" rx="34" ry="8" fill="none" stroke="#17110f" stroke-width="3" transform="rotate(-18 50 48)"/><ellipse cx="50" cy="48" rx="34" ry="8" fill="none" stroke="#f7efdc" stroke-width="1" transform="rotate(-18 50 48)"/><text x="50" y="102" text-anchor="middle" font-family="Unbounded,Arial Black,sans-serif" font-weight="900" font-size="13" fill="#17110f">MARS</text><text x="50" y="121" text-anchor="middle" font-family="Arial,sans-serif" font-size="5.5" fill="#f7efdc" letter-spacing="1.5">STATION</text>`),
    ronin: () => svgWrap('0 0 100 130', `<rect width="100" height="130" fill="#f6ecd8"/><circle cx="52" cy="50" r="22" fill="#cf1b10"/><circle cx="46" cy="64" r="26" fill="none" stroke="#14100e" stroke-width="5"/><path d="M42 124 52 76 62 124z" fill="#14100e"/><path d="M20 118 76 26" stroke="#14100e" stroke-width="1.6"/>`),
    tower: () => svgWrap('0 0 100 130', `<defs><linearGradient id="gt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a35b8"/><stop offset="1" stop-color="#0c9a96"/></linearGradient></defs><rect width="100" height="130" fill="url(#gt)"/><g fill="none" stroke="#fff" opacity=".22"><circle cx="50" cy="76" r="14"/><circle cx="50" cy="76" r="26"/><circle cx="50" cy="76" r="40"/></g><rect x="45" y="30" width="10" height="100" fill="#10102a"/><g fill="#5ff3e0">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="48.4" y="${46 + i * 12}" width="3.2" height="4"/>`).join('')}</g>`),
    orbit: () => svgWrap('0 0 100 100', `<rect width="100" height="100" fill="#1e5b49"/><g class="spin" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".8"><ellipse cx="50" cy="50" rx="46" ry="20" transform="rotate(-16 50 50)"/><ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(-16 50 50)"/><ellipse cx="50" cy="50" rx="56" ry="26" transform="rotate(-16 50 50)"/></g><circle cx="50" cy="50" r="19" fill="#e45414"/><circle cx="78" cy="30" r="2.6" fill="#e7e2d5"/>`),
    book: (a, b, c) => svgWrap('0 0 100 130', `<rect width="100" height="130" fill="${a}"/><circle cx="48" cy="48" r="20" fill="${b}"/><g fill="${c}"><rect x="14" y="88" width="62" height="5" rx="2"/><rect x="14" y="99" width="48" height="5" rx="2"/><rect x="14" y="110" width="34" height="5" rx="2"/></g>`),
    sakura: () => {
      seed = 5;
      const bl = [[-6, 52, 150], [40, 44, 215], [82, 46, 170], [124, 40, 250], [160, 50, 190], [206, 44, 235], [246, 52, 180], [292, 40, 225], [326, 44, 160]];
      let s = '<defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d2a74"/><stop offset=".55" stop-color="#e5486a"/><stop offset="1" stop-color="#ff9a6a"/></linearGradient></defs><rect width="360" height="440" fill="url(#gs)"/><circle cx="188" cy="262" r="128" fill="#ffe4bd"/>';
      [292, 304, 316].forEach((y, i) => { s += `<rect x="40" y="${y}" width="290" height="${3 + i}" fill="#e87a8a" opacity=".75"/>`; });
      bl.forEach(([x, w, h]) => {
        const top = 440 - h;
        s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#1b0d2c"/>`;
        for (let wy = top + 12; wy < 430; wy += 14) for (let wx = x + 6; wx < x + w - 6; wx += 10) if (rnd() > .42) s += `<rect x="${wx}" y="${wy}" width="4" height="5" fill="${rnd() > .8 ? '#ff9f6b' : '#ffd9a0'}"/>`;
      });
      s += '<polygon points="97,440 101.6,40 106,440" fill="#1b0d2c"/><circle cx="101.6" cy="38" r="3" fill="#c8102e"/>';
      return svgWrap('0 0 360 440', s, 'art-wide');
    }
  };

  /* ---------- shared chrome ---------- */
  const bar = (light) => `<div class="s-bar${light ? ' is-light' : ''}"><b>9:41</b><span class="s-bar-r"><i class="s-sig"></i><i class="s-wifi"></i><i class="s-bat"></i></span></div>`;
  const dock = (active) => `<div class="s-dock"><div class="s-dock-pill">${['home', 'gear', 'books', 'list'].map(n => `<span class="${n === active ? 'is-on' : ''}">${ic(n)}</span>`).join('')}</div><div class="s-dock-search">${ic('search')}</div></div>`;
  const chip = (k, v) => `<span class="s-chip" data-i18n="${k}">${v}</span>`;
  const kindIcon = { 'app.movie': 'clapper', 'app.manga': 'reader', 'app.audio': 'phones', 'app.anime': 'spark2', 'app.series': 'tv' };

  /* ---------- screens ---------- */
  const card = (cover, kindKey, kindEn, title, g1, g2, rating, prog, label) => `
    <div class="s-card">
      <div class="s-cover">${covers[cover]()}<span class="s-kind">${ic(kindIcon[kindKey])}<em data-i18n="${kindKey}">${kindEn}</em></span></div>
      <div class="s-card-body">
        <div class="s-card-top"><strong>${title}</strong>${rating ? `<span class="s-rate">${ic('star')}${rating}</span>` : ''}</div>
        <div class="s-chips">${chip(g1[0], g1[1])}${chip(g2[0], g2[1])}</div>
        ${prog ? `<div class="s-prog"><div class="s-prog-l"><span data-i18n="app.progress">Progress</span><span>${prog.txt}</span></div><div class="s-prog-t"><i style="width:${prog.pct}%"></i></div></div>` : '<div class="s-grow"></div>'}
        <div class="s-card-foot"><span>${label}</span><button class="s-edit" tabindex="-1">${ic('edit')}<em data-i18n="app.edit">Edit</em></button></div>
      </div>
    </div>`;

  const screens = {
    library: () => `
      <div class="s-lib">
        ${bar()}
        <div class="s-lib-head">
          <div class="s-bell">${ic('bell')}<i>2</i></div>
          <div class="s-actions">${ic('sort')}${ic('chart')}${ic('dots')}</div>
        </div>
        <div class="s-lib-clip"><div class="s-lib-track">
          ${card('night', 'app.series', 'Series', 'Night Circuit', ['app.g.mystery', 'Mystery'], ['app.g.thriller', 'Thriller'], '', { pct: 50, txt: 'S1 4 / 8 <span data-i18n="app.ep">ep.</span>' }, 'S1 E4')}
          ${card('mars', 'app.movie', 'Movie', 'Mars Station', ['app.g.scifi', 'Sci-Fi'], ['app.g.adventure', 'Adventure'], '8.4', null, '1 <span data-i18n="app.eps">eps.</span>')}
          ${card('ronin', 'app.manga', 'Manga', 'Paper Ronin', ['app.g.action', 'Action'], ['app.g.historical', 'Historical'], '9.3', { pct: 70, txt: '42 / 60 <span data-i18n="app.ch">ch.</span>' }, '60 <span data-i18n="app.ch">ch.</span>')}
          ${card('tower', 'app.manga', 'Manga', 'Tower of Echoes', ['app.g.fantasy', 'Fantasy'], ['app.g.adventure', 'Adventure'], '8.0', null, '120 <span data-i18n="app.ch">ch.</span>')}
          ${card('sakura', 'app.anime', 'Anime', 'Sakura Signal', ['app.g.drama', 'Drama'], ['app.g.scifi', 'Sci-Fi'], '9.1', { pct: 58, txt: 'S2 7 / 12 <span data-i18n="app.ep">ep.</span>' }, 'S2 E7')}
          ${card('orbit', 'app.audio', 'Audiobook', 'The Quiet Orbit', ['app.g.scifi', 'Sci-Fi'], ['app.g.drama', 'Drama'], '8.6', { pct: 28, txt: '12:06 / 43:26' }, 'Mira Hayes')}
        </div></div>
        ${dock('home')}
      </div>`,

    detail: () => `
      <div class="s-det">
        <div class="s-det-hero">${covers.sakura()}<i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="petal p5"></i><i class="petal p6"></i></div>
        ${bar(true)}
        <div class="s-sheet">
          <span class="s-handle"></span>
          <h4>Sakura Signal</h4>
          <div class="s-actrow"><span class="s-bm">${ic('bookmark')}</span><span class="s-watch">${ic('play')}<em data-i18n="app.watch">Watch</em></span><span class="s-dl">${ic('download')}<em data-i18n="app.download">Download</em></span></div>
          <span class="s-trailer">${ic('play')}<em data-i18n="app.trailer">Trailer</em></span>
          <div class="s-scroll-clip"><div class="s-scroll-in">
            <p class="s-next"><span data-i18n="app.nextin">Next episode in:</span><b class="js-countdown">2 d 14 h 05 min 09 sec</b></p>
            <h5><i></i><span data-i18n="app.seasons">Seasons</span></h5>
            <div class="s-seasons"><span>${ic('play')}S1 · 12 <em data-i18n="app.ep">ep.</em></span><span>${ic('play')}S2 · 7 <em data-i18n="app.ep">ep.</em></span></div>
            <h5><i></i><span data-i18n="app.info">Information</span></h5>
            <div class="s-tiles">
              <div>${ic('star')}<small data-i18n="app.rating">Rating</small><b>9.1</b></div>
              <div>${ic('timer')}<small data-i18n="app.status">Status</small><b data-i18n="app.airing">Airing</b></div>
              <div>${ic('clapper')}<small data-i18n="app.episodes">Episodes</small><b>19</b></div>
              <div>${ic('tv')}<small data-i18n="app.format">Format</small><b data-i18n="app.tv">TV</b></div>
            </div>
          </div></div>
        </div>
      </div>`,

    player: () => `
      <div class="s-ply">
        ${bar(true)}
        <div class="s-ply-top"><span>${ic('down')}</span><span>${ic('dots')}</span></div>
        <div class="s-ply-art">${covers.orbit()}</div>
        <div class="s-ply-meta"><div><h4>The Quiet Orbit</h4><p>Mira Hayes</p></div><div class="s-ply-fav"><span>${ic('bookmark')}</span><span class="is-heart">${ic('heart')}</span></div></div>
        <div class="s-seek"><div class="s-seek-t"><i class="js-seek"></i></div><div class="s-seek-l"><span class="js-elapsed">12:06</span><span>43:26</span></div></div>
        <div class="s-ctl"><span>${ic('rew')}<small>15</small></span><span class="s-ctl-main">${ic('pause')}</span><span>${ic('ff')}<small>30</small></span></div>
        <div class="s-tiles4"><span><b>1.25×</b><small data-i18n="app.speed">Speed</small></span><span>${ic('list')}<small data-i18n="app.of">3 of 24</small></span><span>${ic('timer')}<small>15:00</small></span><span>${ic('wave')}<small data-i18n="app.narration">Narration</small></span></div>
      </div>`,

    reader: () => {
      const panel = (cls) => `<div class="s-panel ${cls}"><i class="figure"></i>${cls.includes('b') ? '<i class="burst"></i>' : ''}${cls.includes('t') ? '<i class="bubble"></i>' : ''}</div>`;
      return `
      <div class="s-rdr">
        ${bar()}
        <div class="s-rdr-top"><span>${ic('back')}</span><div><strong data-i18n="app.chapter42">Paper Ronin · Chapter 42</strong><small>14 / 38</small></div><span class="s-rdr-tools">${ic('list')}${ic('sort')}${ic('pip')}</span></div>
        <div class="s-rdr-clip"><div class="s-rdr-track">
          ${panel('a')}${panel('b')}${panel('c t')}${panel('a b')}${panel('c')}
        </div></div>
        <div class="s-rdr-foot"><div class="s-rdr-slide"><i></i><b>15</b></div><div class="s-rdr-nav"><span>${ic('back')}<em data-i18n="app.prev">Previous</em></span><span><em data-i18n="app.next">Next</em>${ic('chev')}</span></div></div>
      </div>`;
    },

    books: () => `
      <div class="s-bks">
        ${bar()}
        <h3 data-i18n="app.books">Books</h3>
        <p class="s-sub" data-i18n="app.continue">Continue</p>
        <div class="s-now">
          <div class="s-now-art">${covers.orbit()}</div>
          <div class="s-now-pill"><i></i><div><b>The Quiet Orbit</b><small>Mira Hayes</small></div></div>
          <span class="s-now-heart">${ic('heart')}</span>
          <div class="s-now-body"><strong data-i18n="app.chapter3">Chapter 3</strong><div class="s-now-bar"><i class="js-seek2"></i></div><div class="s-now-times"><span class="js-elapsed2">12:04</span><span>−31:22</span></div></div>
          <div class="s-now-ctl"><span>${ic('rew')}</span><span class="main">${ic('pause')}</span><span>${ic('ff')}</span></div>
        </div>
        <div class="s-shelves"><div class="s-shelves-track">
          <div class="s-shelf"><div class="s-shelf-h"><small data-i18n="app.updated">Updated today</small><small data-i18n="app.n24">24 books</small></div><b data-i18n="app.recommended">Recommended</b><small data-i18n="app.picked">Picked for you</small><div class="s-fan"><span style="--r:-8deg">${covers.book('#e8520a', '#14100e', '#f6ecd8')}</span><span style="--r:0deg" class="mid">${covers.book('#f6ecd8', '#e8520a', '#14100e')}</span><span style="--r:8deg">${covers.book('#14100e', '#f26a0f', '#f6ecd8')}</span></div></div>
          <div class="s-shelf"><div class="s-shelf-h"><small data-i18n="app.updated">Updated today</small><small data-i18n="app.n18">18 books</small></div><b>Internet Archive</b><small data-i18n="app.top">Top on this shelf</small><div class="s-fan"><span style="--r:-8deg">${covers.book('#3a1f72', '#6ff2d8', '#ece4ff')}</span><span style="--r:0deg" class="mid">${covers.book('#1d54e0', '#ff5530', '#ece4ff')}</span><span style="--r:8deg">${covers.book('#27705a', '#ffad3b', '#e9f6ef')}</span></div></div>
        </div></div>
        ${dock('books')}
      </div>`,

    rate: () => `
      <div class="s-rate-screen js-rate" style="--hue:92">
        ${bar()}
        <div class="s-rate-top"><span>${ic('close')}</span><span>${ic('info')}</span></div>
        <svg class="s-face" viewBox="0 0 300 250" aria-hidden="true">
          <line class="js-brow-l" x1="62" y1="52" x2="108" y2="46" stroke="currentColor" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>
          <line class="js-brow-r" x1="190" y1="46" x2="236" y2="52" stroke="currentColor" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>
          <circle cx="88" cy="110" r="29" fill="#16130f"/>
          <circle cx="212" cy="110" r="29" fill="#16130f"/>
          <path class="js-mouth" d="M100 185 Q150 232 200 185" fill="none" stroke="#16130f" stroke-width="13" stroke-linecap="round"/>
        </svg>
        <div class="s-rate-word js-rate-label">GOOD</div>
        <div class="s-rate-slider"><div class="s-rate-track"><i class="js-rate-thumb"></i></div><div class="s-rate-ends"><span data-i18n="app.r.normal">Normal</span><b class="js-rate-val">7.9</b><span data-i18n="app.r.master">Masterpiece</span></div></div>
      </div>`,

    settings: () => {
      const row = (i, k1, v1, k2, v2, tail) => `<div class="s-set-row">${ic(i)}<div><b data-i18n="${k1}">${v1}</b>${k2 ? `<small data-i18n="${k2}">${v2}</small>` : ''}</div>${tail || ic('chev', 'chev')}</div>`;
      return `
      <div class="s-set">
        ${bar()}
        <h3 data-i18n="app.settings">Settings</h3>
        <div class="s-set-clip"><div class="s-set-track">
          ${row('play', 'app.s.video', 'Video sources', 'app.s.videod', 'WebDAV, Jellyfin and Emby')}
          ${row('globe', 'app.s.lang', 'Language', '', '', '<span class="val" data-i18n="app.s.langv">English</span>')}
          ${row('palette', 'app.s.themes', 'Themes', '', '', '<span class="val" data-i18n="app.s.themesv">Dark</span>')}
          ${row('user', 'app.s.account', 'Account settings', 'app.s.accountd', 'Sync, sign-in, and password')}
          ${row('sync', 'app.s.sync', 'Sync', 'app.s.syncd', 'Accounts, lists and episode checks')}
          ${row('spark', 'app.s.enrich', 'Collection Enrichment', 'app.s.enrichd', 'Fetch missing data and titles')}
          ${row('spark', 'app.s.ai', 'AI Connect', 'app.s.aid', 'Bring your own AI key (BYOK)')}
          ${row('timer', 'app.s.skip', 'Auto-skip', 'app.s.skipd', 'Skip openings, endings and recaps silently', '<span class="tog"><i></i></span>')}
          ${row('next', 'app.s.autonext', 'Auto-next', 'app.s.autonextd', 'Start the next episode when the current one ends', '<span class="tog is-on"><i></i></span>')}
        </div></div>
        ${dock('gear')}
      </div>`;
    }
  };

  /* ---------- mounting ---------- */
  const mounted = new WeakSet();
  const live = new Set();

  function fit(box) {
    const w = box.clientWidth;
    if (w) box.style.setProperty('--k', (w / 360).toFixed(4));
  }

  function setScreen(phone, name) {
    const layers = phone.querySelectorAll('.screen-layer');
    if (!layers.length) return;
    layers.forEach(l => l.classList.toggle('is-active', l.dataset.name === name));
    phone.dataset.active = name;
    if (phone._cycle) phone._cycle.i = phone._cycle.names.indexOf(name);
  }

  function buildPhone(el) {
    if (mounted.has(el)) return;
    mounted.add(el);
    const names = (el.dataset.screens || el.dataset.screen || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!names.length) return;
    const active = el.dataset.active || names[0];
    let box = el.querySelector(':scope > .phone-screen');
    if (!box) {
      box = document.createElement('div');
      box.className = 'phone-screen';
      el.appendChild(box);
    }
    box.innerHTML = names.map(n => `<div class="screen-layer${n === active ? ' is-active' : ''}" data-name="${n}"><div class="screen">${screens[n]()}</div></div>`).join('') + '<span class="island"></span><span class="glare"></span>';
    el.classList.add('is-built');
    if (window.VetroI18n) window.VetroI18n.apply(box);
    fit(box);
    if (el.dataset.cycle && names.length > 1) el._cycle = { names, i: names.indexOf(active), ms: +el.dataset.cycle, n: 0 };
  }

  const ro = 'ResizeObserver' in window ? new ResizeObserver(entries => entries.forEach(e => fit(e.target))) : null;

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      const el = e.target;
      if (e.isIntersecting) {
        buildPhone(el);
        const box = el.querySelector(':scope > .phone-screen');
        if (box && ro && !box._ro) { ro.observe(box); box._ro = true; }
        el.classList.add('is-live'); live.add(el);
      } else { el.classList.remove('is-live'); live.delete(el); }
    });
  }, { rootMargin: '300px 0px' }) : null;

  function init() {
    document.querySelectorAll('.phone[data-screen], .phone[data-screens]').forEach(el => {
      if (io) io.observe(el); else { buildPhone(el); el.classList.add('is-live'); live.add(el); }
    });
  }

  /* ---------- live behaviours (only for phones on screen) ---------- */
  const units = () => ({ d: t('app.u.d', 'd'), h: t('app.u.h', 'h'), m: t('app.u.m', 'min'), s: t('app.u.s', 'sec') });
  const pad = n => String(n).padStart(2, '0');
  const fmt = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
  const labelKeys = [[2, 'app.r.awful', 'AWFUL'], [4, 'app.r.bad', 'BAD'], [5.6, 'app.r.meh', 'MEH'], [7, 'app.r.normal2', 'NORMAL'], [8.5, 'app.r.good', 'GOOD'], [9.5, 'app.r.great', 'GREAT'], [11, 'app.r.master2', 'MASTERPIECE']];
  const countdownBase = 2 * 86400 + 14 * 3600 + 5 * 60 + 9;
  let tick = 0;

  function second() {
    if (!live.size) return;
    tick++;
    const left = countdownBase - tick;
    const u = units();
    const text = `${Math.floor(left / 86400)} ${u.d} ${Math.floor(left % 86400 / 3600)} ${u.h} ${pad(Math.floor(left % 3600 / 60))} ${u.m} ${pad(left % 60)} ${u.s}`;
    document.querySelectorAll('.is-live .js-countdown').forEach(n => { n.textContent = text; });
    const el = 726 + tick % 600;
    document.querySelectorAll('.is-live .js-elapsed').forEach(n => { n.textContent = fmt(el); });
    document.querySelectorAll('.is-live .js-seek').forEach(n => { n.style.width = (el / 2606 * 100).toFixed(2) + '%'; });
    const el2 = 724 + tick % 600;
    document.querySelectorAll('.is-live .js-elapsed2').forEach(n => { n.textContent = fmt(el2); });
    document.querySelectorAll('.is-live .js-seek2').forEach(n => { n.style.width = (el2 / 2606 * 100 + 4).toFixed(2) + '%'; });
  }

  function rateFrame(ts) {
    const nodes = document.querySelectorAll('.is-live .js-rate');
    if (nodes.length) {
      const v = reduceMotion ? 7.9 : Math.min(9.8, Math.max(1.4, 5.7 + 4.1 * Math.sin(ts / 1900)));
      const hue = Math.min(95, v * 12);
      const mood = (v - 5) / 5;
      const label = labelKeys.find(l => v < l[0]) || labelKeys[labelKeys.length - 1];
      const txt = t(label[1], label[2]);
      nodes.forEach(n => {
        n.style.setProperty('--hue', hue.toFixed(1));
        n.querySelector('.js-rate-val').textContent = v.toFixed(1);
        n.querySelector('.js-rate-thumb').style.left = (v * 10).toFixed(1) + '%';
        n.querySelector('.js-mouth').setAttribute('d', `M100 185 Q150 ${(185 + mood * 54).toFixed(1)} 200 185`);
        n.querySelector('.js-brow-l').setAttribute('y1', (52 - mood * 4).toFixed(1));
        n.querySelector('.js-brow-l').setAttribute('y2', (46 + mood * 8).toFixed(1));
        n.querySelector('.js-brow-r').setAttribute('y1', (46 + mood * 8).toFixed(1));
        n.querySelector('.js-brow-r').setAttribute('y2', (52 - mood * 4).toFixed(1));
        const lab = n.querySelector('.js-rate-label');
        if (lab.textContent !== txt) lab.textContent = txt;
      });
    }
    requestAnimationFrame(rateFrame);
  }

  function cycleTick() {
    live.forEach(el => {
      const c = el._cycle;
      if (!c || el.matches(':hover')) return;
      c.n += 500;
      if (c.n >= c.ms) { c.n = 0; c.i = (c.i + 1) % c.names.length; setScreen(el, c.names[c.i]); }
    });
  }

  function start() {
    init();
    if (!reduceMotion) setInterval(cycleTick, 500);
    setInterval(second, 1000);
    requestAnimationFrame(rateFrame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.VetroScreens = { setScreen, init, fit };
})();
