"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Device from "@/components/Device";
import {
  RatingFragment,
  SettingsFragment,
  SortFragment,
  SyncFragment,
} from "@/components/Fragments";
import Shot from "@/components/Shot";
import MockupGallery from "@/components/MockupGallery";
import { useActiveIndex, useReveal } from "@/lib/useReveal";

/* ------------------------------------------------------------------ data */

const STEPS = [
  {
    shot: "collection",
    kicker: "Collection",
    title: "Everything you follow, on one screen.",
    body: "Anime, manga, manhwa, films and series live in the same library. Cover art, genre tags, a 0.0–10.0 score and a progress bar per title — plus favourites, notes and comments when you want them.",
    tags: ["Favourites", "Genres", "Progress", "Notes"],
  },
  {
    shot: "details",
    kicker: "Title details",
    title: "Open a title, get the whole picture.",
    body: "Rating, episode count, genres and every source that currently carries the title. Watch straight away with the built-in player, or send a season to the download queue.",
    tags: ["Sources", "Rating", "Watch", "Download"],
  },
  {
    shot: "seasons",
    kicker: "Seasons & downloads",
    title: "Multi-season detection that holds up.",
    body: "Seasons are grouped the way the show actually shipped. Pick a quality, grab a single episode or a full season, and let resilient HLS downloads report job progress while you keep browsing.",
    tags: ["HLS", "Per-season", "Quality", "Job progress"],
  },
  {
    shot: "manga",
    kicker: "Reader",
    title: "Manga and manhwa, volume by volume.",
    body: "Chapters come from supported manga sources and can be downloaded for offline reading. Vertical webtoon or paged layout, configurable page direction, and your position remembered per title.",
    tags: ["Webtoon", "Paged", "RTL / LTR", "Offline"],
  },
  {
    shot: "stats",
    kicker: "Statistics",
    title: "See what your taste actually looks like.",
    body: "Genre quality across the whole library, average score and title count per genre, and breakdown cards you can swipe through — built entirely from your own collection.",
    tags: ["Genre quality", "Averages", "Breakdowns"],
  },
  {
    shot: "recommend",
    kicker: "Recommendations",
    title: "Picks that come from your library.",
    body: "Suggestions are derived from what you have already rated and finished, shown as a deck with the title it was matched against. One tap adds it to the collection.",
    tags: ["Similar titles", "One-tap add", "Swipe deck"],
  },
];

const GALLERY_SCREENS = [
  {
    shot: "collection",
    title: "Collection",
    body: "The home surface: recommendations strip, favourites, genre tags, scores and a progress bar on every card.",
  },
  {
    shot: "details",
    title: "Title details",
    body: "Rating, episode count, genres and the sources carrying the title. Watch or queue a download from the same row.",
  },
  {
    shot: "seasons",
    title: "Seasons",
    body: "Grouped by how the show actually shipped, with a quality picker and per-season download buttons.",
  },
  {
    shot: "manga",
    title: "Volumes & chapters",
    body: "Filter by unread or downloaded, expand a volume to its chapters, and pull chapters down for offline reading.",
  },
  {
    shot: "stats",
    title: "Watch stats",
    body: "Genre quality across the library — average score and title count per genre, as a swipeable card deck.",
  },
  {
    shot: "recommend",
    title: "Recommendations",
    body: "A deck of picks derived from your collection, each labelled with the title it was matched against.",
  },
  {
    shot: "rating",
    title: "Rating",
    body: "Normal to Masterpiece on a single drag. The screen reacts as the score changes, then stores a 0.0–10.0 value.",
  },
  {
    shot: "sort",
    title: "Sorting",
    body: "Highest rated, longest series, alphabetical or grouped by genre — applied across every media type.",
  },
  {
    shot: "sync",
    title: "Sync services",
    body: "MyAnimeList, AniList and Shikimori, each with pull, push or automatic two-way sync.",
  },
  {
    shot: "settings",
    title: "Settings",
    body: "Language, theme, default content type, account, collection enrichment, BYOK AI, auto-skip and auto-next.",
  },
];

const MARQUEE_COPIES = 6;

const STATS = [
  { value: "5", label: "Media types in a single library", count: 5 },
  { value: "3", label: "Lists you can sync with", count: 3, hot: true },
  { value: "26", label: "Minimum Android API (8.0)", count: 26 },
  { value: "MIT", label: "Open-source licence" },
];

const CHANGELOG = [
  {
    tag: "Playback",
    title: "English sources fixed",
    body: "Streaming and download fixes across providers, smarter available-episode logic for ongoing seasons, and stronger multi-season detection.",
  },
  {
    tag: "Player",
    title: "Immersive controls",
    body: "Same-URL retry before falling back, pinch zoom and pan, opening skip, automatic episode switching and a redesigned progress bar.",
  },
  {
    tag: "Collection",
    title: "Sharper library",
    body: "Redesigned visual search, duplicate prevention when adding titles, and a reworked recommendation algorithm behind the deck.",
  },
];

const STACK = [
  { name: "Kotlin · Compose", note: "Navigation Compose and Material 3" },
  { name: "Koin · Flow", note: "Immutable UI state, unidirectional flow" },
  { name: "SQLDelight", note: "Local-first storage and preferences" },
  { name: "WorkManager", note: "Long-running resilient downloads" },
  { name: "Ktor · Apollo", note: "Metadata and provider adapters" },
  { name: "Media3 · ExoPlayer", note: "Streaming and local playback" },
];

/* ------------------------------------------------------------- primitives */

/**
 * Splits a line into per-word masks so GSAP can slide each word up.
 * The space between masks has to be a real text node — adjacent inline-blocks
 * with no whitespace between them form a single unbreakable run.
 */
const Words = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <span className="w">
          <span>{word}</span>
        </span>{" "}
      </Fragment>
    ))}
  </>
);

/* ------------------------------------------------------------------ icons */

const Icon = ({ d }: { d: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const PATHS = {
  star: "M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  sliders: "M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0",
  sync: "M4 10a8 8 0 0113.6-4.6L20 8M20 14a8 8 0 01-13.6 4.6L4 16M20 4v4h-4M4 20v-4h4",
  play: "M6 4l14 8-14 8z",
  folder: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  shield: "M12 3l8 3v6c0 4.4-3.2 7.9-8 9-4.8-1.1-8-4.6-8-9V6z",
  spark: "M12 3v6M12 15v6M3 12h6M15 12h6M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3",
  box: "M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8",
};

/* ------------------------------------------------------------------ page */

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useReveal(root);
  useActiveIndex(root, ".step", setActive);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      /* ---- hero intro ---- */
      {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-meta div", {
          y: 14,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
        })
          .from(
            ".hero-line > span",
            { yPercent: 108, duration: 1.05, stagger: 0.08 },
            0.1,
          )
          .from(".hero-sub", { y: 18, opacity: 0, duration: 0.8 }, 0.5)
          .from(
            ".hero-watermark",
            { opacity: 0, scale: 1.08, duration: 1.4 },
            0.35,
          )
          .from(
            ".hero-device",
            { y: 90, opacity: 0, scale: 0.96, duration: 1.2 },
            0.45,
          )
          .from(
            ".hero-note",
            { opacity: 0, y: 12, duration: 0.7, stagger: 0.1 },
            1,
          )
          .from(
            ".hero-foot > *",
            { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
            0.9,
          );

        /* ---- hero parallax ---- */
        gsap.to(".hero-watermark", {
          yPercent: 26,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(".hero-device", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

    }, el);

    return () => ctx.revert();
  }, []);

  /* ---- number count-up, fired the first time each stat is seen ---- */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          io.unobserve(node);

          const target = Number(node.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.3,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = String(Math.round(obj.v));
            },
          });
        });
      },
      { threshold: 0.4 },
    );

    el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* pointer-tracked glow on cards */
  const trackGlow = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={root}>
      {/* ============================== HERO ============================== */}
      <section className="hero">
        <div className="hero-wash" aria-hidden />
        <div className="hero-grain" aria-hidden />

        <div className="shell">
          <div className="hero-meta">
            <div>
              <span>Platform</span>
              <strong>Android 8.0+</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>Media library</strong>
            </div>
            <div>
              <span>Build</span>
              <strong>V3.3.4-Beta</strong>
            </div>
            <div>
              <span>Vetro®</span>
              <strong>Collection</strong>
            </div>
          </div>

          <div className="hero-head">
            <h1 className="hero-title">
              <span className="hero-line">
                <span>Collect. Watch.</span>
              </span>
              <span className="hero-line">
                <span>Read. Remember.</span>
              </span>
              <span className="hero-line">
                <span className="fade">Everything.</span>
              </span>
            </h1>
            <div className="hero-aside">
              <p className="hero-sub">
                A local-first Android library for anime, manga, manhwa, movies
                and TV. Track where you left off, stream or download it, and
                keep the whole collection working offline.
              </p>
              <div className="hero-actions">
                <a
                  href="https://github.com/Phnem/Vetro/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download the APK
                </a>
                <Link href="/#gallery" className="btn btn-ghost">
                  See every screen
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-watermark" aria-hidden>
            VETRO
          </div>

          <div className="hero-notes" aria-hidden>
            <aside className="hero-note note-a">
              <strong>Library</strong>
              Anime, manga, manhwa, films, series
            </aside>
            <aside className="hero-note note-b">
              <strong>Offline</strong>
              Downloads that survive a bad connection
            </aside>
            <aside className="hero-note note-c">
              <strong>Progress</strong>
              Episodes and chapters, per title
            </aside>
            <aside className="hero-note note-d">
              <strong>Sync</strong>
              Your Vetro account, MAL, AniList, Shikimori
            </aside>
          </div>

          <div className="hero-device">
            <Device src="collection" />
          </div>
        </div>

        <div className="shell hero-foot">
          <p>Free and open source · MIT · source availability varies by region</p>
          <p>Scroll</p>
        </div>
      </section>

      {/* ============================ MARQUEE ============================= */}
      {/* Six copies, shifted by exactly one — the track has to stay wider than
          the viewport at every point of the loop or a gap appears at the end. */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: MARQUEE_COPIES }, (_, k) => (
            <div className="marquee-item" key={k}>
              <span>Anime</span> <i /> <span>Manga</span> <i />{" "}
              <span>Manhwa</span> <i /> <span>Movies</span> <i />{" "}
              <span>TV series</span> <i />
            </div>
          ))}
        </div>
      </div>

      {/* =========================== STATEMENT =========================== */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow hot" data-fx="up">
            Local-first by design
          </p>
          <h2 className="statement words" style={{ marginTop: 24 }}>
            <Words text="Your collection lives on your device. Sync it when you want it everywhere." />
          </h2>
          <p className="lede" style={{ marginTop: 28 }} data-fx="up">
            Bad connection, divided attention, switching between four titles in
            an evening, coming back a month later and having no idea which
            episode you were on — Vetro is built around all of it. Build a
            library, discover new titles, then watch or read without leaving the
            app.
          </p>

          <div className="stat-grid" data-stagger>
            {STATS.map((s) => (
              <div className={`stat${s.hot ? " hot" : ""}`} key={s.label}>
                <b {...(s.count !== undefined ? { "data-count": s.count } : {})}>
                  {s.value}
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== SHOWCASE ============================ */}
      <section id="screens" className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Inside the app</p>
            <h2 className="h2 words">
              <Words text="Six screens that do the work." />
            </h2>
            <p className="lede" data-fx="up">
              Real screenshots from the current build. Scroll through and the
              phone keeps up.
            </p>
          </div>

          <MockupGallery />

          <div className="showcase-grid">
            <div className="showcase-steps">
              {STEPS.map((step, i) => (
                <article
                  className={`step${i === active ? " is-active" : ""}`}
                  key={step.shot}
                >
                  <div className="step-index">
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    {step.kicker}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className="step-tags">
                    {step.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="showcase-sticky">
              <div className="showcase-device">
                <div className="device">
                  <div className="shot-stack">
                    {STEPS.map((step, i) => (
                      <div
                        key={step.shot}
                        className={`shot-layer${i === active ? " is-active" : ""}`}
                        aria-hidden={i !== active}
                      >
                        <Shot name={step.shot} />
                      </div>
                    ))}
                    <span className="device-glare" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= CARDS ============================= */}
      <section id="features" className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Beyond the basics</p>
            <h2 className="h2 words">
              <Words text="Details you only notice later." />
            </h2>
          </div>

          <div className="cards" data-stagger>
            <article className="card wide" onMouseMove={trackGlow}>
              <div className="card-copy">
                <div className="card-icon">
                  <Icon d={PATHS.star} />
                </div>
                <h3>Rating that isn&apos;t a number field.</h3>
                <p>
                  Drag from Normal to Masterpiece and the whole screen answers
                  back — colour, face and verdict move with the score. It still
                  writes a plain 0.0–10.0 value to your collection.
                </p>
              </div>
              <div className="card-frag">
                <RatingFragment />
              </div>
            </article>

            <article className="card" onMouseMove={trackGlow}>
              <div className="card-icon">
                <Icon d={PATHS.play} />
              </div>
              <h3>A player built for binges.</h3>
              <p>
                Picture-in-picture, episode navigation, optional auto-next and
                auto-skip for openings, endings and recaps, pinch zoom and pan.
              </p>
            </article>

            <article className="card" onMouseMove={trackGlow}>
              <div className="card-icon">
                <Icon d={PATHS.folder} />
              </div>
              <h3>Video you already own.</h3>
              <p>
                Point a title at a folder on the device and Vetro plays what is
                stored there — no source, no network, no re-download.
              </p>
            </article>

            <article className="card wide" onMouseMove={trackGlow}>
              <div className="card-copy">
                <div className="card-icon">
                  <Icon d={PATHS.sliders} />
                </div>
                <h3>Sorting for libraries that got big.</h3>
                <p>
                  Highest rated, longest series, alphabetical or grouped by
                  genre — applied across media types, so a 900-title collection
                  stays something you can actually navigate.
                </p>
              </div>
              <div className="card-frag">
                <SortFragment />
              </div>
            </article>

            <article className="card wide" onMouseMove={trackGlow}>
              <div className="card-copy">
                <div className="card-icon">
                  <Icon d={PATHS.sync} />
                </div>
                <h3>Bring your lists with you.</h3>
                <p>
                  Sign in to your Vetro account for encrypted sync and backup,
                  then connect MyAnimeList, AniList or Shikimori and pick a
                  direction — pull in, push out, or keep both sides in step.
                </p>
              </div>
              <div className="card-frag">
                <SyncFragment />
              </div>
            </article>

            <article className="card" onMouseMove={trackGlow}>
              <div className="card-icon">
                <Icon d={PATHS.shield} />
              </div>
              <h3>Nothing leaves without a reason.</h3>
              <p>
                Requests happen when you search online, open a source, sync,
                check for updates or call an AI provider. Otherwise the library
                is just files on your phone.
              </p>
            </article>

            <article className="card" onMouseMove={trackGlow}>
              <div className="card-icon">
                <Icon d={PATHS.box} />
              </div>
              <h3>Yours to take out.</h3>
              <p>
                Backup and restore, import/export utilities, a shareable PDF
                export of the collection, plus database maintenance and
                diagnostics in Developer Settings.
              </p>
            </article>

            <article className="card wide" onMouseMove={trackGlow}>
              <div className="card-copy">
                <div className="card-icon">
                  <Icon d={PATHS.spark} />
                </div>
                <h3>Set it up once, then forget it.</h3>
                <p>
                  Light and dark themes, English and Russian, a default content
                  type, collection enrichment for missing metadata, and an
                  optional Bring Your Own Key connection for AI-assisted
                  features.
                </p>
              </div>
              <div className="card-frag">
                <SettingsFragment />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================ GALLERY ============================= */}
      <section id="gallery" className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Every screen</p>
            <h2 className="h2 words">
              <Words text="Ten screens, as they actually look." />
            </h2>
            <p className="lede" data-fx="up">
              Straight from the current build — collection, playback, reading,
              statistics and settings. Each mockup below is a real
              screenshot.
            </p>
          </div>

          <div className="gallery" data-stagger>
            {GALLERY_SCREENS.map((s) => (
              <figure key={s.shot}>
                <Device src={s.shot} />
                <figcaption>
                  <b>{s.title}</b>
                  {s.body}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== CHANGELOG =========================== */}
      <section id="whats-new" className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow hot">What&apos;s new</p>
            <h2 className="h2 words">
              <Words text="V3.3.4-Beta." />
            </h2>
            <p className="lede" data-fx="up">
              The build is actively evolving. Expect frequent releases and the
                occasional rough edge.
            </p>
          </div>

          <div className="log" data-stagger>
            {CHANGELOG.map((item) => (
              <div className="log-item" key={item.title}>
                <span className="log-tag">
                  <i />
                  {item.tag}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= STACK ============================= */}
      <section id="stack" className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Under the hood</p>
            <h2 className="h2 words">
              <Words text="Built like an app, not a wrapper." />
            </h2>
            <p className="lede" data-fx="up">
              Kotlin and Jetpack Compose throughout, organised around a
              unidirectional state flow with modular data, domain and UI layers.
            </p>
          </div>

          <div className="stack-list" data-stagger>
            {STACK.map((s) => (
              <div className="stack-row" key={s.name}>
                <b>{s.name}</b>
                <span>{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section id="install" className="cta">
        <div className="shell cta-inner">
          <p className="eyebrow hot" data-fx="up">
            Android 8.0+ · MIT
          </p>
          <h2 className="words">
            <Words text="Get Vetro on your phone." />
          </h2>
          <p data-fx="up">
            Pick whichever channel you already use. Sign in to your Vetro
            account to sync and back up the collection — the library itself
            stays on the device.
          </p>
          <div className="cta-actions" data-stagger>
            <a
              href="https://github.com/Phnem/Vetro/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              GitHub Releases
            </a>
            <a
              href="https://f-droid.org/packages/com.phnem.vetro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              F-Droid
            </a>
            <a
              href="https://github-store.org/app?repo=Phnem/Vetro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Komi Store
            </a>
            <a
              href="obtainium://app/add?url=https://github.com/Phnem/Vetro"
              className="btn btn-ghost"
            >
              Obtainium
            </a>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================= */}
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand-mark">
              vetro
            </Link>
            <p>
              Vetro Collection — a local-first media library for Android.
              Released under the MIT License.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/#gallery">Gallery</Link>
            <a
              href="https://github.com/Phnem/Vetro"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/Phnem/Vetro/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discussions
            </a>
            <a
              href="https://t.me/Vetro_chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              href="https://web.tribute.tg/e/Tb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
