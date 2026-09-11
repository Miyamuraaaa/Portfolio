import { Gallery } from "@/components/portfolio/Gallery";
import fs from "fs";
import path from "path";

function getItems(category: string) {
  try {
    const p = path.join(process.cwd(), "src", "generated", "content-manifest.json");
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      return data[category] || [];
    }
  } catch { /* empty */ }
  return [];
}

export default function ReaderResponsesPage() {
  return (
    <Gallery
      items={getItems("reader-responses")}
      title="Reader Responses"
      description="Critical reflections and personal responses to the assigned texts in GED0001."
    />
  );
}
