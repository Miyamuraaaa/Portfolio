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
