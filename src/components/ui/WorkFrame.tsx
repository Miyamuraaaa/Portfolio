import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import type { ContentWork } from "@/data/content";
import PdfPreview from "@/components/ui/PdfPreview";
import "@/app/collection.css";

function displayDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

/**
 * One work shown in a frame: a dark backing board with a clip, a paper mat, and the
 * document itself inside (PDF viewer, image, or a link card for external work),
 * with its details underneath. Server component, no client JavaScript.
 */
export default function WorkFrame({ work, index, label, action }: { work: ContentWork; index: number; label: string; action: string }) {
  const pdf = work.files.find((file) => file.type === "pdf");
  const preferred = work.files.find((file) => file.type === "image" && /^(preview|cover|thumbnail)/i.test(file.name));
  const image = preferred ?? work.files.find((file) => file.type === "image");
  const primary = pdf ?? image;
  const href = primary?.url ?? work.url;
  if (!href) return null;
  const others = work.files.filter((file) => file !== primary);
  const excerpt = work.description || work.reflection;
  const number = String(index + 1).padStart(2, "0");
  const host = !primary && work.url ? new URL(work.url).hostname : null;

  return (
    <article className="cp-work" style={{ "--n": index } as React.CSSProperties} aria-labelledby={`work-${work.id}`}>
      <div className="cp-frame">
        <span className="cp-board" aria-hidden="true" />
        <span className="cp-clip" aria-hidden="true" />
        <div className="cp-mat">
          <span className="cp-code" aria-hidden="true">{number} / {label}</span>
          <div className="cp-view" data-kind={pdf ? "pdf" : image ? "image" : "link"}>
            {pdf && <PdfPreview url={pdf.url} title={work.title} />}
            {!pdf && image && <Image className="cp-image" src={image.url} alt={`${work.title} preview`} fill sizes="(max-width: 900px) 92vw, 520px" />}
            {!primary && (
              <div className="cp-fallback cp-external">
                <p className="eyebrow">EXTERNAL WORK</p>
                <strong>{host}</strong>
                <a href={href} target="_blank" rel="noopener noreferrer">Visit Website <span className="sr-only">(opens in a new tab)</span></a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="cp-details">
        <h2 id={`work-${work.id}`}>{work.title}</h2>
        {(work.date || work.score !== undefined) && (
          <p className="cp-meta">
            {work.date && <time dateTime={/^\d{4}-\d{2}-\d{2}$/.test(work.date) ? work.date : undefined}>{displayDate(work.date)}</time>}
            {work.score !== undefined && <span>Score: {work.score}</span>}
          </p>
        )}
        {work.subtitle && <p className="cp-subtitle">{work.subtitle}</p>}
        {excerpt && <p className="cp-excerpt">{excerpt}</p>}
        <div className="cp-actions">
          <a className="cp-open" href={href} target="_blank" rel="noopener noreferrer">{primary ? action : "Visit Website"} <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          {primary && <a className="cp-download" href={primary.url} download>Download <Download size={15} aria-hidden="true" /></a>}
        </div>
        {(others.length > 0 || (work.url && primary)) && (
          <ul className="cp-more" aria-label="More files">
            {others.map((file) => <li key={file.url}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
            {work.url && primary && <li><a href={work.url} target="_blank" rel="noopener noreferrer">Website<span className="sr-only"> (opens in a new tab)</span></a></li>}
          </ul>
        )}
      </div>
    </article>
  );
}
