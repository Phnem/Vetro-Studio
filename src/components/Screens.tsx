import type { CSSProperties, ReactNode } from "react";

/**
 * The app's screens rebuilt in markup — no captures anywhere on the site.
 *
 * Every screen is laid out in `em` against a 24em-wide viewport, and the
 * `.scr` font-size is derived from the phone's own width with container
 * query units. One number therefore scales a whole screen, and the same
 * component serves the hero, the sticky showcase and the gallery.
 *
 * Cover art is generated rather than copied: real covers are someone else's
 * artwork, so titles get a deterministic abstract poster instead.
 */

const vars = (o: Record<string, string>) => o as CSSProperties;

/* ------------------------------------------------------------------ icons */

type IconProps = { d: string; fill?: boolean; w?: number };

const Ic = ({ d, fill, w = 2 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const P = {
  sort: "M4 7h13M4 12h9M4 17h5",
  box: "M4 9h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2zM6 4h12l2 5H4z",
  kebab: "M12 5.2v.1M12 12v.1M12 18.8v.1",
  arrow: "M5 12h13m0 0l-5-5m5 5l-5 5",
  back: "M19 12H5m0 0l6-6m-6 6l6 6",
  star: "M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  play: "M7 4l13 8-13 8z",
  down: "M12 4v12m0 0l-5-5m5 5l5-5M5 20h14",
  pen: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  plus: "M12 5v14M5 12h14",
  gear: "M12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8zM19.5 12a7.5 7.5 0 00-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 00-2-1.2L14.7 3h-4l-.4 2.7c-.7.3-1.4.7-2 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 000 2.4l-2 1.5 2 3.4 2.3-1c.6.5 1.3.9 2 1.2l.4 2.7h4l.4-2.7c.7-.3 1.4-.7 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4",
  frame: "M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3",
  info: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 11v5M12 7.6v.1",
  book: "M4 5h7v14H4zM13 5h7v14h-7zM11 5h2v14h-2z",
  chevron: "M8 10l4 4 4-4",
  right: "M10 7l5 5-5 5",
  refresh: "M4 10a8 8 0 0113.6-4.6L20 8M20 14a8 8 0 01-13.6 4.6L4 16M20 4v4h-4M4 20v-4h4",
  swap: "M4 9h14m0 0l-3-3m3 3l-3 3M20 15H6m0 0l3-3m-3 3l3 3",
  bookmark: "M7 4h10v16l-5-4-5 4z",
  hd: "M4 6h16v12H4zM8 10v4M8 12h3M11 10v4M14 10v4h1.5a1.5 1.5 0 001.5-1.5v-1A1.5 1.5 0 0015.5 10z",
  seasons: "M4 5h16v14H4zM10 9l5 3-5 3z",
  arrowDown: "M12 5v13m0 0l-5-5m5 5l5-5",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18",
  theme: "M12 3a9 9 0 100 18 4.5 4.5 0 010-9 4.5 4.5 0 000-9z",
  ffwd: "M4 5l8 7-8 7zM13 5l8 7-8 7z",
  nextEp: "M5 5l10 7-10 7zM19 5v14",
  person: "M12 4a3.6 3.6 0 100 7.2A3.6 3.6 0 0012 4zM5 20a7 7 0 0114 0",
  wand: "M4 20l10-10M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.6 1.2 1.4.6-1.4.6-.6 1.2-.6-1.2-1.4-.6 1.4-.6z",
  sparkle: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  close: "M6 6l12 12M18 6L6 18",
  signout: "M14 4h4a1 1 0 011 1v14a1 1 0 01-1 1h-4M10 8l-4 4 4 4M6 12h10",
};

/* ---------------------------------------------------------------- posters */

/** Deterministic abstract cover art, so no real artwork is reproduced. */
const PALETTE = [
  ["#ffb020", "#e0450f", "#5c1600"],
  ["#8fd3f4", "#2b6cd4", "#08203f"],
  ["#c7f0a8", "#3f9b3f", "#0d2c14"],
  ["#ffd0e0", "#c0407a", "#3d0d24"],
  ["#d9cdb4", "#8a6b3d", "#2a1c0c"],
  ["#b9b6ff", "#5340c4", "#170f3d"],
  ["#ff9f7a", "#c22f2f", "#3b0b0b"],
  ["#a8e6e2", "#1f8b86", "#062b29"],
];

export const Poster = ({
  i = 0,
  className,
}: {
  i?: number;
  className?: string;
}) => {
  const [a, b, c] = PALETTE[i % PALETTE.length];
  return (
    // The wash is a CSS gradient rather than an SVG one: the same poster
    // renders many times per page, and shared <defs> ids would all resolve
    // to whichever copy happens to come first in the document.
    <span
      className={`poster${className ? ` ${className}` : ""}`}
      style={vars({ background: `linear-gradient(165deg, ${a}, ${b})` })}
    >
      <svg viewBox="0 0 60 84" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <circle cx={i % 2 ? 18 : 42} cy="23" r="11" fill="#fff" opacity="0.3" />
        <path d="M0 58 Q15 42 30 54 T60 48 L60 84 L0 84Z" fill={c} opacity="0.55" />
        <path d="M0 70 Q18 58 34 67 T60 62 L60 84 L0 84Z" fill={c} />
        <rect x="26" y="38" width="8" height="30" rx="4" fill={c} opacity="0.7" />
      </svg>
    </span>
  );
};

/* -------------------------------------------------------------- furniture */

const TopIcons = () => (
  <span className="scr-tools">
    <i>
      <Ic d={P.sort} />
    </i>
    <i>
      <Ic d={P.box} />
    </i>
    <i>
      <Ic d={P.kebab} w={2.6} />
    </i>
  </span>
);

const BottomNav = () => (
  <>
    <span className="scr-fab" aria-hidden>
      <Ic d={P.search} />
    </span>
    <span className="scr-nav" aria-hidden>
      {[
        { d: P.frame, l: "Frame" },
        { d: P.grid, l: "Stats" },
        { d: P.plus, l: "Add" },
        { d: P.gear, l: "Settings" },
      ].map((n) => (
        <b key={n.l}>
          <Ic d={n.d} />
          {n.l}
        </b>
      ))}
    </span>
  </>
);

const PlayBar = ({ label, icon }: { label: string; icon: string }) => (
  <span className="scr-playbar" aria-hidden>
    <span className="scr-playbar-pill">
      <i className="dim">
        <Ic d={P.info} />
      </i>
      <b>
        <Ic d={icon} fill />
        {label}
      </b>
    </span>
    <i className="scr-playbar-go">
      <Ic d={P.play} fill />
    </i>
  </span>
);

const Sheet = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`scr-sheet${className ? ` ${className}` : ""}`}>
    <span className="scr-grab" aria-hidden />
    {children}
  </div>
);

/* ------------------------------------------------------------- collection */

const LIBRARY = [
  {
    t: "Food Wars!",
    r: "8.0",
    g: ["Ecchi", "School", "Shounen"],
    p: 49,
    n: 87,
    e: "24 eps.",
    fav: true,
  },
  {
    t: "Bottom-Tier Character Tomoz…",
    r: "7.0",
    g: ["Drama", "Romance", "School"],
    p: 16,
    n: 25,
    e: "12 eps.",
    fav: true,
  },
  {
    t: "Naruto",
    r: "9.4",
    g: ["Action", "Adventure", "Fantasy"],
    p: 812,
    n: 1015,
    e: "1015 eps.",
  },
];

const CollectionScreen = () => (
  <div className="scr scr-collection">
    <div className="scr-head">
      <div className="scr-title">
        <b>Collection</b>
        <TopIcons />
      </div>
      <span>Everything you&apos;ve watched so far</span>
    </div>

    <div className="scr-banner">
      <div className="scr-banner-copy">
        <em>RECOMMENDED FOR YOU</em>
        <b>Watch Recommended</b>
        <span>Picks based on your collection</span>
      </div>
      <span className="scr-banner-art" aria-hidden>
        <Poster i={1} />
        <Poster i={2} />
        <i>
          <Ic d={P.arrow} />
        </i>
      </span>
    </div>

    {LIBRARY.map((m, i) => (
      <article className={`scr-item${m.fav ? " fav" : ""}`} key={m.t}>
        {m.fav && (
          <span className="scr-fav" aria-hidden>
            <Ic d={P.star} fill w={0} />
          </span>
        )}
        <span className="scr-cover">
          <Poster i={i} />
          <em>Anime</em>
        </span>
        <div className="scr-item-body">
          <div className="scr-item-top">
            <h4>{m.t}</h4>
            <span className="scr-score">
              <Ic d={P.star} fill w={0} />
              {m.r}
            </span>
          </div>
          <div className="scr-chips">
            {m.g.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
          <div className="scr-prog">
            <div>
              <span>Progress</span>
              <span>
                {m.p} / {m.n} ep.
              </span>
            </div>
            <span className="scr-bar">
              <i style={{ width: `${(m.p / m.n) * 100}%` }} />
            </span>
          </div>
          <div className="scr-item-foot">
            <span>{m.e}</span>
            <span className="scr-srcs" aria-hidden>
              <i />
              <i />
            </span>
            <span className="scr-edit">
              <Ic d={P.pen} />
              Edit
            </span>
          </div>
        </div>
      </article>
    ))}

    <BottomNav />
  </div>
);

/* ---------------------------------------------------------------- details */

const DetailsScreen = () => (
  <div className="scr scr-details">
    <span className="scr-art" aria-hidden>
      <Poster i={0} />
    </span>
    <span className="scr-back" aria-hidden>
      <Ic d={P.back} />
    </span>

    <Sheet className="scr-details-sheet">
      <h3>Naruto</h3>
      <div className="scr-actions">
        <span className="scr-icon-btn">
          <Ic d={P.bookmark} />
        </span>
        <span className="scr-btn hot">
          <Ic d={P.play} fill w={0} />
          Watch
        </span>
        <span className="scr-btn light">
          <Ic d={P.down} />
          Download
        </span>
      </div>
      <span className="scr-srcs big" aria-hidden>
        <i />
        <i />
        <i />
      </span>

      <h5>Information</h5>
      <div className="scr-info">
        {[
          { d: P.star, k: "RATING", v: "10.0/10" },
          { d: P.sort, k: "EPISODES", v: "1015 ep." },
        ].map((c) => (
          <div key={c.k}>
            <i>
              <Ic d={c.d} fill={c.d === P.star} w={c.d === P.star ? 0 : 2} />
            </i>
            <span>
              <em>{c.k}</em>
              <b>{c.v}</b>
            </span>
          </div>
        ))}
      </div>

      <h5>Genres</h5>
      <div className="scr-chips wrap">
        {["Action", "Adventure", "Fantasy", "Martial Arts", "Shounen"].map(
          (g) => (
            <span key={g}>{g}</span>
          ),
        )}
      </div>
    </Sheet>

    <PlayBar label="Details" icon={P.info} />
  </div>
);

/* ---------------------------------------------------------------- seasons */

const SeasonsScreen = () => (
  <div className="scr scr-seasons">
    <span className="scr-back solo" aria-hidden>
      <Ic d={P.back} />
    </span>
    <h3>Naruto</h3>

    <div className="scr-chips">
      <span>
        <Ic d={P.seasons} />2 seasons
      </span>
      <span className="hot">
        <Ic d={P.play} fill w={0} />
        720 ep.
      </span>
      <span>
        <Ic d={P.hd} />
        Quality
        <Ic d={P.pen} />
      </span>
    </div>

    {[
      { n: "Season 1", e: "220 episodes", s: "Naruto", i: 0 },
      { n: "Season 2", e: "500 episodes", s: "Naruto: Shippuden", i: 0 },
    ].map((s) => (
      <div className="scr-season" key={s.n}>
        <span className="scr-cover sm">
          <Poster i={s.i} />
        </span>
        <span className="scr-txt">
          <b>{s.n}</b>
          <span>{s.e}</span>
          <em>{s.s}</em>
        </span>
        <i className="chev">
          <Ic d={P.chevron} />
        </i>
        <i className="dl">
          <Ic d={P.arrowDown} />
        </i>
      </div>
    ))}

    <span className="scr-find">Find more</span>
    <PlayBar label="Episodes" icon={P.play} />
  </div>
);

/* ------------------------------------------------------------------ manga */

const VOLS = [
  { n: 80, c: 7 },
  { n: 79, c: 11 },
  { n: 78, c: 7 },
  { n: 77, c: 15 },
  { n: 76, c: 11 },
  { n: 75, c: 11 },
  { n: 74, c: 9 },
];

const MangaScreen = () => (
  <div className="scr scr-manga">
    <div className="scr-title tight">
      <b>Kingdom</b>
      <span className="scr-tools">
        <i>
          <Ic d={P.refresh} />
        </i>
        <i>
          <Ic d={P.swap} />
        </i>
      </span>
    </div>

    <div className="scr-chips">
      <span>874 ch.</span>
      <span>Vol. 1–80</span>
      <span>remanga</span>
    </div>

    <div className="scr-chips tabs">
      <span className="on">Chapters (874)</span>
      <span>Unread (874)</span>
      <span>Downloaded (0)</span>
      <i className="scr-round">
        <Ic d={P.arrowDown} />
      </i>
    </div>

    {VOLS.map((v) => (
      <div className="scr-vol" key={v.n}>
        <span className="scr-cover sm">
          <Poster i={6} />
        </span>
        <span className="scr-txt">
          <b>Vol. {v.n}</b>
          <span>
            {v.c} ch. · Read 0/{v.c}
          </span>
        </span>
        <i className="dl">
          <Ic d={P.arrowDown} />
        </i>
        <i className="chev">
          <Ic d={P.chevron} />
        </i>
      </div>
    ))}

    <PlayBar label="Chapters" icon={P.book} />
  </div>
);

/* ------------------------------------------------------------------ stats */

const GENRES = [
  { n: "Drama", v: "8,44", c: 31, h: 100, col: "#f26a1b" },
  { n: "Shounen", v: "7,17", c: 36, h: 74, col: "#dfd0bb" },
  { n: "Action", v: "7,14", c: 108, h: 79, col: "#c81111" },
  { n: "Adventure", v: "6,95", c: 86, h: 72, col: "#ffb570" },
  { n: "Sci-Fi", v: "6,42", c: 14, h: 65, col: "#8b8b8b" },
];

const StatsScreen = () => (
  <div className="scr scr-stats">
    <span className="scr-tools float">
      <i>
        <Ic d={P.sort} />
      </i>
      <i>
        <Ic d={P.box} />
      </i>
      <i>
        <Ic d={P.kebab} w={2.6} />
      </i>
    </span>

    <Sheet>
      <h3>Your Watch Stats</h3>
      <span className="scr-sub">Everything you&apos;ve watched so far</span>

      <div className="scr-deck">
        <i />
        <i />
        <div className="scr-deck-card">
          <b>Genre quality</b>
          <div className="scr-chart">
            <span className="scr-axis">
              {[5, 4, 3, 2, 1].map((n) => (
                <em key={n}>{n}★</em>
              ))}
            </span>
            <span className="scr-bars">
              {GENRES.map((g) => (
                <i
                  key={g.n}
                  style={vars({ height: `${g.h}%`, background: g.col })}
                />
              ))}
            </span>
          </div>
          <div className="scr-legend">
            {GENRES.map((g) => (
              <div key={g.n}>
                <i style={vars({ background: g.col })} />
                <b>{g.n}</b>
                <span>
                  {g.v} · {g.c}
                </span>
                <em>
                  <Ic d={P.right} />
                </em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="scr-hint">Swipe down for next · tap for details</span>
      <span className="scr-ok">OK</span>
    </Sheet>
  </div>
);

/* -------------------------------------------------------------- recommend */

const RecommendScreen = () => (
  <div className="scr scr-recommend">
    <div className="scr-head faded">
      <div className="scr-title">
        <b>Collection</b>
      </div>
      <span>Everything you&apos;ve watched so far</span>
    </div>

    <Sheet>
      <em className="scr-kicker">RECOMMENDED FOR YOU</em>
      <h3>Recommendations</h3>

      <div className="scr-deck rec">
        <i />
        <i />
        <div className="scr-rec-card">
          <Poster i={2} />
          <span className="scr-rec-score">
            <Ic d={P.star} fill w={0} />
            9.1
          </span>
          <span className="scr-rec-body">
            <em>Similar to Apothecary Diaries</em>
            <b>Frieren: Beyond Journey&apos;s End</b>
            <span>Adventure · Drama</span>
            <i className="scr-rec-add">
              <Ic d={P.plus} />
              Add to collection
            </i>
          </span>
        </div>
      </div>

      <span className="scr-hint">Swipe down for next title</span>
    </Sheet>
  </div>
);

/* ------------------------------------------------------------------- sort */

const SORTS = [
  { icon: P.star, fill: true, name: "Highest Rated", note: "Descending" },
  { icon: P.seasons, name: "Episodes", note: "Longer series" },
  { icon: P.sort, name: "Name (A–Z)", note: "Alphabetical" },
  { icon: P.grid, name: "By genres", note: "Category type" },
];

const SortScreen = () => (
  <div className="scr scr-sort">
    <div className="scr-head faded">
      <div className="scr-title">
        <b>Collection</b>
        <TopIcons />
      </div>
      <span>Everything you&apos;ve watched so far</span>
    </div>
    <article className="scr-item faded">
      <span className="scr-cover">
        <Poster i={0} />
      </span>
      <div className="scr-item-body">
        <h4>Food Wars!</h4>
        <div className="scr-chips">
          <span>Ecchi</span>
          <span>School</span>
        </div>
      </div>
    </article>

    <Sheet className="scr-sort-sheet">
      <h3 className="sm">Sort by</h3>
      <span className="scr-sub">Organize your collection</span>
      {SORTS.map((s, i) => (
        <div className={`scr-opt${i === 0 ? " on" : ""}`} key={s.name}>
          <i>
            <Ic d={s.icon} fill={s.fill} w={s.fill ? 0 : 2} />
          </i>
          <span className="scr-txt">
            <b>{s.name}</b>
            <span>{s.note}</span>
          </span>
          <em className="scr-radio" />
        </div>
      ))}
      <span className="scr-ok">Apply sorting</span>
    </Sheet>
  </div>
);

/* ------------------------------------------------------------------- sync */

const SyncScreen = () => (
  <div className="scr scr-sync">
    <div className="scr-head faded">
      <div className="scr-title">
        <b>Collection</b>
        <TopIcons />
      </div>
    </div>

    <Sheet>
      <span className="scr-close" aria-hidden>
        <Ic d={P.close} />
      </span>
      <div className="scr-account">
        <i>
          <Ic d={P.person} />
        </i>
        <b>My Vetro</b>
        <em className="on">✓ Done</em>
        <em>AUTO</em>
      </div>

      <div className="scr-deck svc">
        <i className="mal" />
        <i className="ani" />
        <div className="scr-svc">
          <div className="scr-svc-head">
            <span className="scr-svc-logo" />
            <b>Shikimori</b>
            <em>
              <Ic d={P.arrow} />
            </em>
          </div>
          {[
            { d: P.arrowDown, n: "Pull", s: "for importing your collection" },
            { d: P.down, n: "Push", s: "for exporting your collection" },
            { d: P.refresh, n: "Sync", s: "keep both sides in step" },
          ].map((r) => (
            <div className="scr-svc-row" key={r.n}>
              <i>
                <Ic d={r.d} />
              </i>
              <span className="scr-txt">
                <b>{r.n}</b>
                <span>{r.s}</span>
              </span>
              <em>
                <Ic d={P.right} />
              </em>
            </div>
          ))}
        </div>
      </div>

      <span className="scr-hint">Swipe down for the next card</span>
      <span className="scr-signout">
        <Ic d={P.signout} />
        Sign out
      </span>
    </Sheet>
  </div>
);

/* ----------------------------------------------------------------- rating */

const RatingScreen = () => (
  <div className="scr scr-rating">
    <svg className="scr-face" viewBox="0 0 40 30" aria-hidden>
      <rect x="8" y="4" width="7" height="9" rx="3.5" />
      <rect x="25" y="4" width="7" height="9" rx="3.5" />
      <path d="M10 20 Q20 30 30 20" fill="none" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
    <b className="scr-verdict">GOOD</b>
    <div className="scr-rate-slider">
      <span className="scr-rate-track">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
        <span className="scr-rate-dim" />
        <span className="scr-rate-thumb" />
      </span>
    </div>
    <div className="scr-rate-scale">
      <span>Normal</span>
      <b>
        6.9
        <em>Good</em>
      </b>
      <span>Masterpiece</span>
    </div>
  </div>
);

/* --------------------------------------------------------------- settings */

const SettingsScreen = () => (
  <div className="scr scr-settings">
    <div className="scr-set-head">
      <i>
        <Ic d={P.back} />
      </i>
      <b>Settings</b>
    </div>

    <div className="scr-set-group">
      {[
        { d: P.globe, n: "Language", v: "English" },
        { d: P.theme, n: "Themes", v: "System" },
        { d: P.grid, n: "Content Type", v: "Anime" },
      ].map((r) => (
        <div className="scr-set-row" key={r.n}>
          <i>
            <Ic d={r.d} />
          </i>
          <b>{r.n}</b>
          <span>{r.v}</span>
          <em>
            <Ic d={P.right} />
          </em>
        </div>
      ))}
    </div>

    <div className="scr-set-group">
      {[
        { d: P.person, n: "Account settings", s: "Sync, sign-in, and password" },
        { d: P.wand, n: "Collection Enrichment", s: "Fetch missing data and titles" },
        { d: P.sparkle, n: "AI Connect", s: "Bring your own AI key (BYOK)" },
      ].map((r) => (
        <div className="scr-set-row two" key={r.n}>
          <i>
            <Ic d={r.d} />
          </i>
          <span className="scr-txt">
            <b>{r.n}</b>
            <span>{r.s}</span>
          </span>
          <em>
            <Ic d={P.right} />
          </em>
        </div>
      ))}
      {[
        { d: P.ffwd, n: "Auto-skip", s: "Skip openings, endings and recaps" },
        { d: P.nextEp, n: "Next episode", s: "Start the next episode when this ends" },
      ].map((r) => (
        <div className="scr-set-row two" key={r.n}>
          <i>
            <Ic d={r.d} fill w={0} />
          </i>
          <span className="scr-txt">
            <b>{r.n}</b>
            <span>{r.s}</span>
          </span>
          <em className="scr-sw on">
            <u />
          </em>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ index */

const SCREENS: Record<string, () => React.JSX.Element> = {
  collection: CollectionScreen,
  details: DetailsScreen,
  seasons: SeasonsScreen,
  manga: MangaScreen,
  stats: StatsScreen,
  recommend: RecommendScreen,
  sort: SortScreen,
  sync: SyncScreen,
  rating: RatingScreen,
  settings: SettingsScreen,
};

/** Renders one app screen by slug. */
export default function Screen({ name }: { name: string }) {
  const C = SCREENS[name] ?? CollectionScreen;
  return <C />;
}
