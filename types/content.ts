export type SocialLink = {
  label: string;
  href: string;
  /** Used for rel="me" on identity profiles when true */
  identity?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectLinks = {
  github?: string;
  live?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  featured: boolean;
  /**
   * Placeholder projects stay in the UI so layout can be reviewed.
   * Set to false after replacing with a real case study.
   */
  isPlaceholder: boolean;
  coverImage: SiteImage;
  screenshots: SiteImage[];
  problem: string;
  approach: string;
  solution: string;
  /** Leave empty until you have a real, non-invented outcome. */
  outcome: string;
  features: string[];
  architecture: string;
  stack: string[];
  links: ProjectLinks;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Service = {
  title: string;
  description: string;
  items: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: SiteImage;
};

export type Client = {
  name: string;
  href?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  coverImage?: SiteImage;
  /** Plain-text body. Swap for MDX later if you add a content pipeline. */
  content: string;
};

export type ProjectTypeOption = {
  value: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  wordmark: string;
  role: string;
  url: string;
  locale: string;
  email: string;
  location: string;
  availability: {
    visible: boolean;
    label: string;
    available: boolean;
  };
  hero: {
    headline: string;
    valueProposition: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  about: {
    image: SiteImage;
    who: string;
    interestedIn: string;
    whatIBuild: string;
    headingTowards: string;
  };
  footer: {
    statement: string;
  };
  contact: {
    headline: string;
    subheadline: string;
    note: string;
    projectTypes: ProjectTypeOption[];
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };
  social: {
    github: string;
    linkedin: string;
    extra: SocialLink[];
  };
  navigation: NavItem[];
  credibility: string[];
};
