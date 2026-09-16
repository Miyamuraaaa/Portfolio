"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const milestones = [
  { title: "Reading", detail: "Notice & understand", href: "#worksheets" },
  { title: "Response", detail: "Connect & question", href: "#responses" },
  { title: "iCARE", detail: "Participate & learn", href: "#icare" },
  { title: "Reflection", detail: "Look back & grow", href: "#reflection" },
];

function JourneyPaper({ secondary = false }: { secondary?: boolean }) {
  return <div className={`journey-paper ${secondary ? "journey-paper-secondary" : "journey-paper-primary"}`} aria-hidden="true">
    <span className="journey-paper-code">{secondary ? "NOTES / 02" : "GED0001 / 01"}</span>
    <svg viewBox="0 0 240 310" fill="none">
      <path d="M30 30h75M30 45h150" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M30 ${80 + i * 19}q25 -3 50 0t${i === 5 ? 45 : 95} 0`} stroke="currentColor" opacity=".45" />)}
      <path className="journey-ink" pathLength="1" d="M29 122q60 5 128 0M180 174l7 7 16-22M28 215v43h14" stroke="#88748f" strokeWidth="2" />
      <ellipse cx="171" cy="253" rx="20" ry="12" stroke="currentColor" opacity=".4" />
    </svg>
    <span className="journey-paper-foot">{secondary ? "A moment to reflect." : "Beyond the Pages"}</span>
  </div>;
}

export default function ReadingJourney() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 767px)", desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion) return;
      const select = gsap.utils.selector(section.current);
      const mobile = context.conditions.mobile;
      // Original main-branch paper rotations, ink drawing, chapter stagger and
      // settling drift, retimed title-first for the Kage page entry. No blur.
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: section.current?.parentElement, start: "top 85%", end: "top 5%", scrub: .4 } })
        .fromTo(select(".journey-topline, .journey-title"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .24 }, 0)
        .fromTo(select(".journey-intro"), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: .2 }, .14)
        .fromTo(select(".journey-paper-primary"), { opacity: 0, x: mobile ? -28 : -110, y: 25, rotation: -20 }, { opacity: mobile ? .24 : .65, x: 0, y: 0, rotation: -12, duration: .28 }, .28)
        .fromTo(select(".journey-paper-secondary"), { opacity: 0, x: mobile ? 28 : 110, y: 20, rotation: 20 }, { opacity: mobile ? .20 : .50, x: 0, y: 0, rotation: 10, duration: .28 }, .40)
        .to(select(".journey-paper-primary"), { y: -10, rotation: -8, duration: .25 }, .7)
        .to(select(".journey-paper-secondary"), { y: 8, rotation: 6, duration: .25 }, .7);
      gsap.timeline({ defaults: { duration: .7, ease: "none" }, scrollTrigger: { trigger: select(".journey-timeline")[0], start: "top 90%", end: "top 65%", scrub: .4 } })
        .fromTo(select(".journey-timeline-line"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1 }, 0)
        .fromTo(select(".journey-milestone"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .08 }, .10)
        .fromTo(select(".journey-ink"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0 }, .2);
      gsap.to(select(".journey-paper-primary svg, .journey-paper-secondary svg"), {
        y: (index: number) => index ? 3 : -3, duration: 3.8, stagger: .6,
        repeat: -1, yoyo: true, ease: "sine.inOut",
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
      });
    }, section);
    return () => media.revert();
  }, []);
  return <section ref={section} id="journey" className="reading-journey" aria-labelledby="journey-title">
    <div className="journey-frame editorial-shell">
      <div className="journey-topline section-heading">
        <p className="eyebrow">01 / READING JOURNEY</p>
        <a href="#worksheets" className="journey-skip" data-cursor="link">Continue to the collection <ArrowDown size={14} /></a>
      </div>
      <div className="journey-stage">
        <JourneyPaper />
        <div className="journey-copy">
          <h2 id="journey-title" className="journey-title">READING<br /><em>JOURNEY</em></h2>
          <p className="journey-intro">From the first page to a new perspective.<br />A space to read, respond, and reflect.</p>
        </div>
        <JourneyPaper secondary />
      </div>
      <div className="journey-timeline">
        <span className="journey-timeline-line" aria-hidden="true" />
        <ol>{milestones.map((milestone, index) => <li key={milestone.title} className="journey-milestone">
          <a href={milestone.href} data-cursor="link"><span className="eyebrow">0{index + 1}</span><strong>{milestone.title}</strong><span>{milestone.detail}</span></a>
        </li>)}</ol>
      </div>
      <p className="journey-settle eyebrow">READ. CONNECT. REFLECT. / GED0001</p>
    </div>
  </section>;
}
