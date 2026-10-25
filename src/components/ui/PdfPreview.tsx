"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

/**
 * Shows a PDF inside its frame. It only loads when the frame is near the screen,
 * and on phones (where a PDF inside a page is unreliable and heavy) it shows an
 * "Open the PDF" card instead, so every device has a working way in.
 */
export default function PdfPreview({ url, title }: { url: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"idle" | "inline" | "card">("idle");

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    let observer: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 767px)").matches || typeof IntersectionObserver === "undefined") {
        setMode(window.matchMedia("(max-width: 767px)").matches ? "card" : "inline");
        return;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setMode("inline"); observer?.disconnect(); }
      }, { rootMargin: "400px 0px" });
      observer.observe(element);
    });
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); };
  }, []);

  const open = (
    <a href={url} target="_blank" rel="noopener noreferrer">Open the PDF <span className="sr-only">(opens in a new tab)</span></a>
  );

  return (
    <div ref={box} className="cp-pdfbox">
      {mode === "inline" && (
        <object className="cp-pdf" data={`${url}#toolbar=0&navpanes=0&view=FitH`} type="application/pdf" aria-label={`${title} (PDF preview)`}>
          <div className="cp-fallback"><p>This browser cannot show the PDF inside the page.</p>{open}</div>
        </object>
      )}
      {mode === "card" && (
        <div className="cp-fallback">
          <FileText size={34} strokeWidth={1.4} aria-hidden="true" />
          <strong>PDF document</strong>
          {open}
        </div>
      )}
      {mode === "idle" && <p className="cp-loading eyebrow" aria-hidden="true">PDF PREVIEW</p>}
    </div>
  );
}
