"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const featureRef2 = useRef<HTMLDivElement>(null);
  const featureRef3 = useRef<HTMLDivElement>(null);
  const featureRef4 = useRef<HTMLDivElement>(null);
  const featureRef5 = useRef<HTMLDivElement>(null);
  const featureRef6 = useRef<HTMLDivElement>(null);
  const featureRef7 = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch("https://api.github.com/repos/Phnem/Vetro-Echoic/releases/latest");
      const data = await res.json();
      const apkAsset = data.assets?.find((asset: any) => asset.name.endsWith(".apk"));
      if (apkAsset) {
        window.location.href = apkAsset.browser_download_url;
      } else {
        alert("APK not found in the latest release.");
      }
    } catch (error) {
      console.error("Error fetching latest release:", error);
      alert("Failed to fetch the latest release.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Center all elements securely
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, featureRef.current, featureRef2.current, featureRef3.current, featureRef4.current, featureRef5.current, featureRef6.current, featureRef7.current], {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      position: "absolute",
      willChange: "transform, opacity, filter"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=18000", // Increased scrolling distance to fit new section
        scrub: 1.5,
        pin: true,
      },
    });

    // Initial state: first text visible, others hidden
    gsap.set(text1Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1 });
    gsap.set(text2Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(text3Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef2.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef3.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef4.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef5.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef6.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(featureRef7.current, { autoAlpha: 0, filter: "blur(20px)", scale: 0.9 });

    // 1. Dissolve text 1
    tl.to(text1Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 2. Assemble text 2
      .to(text2Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 3. Hold text 2
      .to({}, { duration: 1 })
      // 4. Dissolve text 2
      .to(text2Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 5. Assemble text 3
      .to(text3Ref.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 6. Hold text 3
      .to({}, { duration: 1 })
      // 7. Dissolve text 3
      .to(text3Ref.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 8. Assemble Feature Section 1 (Notes Mockup)
      .to(featureRef.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 9. Hold Feature Section 1
      .to({}, { duration: 1 })
      // 10. Dissolve Feature Section 1
      .to(featureRef.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 11. Assemble Feature Section 2 (Folders Mockup)
      .to(featureRef2.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 12. Hold Feature Section 2
      .to({}, { duration: 1 })
      // 13. Dissolve Feature Section 2
      .to(featureRef2.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 14. Assemble Feature Section 3 (Notes Map Mockup)
      .to(featureRef3.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 15. Hold Feature Section 3
      .to({}, { duration: 1 })
      // 16. Dissolve Feature Section 3
      .to(featureRef3.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 17. Assemble Feature Section 4 (Chart Mockup)
      .to(featureRef4.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 18. Hold Feature Section 4
      .to({}, { duration: 1 })
      // 19. Dissolve Feature Section 4
      .to(featureRef4.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 20. Assemble Feature Section 5 (Chat Mockup)
      .to(featureRef5.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 21. Hold Feature Section 5
      .to({}, { duration: 1 })
      // 22. Dissolve Feature Section 5
      .to(featureRef5.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 23. Assemble Feature Section 6 (BYOK Cards)
      .to(featureRef6.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0")
      // 24. Hold Feature Section 6
      .to({}, { duration: 1 })
      // 25. Dissolve Feature Section 6
      .to(featureRef6.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 2, ease: "power2.inOut" })
      // 26. Assemble Final Section
      .to(featureRef7.current, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.inOut" }, "-=1.0");

    }); // end context

    return () => ctx.revert();
  }, []);

  return (
    <div className="gsap-wrapper">
      <main ref={containerRef} className="pin-container">
      <div className="content-wrapper">
        <div ref={text1Ref} className="text-wrapper">
          <h1 className="title">Vetro Echoic</h1>
        </div>
        <div ref={text2Ref} className="text-wrapper">
          <h2 className="subtitle">Next-generation notes</h2>
        </div>
        <div ref={text3Ref} className="text-wrapper">
          <h2 className="subtitle">Write less, get&nbsp;more</h2>
        </div>
        
        <div ref={featureRef} className="feature-section">
          <div className="mockup-container">
            <h3 className="mockup-header">Notes</h3>
            
            <div className="mockup-card">
              <div className="mockup-card-top">
                <div className="mockup-icon green">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 10H8v-2h8v2zm0-3H8V7h8v2z"/>
                  </svg>
                </div>
                <div className="mockup-card-content">
                  <div className="mockup-title-row">
                    <span className="mockup-title">This is an exampl...</span>
                    <span className="mockup-tag work">Work</span>
                  </div>
                  <p className="mockup-subtitle">This is an example of a chat note....</p>
                </div>
              </div>
              <div className="mockup-card-bottom">
                <span className="mockup-date">Jun 12</span>
                <button className="mockup-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  Details
                </button>
              </div>
            </div>

            <div className="mockup-card">
              <div className="mockup-card-top">
                <div className="mockup-icon blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 6h14v2H3V6zm0 5h10v2H3v-2zm0 5h6v2H3v-2zm14.41-3.41l-1.17-1.17c-.2-.2-.51-.2-.71 0L14 13.59V16h2.41l4.58-4.59c.2-.2.2-.51 0-.71z"/>
                  </svg>
                </div>
                <div className="mockup-card-content">
                  <div className="mockup-title-row">
                    <span className="mockup-title">Text note</span>
                    <span className="mockup-tag personal">Personal</span>
                  </div>
                  <p className="mockup-subtitle">This is an example of a text note</p>
                </div>
              </div>
              <div className="mockup-card-bottom">
                <span className="mockup-date">Jun 12</span>
                <button className="mockup-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  Details
                </button>
              </div>
            </div>
            
          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Forget endless lists and clutter. Every note gets its own beautifully organized card with a quick preview, smart tags, and instant access—turning your collection of notes into a structured knowledge base.
            </p>
          </div>
        </div>

        {/* Feature 2: Folders */}
        <div ref={featureRef2} className="feature-section">
          <div className="mockup-container">
            <h3 className="mockup-header">Folders</h3>
            
            <div className="folders-grid">
              <div className="folder-card">
                <div className="folder-card-top">
                  <div className="folder-icon work">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                  </div>
                  <span className="folder-count">0</span>
                </div>
                <div className="folder-name">Work</div>
              </div>

              <div className="folder-card">
                <div className="folder-card-top">
                  <div className="folder-icon ideas">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                  </div>
                  <span className="folder-count">0</span>
                </div>
                <div className="folder-name">Ideas</div>
              </div>

              <div className="folder-card">
                <div className="folder-card-top">
                  <div className="folder-icon personal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    </svg>
                  </div>
                  <span className="folder-count">0</span>
                </div>
                <div className="folder-name">Personal</div>
              </div>

              <div className="folder-card">
                <div className="folder-card-top">
                  <div className="folder-icon create">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                </div>
                <div className="folder-name">Create</div>
              </div>
            </div>
          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Organize your knowledge your way. Create folders for projects, ideas, work, and personal notes, making it easy to keep information structured and always within reach.
            </p>
          </div>
        </div>

        {/* Feature 3: Notes map */}
        <div ref={featureRef3} className="feature-section">
          <div className="mockup-container">
            <div className="notes-map-header">
              <div className="notes-map-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tree-icon-main">
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="15" y="3" width="6" height="6" rx="1" />
                  <rect x="3" y="15" width="6" height="6" rx="1" />
                  <path d="M9 6h6" />
                  <path d="M6 9v6" />
                </svg>
                Notes map
              </div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="chevron-icon">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            
            <div className="mockup-card tree-card">
              <div className="tree-node">
                <div className="tree-node-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tree-icon-root">
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="3" width="6" height="6" rx="1" />
                    <rect x="3" y="15" width="6" height="6" rx="1" />
                    <path d="M9 6h6" />
                    <path d="M6 9v6" />
                  </svg>
                  <span className="tree-text bold">Vetro Echoic</span>
                </div>
                
                <div className="tree-children">
                  
                  <div className="tree-node">
                    <div className="tree-node-content">
                      <svg className="tree-icon work" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                      <span className="tree-text">Work</span>
                    </div>
                  </div>
                  
                  <div className="tree-node">
                    <div className="tree-node-content">
                      <svg className="tree-icon ideas" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                      <span className="tree-text">Ideas</span>
                    </div>
                  </div>
                  
                  <div className="tree-node">
                    <div className="tree-node-content">
                      <svg className="tree-icon personal" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                      <span className="tree-text">Personal</span>
                    </div>
                  </div>
                  
                  <div className="tree-node">
                    <div className="tree-node-content">
                      <svg className="tree-icon home" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                      <span className="tree-text">Home</span>
                    </div>
                    
                    <div className="tree-children nested">
                      <div className="tree-node">
                        <div className="tree-node-content">
                          <svg className="tree-icon doc" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                          </svg>
                          <span className="tree-text doc-text">This is an example of a chat n...</span>
                        </div>
                      </div>
                      
                      <div className="tree-node">
                        <div className="tree-node-content">
                          <svg className="tree-icon doc" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                          </svg>
                          <span className="tree-text doc-text">Text note</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Never lose track of your information. The notes map visualizes the structure of your workspace, helping you understand how folders, notes, and projects are organized.
            </p>
          </div>
        </div>

        {/* Feature 4: Chart */}
        <div ref={featureRef4} className="feature-section">
          <div className="mockup-container">
            <h3 className="mockup-header">Preview</h3>
            
            <div className="mockup-card chart-card">
              <div className="chart-header">
                <h4 className="chart-title">Population comparison: France and Germany</h4>
                <span className="chart-subtitle">million people</span>
              </div>
              
              <div className="chart-body">
                {/* Vertical grid lines */}
                <div className="chart-grid">
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                </div>
                
                {/* France Row */}
                <div className="chart-row">
                  <span className="chart-label">France</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar france" style={{ width: "68.4%" }}></div>
                    <span className="chart-value">68,4</span>
                  </div>
                </div>
                
                {/* Germany Row */}
                <div className="chart-row">
                  <span className="chart-label">Germany</span>
                  <div className="chart-bar-container">
                    <div className="chart-bar germany" style={{ width: "83.3%" }}></div>
                    <span className="chart-value">83,3</span>
                  </div>
                </div>
                
                {/* X Axis Labels */}
                <div className="chart-x-axis">
                  <span>0</span>
                  <span>50,0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Turn questions into charts. Simply ask something like “Compare the population of Germany and France,” and the AI will gather the information and generate a clear visualization automatically—no spreadsheets, tables, or structured data required.
            </p>
          </div>
        </div>

        {/* Feature 5: Chat Mockup */}
        <div ref={featureRef5} className="feature-section">
          <div className="mockup-container">
            
            <div className="chat-mockup-wrapper">
              <div className="chat-bubble">
                need to show how chat notes work.
              </div>
              <div className="chat-bubble">
                need to show how text notes work
              </div>
              
              <div className="mockup-card chat-ai-card">
                <h4 className="chat-ai-title">Note Functionality 📝</h4>
                <p className="chat-ai-text">Here's a breakdown of the note-taking features:</p>
                
                <ul className="chat-ai-list">
                  <li>
                    <strong>Chat Notes: 💬</strong>
                    <ul className="chat-ai-sublist">
                      <li>Allows for the creation and management of chat-based notes.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Text Notes: ✍️</strong>
                    <ul className="chat-ai-sublist">
                      <li>Supports the creation and management of traditional text-based notes.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Turn conversations into actionable plans. Simply chat with the AI as if you were messaging a colleague—share ideas, thoughts, and rough concepts in any order. When you're ready, the AI can organize everything into a structured plan, summary, or document that can be exported and downloaded in seconds.
            </p>
          </div>
        </div>

        {/* Feature 6: BYOK AI Cards */}
        <div ref={featureRef6} className="feature-section">
          <div className="mockup-container byok-mockup">
            
            <div className="ai-cards-grid">
              <div className="ai-card gemini-pro">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/gemini.svg" alt="Gemini Pro" />
                </div>
                <h4 className="ai-card-title">Gemini Pro</h4>
                <span className="ai-card-badge">Google</span>
                <p className="ai-card-desc">Advanced reasoning</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card claude">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/claude.svg" alt="Claude" />
                </div>
                <h4 className="ai-card-title">Claude</h4>
                <span className="ai-card-badge">Anthropic</span>
                <p className="ai-card-desc">Understands context</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card chatgpt">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/openai.svg" alt="ChatGPT" />
                </div>
                <h4 className="ai-card-title">ChatGPT</h4>
                <span className="ai-card-badge">OpenAI</span>
                <p className="ai-card-desc">Complex reasoning</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card deepseek">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/deepseek.svg" alt="DeepSeek" />
                </div>
                <h4 className="ai-card-title">DeepSeek</h4>
                <span className="ai-card-badge">New</span>
                <p className="ai-card-desc">Works with numbers</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card openrouter">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/openrouter.svg" alt="OpenRouter" />
                </div>
                <h4 className="ai-card-title">OpenRouter</h4>
                <span className="ai-card-badge">OpenRouter</span>
                <p className="ai-card-desc">Unified access point</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card groq">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/groq.svg" alt="Groq" />
                </div>
                <h4 className="ai-card-title">Groq</h4>
                <span className="ai-card-badge">Groq</span>
                <p className="ai-card-desc">Ultra-fast inference</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card cohere">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/cohere.svg" alt="Cohere" />
                </div>
                <h4 className="ai-card-title">Cohere</h4>
                <span className="ai-card-badge">Cohere</span>
                <p className="ai-card-desc">Great for retrieval</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>

              <div className="ai-card gemini">
                <div className="ai-card-icon">
                  <img src="/Vetro-Studio/aicon/gemini.svg" alt="Gemini" />
                </div>
                <h4 className="ai-card-title">Gemini</h4>
                <span className="ai-card-badge">Google</span>
                <p className="ai-card-desc">Fast data analysis</p>
                <div className="ai-card-arrow">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </div>
              </div>
            </div>

          </div>
          
          <div className="feature-text-container">
            <p className="feature-description">
              Bring Your Own Keys (BYOK). Connect your personal API keys and access a wide range of AI models from different providers. Switch between models anytime and use the best tool for each task without being locked into a single ecosystem.
            </p>
          </div>
        </div>

        {/* Final Section */}
        <div ref={featureRef7} className="feature-section final-section">
          <div className="final-container">
            <h2 className="final-title">Ready to dive in?</h2>
            <div className="final-tiles">
              
              <a href="https://github.com/Phnem/Vetro-Echoic" target="_blank" rel="noopener noreferrer" className="final-tile doc-tile">
                <div className="final-tile-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <h3>Documentation</h3>
                <p>Explore the GitHub repository and setup guide</p>
              </a>

              <button onClick={handleDownload} disabled={isDownloading} className="final-tile download-tile">
                <div className="final-tile-icon">
                  {isDownloading ? (
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin-icon">
                       <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                     </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                    </svg>
                  )}
                </div>
                <h3>{isDownloading ? 'Fetching...' : 'Download APK'}</h3>
                <p>Get the latest release for Android</p>
              </button>

            </div>
          </div>
        </div>

      </div>
      </main>
    </div>
  );
}
