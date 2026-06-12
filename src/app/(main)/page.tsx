"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EchoicSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="app-icon">
    <path d="M45 20 H75 C80.5 20 85 24.5 85 30 V70 C85 75.5 80.5 80 75 80 H60 L45 90 L48 80 H45 Z" fill="#f8fafc" />
    <text x="50" y="38" fontSize="24" fontFamily="serif" fontWeight="bold" fill="#3b82f6">“</text>
    <text x="62" y="38" fontSize="24" fontFamily="serif" fontWeight="bold" fill="#3b82f6">”</text>
    <rect x="50" y="44" width="25" height="3" rx="1.5" fill="#0f172a" />
    <rect x="50" y="51" width="25" height="3" rx="1.5" fill="#0f172a" />
    <rect x="50" y="58" width="18" height="3" rx="1.5" fill="#3b82f6" />
    
    <rect x="51" y="68" width="2" height="6" rx="1" fill="#3b82f6" />
    <rect x="55" y="65" width="2" height="12" rx="1" fill="#3b82f6" />
    <rect x="59" y="62" width="2" height="18" rx="1" fill="#3b82f6" />
    <rect x="63" y="65" width="2" height="12" rx="1" fill="#3b82f6" />
    <rect x="67" y="68" width="2" height="6" rx="1" fill="#3b82f6" />

    <path d="M48 85 C30 65, 20 40, 25 25 C25 25, 45 40, 48 85 Z" fill="#3b82f6" />
    <path d="M44 70 C35 60, 25 45, 20 50 C25 55, 35 65, 44 70 Z" fill="#2563eb" />
  </svg>
);

const CollectionSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="app-icon">
    <rect x="25" y="25" width="40" height="50" rx="4" fill="#e2e8f0" />
    <rect x="28" y="28" width="40" height="50" rx="4" fill="#ffffff" />
    <path d="M33 40 L38 45 L48 35" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="52" y="38" width="10" height="3" rx="1.5" fill="#0f172a" />

    <path d="M33 55 L38 60 L48 50" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="52" y="53" width="10" height="3" rx="1.5" fill="#0f172a" />
    
    <circle cx="35" cy="70" r="2" fill="#0f172a" />
    <rect x="42" y="68" width="10" height="3" rx="1.5" fill="#0f172a" />

    <path d="M55 45 L85 60 L55 75 Z" fill="#06b6d4" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  
  const featureRef1 = useRef<HTMLDivElement>(null);
  const featureRef2 = useRef<HTMLDivElement>(null);
  
  const featureRef3_echoic = useRef<HTMLDivElement>(null);
  const featureRef3_collection = useRef<HTMLDivElement>(null);

  const echoicRoadmapContentRef = useRef<HTMLDivElement>(null);
  const echoicGithubContentRef = useRef<HTMLDivElement>(null);
  const collectionRoadmapContentRef = useRef<HTMLDivElement>(null);
  const collectionGithubContentRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const finalMobileCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        let { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        // Base reset
        gsap.set([text1Ref.current, text2Ref.current, featureRef1.current, featureRef2.current, finalTextRef.current, finalMobileCardsRef.current], {
          xPercent: -50, yPercent: -50, left: "50%", top: isMobile ? "56%" : "50%", position: "absolute", willChange: "transform, opacity, filter"
        });

        if (isDesktop) {
          gsap.set(featureRef3_echoic.current, { xPercent: -50, yPercent: -50, left: "calc(50% - 270px)", top: "50%", position: "absolute", willChange: "transform, opacity, filter" });
          gsap.set(featureRef3_collection.current, { xPercent: -50, yPercent: -50, left: "calc(50% + 270px)", top: "50%", position: "absolute", willChange: "transform, opacity, filter" });
        } else {
          gsap.set([featureRef3_echoic.current, featureRef3_collection.current], { xPercent: -50, yPercent: -50, left: "50%", top: "56%", position: "absolute", willChange: "transform, opacity, filter" });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isDesktop ? "+=17000" : "+=22000",
            scrub: 1.5,
            pin: true,
          },
        });

        // Initial state
        gsap.set([text1Ref.current, text2Ref.current, featureRef1.current, featureRef2.current, featureRef3_echoic.current, featureRef3_collection.current, finalTextRef.current, finalMobileCardsRef.current], { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
        gsap.set([echoicGithubContentRef.current, collectionGithubContentRef.current], { autoAlpha: 0, yPercent: 40, rotationX: -15, transformPerspective: 800, scale: 0.95 });
        gsap.set(text1Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1 });

        tl.to(text1Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
          .to(text2Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
          .to({}, { duration: 1 })
          .to(text2Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
          .to(featureRef1.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
          .to({}, { duration: 1 })
          .to(featureRef1.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
          .to(featureRef2.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
          .to({}, { duration: 1 })
          .to(featureRef2.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" });

        if (isDesktop) {
          tl.to([featureRef3_echoic.current, featureRef3_collection.current], { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
            .to({}, { duration: 1 })
            // Swap inner contents
            .to([echoicRoadmapContentRef.current, collectionRoadmapContentRef.current], { autoAlpha: 0, scale: 0.95, yPercent: -10, filter: "blur(10px)", duration: 1.5, ease: "power2.inOut" }, "finalSlide")
            .to([echoicGithubContentRef.current, collectionGithubContentRef.current], { autoAlpha: 1, yPercent: 0, rotationX: 0, scale: 1, duration: 1.5, ease: "back.out(1.2)" }, "finalSlide+=0.2")
            // Fade in final text
            .to(finalTextRef.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "finalSlide")
            .to({}, { duration: 1 });
        } else {
          tl.to(featureRef3_echoic.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
            .to({}, { duration: 1 })
            .to(featureRef3_echoic.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
            .to(featureRef3_collection.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
            .to({}, { duration: 1 })
            // Final mobile slide: fade out collection card, fade in finalMobileCards and final text
            .to(featureRef3_collection.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" }, "finalSlide")
            .to(finalMobileCardsRef.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "finalSlide+=0.5")
            .to(finalTextRef.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "finalSlide+=1")
            .to({}, { duration: 1 });
        }
      }); // end mm.add
    }, containerRef); // end gsap.context

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-wrapper">
      <main ref={containerRef} className="pin-container">
        <div className="content-wrapper">
          
          <div ref={text1Ref} className="text-wrapper">
            <h1 className="title">Project Vetro</h1>
          </div>
          
          <div ref={text2Ref} className="text-wrapper">
            <h2 className="subtitle">A collection of tools for knowledge and creativity</h2>
          </div>
          
          <div ref={featureRef1} className="feature-section">
            <div className="mockup-container">
              <div className="clean-tree">
                <div><span className="tree-white">Project Vetro</span></div>
                <div><span className="tree-line">├── </span><Link href="/echoic" className="tree-link">Echoic</Link></div>
                <div><span className="tree-line">│   ├── </span>Notes</div>
                <div><span className="tree-line">│   ├── </span>Folders</div>
                <div><span className="tree-line">│   ├── </span>Maps</div>
                <div><span className="tree-line">│   ├── </span>AI Chats</div>
                <div><span className="tree-line">│   └── </span>Charts</div>
                <div><span className="tree-line">│</span></div>
                <div><span className="tree-line">└── </span><Link href="/collection" className="tree-link">Collection</Link></div>
                <div><span className="tree-line">    ├── </span>Media</div>
                <div><span className="tree-line">    ├── </span>Albums</div>
                <div><span className="tree-line">    ├── </span>Tags</div>
                <div><span className="tree-line">    └── </span>Library</div>
              </div>
            </div>
            <div className="feature-text-container">
              <p className="feature-description">
                Project Vetro is a growing collection of applications focused on organizing information in a clean, intuitive, and visually appealing way. Every tool is built around a simple idea: information should be easy to store, navigate, and understand.
              </p>
            </div>
          </div>

          <div ref={featureRef2} className="feature-section wide-section">
            <div className="mockup-container dual-mockup">
              <div className="mockup-card stat-block">
                <div className="stat-row"><span className="stat-value">1</span> <span className="stat-label"><span className="desktop-text">Developer</span><span className="mobile-text">Dev</span></span></div>
                <div className="stat-row"><span className="stat-value">0</span> <span className="stat-label"><span className="desktop-text">Investors</span><span className="mobile-text">Inv</span></span></div>
                <div className="stat-row"><span className="stat-value">0</span> <span className="stat-label"><span className="desktop-text">Employees</span><span className="mobile-text">Emp</span></span></div>
                <div className="stat-row"><span className="stat-value">2</span> <span className="stat-label"><span className="desktop-text">Applications</span><span className="mobile-text">Apps</span></span></div>
                <div className="stat-row"><span className="stat-value" style={{ transform: 'translateY(-2px)' }}>∞</span> <span className="stat-label"><span className="desktop-text">Ideas</span><span className="mobile-text">Ideas</span></span></div>
              </div>
              <div className="mockup-card rpg-block">
                <h3 className="rpg-title">Developer Stats</h3>
                <div className="rpg-bars">
                  <div className="rpg-row">
                    <span className="rpg-label">Coding</span>
                    <div className="rpg-bar-bg"><div className="rpg-bar-fill blue" style={{ width: '50%' }}></div></div>
                    <span className="rpg-val">50</span>
                  </div>
                  <div className="rpg-row">
                    <span className="rpg-label">UI Design</span>
                    <div className="rpg-bar-bg"><div className="rpg-bar-fill cyan" style={{ width: '80%' }}></div></div>
                    <span className="rpg-val">80</span>
                  </div>
                  <div className="rpg-row">
                    <span className="rpg-label">Experience</span>
                    <div className="rpg-bar-bg"><div className="rpg-bar-fill gray" style={{ width: '15%' }}></div></div>
                    <span className="rpg-val">15</span>
                  </div>
                  <div className="rpg-row">
                    <span className="rpg-label">Burnout</span>
                    <div className="rpg-bar-bg"><div className="rpg-bar-fill orange" style={{ width: '25%' }}></div></div>
                    <span className="rpg-val">25</span>
                  </div>
                  <div className="rpg-row ambition-row">
                    <span className="rpg-label">Ambition</span>
                    <div className="rpg-bar-bg"><div className="rpg-bar-fill purple overflow" style={{ width: 'calc(100% + 78px)' }}></div></div>
                    <span className="rpg-val">120</span>
                  </div>
                </div>
                <div className="rpg-warning">
                  <div className="warning-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Warning:
                  </div>
                  <p>
                    Ambition exceeds recommended limits.<br/>
                    Unexpected side effects may include<br/>
                    starting projects that are far too large.
                  </p>
                </div>
              </div>
            </div>
            <div className="feature-text-container">
              <h3 className="feature-title">A project driven by curiosity</h3>
              <p className="feature-description">
                Vetro is not backed by a large team or a company. It is an independent project developed by one aspiring developer, built step by step through learning, experimentation, and a genuine passion for creating better tools.
              </p>
            </div>
          </div>

          {/* Roadmap Card 1: Echoic */}
          <div ref={featureRef3_echoic} className="roadmap-card clickable-card" onClick={() => router.push('/echoic')}>
            <div className="roadmap-header">
              <div className="roadmap-icon-wrapper">
                <EchoicSVG />
              </div>
              <div className="roadmap-title-box">
                <h3>Vetro Echoic</h3>
                <p>AI & Multitool Knowledge Management</p>
              </div>
            </div>
            <div className="roadmap-badge badge-blue">
              <span className="dot"></span> Active Development
            </div>
            
            <hr className="roadmap-divider" />
            
            <div className="roadmap-card-content-wrapper">
              <div className="roadmap-content" ref={echoicRoadmapContentRef}>
                <h4 className="roadmap-section-title">Implemented</h4>
                <div className="roadmap-grid">
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Notes</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Chat Notes</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Folders</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Multiple AI Agents</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Maps</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Document Export</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Charts</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> BYOK Support</div>
                </div>

                <hr className="roadmap-divider" />

                <h4 className="roadmap-section-title">Planned</h4>
                <div className="roadmap-grid">
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Sync</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Desktop Version</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Backup</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Smarter Algorithms</div>
                </div>

                <hr className="roadmap-divider" />

                <div className="roadmap-progress-header">
                  <h4 className="roadmap-section-title">Completed</h4>
                  <span className="roadmap-percent">40%</span>
                </div>
                <div className="roadmap-progress-bar">
                  <div className="roadmap-progress-fill bg-blue" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="github-content" ref={echoicGithubContentRef}>
                <div className="github-card">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <div className="github-text">
                    <h4>Vetro Echoic</h4>
                    <p>Star that project!</p>
                  </div>
                  <a href="https://github.com/Phnem/Vetro-Echoic" target="_blank" rel="noopener noreferrer" className="github-star-btn" onClick={(e) => e.stopPropagation()}>
                    ⭐ Star on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Card 2: Collection */}
          <div ref={featureRef3_collection} className="roadmap-card clickable-card" onClick={() => router.push('/collection')}>
            <div className="roadmap-header">
              <div className="roadmap-icon-wrapper">
                <CollectionSVG />
              </div>
              <div className="roadmap-title-box">
                <h3>Vetro Collection</h3>
                <p>Local-First Media Library</p>
              </div>
            </div>
            <div className="roadmap-badge badge-cyan">
              <span className="dot"></span> Stable
            </div>
            
            <hr className="roadmap-divider" />
            
            <div className="roadmap-card-content-wrapper">
              <div className="roadmap-content" ref={collectionRoadmapContentRef}>
                <h4 className="roadmap-section-title">Implemented</h4>
                <div className="roadmap-grid">
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Albums</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Local Storage</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Smart Sorting</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Collections</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Search</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Tags</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Sync</div>
                  <div className="roadmap-item done"><span className="roadmap-mark">✓</span> Fast Browsing</div>
                </div>

                <hr className="roadmap-divider" />

                <h4 className="roadmap-section-title">Planned</h4>
                <div className="roadmap-grid">
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Backup</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Desktop Version</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Duplicate Finder</div>
                  <div className="roadmap-item pending"><span className="roadmap-mark">○</span> Advanced Filters</div>
                </div>

                <hr className="roadmap-divider" />

                <div className="roadmap-progress-header">
                  <h4 className="roadmap-section-title">Completed</h4>
                  <span className="roadmap-percent">80%</span>
                </div>
                <div className="roadmap-progress-bar">
                  <div className="roadmap-progress-fill bg-cyan" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="github-content" ref={collectionGithubContentRef}>
                <div className="github-card">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <div className="github-text">
                    <h4>Vetro Collection</h4>
                    <p>Star that project!</p>
                  </div>
                  <a href="https://github.com/Phnem/Vetro" target="_blank" rel="noopener noreferrer" className="github-star-btn" onClick={(e) => e.stopPropagation()}>
                    ⭐ Star on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Final Text Container */}
          <div ref={finalTextRef} className="final-slide-container">
            <h1 className="final-title-top">Project Vetro</h1>
            <div className="final-bottom-content">
              <p>Thank you for taking the time to explore Project Vetro.</p>
              <p>Every contribution helps keep the project growing.</p>
              <a href="https://web.tribute.tg/e/Tb" target="_blank" rel="noopener noreferrer" className="donate-btn">
                 Support the Project
              </a>
            </div>
          </div>

          {/* Final Mobile Github Cards */}
          <div ref={finalMobileCardsRef} className="final-mobile-cards desktop-hidden">
            <div className="github-card">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <div className="github-text">
                <h4>Vetro Echoic</h4>
              </div>
              <a href="https://github.com/Phnem/Vetro-Echoic" target="_blank" rel="noopener noreferrer" className="github-star-btn" onClick={(e) => e.stopPropagation()}>
                ⭐ Star
              </a>
            </div>
            
            <div className="github-card">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <div className="github-text">
                <h4>Vetro Collection</h4>
              </div>
              <a href="https://github.com/Phnem/Vetro" target="_blank" rel="noopener noreferrer" className="github-star-btn" onClick={(e) => e.stopPropagation()}>
                ⭐ Star
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
