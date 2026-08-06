"use client";

import { useEffect } from "react";

/**
 * Scroll reveals driven by IntersectionObserver rather than scroll positions,
 * so late layout shifts (lazy images, webfonts) can't strand an element in its
 * hidden state. The hidden styles are scoped to `.fx-ready` on <html>, which is
 * only added here — without JS everything renders visible.
 *
 * Markup contract:
 *   [data-fx]        — fades/slides itself in
 *   [data-stagger]   — fades/slides its direct children in sequence
 *   .words           — slides each per-word mask up in sequence
 */
export function useReveal(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("fx-ready");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.querySelectorAll<HTMLElement>(
      "[data-fx], [data-stagger], .words",
    );

    if (reduce) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    // Per-child delays, applied once so the observer stays cheap.
    targets.forEach((el) => {
      const kids = el.matches(".words")
        ? el.querySelectorAll<HTMLElement>(".w > span")
        : el.hasAttribute("data-stagger")
          ? (Array.from(el.children) as HTMLElement[])
          : [];
      kids.forEach((kid, i) => {
        kid.style.transitionDelay = `${i * (el.matches(".words") ? 38 : 65)}ms`;
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/**
 * Reports which of `selector`'s elements is crossing the middle of the
 * viewport — used to drive the sticky screenshot stack.
 */
export function useActiveIndex(
  rootRef: React.RefObject<HTMLElement | null>,
  selector: string,
  onChange: (index: number) => void,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) onChange(nodes.indexOf(hit.target as HTMLElement));
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-42% 0px -42% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [rootRef, selector, onChange]);
}
