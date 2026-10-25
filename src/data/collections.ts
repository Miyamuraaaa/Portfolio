import type { ContentCategory } from "@/data/content";

/**
 * The four chapters of the GED0001 collection. Each one has its own page at /collection/<slug>.
 * The works inside come from portfolio-content/ through the content manifest, never from this file.
 */
export const collectionPages: {
  slug: string;
  category: ContentCategory;
  title: string;
  description: string;
  action: string;
  label: string;
}[] = [
  { slug: "worksheets", category: "reading-process", title: "Reading Process Worksheets", description: "A space for the activities that guide a closer reading.", action: "View Worksheet", label: "WORKSHEET" },
  { slug: "responses", category: "reader-responses", title: "Reader Responses", description: "Personal perspectives and connections with the texts.", action: "View Response", label: "RESPONSE" },
  { slug: "icare", category: "icare", title: "iCARE Activities", description: "A collection of participation, experiences, and learning.", action: "View Activity", label: "iCARE" },
  { slug: "reflection", category: "reflections", title: "Reflection", description: "Looking back on the reading experience and what it leaves behind.", action: "View Reflection", label: "REFLECTION" },
];

export const collectionHref = (slug: string) => `/collection/${slug}`;
