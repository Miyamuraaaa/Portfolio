"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Stable seeded values keep SSR and hydration identical, without a visible grid.
function seed(value: number) {
  const n = Math.sin(value * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/** Decorative only: deterministic points, no textures or additional WebGL context. */
export default function CosmicAtmosphere() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = layer.current;
    if (!element) return;
    let cinematic = true;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let flight: Animation | undefined;
    let sampleTimer: ReturnType<typeof setTimeout> | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = window.matchMedia("(min-width: 1025px)");
    const streak = element.querySelector<HTMLElement>(".cosmic-streak");
    const depths = element.querySelectorAll<HTMLElement>(".cosmic-depth");
    // One flight across the entire site, independent of the section containers.
    const schedule = () => {
      timer = setTimeout(() => {
        if (!streak) return;
        const right = Math.random() > .35;
        streak.style.left = `${right ? 86 + Math.random() * 8 : 9 + Math.random() * 6}%`;
        streak.style.top = `${26 + Math.random() * 22}%`;
        const angle = 122 + Math.random() * 22;
        const distance = (desktop.matches ? 90 : 55) + Math.random() * 45;
        const radians = angle * Math.PI / 180;
        streak.style.width = `${35 + Math.random() * 45}px`;
        flight = streak.animate([
          { opacity: 0, transform: `translate(0, 0) rotate(${angle}deg)` },
          { opacity: (cinematic ? .5 : .35) + Math.random() * .2, offset: .2 },
          { opacity: 0, transform: `translate(${Math.cos(radians) * distance}px, ${Math.sin(radians) * distance}px) rotate(${angle}deg)` },
        ], { duration: 700 + Math.random() * 800, easing: "ease-out" });
        schedule();
      }, !desktop.matches ? 10000 + Math.random() * 8000 : cinematic ? 6000 + Math.random() * 8000 : 12000 + Math.random() * 13000);
    };
    const update = () => {
      const active = !document.hidden && motion.matches;
      element.dataset.active = String(active);
      clearTimeout(timer);
      flight?.cancel();
      if (active) schedule();
    };
    const sampleScroll = () => {
      frame = 0;
      if (document.hidden) return;
      const focusY = window.innerHeight * .45;
      let sectionId = "home";
      // Measure in viewport space: Journey's pin spacer is included naturally.
      for (const section of document.querySelectorAll<HTMLElement>("#home, #journey, #worksheets, #responses, #icare, #reflection, #projects, .portfolio-footer")) {
        if (section.getBoundingClientRect().top <= focusY) sectionId = section.id || "footer";
      }
      const footer = document.querySelector(".portfolio-footer")?.getBoundingClientRect();
      if (footer && footer.top < window.innerHeight && footer.bottom <= window.innerHeight + 1) sectionId = "footer";
      const intensity: Record<string, number> = { home: 1, journey: 1, worksheets: .65, responses: .7, icare: .7, reflection: .85, projects: .8, footer: .95 };
      element.style.setProperty("--cosmic-intensity", String(intensity[sectionId] ?? .8));
      const nextCinematic = sectionId === "home" || sectionId === "journey";
      if (nextCinematic !== cinematic) { cinematic = nextCinematic; update(); }
      const progress = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      depths.forEach((depth, index) => {
        depth.style.translate = motion.matches && desktop.matches ? `0 ${-progress * [3, 10, 20][index]}px` : "none";
      });
    };
    const requestSample = () => {
      if (document.hidden || frame || sampleTimer) return;
      if (desktop.matches) frame = requestAnimationFrame(sampleScroll);
      else sampleTimer = setTimeout(() => { sampleTimer = undefined; sampleScroll(); }, 180);
    };
    const refresh = () => { update(); requestSample(); };
    window.addEventListener("scroll", requestSample, { passive: true });
    window.addEventListener("resize", refresh);
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", refresh);
    desktop.addEventListener("change", refresh);
    refresh();
    return () => { clearTimeout(timer); clearTimeout(sampleTimer); cancelAnimationFrame(frame); flight?.cancel(); window.removeEventListener("scroll", requestSample); window.removeEventListener("resize", refresh); motion.removeEventListener("change", refresh); desktop.removeEventListener("change", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return <div ref={layer} className="cosmic-atmosphere" aria-hidden="true">
    <div className="cosmic-haze" />
    {[70, 35, 15].map((count, depth) => <div key={depth} className={`cosmic-depth cosmic-depth-${depth}`}>
      {Array.from({ length: count }, (_, i) => <i key={i} className="cosmic-star" style={{
        // Edge-weighted distribution keeps the central reading area quiet.
        left: `${depth === 0 && i % 11 === 0 ? 28 + seed(i + 59) * 44 : seed(i + depth * 93) > .48 ? 79 + seed(i + depth * 37 + 10) * 20 : 1 + seed(i + depth * 37 + 10) * 20}%`,
        top: `${2 + seed(i + depth * 53 + 3) * 95}%`,
        "--star-delay": `${-i * 1.7}s`, "--star-opacity": [.18, .3, .5][depth] + (i % 5) * [ .04, .06, .06 ][depth],
        "--twinkle-duration": `${5 + seed(i + 12) * 8}s`,
        "--star-size": `${[1, 1.5, 2][depth] + (i % 3) * .25}px`,
      } as CSSProperties} />)}
    </div>)}
    <span className="cosmic-streak" />
  </div>;
}
