import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stat } from "node:fs/promises";
import path from "node:path";
import { content, contentCollections, contentHref, type ContentFile } from "@/data/content";
import ReadingShell from "@/components/content/ReadingShell";
import DocumentViewer from "@/components/content/DocumentViewer";
import "../../reading.css";

type Props = {
  params: Promise<{ category: string; slug: string[] }>;
  searchParams: Promise<{ file?: string | string[] }>;
};

async function findWork(params: Props["params"]) {
  const { category, slug } = await params;
  return content.find(work => work.category === category && work.slug === slug.join("/"));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await findWork(params);
  return { title: work ? `${work.title} | GED0001 Reading Collection` : "Document not found | GED0001" };
}

async function fileAvailable(file: ContentFile) {
  // Generated files are local, and missing originals should not produce a broken embed.
  if (!file.url.startsWith("/generated-content/")) return false;
  try {
    const root = path.resolve(process.cwd(), "public", "generated-content");
    const target = path.resolve(process.cwd(), "public", "." + decodeURIComponent(file.url));
    const relative = path.relative(root, target);
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return false;
    return (await stat(target)).isFile();
  } catch { return false; }
}

export default async function ReadingPage({ params, searchParams }: Props) {
  const work = await findWork(params);
  if (!work) notFound();
  const collection = contentCollections[work.category];
  const query = await searchParams;
  const requested = typeof query.file === "string" ? query.file : undefined;
  const selected = work.files.find(file => file.name === requested)
    ?? work.files.find(file => file.type === "pdf") ?? work.files[0];
  const available = selected ? await fileAvailable(selected) : false;
  return <ReadingShell>
    <main className="reading-page editorial-shell" id="reading-content">
      <nav className="reading-breadcrumbs" aria-label="Reading navigation">
        <Link href={`/#${collection.anchor}`}>← {collection.title}</Link>
        <Link href="/#journey">Reading Journey</Link>
      </nav>
      <header className="reading-header">
        <p className="eyebrow">GED0001 / {collection.title}</p>
        <h1>{work.title}</h1>
        {work.subtitle && <p className="reading-subtitle">{work.subtitle}</p>}
        <div className="reading-metadata">
          {work.date && <span>{work.date}</span>}
          {work.score !== undefined && <span>Score: {work.score}</span>}
          <span>{work.files.length} {work.files.length === 1 ? "attachment" : "attachments"}</span>
        </div>
        {work.description && <p className="reading-description">{work.description}</p>}
      </header>
      {work.files.length > 1 && <nav className="reading-attachments" aria-label="Document attachments">
        {work.files.map(file => <Link key={file.url} href={contentHref(work, file)} scroll={false} aria-current={file === selected ? "page" : undefined}>{file.name}</Link>)}
      </nav>}
      {requested && selected?.name !== requested && <p className="reading-hint" role="status">That attachment was not found. Showing the first available document.</p>}
      {selected ? <DocumentViewer key={selected.url} file={selected} title={work.title} available={available} /> : <section className="reading-fallback">
        <h2>{work.url ? "Explore the original work" : "No document is attached yet."}</h2>
        <p>{work.url ? "This item is a website rather than an attached document. Visit the original using the link below." : "Return to the collection to explore other available work."}</p>
      </section>}
      {work.url && <p className="reading-source"><a href={work.url} target="_blank" rel="noopener noreferrer">Visit original website ↗<span className="sr-only"> (new tab)</span></a></p>}
      {work.reflection && <section className="reading-notes"><h2>Reflection</h2><p>{work.reflection}</p></section>}
      <nav className="reading-end" aria-label="Continue reading"><Link href={`/#${collection.anchor}`}>← Back to {collection.title}</Link><Link href="/#journey">Return to Reading Journey →</Link></nav>
    </main>
  </ReadingShell>;
}
