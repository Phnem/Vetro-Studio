"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Issues link logic based on current route
  let issuesLink = null;
  if (pathname === '/collection') {
    issuesLink = "https://github.com/Phnem/Vetro/discussions";
  } else if (pathname === '/echoic') {
    issuesLink = "https://github.com/Phnem/Vetro-Echoic/discussions/1";
  }

  return (
    <>
      <div className="global-nav-container">
        <div className="global-nav">
          <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
            Vetro
          </Link>
          <Link href="/echoic" className={`nav-item ${pathname === '/echoic' ? 'active' : ''}`}>
            Echoic
          </Link>
          <Link href="/collection" className={`nav-item ${pathname === '/collection' ? 'active' : ''}`}>
            Collection
          </Link>
        </div>

        <button 
          className={`menu-bubble ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="burger-line line-1"></span>
          <span className="burger-line line-2"></span>
          <span className="burger-line line-3"></span>
        </button>

        {menuOpen && (
          <div className="popin-menu">
            <a href="https://github.com/Phnem" target="_blank" rel="noopener noreferrer" className="popin-item">
              GitHub profile
            </a>
            <a href="https://t.me/H415base" target="_blank" rel="noopener noreferrer" className="popin-item">
              Contact me
            </a>
            {issuesLink && (
              <a href={issuesLink} target="_blank" rel="noopener noreferrer" className="popin-item">
                Issues & Feedback
              </a>
            )}
            <a href="https://web.tribute.tg/e/Tb" target="_blank" rel="noopener noreferrer" className="popin-item">
              Support Development
            </a>
            
            <div className="popin-divider"></div>
            
            <button className="popin-item text-left" onClick={() => { setPrivacyOpen(true); setMenuOpen(false); }}>
              Privacy Policy
            </button>
          </div>
        )}
      </div>

      {privacyOpen && (
        <div className="privacy-modal-overlay" onClick={() => setPrivacyOpen(false)}>
          <div className="privacy-modal-content" onClick={e => e.stopPropagation()}>
            <div className="privacy-header">
              <h2>Privacy Policy</h2>
              <button className="privacy-close" onClick={() => setPrivacyOpen(false)} aria-label="Close">✕</button>
            </div>
            <div className="privacy-body">
              <p className="privacy-date">Last updated: June 2026</p>

              <h3>Overview</h3>
              <p>Vetro respects your privacy.</p>
              <p>The applications and websites within the Vetro project are designed to collect as little personal information as possible.</p>

              <h3>Information Collection</h3>
              <p>Vetro does not intentionally collect, store, sell, or share personal information unless explicitly required by a feature used by the user.</p>

              <h3>Local Data</h3>
              <p>Most application data is stored locally on the user's device and remains under the user's control.</p>

              <h3>Third-Party Services</h3>
              <p>Some features may interact with third-party services chosen by the user, such as AI providers or synchronization platforms. Any data shared with those services is governed by their respective privacy policies.</p>

              <h3>Analytics</h3>
              <p>At this time, Vetro does not use advertising trackers or sell user data to third parties.</p>

              <h3>Data Security</h3>
              <p>Reasonable efforts are made to protect user data, but no method of electronic storage or transmission can be guaranteed to be completely secure.</p>

              <h3>Changes</h3>
              <p>This Privacy Policy may be updated as the project evolves. Any changes will be published on this page.</p>

              <h3>Contact</h3>
              <p>For questions regarding privacy or data handling, please contact:</p>
              <ul>
                <li>Telegram: <a href="https://t.me/H415base" target="_blank" rel="noopener noreferrer">@H415base</a></li>
                <li>GitHub: <a href="https://github.com/Phnem" target="_blank" rel="noopener noreferrer">https://github.com/Phnem</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
