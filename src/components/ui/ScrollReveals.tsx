"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveals({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    media.add({ desktop: "(min-width: 1025px)", reduced: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 1024px)" }, (context) => {
      if (context.conditions?.reduced) return;
      const mobile = Boolean(context.conditions?.mobile);
      scope.current?.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const offset = Math.min(36, Number(group.dataset.revealOffset) || 0);
        const timeline = gsap.timeline({
          defaults: { ease: mobile ? "power2.out" : "none" },
          scrollTrigger: mobile ? { trigger: group, start: "top 90%", once: true } : { trigger: group, start: `top+=${offset} 94%`, end: `clamp(top+=${offset} 64%)`, scrub: 0.35, invalidateOnRefresh: true },
        });
        const animate = (kind: string, from: gsap.TweenVars, at: number, duration: number) => {
          const targets = group.querySelectorAll(`[data-reveal="${kind}"]`);
          if (targets.length) timeline.fromTo(targets, mobile ? { ...from, ...(from.y ? { y: kind === "title" ? 25 : 20 } : {}), filter: "none" } : from, { opacity: 1, y: 0, filter: "blur(0px)", scaleX: 1, duration: mobile ? Math.min(duration, .55) : duration }, at + (mobile && kind === "content" ? offset / 240 : 0));
        };
        animate("line", { scaleX: 0, transformOrigin: "left" }, 0, 0.75);
        animate("label", { opacity: 0, y: 15 }, 0, 0.45);
        animate("title", { opacity: 0, y: 45, filter: "blur(8px)" }, 0.12, 0.8);
        animate("description", { opacity: 0, y: 24 }, 0.22, 0.7);
        animate("content", { opacity: 0, y: 28, filter: "blur(4px)" }, 0.08, 0.85);
      });
    }, scope);
    // Font loading can change the measured height of editorial headings.
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    // Expanding an attachment list changes the positions of subsequent reveals.
    const element = scope.current;
    const refresh = () => ScrollTrigger.refresh();
    element?.addEventListener("toggle", refresh, true);
    return () => {
      disposed = true;
      element?.removeEventListener("toggle", refresh, true);
      media.revert();
    };
  }, []);
  return <div ref={scope}>{children}</div>;
}
