"use client";

import { useEffect, useRef, useState } from "react";

export type DeviceChoice = "desktop" | "mobile";

/**
 * Introduction screen shown after the loading screen. The visitor says what
 * they are using; "PC / Laptop" loads the full cinematic page, "Mobile" loads
 * the version built for phones. The suggested option is pre-focused.
 */
export default function DeviceGate({ suggested, onChoose }: { suggested: DeviceChoice; onChoose: (choice: DeviceChoice) => void }) {
  const [leaving, setLeaving] = useState(false);
  const first = useRef<HTMLButtonElement>(null);
  const second = useRef<HTMLButtonElement>(null);
  const choice = useRef<DeviceChoice | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    (suggested === "mobile" ? second : first).current?.focus();
    return () => { root.style.overflow = previous; };
  }, [suggested]);

  const choose = (value: DeviceChoice) => {
    if (choice.current) return;
    choice.current = value;
    setLeaving(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => onChoose(value), reduce ? 0 : 450);
  };

  // Keep keyboard focus inside the two choices while the screen is open.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const a = first.current, b = second.current;
    if (!a || !b) return;
    if (event.shiftKey && document.activeElement === a) { event.preventDefault(); b.focus(); }
    else if (!event.shiftKey && document.activeElement === b) { event.preventDefault(); a.focus(); }
  };

  return (
    <div className={`device-gate${leaving ? " is-leaving" : ""}`} role="dialog" aria-modal="true" aria-labelledby="device-title" aria-describedby="device-copy" onKeyDown={onKeyDown}>
      <div className="device-gate-inner">
        <p className="eyebrow device-eyebrow"><span className="label-dot" /> GED0001 / DIGITAL READING PORTFOLIO</p>
        <h2 id="device-title" className="device-title">Welcome to<br /><em>Beyond the Pages.</em></h2>
        <p id="device-copy" className="device-copy">This is a collection of my reading activities, responses, iCARE activities and reflections for GED0001. To show it the way it was made to be seen, tell me what you are using.</p>
        <div className="device-options">
          <button ref={first} type="button" className="device-card" data-suggested={suggested === "desktop"} onClick={() => choose("desktop")}>
            <svg viewBox="0 0 64 48" aria-hidden="true"><rect x="6" y="5" width="52" height="30" rx="2" /><path d="M24 43h16M32 35v8" /></svg>
            <span className="device-card-title">PC / Laptop</span>
            <span className="device-card-copy">The full cinematic experience with the 3D scene.</span>
            {suggested === "desktop" && <span className="device-card-tag eyebrow">Suggested for your screen</span>}
          </button>
          <button ref={second} type="button" className="device-card" data-suggested={suggested === "mobile"} onClick={() => choose("mobile")}>
            <svg viewBox="0 0 64 48" aria-hidden="true"><rect x="22" y="3" width="20" height="42" rx="3" /><path d="M29 40h6" /></svg>
            <span className="device-card-title">Mobile</span>
            <span className="device-card-copy">Made for touch and small screens, lighter and faster.</span>
            {suggested === "mobile" && <span className="device-card-tag eyebrow">Suggested for your screen</span>}
          </button>
        </div>
        <p className="device-note eyebrow">You can change this any time from the footer.</p>
      </div>
    </div>
  );
}
