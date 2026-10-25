"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import "@/app/about.css";

gsap.registerPlugin(ScrollTrigger);

/** Shows **double-asterisk** phrases from profile.bio as emphasised text. */
function Rich({ text }: { text: string }) {
  return <>{text.split("**").map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part))}</>;
}

/**
 * About section: a framed portrait on a board with a pen that slides in beside it,
 * next to the introduction — the same desk language as the Reading Journey.
 * The layout and the scroll choreography are identical on phones, tablets and desktops;
 * only the travel distances and the column count change.
 */
export default function AboutMe() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;

    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 767px)" }, (context) => {
      // Reduced motion: everything stays in its final, fully readable position.
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const q = gsap.utils.selector(section.current);
      // Every group owns its trigger, so stacked mobile layouts animate as each group arrives.
      const scrub = (trigger: Element | undefined, start = "top 90%", end = "top 42%") => ({
        trigger, start, end, scrub: 0.4, invalidateOnRefresh: true,
      });

      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: scrub(q(".about-heading")[0], "top 92%", "top 60%") })
        .fromTo(q(".about-heading > *"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, 0);

      // Board one + pen: the board settles in from the side, the pen follows a beat later.
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: scrub(q(".about-board-primary")[0]) })
        .fromTo(q(".about-board-primary"), { opacity: 0, x: mobile ? -36 : -110, y: 30, rotation: mobile ? -12 : -16 }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.6 }, 0)
        .fromTo(q(".about-pen"), { opacity: 0, x: mobile ? -18 : -46, y: 70, rotation: -30 }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.6 }, 0.2);

      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: scrub(q(".about-copy")[0], "top 88%", "top 50%") })
        .fromTo(q("[data-about='line']"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, 0);

      // Quiet idle drift while the section is on screen.
      gsap.to(q(".about-float"), {
        y: -4, duration: 3.8,
        repeat: -1, yoyo: true, ease: "sine.inOut",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
      });
    }, section);

    // Web fonts change heading heights, which moves every trigger below.
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);

  return (
    <section ref={section} id="about" className="about-section" aria-labelledby="about-title">
      <div className="editorial-shell">
        <div className="section-heading about-heading">
          <div>
            <p className="eyebrow">ABOUT THE READER</p>
            <h2 id="about-title">About <em>me.</em></h2>
          </div>
          <p>The person behind<br />the pages.</p>
        </div>

        <div className="about-stage">
          {/* Board one: the framed portrait */}
          <figure className="about-board-wrap about-board-primary">
            <div className="about-float">
              <div className="about-tilt">
                <span className="about-board" aria-hidden="true" />
                <span className="about-underlay" aria-hidden="true" />
                <div className="about-sheet">
                  <span className="about-tape" aria-hidden="true" />
                  <span className="about-code" aria-hidden="true">PORTRAIT / 01</span>
                  <div className="about-mat">
                    <div className="about-photo">
                      <Image
                        src={profile.photo.src}
                        alt={profile.photo.alt}
                        width={profile.photo.width}
                        height={profile.photo.height}
                        sizes="(max-width: 767px) 70vw, (max-width: 1024px) 320px, 340px"
                      />
                    </div>
                  </div>
                  <figcaption className="about-caption">
                    <strong>{profile.name}</strong>
                    <span>{profile.program} / BLOCK {profile.block}</span>
                  </figcaption>
                </div>
              </div>
              <span className="about-pen" aria-hidden="true"><span className="about-pen-body" /></span>
            </div>
          </figure>

          {/* The introduction */}
          <div className="about-copy">
            {profile.bio.map((paragraph, index) => (
              <p key={index} data-about="line" className={index === 0 ? "about-lead" : undefined}><Rich text={paragraph} /></p>
            ))}
            <div className="about-links" data-about="line">
              <SocialLinks />
              <a href={profile.independentWork.url} className="about-work-link" target="_blank" rel="noopener noreferrer" data-cursor="link">
                {profile.independentWork.label} <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
