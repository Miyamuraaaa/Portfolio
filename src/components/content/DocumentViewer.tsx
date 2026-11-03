"use client";

import { useRef, useState } from "react";
import type { ContentFile } from "@/data/content";

export default function DocumentViewer({ file, title, available }: { file: ContentFile; title: string; available: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const supported = file.type === "pdf" || file.type === "image";
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen) await frame.current.requestFullscreen();
      else setMessage("Full-screen viewing is unavailable in this browser. Use Open original for its viewing controls.");
    } catch {
      setMessage("Full-screen viewing is unavailable. You can still read here or open the original.");
    }
  }
  return <div ref={frame} className="reading-viewer" data-lenis-prevent>
    <div className="reading-viewer-bar">
      <span className="reading-filename">{file.name}</span>
      <div className="reading-actions">
        {available && supported && <button type="button" onClick={fullscreen}>Full screen</button>}
        <a href={file.url} target="_blank" rel="noopener noreferrer">Open original<span className="sr-only"> (new tab)</span> ↗</a>
        <a href={file.url} download={file.name}>Download</a>
      </div>
    </div>
    {message && <p className="reading-hint" role="status">{message}</p>}
    {!available || failed || !supported ? <div className="reading-fallback" role="status">
      <h2>{!available || failed ? "This document could not be displayed." : "Preview is unavailable for this file type."}</h2>
      <p>Use Open original or Download above to access the source file. You can also choose another attachment or return to the collection.</p>
    </div> : file.type === "pdf" ? <>
      <p className="reading-hint">Use the PDF viewer’s page and zoom controls where available. If the document is blank or your mobile browser cannot embed PDFs, choose Open original or Download.</p>
      <object className="reading-pdf" data={file.url} type="application/pdf" aria-label={`${title} — ${file.name}`} tabIndex={0} onError={() => setFailed(true)}>
        <div className="reading-fallback"><h2>Your browser cannot preview this PDF.</h2><p><a href={file.url} target="_blank" rel="noopener noreferrer">Open the original PDF (new tab)</a> or use Download above.</p></div>
      </object>
    </> : <div className="reading-image">
      {/* Original document pixels remain available without thumbnail optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={file.url} alt={`${title} — ${file.name}`} onError={() => setFailed(true)} />
      <p className="reading-hint">Open original to inspect the image at its full resolution.</p>
    </div>}
  </div>;
}
