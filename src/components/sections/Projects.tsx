"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { worksIn } from "@/data/content";
import WorkCard from "@/components/ui/WorkCard";

export default function Projects() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const featuredWorks = worksIn("featured-work");
  const calculator = featuredWorks.find((work) => work.slug === "engineering-calculator" && work.url);
  const otherWorks = featuredWorks.filter((work) => work.id !== calculator?.id);
  // The inner card retains its tilt; scroll transforms belong to its outer wrapper.
  const handleMouseMove = (event: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || reducedMotion || !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * 4;
    const y = -((event.clientX - rect.left) / rect.width - 0.5) * 4;
    card.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg)`;
    card.style.setProperty("--spot-x", `${(event.clientX - rect.left) / rect.width * 100}%`);
    card.style.setProperty("--spot-y", `${(event.clientY - rect.top) / rect.height * 100}%`);
  };

  return (
    <section id="projects" className="featured-section editorial-shell">
      <div className="section-heading" data-reveal-group>
        <div><p className="eyebrow" data-reveal="label">INDEPENDENT EXPLORATIONS</p><h2 data-reveal="title">Featured <em>work.</em></h2></div>
        <p data-reveal="description">Personal work,<br />beyond the reading collection.</p>
      </div>
      {calculator?.url && <div data-reveal-group><div data-reveal="content">
        <a href={calculator.url} target="_blank" rel="noopener noreferrer" data-cursor="project" className="featured-link" aria-label={`${calculator.title} — visit website (opens in a new tab)`}>
          <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => { if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0)"; }} className="featured-card">
            <div className="calculator-art" aria-hidden="true">
              <span className="eyebrow art-label">ENGINEERING / PROBLEM SOLVING</span>
              <span className="art-orbit" /><span className="art-axis" />
              <div className="calculator-type"><span>ƒ</span><small>(x)</small></div>
              <span className="art-wordmark">ENGINEER<span>X</span><sup>↗</sup></span>
              <span className="eyebrow art-caption">A PERSONAL WEB PROJECT</span>
            </div>
            <div className="featured-copy">
              <p className="eyebrow">01 / {calculator.subtitle || "FEATURED WORK"}</p>
              <h3>{calculator.title}</h3>
              {calculator.date && <p className="eyebrow mt-3">{calculator.date}</p>}
              {calculator.description && <p className="work-description">{calculator.description}</p>}
              {calculator.score !== undefined && <p className="work-description">Score: {calculator.score}</p>}
              {calculator.reflection && <p className="work-description">{calculator.reflection}</p>}
              <span className="visit-link">Visit Website <ArrowUpRight size={20} /></span>
              <span className="work-url">{new URL(calculator.url).hostname}</span>
            </div>
          </div>
        </a>
      </div></div>}
      {otherWorks.length > 0 && <div className="featured-work-grid">{otherWorks.map((work) => <WorkCard key={work.id} work={work} />)}</div>}
      {featuredWorks.length === 0 && <p className="text-foreground/60">To be collected</p>}
    </section>
  );
}
