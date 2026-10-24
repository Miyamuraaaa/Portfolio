import manifest from "@/generated/content-manifest.json";

export type ContentCategory = "featured-work" | "reading-process" | "reader-responses" | "icare" | "reflections";
export interface ContentFile {
  name: string;
  type: "pdf" | "image";
  url: string;
}
export interface ContentWork {
  id: string;
  category: ContentCategory;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  order?: number;
  url: string | null;
  score?: string | number;
  reflection?: string;
  featured?: boolean;
  files: ContentFile[];
}

// Validated and normalized by the build-time generator. No document bytes enter this bundle.
export const content = manifest as ContentWork[];
export const worksIn = (category: ContentCategory) => content.filter((work) => work.category === category);
export const workCount = (count: number) => count ? `${count} ${count === 1 ? "work" : "works"}` : "To be collected";

export const contentCollections: Record<ContentCategory, { anchor: string; title: string }> = {
  "featured-work": { anchor: "projects", title: "Featured Work" },
  "reading-process": { anchor: "worksheets", title: "Reading Process Worksheets" },
  "reader-responses": { anchor: "responses", title: "Reader Responses" },
  icare: { anchor: "icare", title: "iCARE Activities" },
  reflections: { anchor: "reflection", title: "Reflection" },
};

export function contentHref(work: ContentWork, file?: ContentFile) {
  const base = `/reading/${work.category}/${work.slug}`;
  return file ? `${base}?file=${encodeURIComponent(file.name)}` : base;
}
