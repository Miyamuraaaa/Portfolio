"use client";

import { useEffect, useRef } from "react";
import { createPixelScene } from "@/lib/pixelScene";

const TITLE = ["DIGITAL", "READING", "PORTFOLIO"];

/**
 * Home page used when the visitor picks "Mobile".
 * One full-screen pixel-art temple at night (drawn on a tiny canvas, so it is
 * light on phones), the title stacked at the bottom-left where a thumb never
 * covers it, and a tap on the scene sends a burst of maple leaves.
 * Same section id (#home) and same copy as the desktop hero.
 */
export default function MobileHero({ ready = true }: { ready?: boolean }) {
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = host.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scene: ReturnType<typeof createPixelScene> | null = null;
    try { scene = createPixelScene(surface, { reduced: motion.matches }); } catch { scene = null; }
    if (!scene) { element.classList.add("m-hero-fallback"); return; }
    const active = scene;
    const onMotion = (event: MediaQueryListEvent) => active.setReduced(event.matches);
    motion.addEventListener("change", onMotion);
    // Stop drawing while the hero is off screen, resume when it comes back.
    const observer = new IntersectionObserver(([entry]) => active.setActive(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    const onTap = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a, button")) return;
      const box = surface.getBoundingClientRect();
      active.burst(event.clientX - box.left, event.clientY - box.top);
    };
    element.addEventListener("pointerdown", onTap);
    return () => {
      element.removeEventListener("pointerdown", onTap);
      motion.removeEventListener("change", onMotion);
      observer.disconnect();
      active.destroy();
    };
  }, []);

  return (
    <section ref={host} id="home" className="m-hero" data-ready={ready ? "true" : "false"} aria-labelledby="m-hero-title">
      <canvas ref={canvas} className="m-hero-scene" aria-hidden="true" />
      <div className="m-hero-shade" aria-hidden="true" />
      <div className="m-hero-inner">
        <p className="m-hero-top eyebrow"><span><i className="m-sq" />GED0001</span><span>A Reading Collection / 2026</span></p>
        <div className="m-hero-main">
          <h1 id="m-hero-title" className="m-mega" aria-label="Digital Reading Portfolio">
            {TITLE.map((line, row) => {
              const first = TITLE.slice(0, row).reduce((total, previous) => total + previous.length, 0);
              return (
                <span key={line} className={`m-ln${row === 1 ? " m-gold" : ""}`} aria-hidden="true">
                  {Array.from(line).map((letter, column) => <span key={column} className="m-ch" style={{ "--i": first + column } as React.CSSProperties}>{letter}</span>)}
                </span>
              );
            })}
          </h1>
          <p className="m-by m-fade" style={{ "--d": 0 } as React.CSSProperties}>By <b>Cliford V. Balce</b></p>
          <p className="m-tagl m-fade" style={{ "--d": 120 } as React.CSSProperties}>Beyond the Pages</p>
          <p className="m-desc m-fade" style={{ "--d": 240 } as React.CSSProperties}>A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001.</p>
          <div className="m-cta m-fade" style={{ "--d": 360 } as React.CSSProperties}>
            <a className="m-btn m-solid" href="#projects">Explore Portfolio <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7" /></svg></a>
            <a className="m-btn" href="#journey">My Journey <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg></a>
          </div>
        </div>
        <div className="m-hero-bot eyebrow m-fade" style={{ "--d": 520 } as React.CSSProperties}>
          <a className="m-scroll" href="#journey" aria-label="Scroll to the Reading Journey"><span>Scroll</span><i /></a>
          <span>Read. Respond. Reflect.</span>
        </div>
      </div>
    </section>
  );
}
