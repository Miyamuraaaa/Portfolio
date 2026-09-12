"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", touch: "(max-width: 1024px) and (pointer: coarse)" }, (context) => {
      const reduced = Boolean(context.conditions?.reduced);
      const lenis = reduced || context.conditions?.touch ? null : new Lenis({
        anchors: false,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });
      const tick = (time: number) => lenis?.raf(time * 1000);
      lenis?.on("scroll", ScrollTrigger.update);
      if (lenis) gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      let landing: Element | null = null;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let navigation = 0;
      const clearLanding = () => {
        clearTimeout(timer);
        landing?.classList.remove("section-landing");
        landing = null;
      };
      const navigate = (hash: string) => {
        let id: string;
        try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (!target) return;
        const request = ++navigation;
        clearLanding();
        const complete = () => {
          if (request !== navigation) return;
          // Move keyboard reading position without introducing a persistent parent tint.
          const hadTabIndex = target.hasAttribute("tabindex");
          if (!hadTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (!hadTabIndex) target.removeAttribute("tabindex");
          if (reduced) return;
          landing = target.querySelector(".chapter-row, .hero-topline, .section-heading");
          landing?.classList.add("section-landing");
          timer = setTimeout(clearLanding, 800);
        };
        if (lenis) lenis.scrollTo(target, { offset: -100, onComplete: complete });
        else {
          window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 100), behavior: reduced ? "instant" : "smooth" });
          complete();
        }
      };
      const click = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        let target: HTMLElement | null;
        try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
        if (!target) return;
        event.preventDefault();
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        navigate(url.hash);
      };
      const hashChange = () => navigate(location.hash);
      document.addEventListener("click", click);
      window.addEventListener("hashchange", hashChange);
      return () => {
        navigation++;
        clearLanding();
        document.removeEventListener("click", click);
        window.removeEventListener("hashchange", hashChange);
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    });
    return () => media.revert();
  }, []);
  return <>{children}</>;
}
