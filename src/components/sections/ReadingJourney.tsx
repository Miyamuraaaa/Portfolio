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
    let disposed = false;
    media.add("(min-width: 1025px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)", () => {
      const element = section.current;
      if (!element) return;
      const frame = element.querySelector<HTMLElement>(".journey-frame");
      if (!frame) return;
      // Keep a stable scope even when ScrollTrigger reparents the pinned frame.
      const select = gsap.utils.selector(frame);
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "reading-journey",
          trigger: element,
          pin: frame,
          pinReparent: true,
          start: "top 100px",
          end: () => "+=" + Math.round(Math.min(1200, frame.clientHeight * 1.4)),
          scrub: 0.4,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 1,
        },
      });
      timeline
        .fromTo(select(".journey-paper-primary"), { autoAlpha: 0, x: () => frame.clientWidth * .08, y: () => -frame.clientHeight * .04, rotation: -20 }, { autoAlpha: 1, x: 0, y: 0, rotation: -12, duration: .18 }, .02)
        .fromTo(select(".journey-title, .journey-intro"), { opacity: 0, y: 40, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: .15 }, .2)
        .fromTo(select(".journey-timeline-line"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: .15 }, .35)
        .fromTo(select(".journey-paper-secondary"), { autoAlpha: 0, x: () => -frame.clientWidth * .08, y: () => frame.clientHeight * .04, rotation: 20 }, { autoAlpha: 1, x: 0, y: 0, rotation: 10, duration: .15 }, .5)
        .fromTo(select(".journey-ink"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .15 }, .5)
        .fromTo(select(".journey-milestone"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: .025, duration: .075 }, .65)
        .to(select(".journey-paper-primary"), { y: -10, rotation: -8, duration: .18 }, .8)
        .to(select(".journey-paper-secondary"), { y: 8, rotation: 6, duration: .18 }, .8)
        .fromTo(select(".journey-settle"), { opacity: 0 }, { opacity: 1, duration: .2 }, .8);
    }, section);
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(section.current);
      const paperOpacity = window.innerWidth < 768 ? .28 : .45;
      gsap.timeline({ defaults: { duration: .55, ease: "power2.out" }, scrollTrigger: { trigger: section.current, start: "top 82%", once: true } })
        .fromTo(select(".journey-topline > p"), { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0)
        .fromTo(select(".journey-paper-primary"), { opacity: 0, x: -20, y: 25, rotation: -18 }, { opacity: paperOpacity, x: 0, y: 0, rotation: -10 }, .12)
        .fromTo(select(".journey-title"), { opacity: 0, y: 22, filter: "blur(2px)" }, { opacity: 1, y: 0, filter: "blur(0px)" }, .28)
        .fromTo(select(".journey-intro"), { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, .42)
        .fromTo(select(".journey-paper-secondary"), { opacity: 0, x: 18, y: 20, rotation: 16 }, { opacity: paperOpacity, x: 0, y: 0, rotation: 10 }, .55);
      // The lower group enters on its own so a short phone never misses it.
      gsap.timeline({ defaults: { duration: .5, ease: "power2.out" }, scrollTrigger: { trigger: select(".journey-timeline")[0], start: "top 90%", once: true } })
        .fromTo(select(".journey-timeline-line"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1 }, 0)
        .fromTo(select(".journey-ink"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0 }, 0)
        .fromTo(select(".journey-milestone"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: .09 }, .12)
        .fromTo(select(".journey-settle"), { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, .65);
    }, section);
    // Re-measure the pin and all downstream card triggers after fonts settle.
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
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
