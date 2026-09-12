"use client";

import { useEffect, useRef, type CSSProperties } from "react";

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
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = window.matchMedia("(min-width: 1025px)");
    const streak = element.querySelector<HTMLElement>(".cosmic-streak");
    const depths = element.querySelectorAll<HTMLElement>(".cosmic-depth");

    // One lightweight meteor across the entire site. Mobile keeps it rarer and shorter.
    const schedule = () => {
      const isDesktop = desktop.matches;
      const minDelay = isDesktop ? (cinematic ? 6000 : 12000) : (cinematic ? 9000 : 15000);
      const variance = isDesktop ? (cinematic ? 8000 : 13000) : (cinematic ? 9000 : 12000);
      timer = setTimeout(() => {
        if (!streak || !motion.matches || document.hidden) return;
        const right = Math.random() > .35;
        streak.style.left = `${right ? 84 + Math.random() * 9 : 7 + Math.random() * 8}%`;
        streak.style.top = `${20 + Math.random() * 34}%`;
        const travelX = isDesktop ? -65 : -45;
        const travelY = isDesktop ? 72 : 50;
        flight = streak.animate([
          { opacity: 0, transform: "translate(0, 0) rotate(132deg)" },
          { opacity: isDesktop ? (cinematic ? .7 : .5) : (cinematic ? .48 : .34), offset: .2 },
          { opacity: 0, transform: `translate(${travelX}px, ${travelY}px) rotate(132deg)` },
        ], { duration: isDesktop ? 700 + Math.random() * 800 : 650 + Math.random() * 550, easing: "ease-out" });
        schedule();
      }, minDelay + Math.random() * variance);
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
      const intensity: Record<string, number> = { home: 1, journey: 1, worksheets: .6, responses: .65, icare: .65, reflection: .8, projects: .75, footer: .9 };
      element.style.setProperty("--cosmic-intensity", String(intensity[sectionId] ?? .8));
      const nextCinematic = sectionId === "home" || sectionId === "journey";
      if (nextCinematic !== cinematic) { cinematic = nextCinematic; update(); }

      // Desktop gets subtle depth parallax. Mobile keeps the star field stationary for smooth touch scrolling.
      const progress = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      depths.forEach((depth, index) => {
        depth.style.translate = desktop.matches ? `0 ${-progress * [3, 10, 20][index]}px` : "none";
      });
    };

    const requestSample = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(sampleScroll); };
    const refresh = () => { update(); requestSample(); };
    window.addEventListener("scroll", requestSample, { passive: true });
    window.addEventListener("resize", refresh);
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", refresh);
    desktop.addEventListener("change", refresh);
    refresh();
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      flight?.cancel();
      window.removeEventListener("scroll", requestSample);
      window.removeEventListener("resize", refresh);
      motion.removeEventListener("change", refresh);
      desktop.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return <div ref={layer} className="cosmic-atmosphere" aria-hidden="true">
    {[70, 35, 10].map((count, depth) => <div key={depth} className={`cosmic-depth cosmic-depth-${depth}`}>
      {Array.from({ length: count }, (_, i) => <i key={i} className="cosmic-star" style={{
        // Edge-weighted distribution keeps the central reading area quiet.
        left: `${i % 2 ? 78 + ((i * 17 + depth * 7) % 21) : 1 + ((i * 13 + depth * 7) % 21)}%`,
        top: `${2 + ((i * 19 + depth * 11) % 95)}%`,
        "--star-delay": `${-i * 1.7}s`, "--star-opacity": [.18, .3, .5][depth] + (i % 5) * [ .04, .06, .06 ][depth],
        "--star-size": `${[1, 1.5, 2][depth] + (i % 3) * .25}px`,
      } as CSSProperties} />)}
    </div>)}
    <span className="cosmic-streak" />
  </div>;
}
