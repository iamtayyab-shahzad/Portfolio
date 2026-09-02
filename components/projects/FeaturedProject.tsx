import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import type { Project } from "@/types/content";
import Link from "next/link";

export function FeaturedProject({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface">
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectMedia project={project} priority={priority} />
      </Link>
      <div className="p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.category}
          {project.isPlaceholder ? " · Placeholder" : null}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:text-white">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          {project.tagline}
        </p>
        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              Problem
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              What I built
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.solution}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              Outcome
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">
              {project.outcome || "Outcome to be added when there is a real result to share."}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <TechPills stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
