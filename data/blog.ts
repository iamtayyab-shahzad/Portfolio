import "server-only";

import stored from "@/content/blog.json";
import { readJsonCollection } from "@/lib/content-server";
import { resolveSiteImage, unwrapSlugName } from "@/lib/content";
import type { BlogPost } from "@/types/content";
import { unstable_noStore as noStore } from "next/cache";

type StoredPost = Omit<BlogPost, "slug" | "title" | "coverImage"> & {
  title?: unknown;
  coverImage?: { src?: string; alt?: string; width?: number; height?: number };
};

export const blogMeta = stored;

export function getPosts(): BlogPost[] {
  if (process.env.NODE_ENV === "development") {
    noStore();
  }

  return readJsonCollection<StoredPost>("content/posts").map((entry) => {
    const title = unwrapSlugName(entry.title) || entry.slug;

    return {
      slug: entry.slug,
      title,
      description: entry.description,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      tags: entry.tags ?? [],
      content: entry.content ?? "",
      coverImage: entry.coverImage?.src
        ? resolveSiteImage(
            entry.coverImage,
            "/images/blog/",
            "/images/og-placeholder.svg",
            entry.coverImage.alt || title,
            1200,
            630,
          )
        : undefined,
    };
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return getPosts().map((post) => post.slug);
}

export function getPublishedPosts(): BlogPost[] {
  return [...getPosts()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
