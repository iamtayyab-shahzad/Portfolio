import { ProjectFeature, ProjectRow } from "@/components/projects/ProjectShowcase";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";
import Link from "next/link";

export function FeaturedWork() {
  const projects = getProjects();
  const [flagship, ...rest] = projects;

  return (
    <Section id="work">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Real software, solving real problems"
          description="Each project starts with a business problem. Here is what I built and what it does today."
        />
        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          All projects
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-12">
        {flagship ? <ProjectFeature project={flagship} label="Featured" /> : null}
      </div>

      {rest.length > 0 ? (
        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-dim">
            AI & automation
          </h3>
          <ul className="-mx-4 mt-4 space-y-2 sm:-mx-5">
            {rest.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
