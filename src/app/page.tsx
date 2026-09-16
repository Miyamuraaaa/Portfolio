"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import MagneticCursor from "@/components/layout/MagneticCursor";

import PageTransition from "@/components/layout/PageTransition";
import CoverJourney from "@/components/sections/CoverJourney";
import Projects from "@/components/sections/Projects";
import AcademicIndex from "@/components/sections/AcademicIndex";
import Footer from "@/components/layout/Footer";
import ScrollReveals from "@/components/ui/ScrollReveals";

function SectionDivider() {
  return <div data-reveal-group><div className="section-divider" data-reveal="line" /></div>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="noise-overlay">
      <MagneticCursor />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <SmoothScroll>
        <Navbar />
        <PageTransition>
          <main>
            <CoverJourney ready={!loading} />
            <ScrollReveals>
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
