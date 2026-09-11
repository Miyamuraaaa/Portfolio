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

export default function ReadingProcessPage() {
  return (
    <Gallery
      items={getItems("reading-process")}
      title="Reading Process Worksheets"
      description="My documented journey of applying reading strategies before, during, and after reading various texts."
    />
  );
}
