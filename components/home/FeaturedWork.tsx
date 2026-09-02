import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";

export function FeaturedWork() {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section id="work">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Case studies"
          description="Each project is written as a case study: problem, what was built, and outcome. Placeholder entries are marked until real work is added."
        />
        <ButtonLink href="/projects" variant="secondary" className="self-start sm:self-auto">
          All projects
        </ButtonLink>
      </div>
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
  );
}
