import { worksIn, workCount, type ContentCategory } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import CompactAcademicCard from "@/components/ui/CompactAcademicCard";
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
      <div className="chapter-list">{sections.map((section, index) => {
        const works = section.category ? worksIn(section.category) : [];
        const status = workCount(works.length);
        return (
          <section id={section.id} key={section.id} className="academic-chapter" aria-labelledby={`${section.id}-title`}>
            <div className="chapter-row" data-reveal-group>
              <span className="chapter-divider" data-reveal="line" aria-hidden="true" />
              <span className="eyebrow chapter-number" data-reveal="label">0{index + 2}</span>
              <div className="chapter-copy">
                <h3 id={`${section.id}-title`} data-reveal="title"><a className="chapter-link" href={collectionHref(section.id)} target="_blank" rel="noopener noreferrer" data-cursor="project">{section.title} <ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens its own page in a new tab)</span></a></h3>
                <p data-reveal="description">{section.description}</p>
                <a className="chapter-open eyebrow" href={collectionHref(section.id)} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">OPEN THIS PAGE <ArrowUpRight size={12} /></a>
              </div>
              <span className="chapter-status" data-empty={works.length === 0} data-reveal="description">{status}</span>
            </div>
            {works.length > 0 && <div className="academic-work-grid reflection-grid">{works.map((work, index) => <CompactAcademicCard key={work.id} work={work} index={index} />)}</div>}
          </section>
        );
      })}</div>
      <div data-reveal-group><p className="collection-end" data-reveal="title">Every page, a new perspective.</p></div>
    </section>
  );
}
