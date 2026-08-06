"use client";

import { useState } from "react";

/**
 * Small slices of the real app UI, rebuilt in markup.
 *
 * These deliberately show one control rather than a whole screen — the sort
 * sheet is four rows and a button, not a phone with a blurred library behind
 * it. Everything sizes in `em` off `.frag`, so a single font-size on the
 * wrapper scales a fragment without touching its proportions.
 */

/* ------------------------------------------------------------------ icons */

const I = ({ d, fill }: { d: string; fill?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const D = {
  star: "M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  tv: "M3 5h18v12H3zM8 21h8",
  az: "M4 6h13M4 12h9M4 18h5",
  genres: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  pull: "M12 4v11m0 0l-4-4m4 4l4-4M5 20h14",
  push: "M12 20V9m0 0L8 13m4-4l4 4M5 4h14",
  sync: "M4 10a8 8 0 0113.6-4.6L20 8M20 14a8 8 0 01-13.6 4.6L4 16M20 4v4h-4M4 20v-4h4",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18",
  theme: "M12 3a9 9 0 100 18 4.5 4.5 0 010-9 4.5 4.5 0 000-9z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  skip: "M4 5l8 7-8 7zM13 5l8 7-8 7z",
  next: "M5 5l10 7-10 7zM19 5v14",
};

/* ----------------------------------------------------------------- rating */

// The slider is labelled Normal → Masterpiece in the app, so the verdicts run
// between those two ends. 6.9 lands on "Good", matching the real screen.
const BANDS: [number, string][] = [
  [3, "Normal"],
  [5, "Fine"],
  [7, "Good"],
  [8.5, "Great"],
  [9.4, "Amazing"],
  [10, "Masterpiece"],
];

const RAMP: [number, [number, number, number]][] = [
  [0, [229, 72, 77]],
  [3, [240, 118, 42]],
  [5, [242, 167, 42]],
  [7, [164, 207, 43]],
  [8.5, [95, 182, 42]],
  [10, [47, 143, 47]],
];

const rampAt = (v: number) => {
  let a = RAMP[0];
  let b = RAMP[RAMP.length - 1];
  for (let i = 0; i < RAMP.length - 1; i++) {
    if (v >= RAMP[i][0] && v <= RAMP[i + 1][0]) {
      a = RAMP[i];
      b = RAMP[i + 1];
      break;
    }
  }
  const t = b[0] === a[0] ? 0 : (v - a[0]) / (b[0] - a[0]);
  const c = a[1].map((n, i) => Math.round(n + (b[1][i] - n) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
};

export const RatingFragment = () => {
  const [v, setV] = useState(6.9);
  const colour = rampAt(v);
  const verdict = BANDS.find(([max]) => v <= max)?.[1] ?? "Masterpiece";
  // Frown at zero, wide smile at ten.
  const curve = -5 + (v / 10) * 14;

  return (
    <div className="frag frag-rating" style={{ background: colour }}>
      <svg className="frag-face" viewBox="0 0 40 32" aria-hidden>
        <rect x="8" y="6" width="7" height="9" rx="3.5" />
        <rect x="25" y="6" width="7" height="9" rx="3.5" />
        <path
          d={`M10 22 Q20 ${22 + curve} 30 22`}
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>

      <b className="frag-verdict">{verdict.toUpperCase()}</b>

      <div className="frag-slider">
        <span className="frag-track">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
          <span className="frag-fill" style={{ width: `${100 - v * 10}%` }} />
          <span className="frag-thumb" style={{ left: `${v * 10}%` }} />
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Rating"
        />
      </div>

      <div className="frag-scale">
        <span>Normal</span>
        <b>{v.toFixed(1)}</b>
        <span>Masterpiece</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------- sort */

const SORTS = [
  { icon: D.star, fill: true, name: "Highest Rated", note: "Descending" },
  { icon: D.tv, name: "Episodes", note: "Longer series" },
  { icon: D.az, name: "Name (A–Z)", note: "Alphabetical" },
  { icon: D.genres, name: "By genres", note: "Category type" },
];

export const SortFragment = () => {
  const [sel, setSel] = useState(0);

  return (
    <div className="frag frag-sheet">
      <div className="frag-grabber" aria-hidden />
      <div className="frag-head">
        <b>Sort by</b>
        <span>Organize your collection</span>
      </div>

      {SORTS.map((s, i) => (
        <button
          type="button"
          className={`frag-row${i === sel ? " on" : ""}`}
          key={s.name}
          onClick={() => setSel(i)}
        >
          <span className="frag-ic">
            <I d={s.icon} fill={s.fill} />
          </span>
          <span className="frag-txt">
            <b>{s.name}</b>
            <span>{s.note}</span>
          </span>
          <span className="frag-radio" aria-hidden />
        </button>
      ))}

      <span className="frag-apply">Apply sorting</span>
    </div>
  );
};

/* ------------------------------------------------------------------- sync */

export const SyncFragment = () => (
  <div className="frag frag-sync">
    <div className="frag-account">
      <span className="frag-avatar" aria-hidden />
      <b>My Vetro</b>
      <span className="frag-pill on">Done</span>
      <span className="frag-pill">AUTO</span>
    </div>

    <div className="frag-card">
      <div className="frag-card-head">
        <span className="frag-logo" aria-hidden>
          A
        </span>
        <b>AniList</b>
      </div>
      {[
        { icon: D.pull, name: "Pull", note: "import your collection" },
        { icon: D.push, name: "Push", note: "export your collection" },
        { icon: D.sync, name: "Sync", note: "keep both in step" },
      ].map((r) => (
        <div className="frag-act" key={r.name}>
          <span className="frag-act-ic">
            <I d={r.icon} />
          </span>
          <span className="frag-txt">
            <b>{r.name}</b>
            <span>{r.note}</span>
          </span>
          <em aria-hidden>›</em>
        </div>
      ))}
    </div>
  </div>
);

/* --------------------------------------------------------------- settings */

export const SettingsFragment = () => {
  const [skip, setSkip] = useState(true);
  const [next, setNext] = useState(true);

  return (
    <div className="frag frag-settings">
      {[
        { icon: D.globe, name: "Language", value: "English" },
        { icon: D.theme, name: "Themes", value: "System" },
        { icon: D.grid, name: "Content Type", value: "Anime" },
      ].map((r) => (
        <div className="frag-set" key={r.name}>
          <span className="frag-set-ic">
            <I d={r.icon} />
          </span>
          <b>{r.name}</b>
          <span>{r.value}</span>
          <em aria-hidden>›</em>
        </div>
      ))}

      {[
        { icon: D.skip, name: "Auto-skip", on: skip, set: setSkip },
        { icon: D.next, name: "Next episode", on: next, set: setNext },
      ].map((r) => (
        <button
          type="button"
          className="frag-set"
          key={r.name}
          onClick={() => r.set((x) => !x)}
          aria-pressed={r.on}
        >
          <span className="frag-set-ic">
            <I d={r.icon} fill />
          </span>
          <b>{r.name}</b>
          <span className={`frag-switch${r.on ? " on" : ""}`} aria-hidden>
            <i />
          </span>
        </button>
      ))}
    </div>
  );
};
