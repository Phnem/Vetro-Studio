"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Device from "@/components/Device";

const vars = (o: Record<string, string>) => o as CSSProperties;

/**
 * Mobile-only replacement for the sticky swap-on-scroll device: a scattered,
 * tilted collage of mockups that settles into place once, then drifts a
 * little further as the page keeps scrolling — no active screen-swapping.
 */
const PIECES = [
  { shot: "collection", left: "2%", top: "0%", width: "48%", rotate: -7, z: 3, drift: -14 },
  { shot: "details", left: "50%", top: "2%", width: "40%", rotate: 6, z: 2, drift: 10 },
  { shot: "seasons", left: "24%", top: "27%", width: "50%", rotate: 3, z: 4, drift: -8 },
  { shot: "manga", left: "56%", top: "42%", width: "38%", rotate: -5, z: 1, drift: 12 },
  { shot: "recommend", left: "-2%", top: "48%", width: "36%", rotate: 8, z: 1, drift: -10 },
];

export default function MockupGallery() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(max-width: 900px)", () => {
      const pieces = el.querySelectorAll<HTMLElement>(".mockup-item");

      gsap.from(pieces, {
        y: 46,
        opacity: 0,
        scale: 0.88,
        rotate: "+=8",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });

      pieces.forEach((piece, i) => {
        gsap.to(piece, {
          y: PIECES[i].drift,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="mockup-gallery" ref={root} aria-hidden>
      {PIECES.map((p) => (
        <div
          className="mockup-item"
          key={p.shot}
          style={vars({
            left: p.left,
            top: p.top,
            width: p.width,
            zIndex: String(p.z),
            "--r": `${p.rotate}deg`,
          })}
        >
          <Device src={p.shot} />
        </div>
      ))}
    </div>
  );
}
