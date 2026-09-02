import type { SiteImage } from "@/types/content";

export function unwrapSlugName(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "name" in value) {
    const name = (value as { name: unknown }).name;
    if (typeof name === "string") {
      return name;
    }
  }

  return "";
}

export function resolveImageSrc(src: string | undefined, directory: string, fallback: string): string {
  if (!src) {
    return fallback;
  }
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${directory}${src}`;
}

export function resolveSiteImage(
  image: { src?: string; alt?: string; width?: number; height?: number } | undefined,
  directory: string,
  fallbackSrc: string,
  fallbackAlt: string,
  fallbackWidth: number,
  fallbackHeight: number,
): SiteImage {
  return {
    src: resolveImageSrc(image?.src, directory, fallbackSrc),
    alt: image?.alt || fallbackAlt,
    width: image?.width ?? fallbackWidth,
    height: image?.height ?? fallbackHeight,
  };
}
