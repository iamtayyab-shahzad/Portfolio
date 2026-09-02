import { ProjectCard } from "@/components/projects/ProjectCard";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Selected software projects and case studies — full-stack applications, AI systems, backends, and business software.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
        ])}
      />
      <Section>
          <SectionHeading
          eyebrow="Work"
          title="Projects"
          as="h1"
          description="Case studies of products and systems. Placeholder entries are labeled until real projects replace them."
        />
        <div className="mt-10 space-y-6">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </Section>
    </>
  );
}
