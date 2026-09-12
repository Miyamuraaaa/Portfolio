"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import MagneticCursor from "@/components/layout/MagneticCursor";
import PageTransition from "@/components/layout/PageTransition";
import Hero from "@/components/sections/Hero";
import ReadingJourney from "@/components/sections/ReadingJourney";
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
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <MagneticCursor />
      <SmoothScroll>
        <Navbar />
        <PageTransition>
          <main>
            <Hero ready={!loading} />
            <ReadingJourney />
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
