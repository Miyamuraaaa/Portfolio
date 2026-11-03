"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MagneticCursor = dynamic(() => import("./MagneticCursor"), { ssr: false });

export default function DeferredCursor() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // Keep the native pointer until the optional effect is downloaded and ready.
    const activate = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
        setActive(true);
        window.removeEventListener("pointermove", activate);
      }
    };
    window.addEventListener("pointermove", activate, { passive: true });
    return () => window.removeEventListener("pointermove", activate);
  }, []);
  return active ? <MagneticCursor /> : null;
}
