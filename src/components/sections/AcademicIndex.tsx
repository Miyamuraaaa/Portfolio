import { worksIn, workCount, type ContentCategory } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import { collectionHref } from "@/data/collections";
import "@/app/collection.css";

const sections: { id: string; title: string; description: string; category?: ContentCategory }[] = [
  { id: "worksheets", title: "Reading Process Worksheets", description: "A space for the activities that guide a closer reading.", category: "reading-process" },
  { id: "responses", title: "Reader Responses", description: "Personal perspectives and connections with the texts.", category: "reader-responses" },
  { id: "icare", title: "iCARE Activities", description: "A collection of participation, experiences, and learning.", category: "icare" },
  { id: "reflection", title: "Reflection", description: "Looking back on the reading experience and what it leaves behind.", category: "reflections" },
];

export default function AcademicIndex() {
  return (
    <section className="academic-index editorial-shell" aria-labelledby="collection-title">
      <div className="section-heading" data-reveal-group>
        <div><p className="eyebrow" data-reveal="label">THE GED0001 COLLECTION</p><h2 id="collection-title" data-reveal="title">A journey in <em>five chapters.</em></h2></div>
        <p data-reveal="description">The collection will grow<br />as coursework is added.</p>
      </div>
      <div className="chapter-grid" data-reveal-group>{sections.map((section, index) => {
        const count = section.category ? worksIn(section.category).length : 0;
        return (
          <a
            id={section.id}
            key={section.id}
            className="chapter-card"
            href={collectionHref(section.id)}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="content"
            data-cursor="project"
            aria-describedby={`${section.id}-note`}
          >
            <span className="chapter-top"><span className="eyebrow chapter-number">0{index + 2}</span><ArrowUpRight size={20} aria-hidden="true" /></span>
            <span className="chapter-body">
              <h3>{section.title}</h3>
              <span id={`${section.id}-note`} className="chapter-desc">{section.description}</span>
            </span>
            <span className="chapter-status" data-empty={count === 0}>{workCount(count)}</span>
            <span className="sr-only"> (opens its own page in a new tab)</span>
          </a>
        );
      })}</div>
      <div data-reveal-group><p className="collection-end" data-reveal="title">Every page, a new perspective.</p></div>
    </section>
  );
}
