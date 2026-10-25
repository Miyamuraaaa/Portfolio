"use client";

import { useState, useCallback, useEffect } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Preloader from "@/components/layout/Preloader";
import DeviceGate, { type DeviceChoice } from "@/components/layout/DeviceGate";
import MagneticCursor from "@/components/layout/MagneticCursor";

import PageTransition from "@/components/layout/PageTransition";
import CoverJourney from "@/components/sections/CoverJourney";
import AboutMe from "@/components/sections/AboutMe";
import FavoriteWords from "@/components/sections/FavoriteWords";
import Projects from "@/components/sections/Projects";
import AcademicIndex from "@/components/sections/AcademicIndex";
import Footer from "@/components/layout/Footer";
import ScrollReveals from "@/components/ui/ScrollReveals";

const DEVICE_KEY = "ged0001-device";

function SectionDivider() {
  return <div data-reveal-group><div className="section-divider" data-reveal="line" /></div>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  // null until the visitor has picked a device on the introduction screen.
  const [device, setDevice] = useState<DeviceChoice | null>(null);
  const [suggested, setSuggested] = useState<DeviceChoice>("desktop");
  // True once a saved choice (this tab only) has been looked up, so the picker never flashes.
  const [restored, setRestored] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const phone = window.matchMedia("(max-width: 767px), (max-width: 1024px) and (pointer: coarse)").matches;
      setSuggested(phone ? "mobile" : "desktop");
      try {
        const saved = window.sessionStorage.getItem(DEVICE_KEY);
        if (saved === "desktop" || saved === "mobile") setDevice(saved);
      } catch { /* storage can be blocked; the picker simply shows again */ }
      setRestored(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleChoose = useCallback((choice: DeviceChoice) => {
    try { window.sessionStorage.setItem(DEVICE_KEY, choice); } catch { /* ignore */ }
    window.scrollTo(0, 0);
    setDevice(choice);
  }, []);

  // The footer button asks to see the picker again.
  useEffect(() => {
    const reopen = () => {
      try { window.sessionStorage.removeItem(DEVICE_KEY); } catch { /* ignore */ }
      window.scrollTo(0, 0);
      setDevice(null);
    };
    window.addEventListener("portfolio:change-device", reopen);
    return () => window.removeEventListener("portfolio:change-device", reopen);
  }, []);

  // Until a choice is made the screen behind the picker is prepared for the suggested device.
  const effective: DeviceChoice = device ?? suggested;
  const mobile = effective === "mobile";
  const showGate = !loading && restored && device === null;
  const ready = !loading && device !== null;

  useEffect(() => {
    document.documentElement.dataset.device = effective;
  }, [effective]);

  return (
    <div className="noise-overlay">
      {!mobile && <MagneticCursor />}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      {showGate && <DeviceGate suggested={suggested} onChoose={handleChoose} />}

      <SmoothScroll mobile={mobile}>
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main>
            <CoverJourney ready={ready} mobile={mobile} />
            <ScrollReveals>
              <SectionDivider />
              <AboutMe />
              <SectionDivider />
              <FavoriteWords />
              <SectionDivider />
              <AcademicIndex />
              <SectionDivider />
              <Projects />
            </ScrollReveals>
          </main>
        </PageTransition>
        <Footer />
      </SmoothScroll>
    </div>
  );
}
