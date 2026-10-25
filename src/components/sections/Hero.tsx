"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";

// Focused Community component: no landing-page iframe or copied renderer.
const TempleNightScene = dynamic(
  () => import("@designcodeio/threeui/components/TempleNightScene").then(module => module.TempleNightScene),
  { ssr: false },
);
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);
  useEffect(() => {
    // Phones use the CSS lantern atmosphere; do not mount a hidden heavy renderer.
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setShowScene(media.matches);
    const frame = requestAnimationFrame(update);
    media.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".hero-byline, .hero-tagline, .hero-description, .hero-actions, .scroll-cue", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .65, stagger: .10, delay: .9, ease: "power2.out" });
    }, heroRef);
    return () => media.revert();
  }, [ready]);
  return (
    <section ref={heroRef} id="home" className="editorial-hero">
      <div className="kage-hero-atmosphere" aria-hidden="true" />
      {showScene && <div className="kage-temple" aria-hidden="true"><SceneBoundary><TempleNightScene /></SceneBoundary></div>}
      <div className="hero-shade" aria-hidden="true" />
      <div className="cover-vignette" aria-hidden="true" />
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
