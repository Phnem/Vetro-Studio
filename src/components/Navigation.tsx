"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const issuesLink =
    pathname === "/collection" || pathname === "/"
      ? "https://github.com/Phnem/Vetro-Collection/discussions"
      : pathname === "/echoic"
        ? "https://github.com/Phnem/Vetro-Echoic/discussions/1"
        : null;

  // Close the menu when the route changes, adjusting state during render
  // rather than in an effect (avoids a cascading render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !privacyOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setPrivacyOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, privacyOpen]);

  return (
    <>
      <header className={`top-bar${scrolled ? " scrolled" : ""}`}>
        <div className="top-bar-inner">
          <Link href="/" className="brand-mark">
            vetro
          </Link>

          <div className="top-bar-right">
            <a
              href="https://github.com/Phnem/Vetro-Collection/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="top-cta"
            >
              Download
            </a>
            <button
              className={`menu-btn ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav className="menu-panel" aria-label="Site">
          <Link href="/" className={`menu-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link
            href="/collection"
            className={`menu-link ${pathname === "/collection" ? "active" : ""}`}
          >
            Collection
          </Link>
          <div className="menu-divider" />
          <a
            href="https://github.com/Phnem/Vetro-Collection"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-link"
          >
            GitHub
          </a>
          <a
            href="https://t.me/Vetro_chat"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-link"
          >
            Contact
          </a>
          {issuesLink && (
            <a
              href={issuesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              Issues & Feedback
            </a>
          )}
          <a
            href="https://web.tribute.tg/e/Tb"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-link"
          >
            Support
          </a>
          <button
            className="menu-link"
            onClick={() => {
              setPrivacyOpen(true);
              setMenuOpen(false);
            }}
          >
            Privacy Policy
          </button>
        </nav>
      )}

      {privacyOpen && (
        <div className="modal-overlay" onClick={() => setPrivacyOpen(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Privacy Policy</h2>
              <button
                className="modal-close"
                onClick={() => setPrivacyOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-date">Last updated: June 2026</p>
              <h3>Overview</h3>
              <p>Vetro respects your privacy.</p>
              <p>
                Vetro is local-first: your collection is stored on the device. A
                Vetro account enables sync and backup. Network requests occur
                when you use online search, media sources, sync/backup, updates
                or an optional AI provider.
              </p>
              <h3>Local Data</h3>
              <p>
                Most application data is stored locally on the user&apos;s device and
                remains under the user&apos;s control.
              </p>
              <h3>Contact</h3>
              <ul>
                <li>
                  Telegram:{" "}
                  <a href="https://t.me/Vetro_chat" target="_blank" rel="noopener noreferrer">
                    @Vetro_chat
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/Phnem/Vetro-Collection"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vetro-Collection
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
