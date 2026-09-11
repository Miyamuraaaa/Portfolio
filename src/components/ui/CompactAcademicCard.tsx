import { ArrowUpRight, FileText } from "lucide-react";
import type { ContentWork } from "@/data/content";
import Image from "next/image";

const labels = {
  "reading-process": ["WORKSHEET", "View Worksheet"],
  "reader-responses": ["RESPONSE", "View Response"],
  icare: ["iCARE", "View Activity"],
  reflections: ["REFLECTION", "View Reflection"],
  "featured-work": ["WORK", "Visit Website"],
} as const;

function displayDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

export default function CompactAcademicCard({ work, index }: { work: ContentWork; index: number }) {
  const document = work.files.find((file) => file.type === "pdf") ?? work.files[0];
  const href = document?.url ?? work.url;
  if (!href) return null;
  const excerpt = work.description || work.reflection;
  const [label, action] = labels[work.category];
  const thumbnail = work.category !== "reflections" ? work.files.find(file => file.type === "image" && /^(preview|cover|thumbnail)/i.test(file.name)) ?? work.files.find(file => file.type === "image") : undefined;
  return (
    <div data-reveal-group data-reveal-offset={index % 3 * 18}>
      <article className="reflection-card" data-reveal="content">
        <a className="reflection-link" href={href} target="_blank" rel="noopener noreferrer" data-cursor="project">
          <div className="reflection-meta"><span className="eyebrow">{String(index + 1).padStart(2, "0")} / {label}</span><span className="reflection-filetype"><FileText size={16} strokeWidth={1.25} aria-hidden="true" />{document?.type === "pdf" ? "PDF" : document ? "IMAGE" : "LINK"}</span></div>
          <div className="academic-card-heading"><h4>{work.title}</h4>{thumbnail && <Image className="academic-card-thumbnail" src={thumbnail.url} alt={`${work.title} preview`} width={72} height={64} sizes="72px" />}</div>
          {work.date && <time className="reflection-date" dateTime={/^\d{4}-\d{2}-\d{2}$/.test(work.date) ? work.date : undefined}>{displayDate(work.date)}</time>}
          {work.score !== undefined && <p className="reflection-date">Score: {work.score}</p>}
          {work.subtitle && <p className="academic-card-subtitle">{work.subtitle}</p>}
          {excerpt && <p className="reflection-excerpt">{excerpt}</p>}
          <span className="reflection-action">{document ? action : "Visit Website"} <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></span>
        </a>
        {(work.files.length > 1 || (work.url && document)) && <details className="work-files"><summary>Additional sources</summary><ul>{work.files.filter((file) => file.url !== href).map((file) => <li key={file.url}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a></li>)}{work.url && work.url !== href && <li><a href={work.url} target="_blank" rel="noopener noreferrer">Visit Website<ArrowUpRight size={14} /><span className="sr-only"> (opens in a new tab)</span></a></li>}</ul></details>}
      </article>
    </div>
  );
}
