import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import type { ContentWork } from "@/data/content";

export default function WorkCard({ work }: { work: ContentWork }) {
  const thumbnail = work.files.find((file) => file.type === "image" && /^(preview|cover|thumbnail)/i.test(file.name)) ?? work.files.find((file) => file.type === "image");
  const document = work.files.find((file) => file.type === "pdf") ?? work.files[0];
  const href = work.url ?? document?.url;
  if (!href) return null;
  return (
    <div data-reveal-group>
      <article className="work-card" data-reveal="content">
        <a className="work-card-main" href={href} target="_blank" rel="noopener noreferrer" data-cursor="project">
          <div className="work-thumbnail">
            {thumbnail ? <Image src={thumbnail.url} alt={`${work.title} — ${thumbnail.name}`} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 480px" className="work-thumbnail-image" /> : <div className="work-placeholder" aria-hidden="true"><span className="eyebrow">{work.url ? "INDEPENDENT WORK" : "READING COLLECTION / PDF"}</span><FileText size={44} strokeWidth={0.75} /><span>{work.subtitle || work.title}</span></div>}
          </div>
          <div className="work-card-copy">
            {work.date && <p className="eyebrow">{work.date}</p>}
            <h4>{work.title}</h4>
            {work.subtitle && <p className="work-subtitle">{work.subtitle}</p>}
            {work.description && <p>{work.description}</p>}
            <span className="visit-link">{work.url ? "Visit Website" : "View Work"} <ArrowUpRight size={17} /><span className="sr-only"> (opens in a new tab)</span></span>
          </div>
        </a>
        {(work.score !== undefined || work.reflection) && <div className="work-notes">{work.score !== undefined && <p><span className="eyebrow">SCORE</span> {work.score}</p>}{work.reflection && <div><p className="eyebrow">REFLECTION</p><p className="work-reflection">{work.reflection}</p></div>}</div>}
        {(work.files.length > 1 || (work.url && work.files.length > 0)) && <details className="work-files"><summary>All files ({work.files.length})</summary><ul>{work.files.map((file) => <li key={file.url}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name} <ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></details>}
      </article>
    </div>
  );
}
