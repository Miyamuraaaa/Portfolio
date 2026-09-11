"use client";

import { createContext, type RefObject } from "react";

// One shared progress value for DOM handoff, procedural objects, and ink; no frame-by-frame React state.
export const HeroScrollContext = createContext<RefObject<{ progress: number }>>({ current: { progress: 0 } });
