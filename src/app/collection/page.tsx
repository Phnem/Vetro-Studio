"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const featureRef1 = useRef<HTMLDivElement>(null);
  const featureRef2 = useRef<HTMLDivElement>(null);
  const featureRef3 = useRef<HTMLDivElement>(null);
  const featureRef4 = useRef<HTMLDivElement>(null);
  const featureRef5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const topPos = isMobile ? "56%" : "50%";
      // Base reset
      gsap.set([text1Ref.current, text2Ref.current, featureRef1.current, featureRef2.current, featureRef3.current, featureRef4.current, featureRef5.current], {
        xPercent: -50, yPercent: -50, left: "50%", top: topPos, position: "absolute", willChange: "transform, opacity, filter"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=18000", // extended for final slide
          scrub: 1.5,
          pin: true,
        },
      });

      // Initial state
      gsap.set([text2Ref.current, featureRef1.current, featureRef2.current, featureRef3.current, featureRef4.current, featureRef5.current], { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
      gsap.set(text1Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1 });

      // Animations
      tl.to(text1Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(text2Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 })
        
        // Stats slide
        .to(text2Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(featureRef1.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 })
        
        // Visual Search slide
        .to(featureRef1.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(featureRef2.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 })

        // Smart Sorting slide
        .to(featureRef2.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(featureRef3.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 })
        
        // Sync & Migration slide
        .to(featureRef3.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(featureRef4.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 })

        // Final GitHub Cards slide
        .to(featureRef4.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
        .to(featureRef5.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
        .to({}, { duration: 1 }); // Pause at the end
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-wrapper">
      <main ref={containerRef} className="pin-container">
        <div className="content-wrapper">
          
          <div ref={text1Ref} className="text-wrapper">
            <h1 className="title">Vetro Collection</h1>
          </div>
          
          <div ref={text2Ref} className="text-wrapper">
            <h2 className="subtitle">A smarter way to manage your media library.</h2>
          </div>

          <div ref={featureRef1} className="feature-section wide-section">
            <div className="scattered-stats">
              {/* Tile 1: Donut Chart */}
              <div className="float-tile tile-donut">
                <div className="stats-legend">
                  <div className="legend-item"><span className="dot blue"></span><div><strong>Fantasy</strong><p>31% • 107</p></div></div>
                  <div className="legend-item"><span className="dot purple"></span><div><strong>Action</strong><p>27% • 95</p></div></div>
                  <div className="legend-item"><span className="dot pink"></span><div><strong>Adventure</strong><p>15% • 53</p></div></div>
                </div>
                <div className="donut-wrapper">
                  <div className="donut-chart"></div>
                  <div className="donut-center">346</div>
                </div>
              </div>

              {/* Tile 2: Bar Chart */}
              <div className="float-tile tile-bars">
                <div className="stats-bar-chart">
                  <div className="bar-y-axis">
                    <span>5★</span><span>4★</span><span>3★</span><span>2★</span><span>1★</span>
                  </div>
                  <div className="bar-bars">
                    <div className="bar blue" style={{ height: '100%' }}></div>
                    <div className="bar purple" style={{ height: '90%' }}></div>
                    <div className="bar pink" style={{ height: '75%' }}></div>
                    <div className="bar orange" style={{ height: '75%' }}></div>
                    <div className="bar green" style={{ height: '65%' }}></div>
                  </div>
                </div>
                <div className="stats-legend">
                  <div className="legend-item"><span className="dot blue"></span><div><strong>Drama</strong><p>4.42</p></div></div>
                  <div className="legend-item"><span className="dot purple"></span><div><strong>Shounen</strong><p>4.11</p></div></div>
                  <div className="legend-item"><span className="dot pink"></span><div><strong>Action</strong><p>3.64</p></div></div>
                </div>
              </div>

              {/* Tile 3: Total Box */}
              <div className="float-tile tile-stat box-blue">
                <div className="box-header"><span className="box-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </span> TOTAL</div>
                <div className="box-value">198</div>
              </div>
            </div>
            
            <div className="feature-text-container">
              <h3 className="feature-title">Detailed Viewing Statistics</h3>
              <p className="feature-description">
                Gain deeper insights into your library with detailed statistics and visual analytics. Track your favorite genres, viewing habits, ratings, episode counts, and more through clear charts and easy-to-understand summaries.
              </p>
            </div>
          </div>

          <div ref={featureRef2} className="feature-section wide-section">
            <div className="feature-text-container">
              <h3 className="feature-title">Visual Search</h3>
              <p className="feature-description">
                Found an interesting screenshot? Simply upload a frame from an anime, movie, or TV show and Vetro Collection will identify it automatically. Add the result to your library in seconds without manually searching for titles.
              </p>
            </div>

            <div className="single-tile-wrapper">
              <div className="tile-visual-search">
                 <div className="vs-header">
                   <span className="vs-back">←</span>
                   <span className="vs-title">Visual Search</span>
                   <span className="vs-logo">VETRO</span>
                 </div>
                 
                 <h3 className="vs-main-title">Search by frame</h3>
                 
                 <div className="vs-tabs">
                   <div className="vs-tab active">Anime</div>
                   <div className="vs-tab">Movies/TV</div>
                 </div>
                 
                 <div className="vs-upload-area">
                   <div className="vs-upload-icon">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                   </div>
                   <h4>Tap to select a screenshot</h4>
                   <p>JPEG, PNG UP TO 10MB</p>
                 </div>
                 
                 <div className="vs-footer">POWERED BY VETRO VISION ENGINE</div>
              </div>
            </div>
          </div>

          <div ref={featureRef3} className="feature-section wide-section">
            <div className="single-tile-wrapper">
              <div className="tile-sort">
                <div className="sort-header">
                  <div className="sort-header-titles">
                    <h3>Sort by</h3>
                    <p>Organize your collection</p>
                  </div>
                  <span className="sort-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>

                <div className="sort-grid">
                  <div className="sort-option active">
                    <div className="sort-icon-box">
                      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <h4>Highest Rated</h4>
                    <p>Descending</p>
                  </div>
                  <div className="sort-option">
                    <div className="sort-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                    </div>
                    <h4>Episodes</h4>
                    <p>Longer series</p>
                  </div>
                  <div className="sort-option">
                    <div className="sort-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="14" y2="12"></line><line x1="4" y1="17" x2="10" y2="17"></line></svg>
                    </div>
                    <h4>Name (A-Z)</h4>
                    <p>Alphabetical</p>
                  </div>
                  <div className="sort-option">
                    <div className="sort-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    </div>
                    <h4>By genres</h4>
                    <p>Category type</p>
                  </div>
                </div>

                <div className="sort-apply-btn">Apply sorting</div>
              </div>
            </div>
            
            <div className="feature-text-container">
              <h3 className="feature-title">Smart Sorting</h3>
              <p className="feature-description">
                Organize your collection the way you want. Sort media by rating, episode count, title, genres, and other criteria to instantly surface exactly what you're looking for.
              </p>
            </div>
          </div>

          <div ref={featureRef4} className="feature-section wide-section">
            <div className="feature-text-container">
              <h3 className="feature-title">Seamless Sync & Migration</h3>
              <p className="feature-description">
                Switching from another tracking platform? Import your library from Shikimori, MyAnimeList, or AniList in just a few steps. Keep your progress synchronized and move between services without losing your collection.
              </p>
            </div>

            <div className="single-tile-wrapper">
              <div className="tile-sync">
                <div className="sort-header">
                  <div className="sort-header-titles">
                    <h3>Sync Control</h3>
                    <p>Notifications & connectivity</p>
                  </div>
                  <span className="sort-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>

                <div className="sync-cards-row">
                  <div className="sync-card active-cyan">
                    <div className="sync-card-header">
                      <div className="sync-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                      </div>
                      <span className="sync-badge cyan">AUTO</span>
                    </div>
                    <div className="sync-time">03:12</div>
                    <p className="sync-date">May 16 •<br/>Success</p>
                    <div className="sync-status-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Connected
                    </div>
                  </div>
                  
                  <div className="sync-card">
                    <div className="sync-card-header">
                      <div className="sync-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </div>
                      <span className="sync-badge grey">ACCOUNT</span>
                    </div>
                    <div className="sync-time">My Vetro</div>
                    <p className="sync-date">Signed in</p>
                    <div className="sync-logout">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </div>
                  </div>
                </div>

                <div className="sync-services-row">
                  <div className="service-card glow-green">
                    <div className="service-icon bg-green">S</div>
                    <span>Shikimori</span>
                  </div>
                  <div className="service-card glow-blue">
                    <div className="service-icon bg-blue">M</div>
                    <span>MAL</span>
                  </div>
                  <div className="service-card glow-purple">
                    <div className="service-icon bg-purple">A</div>
                    <span>AniList</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={featureRef5} className="final-section">
            <div className="final-container">
              <h2 className="final-title">Ready to dive in?</h2>
              <div className="final-tiles">
                <a href="https://github.com/Phnem/Vetro" target="_blank" rel="noopener noreferrer" className="final-tile">
                  <div className="final-tile-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </div>
                  <h3>Documentation</h3>
                  <p>Explore the GitHub repository and setup guide</p>
                </a>

                <a href="https://github.com/Phnem/Vetro/releases" target="_blank" rel="noopener noreferrer" className="final-tile download-tile">
                  <div className="final-tile-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" style={{ fill: "none" }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  <h3>Download APK</h3>
                  <p>Get the latest release for Android</p>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
