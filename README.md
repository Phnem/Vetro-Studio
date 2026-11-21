<p align="center">
  <img src="vetro-studio-icon.png" alt="Vetro Studio" width="112" />
</p>

<h1 align="center">Vetro Studio</h1>

<p align="center">
  The home of the Vetro ecosystem: local-first software for the media and photos you keep.
</p>

<p align="center">
  <a href="https://vetrostudio.bid/"><img src="https://img.shields.io/badge/Website-Live-E1251B?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live website" /></a>
  <a href="https://github.com/Phnem/Vetro-Studio"><img src="https://img.shields.io/badge/Source-Vetro%20Studio-181717?style=for-the-badge&logo=github&logoColor=white" alt="Vetro Studio source" /></a>
  <a href="https://t.me/Vetro_chat"><img src="https://img.shields.io/badge/Telegram-Vetro__chat-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Vetro Telegram chat" /></a>
  <a href="https://ko-fi.com/phnem"><img src="https://img.shields.io/badge/Support-Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Support on Ko-fi" /></a>
</p>

## The ecosystem

| Product | Platform | What it does |
| --- | --- | --- |
| [Vetro Collection](https://github.com/Phnem/Vetro) | Android | A personal library for anime, movies, series, manga and audiobooks. |
| [VetroLook](https://github.com/Phnem/VetroLook) | Windows 10/11 | A native image viewer and local photo library with Quick Look, RAW support and local indexing. |
| [VAP](https://github.com/Phnem/VAP) | Android 8.0+ | Vetro Android Player: a standalone video player with a local library, network sources, subtitle tools and on-device AI. |

## This website

A static product hub with six pages, in **English and Russian** (the language is detected from the browser and can be switched in the header; `?lang=ru` / `?lang=en` forces one).

- `index.html` — Vetro Studio: the entry point and route to every product.
- `collection.html` — Vetro Collection: animated phone mockups, a scroll-driven app tour, the trailer, features, sync, downloads (latest APK from GitHub Releases).
- `look.html` — VetroLook: a 3D window mockup, preview video, supported formats, native-performance notes, animated benchmarks, privacy dialog and the MSI download.
- `vap.html` — VAP (Vetro Android Player): phone mockups, features, on-device AI (Whisper, local translation, Smart Sync), the foss/cast builds and APK downloads (latest release from GitHub).

- `modules.html` — Vetro Modules: Compose recipes from the app (frosted glass, motion springs, chunked downloader). The glass and motion recipes are **live demos** drawn in DOM/CSS/JS (`assets/js/modules-demo.js`): the eight glass layers with the module's own numbers (tap a layer to switch it off, dark/light, still/moving backdrop) and three motion patterns (a window out of a dock icon, a "…" popover, a notification stack with swipe) on spring tokens `(ζ, T)` taken from the module's token table. They run only while on screen, and `prefers-reduced-motion` makes every spring critically damped. The downloader keeps its benchmark video (`assets/video/modules/download_benchmark.mp4`); `frostedglass-poster.jpg` there is used by `index.html`. Each module has a pair of download buttons, **SKILL.md** and **GUIDE.txt** as separate files copied from the [Vetro-Modules](https://github.com/Phnem/Vetro-Modules) repository into `assets/modules/<module>/` (see `assets/modules/SOURCE.txt` for the source state; the `download` attribute only works for same-domain files). The zip archives are no longer offered on the page (the owner's decision of 20 Nov 2026); they still exist in GitHub Releases.

- `api.html` — Vetro API (formerly "VetroBook API"; the catalogue now holds books, anime, movies and series): a live search against `api.vetrostudio.bid/v1/find` with an All / Anime / Movies / Series / Books switch (a card opens on click: books from `/v1/books/{id}`, titles from `/v1/media/{id}`), charts of the catalogue volume, speed, limits and cache, the plans (Basic / Pro / Ultra), the Telegram bot link (`@VetroBook_API_bot`) and a quick start. Logic is in `assets/js/api.js`: the query is cleaned (lower case, no diacritics, `ё`→`е` but `й` kept, punctuation dropped), typos are fixed against a vocabulary built from the answers (Damerau–Levenshtein, words of 4+ letters), and the results are re-ranked by title/author match; the server itself does the AND→OR search and transliteration. The contract is in [`docs/books-api.md`](docs/books-api.md). The page sends the site key (Ultra, permanent, bound to the site domains) in an `Authorization` header and `&key=` on cover links; the key is one constant, see [`docs/api-key.md`](docs/api-key.md). Vetro Collection links here from its download section. **Buying a key** (`#buy`, `assets/js/buy.js`): a plan switch with prices in dollars (Basic $3, Pro $7, Ultra $12 per 30 days; Stars are shown next to them for the Telegram bot), a project form, the terms (loaded from `api-docs.html#terms`) with a hand-drawn signature, and the payment step. Telegram Stars works now (it opens the bot); card (Paddle) and USDT stay disabled until the billing routes exist on the Worker, see [`docs/billing-front.md`](docs/billing-front.md).
- `api-docs.html` — the API documentation: getting a key, plans, authentication, endpoints, response fields, errors and limits, quick start, technical notes and the terms of use (a working draft). Content comes from `docs/api/README*.md` and `docs/api/terms*.md` of the app repository; the side menu and copy buttons are in `assets/js/api-docs.js`. Linked from `api.html` (nav, hero, access section, footer).

The Vetro mascot (ported from the app, see [`docs/mascot.md`](docs/mascot.md)) lives on every page as a `.mascot-card` panel mounted by `assets/js/mascot.js`.

#### VAP screenshots

The phones on `index.html` and `vap.html` show real VAP screenshots (taken from `captures/final/2-clean-screens` of the VAP repository, resized to 720×1560 WebP). A placeholder shows only if a file is missing. To replace one, drop a portrait image (about 720×1560, WebP) into `assets/img/` under the same name, with no HTML changes:

| File | Shown as |
| --- | --- |
| `vap-library.webp` | the centre phone in the hero, "Your library" |
| `vap-ai.webp` | the left phone in the hero, "On-device AI" |
| `vap-subtitles.webp` | the right phone in the hero, "Subtitle tools" |
| `vap-player.webp` | **landscape**, 1560×720: the wide phone (`.phone-land`) in the gallery, "Gestures and tracks". The player is landscape in the app, so it is not in the hero clusters |

### Design

- Poster palette — signal red, cream and ink — with big wide display type, sticker highlights and a ticker.
- **Frosted (matte) glass** surfaces: backdrop blur + fine grain on the header, cards, buttons and the glass "sun" in the hero.
- **Animated mockups.** The app screens are *generated UI* (HTML/SVG, no screenshots): library, episode details, audiobook player, manga reader, Books shelves, the reacting rating face and Settings. They live inside phone frames with a live countdown, auto-scrolling lists, a ticking player and cross-fading carousels. The Collection page pins a phone and swaps its screen as you scroll.
- The trailer (`assets/video/vetro-trailer.mp4`) plays inside a phone mockup, muted by default with a sound toggle.
- Responsive from 320 px to ultra-wide, `prefers-reduced-motion` support, keyboard-accessible menu and dialogs.

### Structure

```
index.html · collection.html · look.html · vap.html · modules.html · api.html · api-docs.html
vap-icon.svg             VAP "V-Play" mark (from the VAP repository)
assets/css/site.css      design system, mockups, app screens, responsive rules
assets/js/i18n.js        English (authored in HTML) + Russian dictionary, language switch
assets/js/screens.js     generated app screens and their live behaviours
assets/js/site.js        navigation, reveal, parallax, showcase, dialogs, GitHub release lookups
assets/video/            trailer + poster
assets/img/og-cover.jpg  social preview
```

#### For developers and agents

- [`docs/books-api.md`](docs/books-api.md) — how to use the public book catalogue API (`api.vetrostudio.bid`): search, book cards, covers, CORS, limits, ready-to-paste snippets.
- [`docs/mascot.md`](docs/mascot.md) — the Vetro mascot ported from the Android app: files, scenes, the `VetroMascot` core (`assets/js/mascot-core.js`), embedding and the rules for changing it.
- [`CLAUDE.md`](CLAUDE.md) — where to start for an AI agent session.

To add or change a string, put the English text in the HTML with a `data-i18n="key"` (or `data-i18n-html`, `data-i18n-attr`) attribute and add the Russian translation under the same key in `assets/js/i18n.js`.

## Technology

- Semantic HTML5, CSS custom properties, Grid/Flexbox, container query units, `backdrop-filter`
- Vanilla JavaScript — no build step, no dependencies
- [Unbounded](https://fonts.google.com/specimen/Unbounded), [Manrope](https://fonts.google.com/specimen/Manrope), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) and Roboto (inside the app mockups)

## Run locally

```bash
python -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

The repository is ready for static hosting. GitHub Pages serves it at [phnem.github.io/Vetro-Studio](https://phnem.github.io/Vetro-Studio/); Vercel, Cloudflare Pages and Netlify can also deploy it without a build command.

## Community

- [Telegram chat](https://t.me/Vetro_chat)
- [Vetro Collection discussions](https://github.com/Phnem/Vetro/discussions)
- [Support the project on Ko-fi](https://ko-fi.com/phnem)
