"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Device from "@/components/Device";
import { useReveal } from "@/lib/useReveal";

const SCREENS = [
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

const SPEC = [
  { label: "Current build", value: "V3.3.4-Beta" },
  { label: "Requires", value: "Android 8.0 (API 26)+" },
  { label: "Licence", value: "MIT" },
  { label: "Languages", value: "English · Russian" },
  { label: "Media types", value: "Anime · Manga · Manhwa · Movies · TV" },
  { label: "Account", value: "Optional — local-first core" },
];

export default function Collection() {
  const root = useRef<HTMLDivElement>(null);

  useReveal(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".page-hero .shell > *", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <header className="page-hero">
        <div className="shell">
          <p className="eyebrow hot">Vetro Collection · V3.3.4-Beta</p>
          <h1>Every screen, as it actually looks.</h1>
          <p className="lede">
            Ten screens from the current development build — collection,
            playback, reading, statistics and settings. Each one is rebuilt in
            markup, so it stays sharp at any size.
          </p>
          <div
            className="cta-actions"
            style={{ justifyContent: "flex-start", marginTop: "2rem" }}
          >
            <a
              href="https://github.com/Phnem/Vetro/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Download
            </a>
            <a
              href="https://github.com/Phnem/Vetro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </header>

      <section
        className="section"
        style={{ paddingTop: "clamp(2rem, 5vw, 4rem)" }}
      >
        <div className="shell">
          <div className="gallery" data-stagger>
            {SCREENS.map((s) => (
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Specification</p>
            <h2 className="h2" data-fx>
              The short version.
            </h2>
            <p className="lede" data-fx>
              Vetro is a Kotlin and Jetpack Compose application with SQLDelight
              storage, WorkManager downloads and Media3 playback. An account and
              cloud features stay optional throughout.
            </p>
          </div>

          <div className="stack-list" data-stagger>
            {SPEC.map((s) => (
              <div className="stack-row" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="shell cta-inner">
          <p className="eyebrow hot" data-fx>
            Four ways to install
          </p>
          <h2 data-fx>Start your collection.</h2>
          <p data-fx>
            Grab the APK from GitHub Releases, or install through F-Droid, Komi
            Store or Obtainium and let it keep itself updated.
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
            <Link href="/">Home</Link>
            <a
              href="https://github.com/Phnem/Vetro"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://t.me/Vetro_chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
