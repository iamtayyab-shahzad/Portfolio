import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${siteConfig.url}${normalized}`;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const pageTitle = title ?? siteConfig.seo.title;
  const pageDescription = description ?? siteConfig.seo.description;
  const url = absoluteUrl(path);
  const ogImage = image ?? siteConfig.seo.ogImage;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  return {
    title: title
      ? {
          absolute: `${title} — ${siteConfig.name}`,
        }
      : siteConfig.seo.title,
    description: pageDescription,
    keywords: [...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

export { absoluteUrl };
