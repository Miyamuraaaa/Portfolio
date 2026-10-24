"use client";

import { useEffect, useRef } from "react";

/**
 * Thin bar at the top of the window that fills as the page is scrolled.
 * Only a transform is written (no layout), reads happen once per frame, and
 * it behaves the same with a mouse wheel, touch scrolling or Lenis.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = bar.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      node.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    // The page height changes as content, fonts and pinned sections settle.
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queue) : null;
    observer?.observe(document.body);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={bar} className="scroll-progress-bar" />
    </div>
  );
}
