"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footer = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // End-of-document copy must never depend on a scrubbed blur/transform.
      gsap.fromTo(footer.current, { opacity: .65 }, {
        opacity: 1, duration: .45, ease: "power2.out", clearProps: "opacity",
        scrollTrigger: { trigger: footer.current, start: "top 98%", once: true },
      });
    }, footer);
    return () => media.revert();
  }, []);
  return (
    <footer ref={footer} className="portfolio-footer editorial-shell">
      <div><p className="eyebrow">GED0001 / DIGITAL READING PORTFOLIO</p>
        <p className="mt-3 text-sm text-foreground/65">By Cliford V. Balce</p></div>
      <p className="footer-note">Beyond the Pages</p>
      <Link href="/#home" data-cursor="link" className="flex items-center gap-3 text-sm">Back to top <ArrowUpRight size={17} /></Link>
    </footer>
  );
}
