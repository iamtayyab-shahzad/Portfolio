import { collection, config, fields, singleton } from "@keystatic/core";

const textList = (label: string) =>
  fields.array(fields.text({ label: "Item" }), {
    label,
    itemLabel: (props) => props.value || "Item",
  });

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Portfolio Admin" },
    navigation: {
      Site: ["site"],
      Work: ["projects", "skills", "services", "process"],
      Writing: ["blog", "posts"],
      "Social proof": ["testimonials"],
    },
  },
  singletons: {
    site: singleton({
      label: "Site settings",
      path: "content/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name", validation: { isRequired: true } }),
        wordmark: fields.text({ label: "Wordmark / logo text" }),
        role: fields.text({ label: "Role" }),
        url: fields.text({ label: "Site URL (no trailing slash)" }),
        locale: fields.text({ label: "Locale", defaultValue: "en_US" }),
        email: fields.text({ label: "Email" }),
        location: fields.text({ label: "Location (leave blank to hide later)" }),
        availability: fields.object(
          {
            visible: fields.checkbox({ label: "Show availability badge", defaultValue: true }),
            available: fields.checkbox({ label: "Currently available", defaultValue: true }),
            label: fields.text({ label: "Badge label" }),
          },
          { label: "Availability" },
        ),
        hero: fields.object(
          {
            headline: fields.text({ label: "Headline", multiline: true }),
            valueProposition: fields.text({ label: "Value proposition", multiline: true }),
            primaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Link" }),
              },
              { label: "Primary button" },
            ),
            secondaryCta: fields.object(
              {
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "Link" }),
              },
              { label: "Secondary button" },
            ),
          },
          { label: "Hero" },
        ),
        about: fields.object(
          {
            image: fields.object(
              {
                src: fields.image({
                  label: "Photo",
                  directory: "public/images",
                  publicPath: "/images/",
                }),
                alt: fields.text({ label: "Alt text" }),
                width: fields.integer({ label: "Width", defaultValue: 640 }),
                height: fields.integer({ label: "Height", defaultValue: 800 }),
              },
              { label: "Profile image" },
            ),
            who: fields.text({ label: "Who I am", multiline: true }),
            interestedIn: fields.text({ label: "What I am interested in", multiline: true }),
            whatIBuild: fields.text({ label: "What I build", multiline: true }),
            headingTowards: fields.text({ label: "Where I am heading", multiline: true }),
          },
          { label: "About" },
        ),
        footer: fields.object(
          {
            statement: fields.text({ label: "Short statement", multiline: true }),
          },
          { label: "Footer" },
        ),
        contact: fields.object(
          {
            headline: fields.text({ label: "Headline" }),
            subheadline: fields.text({ label: "Subheadline" }),
            note: fields.text({ label: "Note", multiline: true }),
            projectTypes: fields.array(
              fields.object({
                value: fields.text({ label: "Value (internal id)" }),
                label: fields.text({ label: "Label shown in the form" }),
              }),
              {
                label: "Project types",
                itemLabel: (props) => props.fields.label.value || "Type",
              },
            ),
          },
          { label: "Contact" },
        ),
        seo: fields.object(
          {
            title: fields.text({ label: "SEO title" }),
            description: fields.text({ label: "Meta description", multiline: true }),
            ogImage: fields.text({ label: "OG image path (e.g. /images/og.png)" }),
            keywords: textList("Keywords"),
          },
          { label: "SEO" },
        ),
        social: fields.object(
          {
            github: fields.text({ label: "GitHub URL" }),
            linkedin: fields.text({ label: "LinkedIn URL" }),
            extra: fields.array(
              fields.object({
                label: fields.text({ label: "Label" }),
                href: fields.text({ label: "URL" }),
                identity: fields.checkbox({ label: "This is my identity profile", defaultValue: false }),
              }),
              {
                label: "Extra links",
                itemLabel: (props) => props.fields.label.value || "Link",
              },
            ),
          },
          { label: "Social" },
        ),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Path" }),
          }),
          {
            label: "Navigation",
            itemLabel: (props) => props.fields.label.value || "Link",
          },
        ),
        credibility: textList("Credibility strip"),
      },
    }),
    skills: singleton({
      label: "Skills",
      path: "content/skills",
      format: { data: "json" },
      schema: {
        groups: fields.array(
          fields.object({
            category: fields.text({ label: "Category" }),
            items: textList("Technologies"),
          }),
          {
            label: "Skill groups",
            itemLabel: (props) => props.fields.category.value || "Group",
          },
        ),
      },
    }),
    services: singleton({
      label: "What I build",
      path: "content/services",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            items: textList("Bullets"),
          }),
          {
            label: "Cards",
            itemLabel: (props) => props.fields.title.value || "Card",
          },
        ),
      },
    }),
    process: singleton({
      label: "Process",
      path: "content/process",
      format: { data: "json" },
      schema: {
        steps: fields.array(
          fields.object({
            number: fields.text({ label: "Number (01, 02…)" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Steps",
            itemLabel: (props) =>
              `${props.fields.number.value} ${props.fields.title.value}`.trim() || "Step",
          },
        ),
      },
    }),
    testimonials: singleton({
      label: "Testimonials & clients",
      path: "content/testimonials",
      format: { data: "json" },
      schema: {
        enabled: fields.checkbox({
          label: "Show testimonials on the site",
          defaultValue: false,
        }),
        heading: fields.text({ label: "Testimonials heading" }),
        items: fields.array(
          fields.object({
            quote: fields.text({ label: "Quote", multiline: true }),
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role" }),
            company: fields.text({ label: "Company" }),
            avatar: fields.object(
              {
                src: fields.image({
                  label: "Avatar (optional)",
                  directory: "public/images",
                  publicPath: "/images/",
                }),
                alt: fields.text({ label: "Alt text" }),
                width: fields.integer({ label: "Width", defaultValue: 80 }),
                height: fields.integer({ label: "Height", defaultValue: 80 }),
              },
              { label: "Avatar" },
            ),
          }),
          {
            label: "Testimonials",
            itemLabel: (props) => props.fields.name.value || "Testimonial",
          },
        ),
        clientsEnabled: fields.checkbox({
          label: "Show client names",
          defaultValue: false,
        }),
        clientsHeading: fields.text({ label: "Clients heading" }),
        clients: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            href: fields.text({ label: "Optional URL" }),
          }),
          {
            label: "Clients",
            itemLabel: (props) => props.fields.name.value || "Client",
          },
        ),
      },
    }),
    blog: singleton({
      label: "Blog settings",
      path: "content/blog",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Page title" }),
        description: fields.text({ label: "Page description", multiline: true }),
        emptyState: fields.text({ label: "Empty-state message", multiline: true }),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "name",
      path: "content/projects/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Project name" } }),
        tagline: fields.text({ label: "One-line description" }),
        description: fields.text({ label: "Overview", multiline: true }),
        category: fields.text({ label: "Category" }),
        featured: fields.checkbox({ label: "Featured (large card)", defaultValue: false }),
        isPlaceholder: fields.checkbox({ label: "Placeholder (not a real case study yet)", defaultValue: true }),
        coverImage: fields.object(
          {
            src: fields.image({
              label: "Cover image",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            alt: fields.text({ label: "Alt text" }),
            width: fields.integer({ label: "Width", defaultValue: 1440 }),
            height: fields.integer({ label: "Height", defaultValue: 900 }),
          },
          { label: "Cover" },
        ),
        screenshots: fields.array(
          fields.object({
            src: fields.image({
              label: "Screenshot",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            alt: fields.text({ label: "Alt text" }),
            width: fields.integer({ label: "Width", defaultValue: 1440 }),
            height: fields.integer({ label: "Height", defaultValue: 900 }),
          }),
          {
            label: "Screenshots",
            itemLabel: (props) => props.fields.alt.value || "Screenshot",
          },
        ),
        problem: fields.text({ label: "Problem", multiline: true }),
        approach: fields.text({ label: "Approach", multiline: true }),
        solution: fields.text({ label: "Solution", multiline: true }),
        outcome: fields.text({
          label: "Outcome (leave empty if you have no real result)",
          multiline: true,
        }),
        features: textList("Key features"),
        architecture: fields.text({ label: "Architecture", multiline: true }),
        stack: textList("Tech stack"),
        links: fields.object(
          {
            github: fields.text({ label: "GitHub URL" }),
            live: fields.text({ label: "Live demo URL" }),
          },
          { label: "Links" },
        ),
      },
    }),
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        publishedAt: fields.date({ label: "Published date" }),
        updatedAt: fields.date({ label: "Updated date (optional)" }),
        tags: textList("Tags"),
        coverImage: fields.object(
          {
            src: fields.image({
              label: "Cover",
              directory: "public/images/blog",
              publicPath: "/images/blog/",
            }),
            alt: fields.text({ label: "Alt text" }),
            width: fields.integer({ label: "Width", defaultValue: 1200 }),
            height: fields.integer({ label: "Height", defaultValue: 630 }),
          },
          { label: "Cover image" },
        ),
        content: fields.text({ label: "Article body", multiline: true }),
      },
    }),
  },
});
