import { ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";
import type { Project } from "@/types/content";
import Link from "next/link";

function ProjectLead({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      <Link href={`/projects/${project.slug}`} className="group block">
        <ProjectMedia
          project={project}
          priority={priority}
          className="rounded-none border-0 border-b border-line"
          sizes="(max-width: 1200px) 100vw, 1120px"
        />
      </Link>
      <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:p-8 lg:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {project.category}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            <Link href={`/projects/${project.slug}`} className="hover:text-white">
              {project.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {project.tagline}
          </p>
          <div className="mt-6">
            <TechPills stack={project.stack.slice(0, 6)} />
          </div>
        </div>
        <div className="flex flex-col justify-end md:items-end">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
          >
            View case study
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-white/15">
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectMedia
          project={project}
          sizes="(max-width: 768px) 100vw, 560px"
          className="rounded-none border-0 border-b border-line"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:text-white">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-5">
          <TechPills stack={project.stack.slice(0, 5)} />
        </div>
        <div className="mt-auto pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-ink"
          >
            View case study
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  const projects = getProjects();
  const lead = projects.find((project) => project.slug === "musa-cafe-pos-website") ?? projects[0];
  const secondary = projects.filter(
    (project) =>
      project.slug !== lead.slug &&
      ["experienceos", "commenter-ai", "bookvara"].includes(project.slug),
  );

  return (
    <Section id="work">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Software that ships"
          description="Products and systems built for real operations — restaurant software, B2B SaaS, scheduling, and AI-assisted workflows."
        />
        <ButtonLink href="/projects" variant="secondary" className="self-start sm:self-auto">
          All projects
        </ButtonLink>
      </div>

      <div className="mt-12 space-y-6">
        {lead ? <ProjectLead project={lead} priority /> : null}
        {secondary.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {secondary.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
