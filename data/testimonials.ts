import stored from "@/content/testimonials.json";
import { resolveSiteImage } from "@/lib/content";
import type { Client, Testimonial } from "@/types/content";

type StoredTestimonial = Omit<Testimonial, "avatar"> & {
  avatar?: { src?: string; alt?: string; width?: number; height?: number };
};

const items = stored.items as StoredTestimonial[];
const clients = stored.clients as Client[];

export const testimonialsConfig = {
  enabled: stored.enabled,
  heading: stored.heading,
  items: items.map((item) => ({
    quote: item.quote,
    name: item.name,
    role: item.role,
    company: item.company,
    avatar: item.avatar?.src
      ? resolveSiteImage(
          item.avatar,
          "/images/",
          "/images/avatar-placeholder.svg",
          item.avatar.alt || item.name,
          80,
          80,
        )
      : undefined,
  })),
};

export const clientsConfig = {
  enabled: stored.clientsEnabled,
  heading: stored.clientsHeading,
  items: clients ?? [],
};
