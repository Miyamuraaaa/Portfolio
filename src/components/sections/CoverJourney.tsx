"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import ReadingJourney from "./ReadingJourney";

gsap.registerPlugin(ScrollTrigger);

export default function CoverJourney({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ready || !root.current) return;
    const element = root.current;
    const media = gsap.matchMedia();
    let disposed = false;
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = element.querySelector<HTMLElement>("#home")!;
      const page = element.querySelector<HTMLElement>("#journey")!;
      const entry = element.querySelector<HTMLElement>(".journey-entry")!;
      const depth = { progress: 0 };
      const syncDepth = () => {
        // A camera offset inside the existing renderer gives real distance-based parallax.
        const canvas = hero.querySelector("canvas");
        if (canvas) canvas.dataset.coverDepth = String(depth.progress);
      };
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero, start: "top top", end: () => `+=${hero.offsetHeight}`,
          pin: hero, pinSpacing: false, scrub: .45, invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });
      timeline.to(depth, { progress: 1, duration: 1, onUpdate: syncDepth }, 0)
        .to(hero.querySelectorAll(".title-line"), { y: (index: number) => -40 - index * 24, scale: (index: number) => .98 - index * .015, opacity: 0, stagger: .035, duration: .75 }, 0)
        .to(hero.querySelectorAll(".hero-topline, .hero-byline, .hero-intro, .hero-actions, .hero-foot"), { y: -32, opacity: 0, duration: .5 }, .04)
        .to(hero.querySelector(".cover-vignette"), { opacity: .82, duration: 1 }, 0);
      gsap.fromTo(page, { rotationX: 9, scale: .9, y: 90, transformPerspective: 1400, transformOrigin: "50% 0%" }, {
        rotationX: 0, scale: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: entry, start: "top bottom", end: "top 8%", scrub: .45, invalidateOnRefresh: true },
      });
      return () => { delete hero.querySelector("canvas")?.dataset.coverDepth; };
    }, root);
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, [ready]);
  return <div ref={root} className="cover-journey">
    <Hero ready={ready} />
    <div className="journey-entry"><ReadingJourney /></div>
  </div>;
}
