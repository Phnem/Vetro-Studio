<p align="center">
  <img src="vetro-studio-icon.png" alt="Vetro Studio" width="112" />
</p>

<h1 align="center">Vetro Studio</h1>

<p align="center">
  The home of the Vetro ecosystem: local-first software for the media and photos you keep.
</p>

<p align="center">
  <a href="https://phnem.github.io/Vetro-Studio/"><img src="https://img.shields.io/badge/Website-Live-E1251B?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live website" /></a>
  <a href="https://github.com/Phnem/Vetro-Studio"><img src="https://img.shields.io/badge/Source-Vetro%20Studio-181717?style=for-the-badge&logo=github&logoColor=white" alt="Vetro Studio source" /></a>
  <a href="https://t.me/Vetro_chat"><img src="https://img.shields.io/badge/Telegram-Vetro__chat-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Vetro Telegram chat" /></a>
  <a href="https://ko-fi.com/phnem"><img src="https://img.shields.io/badge/Support-Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Support on Ko-fi" /></a>
</p>

## The ecosystem

| Product | Platform | What it does |
| --- | --- | --- |
| [Vetro Collection](https://github.com/Phnem/Vetro) | Android | A personal library for anime, movies, series, manga and audiobooks. |
| [VetroLook](https://github.com/Phnem/VetroLook) | Windows 10/11 | A native image viewer and local photo library with Quick Look, RAW support and local indexing. |

## This website

A static product hub with three pages, in **English and Russian** (the language is detected from the browser and can be switched in the header; `?lang=ru` / `?lang=en` forces one).

- `index.html` — Vetro Studio: the entry point and route to both products.
- `collection.html` — Vetro Collection: animated phone mockups, a scroll-driven app tour, the trailer, features, sync, downloads (latest APK from GitHub Releases).
- `look.html` — VetroLook: a 3D window mockup, preview video, supported formats, native-performance notes, animated benchmarks, privacy dialog and the MSI download.

### Design

- Poster palette — signal red, cream and ink — with big wide display type, sticker highlights and a ticker.
- **Frosted (matte) glass** surfaces: backdrop blur + fine grain on the header, cards, buttons and the glass "sun" in the hero.
- **Animated mockups.** The app screens are *generated UI* (HTML/SVG, no screenshots): library, episode details, audiobook player, manga reader, Books shelves, the reacting rating face and Settings. They live inside phone frames with a live countdown, auto-scrolling lists, a ticking player and cross-fading carousels. The Collection page pins a phone and swaps its screen as you scroll.
- The trailer (`assets/video/vetro-trailer.mp4`) plays inside a phone mockup, muted by default with a sound toggle.
- Responsive from 320 px to ultra-wide, `prefers-reduced-motion` support, keyboard-accessible menu and dialogs.

### Structure

```
index.html · collection.html · look.html
assets/css/site.css      design system, mockups, app screens, responsive rules
assets/js/i18n.js        English (authored in HTML) + Russian dictionary, language switch
assets/js/screens.js     generated app screens and their live behaviours
assets/js/site.js        navigation, reveal, parallax, showcase, dialogs, GitHub release lookups
assets/video/            trailer + poster
assets/img/og-cover.jpg  social preview
```

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
