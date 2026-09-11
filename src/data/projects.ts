export type ProjectCategory =
  | "All"
  | "AI Applications"
  | "Frontend Websites"
  | "Professional";

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  heroImage: string;
  tags: string[];
  category: ProjectCategory;
  date: string;
  team: string;
  client: string;
  challenge: string;
  solution: string;
  codeSnippet: string;
  outcomes: { label: string; value: string }[];
  gallery: string[];
  liveUrl?: string;
}

// Retain the detail-page contract for future personal work.
// The featured calculator links directly to its website.
export const projects: Project[] = [];
export const categories: ProjectCategory[] = ["All"];
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export function getRelatedProjects(currentSlug: string, count = 3): Project[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, count);
}
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return category === "All" ? projects : projects.filter((project) => project.category === category);
}
