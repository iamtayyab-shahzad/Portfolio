import stored from "@/content/site.json";
import { resolveSiteImage } from "@/lib/content";
import type { SiteConfig, SocialLink } from "@/types/content";

export const siteConfig: SiteConfig = {
  ...stored,
  social: {
    ...stored.social,
    extra: (stored.social.extra ?? []) as SiteConfig["social"]["extra"],
  },
  about: {
    ...stored.about,
    image: resolveSiteImage(
      stored.about.image,
      "/images/",
      "/images/avatar-placeholder.svg",
      stored.about.image.alt || "Portrait",
      640,
      800,
    ),
  },
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    identity: true,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    identity: true,
  },
  ...siteConfig.social.extra,
];
