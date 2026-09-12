"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const handoff = useRef({ progress: 0 });
  const [showScene, setShowScene] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".hero-byline, .hero-tagline, .hero-description, .hero-actions, .scroll-cue", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .55, stagger: .12, delay: .9, ease: "power2.out" });
    }, heroRef);
    return () => media.revert();
  }, [ready]);

  useEffect(() => {
    if (!showScene) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.35, invalidateOnRefresh: true } })
        .to(handoff.current, { progress: 1, duration: 1, ease: "none" }, 0)
        .to(".hero-canvas", { y: 90, opacity: 0.35, duration: 0.45, ease: "none" }, 0.55);
    }, heroRef);
    return () => media.revert();
  }, [showScene]);

  useEffect(() => {
    // Keep the original mobile fallback strategy without mounting a hidden Canvas.
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setShowScene(media.matches);
    update();
    media.addEventListener("change", update);
    let inView = true;
    const updateVisibility = () => {
      const active = inView && !document.hidden;
      setVisible(active);
      if (heroRef.current) heroRef.current.dataset.active = String(active);
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility(); });
    if (heroRef.current) observer.observe(heroRef.current);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { media.removeEventListener("change", update); document.removeEventListener("visibilitychange", updateVisibility); observer.disconnect(); };
  }, []);

  return (
    <section ref={heroRef} id="home" className="editorial-hero">
      <div className="hero-art" aria-hidden="true">
        <div className="paper-study"><i /><i /><i /><b /></div>
      </div>
      {showScene && <div className="hero-canvas" aria-hidden="true">
        <SceneBoundary><Scene eventSource={heroRef} active={visible} handoff={handoff} /></SceneBoundary>
      </div>}
      <div className="hero-shade" aria-hidden="true" />
      <div className="editorial-shell hero-content">
        <div className="hero-topline"><span className="eyebrow"><span className="label-dot" /> GED0001</span><span className="eyebrow hero-edition">A READING COLLECTION / 2026</span></div>
        <h1 className="hero-title" aria-label="Digital Reading Portfolio">
          <SplitText enabled={ready} className="title-line" scrollTrigger={false} delay={0.1} stagger={0.025}>DIGITAL</SplitText>
          <SplitText enabled={ready} className="title-line title-reading" scrollTrigger={false} delay={0.25} stagger={0.025}>READING</SplitText>
          <SplitText enabled={ready} className="title-line" scrollTrigger={false} delay={0.4} stagger={0.025}>PORTFOLIO</SplitText>
        </h1>
        <p className="hero-byline">By <span>Cliford V. Balce</span></p>
        <div className="hero-intro">
          <p className="hero-tagline">Beyond the Pages</p>
          <p className="hero-description">A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001.</p>
        </div>
        <div className="hero-actions">
          <MagneticButton href="#projects" className="editorial-button">Explore Portfolio <ArrowUpRight size={16} /></MagneticButton>
          <MagneticButton href="#journey" className="editorial-button secondary-button">My Journey <ArrowDown size={15} /></MagneticButton>
        </div>
      </div>
      <div className="hero-foot editorial-shell">
        <a href="#journey" data-cursor="link" className="eyebrow scroll-cue">SCROLL <ArrowDown size={15} /></a>
        <p className="eyebrow">READ. RESPOND. REFLECT.</p>
        <span className="eyebrow hidden sm:block">01 — 05</span>
      </div>
    </section>
  );
}
