import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";
import Link from "next/link";

type ProjectMediaProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function ProjectMedia({
  project,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1120px",
}: ProjectMediaProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-elevated",
        className,
      )}
    >
      <SmartImage
        src={project.coverImage.src}
        alt={project.coverImage.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

export function TechPills({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4">
      {project.links.live ? (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-ink"
        >
          Live demo
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      ) : null}
      {project.links.github ? (
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
        >
          GitHub
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      ) : null}
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
      >
        Case study
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
