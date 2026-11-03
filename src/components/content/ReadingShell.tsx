"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MagneticCursor from "@/components/layout/MagneticCursor";

export default function ReadingShell({ children }: { children: ReactNode }) {
  // Native scrolling keeps keyboard and embedded-document scrolling independent.
  return <div className="noise-overlay">
    <MagneticCursor />
    <Navbar />
    {children}
    <Footer />
  </div>;
}
