"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }
    const obj = { val: 0 };
    let exitTween: gsap.core.Tween | undefined;
    const tl = gsap.timeline({
      onComplete: () => {
        exitTween = gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });

    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      tl.kill();
      exitTween?.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader">
      <p className="eyebrow mb-8">GED0001 / DIGITAL READING PORTFOLIO</p>
      <div className="text-center">
        <span className="text-7xl md:text-9xl font-bold tabular-nums text-foreground">
          {count}
          <span className="text-accent">%</span>
        </span>
      </div>
      <p className="mt-8 text-sm text-foreground/60">By Cliford V. Balce</p>
      <div className="w-48 h-[2px] bg-foreground/10 mt-8 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
