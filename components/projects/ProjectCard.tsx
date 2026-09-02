import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import type { Project } from "@/types/content";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-white/15">
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectMedia
          project={project}
          sizes="(max-width: 768px) 100vw, 560px"
          className="rounded-none border-0 border-b"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.category}
          {project.isPlaceholder ? " · Placeholder" : null}
        </p>
        <h3 className="mt-2 text-lg font-medium tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:text-white">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-5">
          <TechPills stack={project.stack} />
        </div>
        <div className="mt-auto pt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
