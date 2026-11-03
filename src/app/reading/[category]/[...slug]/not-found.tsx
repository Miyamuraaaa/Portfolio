import Link from "next/link";
import ReadingShell from "@/components/content/ReadingShell";
import "../../reading.css";

export default function MissingDocument() {
  return <ReadingShell><main className="reading-page editorial-shell">
    <header className="reading-header"><p className="eyebrow">GED0001 / READING COLLECTION</p><h1>Document not found.</h1>
      <p className="reading-description">This item may have moved or is no longer in the collection.</p>
    </header>
    <nav className="reading-end" aria-label="Return to portfolio"><Link href="/#journey">← Reading Journey</Link><Link href="/#worksheets">Browse the collection →</Link></nav>
  </main></ReadingShell>;
}
