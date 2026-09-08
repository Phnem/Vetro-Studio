<p align="center">
  <img src="vetro-studio-icon.png" alt="Vetro Studio" width="112" />
</p>

<h1 align="center">Vetro Studio</h1>

<p align="center">
  The home of the Vetro ecosystem: local-first software for the media and photos you keep.
</p>

<p align="center">
  <a href="https://phnem.github.io/Vetro-Studio/"><img src="https://img.shields.io/badge/Website-Live-FF3D00?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live website" /></a>
  <a href="https://github.com/Phnem/Vetro-Studio"><img src="https://img.shields.io/badge/Source-Vetro%20Studio-181717?style=for-the-badge&logo=github&logoColor=white" alt="Vetro Studio source" /></a>
  <a href="https://t.me/Vetro_chat"><img src="https://img.shields.io/badge/Telegram-Vetro__chat-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Vetro Telegram chat" /></a>
  <a href="https://ko-fi.com/phnem"><img src="https://img.shields.io/badge/Support-Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Support on Ko-fi" /></a>
</p>

## The ecosystem

| Product | Platform | What it does |
| --- | --- | --- |
| [Vetro Collection](https://github.com/Phnem/Vetro) | Android | A personal media library for anime, manga, manhwa, films and series. |
| [VetroLook](https://github.com/Phnem/VetroLook) | Windows 10/11 | A native image viewer and local photo library with Quick Look, RAW support and local indexing. |

## This website

Vetro Studio is a static product hub with three pages:

- `index.html`: the Vetro Studio entry point and route to both products.
- `collection.html`: the Vetro Collection landing page, preserved from the original site.
- `look.html`: VetroLook's product page with a video preview, supported formats, native-performance details, privacy commitment and the MSI download area.

### Highlights

- Vetro Studio identity and favicon built around the new ecosystem icon.
- Local-first product positioning: no forced cloud, account or upload requirement.
- Direct downloads through GitHub Releases APIs. VetroLook selects an `.msi` installer when it is published.
- Responsive UI with reduced-motion support and IntersectionObserver-powered reveal transitions.
- VetroLook preview video uses the original uploaded MP4 with native browser controls and audio enabled by default.

## Technology

- Semantic HTML5
- CSS3 with custom properties, Grid, Flexbox, media queries and reduced-motion fallbacks
- Vanilla JavaScript for GitHub Releases API integration and reveal choreography
- [Manrope](https://fonts.google.com/specimen/Manrope) and [DM Mono](https://fonts.google.com/specimen/DM+Mono)

## Run locally

No build process or dependencies are required.

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
