import "server-only";

import { readJsonCollection } from "@/lib/content-server";
import { resolveSiteImage, unwrapSlugName } from "@/lib/content";
import type { Project } from "@/types/content";
import { unstable_noStore as noStore } from "next/cache";

type StoredProject = Omit<Project, "slug" | "name" | "coverImage" | "screenshots"> & {
  name?: unknown;
  coverImage?: { src?: string; alt?: string; width?: number; height?: number };
  screenshots?: Array<{ src?: string; alt?: string; width?: number; height?: number }>;
  links?: { github?: string; live?: string };
};

function mapProject(entry: StoredProject & { slug: string }): Project {
  const name = unwrapSlugName(entry.name) || entry.slug;

  return {
    slug: entry.slug,
    name,
    tagline: entry.tagline,
    description: entry.description,
    category: entry.category,
    featured: Boolean(entry.featured),
    isPlaceholder: Boolean(entry.isPlaceholder),
    coverImage: resolveSiteImage(
      entry.coverImage,
      "/images/projects/",
      "/images/projects/placeholder-ai.svg",
      entry.coverImage?.alt || `${name} cover`,
      1440,
      900,
    ),
    screenshots: (entry.screenshots ?? []).map((shot, index) =>
      resolveSiteImage(
        shot,
        "/images/projects/",
        "/images/projects/placeholder-ai.svg",
        shot.alt || `${name} screenshot ${index + 1}`,
        1440,
        900,
      ),
    ),
    problem: entry.problem,
    approach: entry.approach,
    solution: entry.solution,
    outcome: entry.outcome ?? "",
    features: entry.features ?? [],
    architecture: entry.architecture,
    stack: entry.stack ?? [],
    links: {
      github: entry.links?.github || undefined,
      live: entry.links?.live || undefined,
    },
  };
}

export function getProjects(): Project[] {
  if (process.env.NODE_ENV === "development") {
    noStore();
  }

  return readJsonCollection<StoredProject>("content/projects").map(mapProject);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getProjects().map((project) => project.slug);
}
