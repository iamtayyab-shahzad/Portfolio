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

/** Placeholder profile URLs from the content template should never render publicly. */
function isConfiguredLink(href: string): boolean {
  return Boolean(href) && !href.includes("your-profile");
}

export const contactLinks: SocialLink[] = socialLinks.filter((link) => isConfiguredLink(link.href));

export const mailtoHref = `mailto:${siteConfig.email}`;
