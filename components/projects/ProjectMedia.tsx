import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";
import Link from "next/link";

export function hasRealMedia(project: Project): boolean {
  return !project.coverImage.src.includes("/placeholder-");
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type ProjectMediaProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
  chrome?: boolean;
  compact?: boolean;
};

export function ProjectMedia({
  project,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1120px",
  chrome = true,
  compact = false,
}: ProjectMediaProps) {
  if (!hasRealMedia(project)) {
    return <ProjectPreview project={project} className={className} compact={compact} />;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-elevated",
        className,
      )}
    >
      {chrome ? (
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-[#0d1524] px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          {project.links.live ? (
            <span className="truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[11px] text-dim">
              {hostname(project.links.live)}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative aspect-[16/10]">
        <SmartImage
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * Drawn preview for projects without screenshots: shows the system as a
 * pipeline built from the project's own feature list.
 */
export function ProjectPreview({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  const steps = project.features.slice(0, compact ? 3 : 4);

  return (
    <div
      role="img"
      aria-label={project.coverImage.alt}
      className={cn(
        "relative flex aspect-[16/10] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d1524]",
        compact ? "p-3.5" : "p-5 sm:p-6",
        className,
      )}
    >
      <div aria-hidden className="grid-texture absolute inset-0" />
      <div className="relative flex items-center justify-between gap-3">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:text-[11px]">
          {project.category}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-dim sm:text-[11px]">
          {project.stack[0]}
        </span>
      </div>
      <ol className={cn("relative mt-auto", compact ? "space-y-1.5" : "space-y-2.5")}>
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono text-muted",
                compact ? "h-5 w-5 text-[9px]" : "h-6 w-6 text-[10px]",
              )}
            >
              {index + 1}
            </span>
            <span className={cn("truncate text-ink/85", compact ? "text-[11px]" : "text-[13px]")}>
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Case-study hero for projects without screenshots: features and stack as a system diagram. */
export function ProjectSystemOverview({ project }: { project: Project }) {
  const features = project.features.slice(0, 6);

  return (
    <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1524] p-6 sm:p-10">
      <div aria-hidden className="grid-texture absolute inset-0" />
      <figcaption className="relative flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          System overview
        </span>
        <span className="font-mono text-[11px] text-dim">{project.category}</span>
      </figcaption>

      <div className="relative mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-dim">What it does</p>
          <div className="relative mt-5">
            <span aria-hidden className="absolute bottom-3 left-[13px] top-3 w-px bg-line" />
            <ol className="relative space-y-3">
              {features.map((feature, index) => (
                <li key={feature} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-[#0d1524] font-mono text-[11px] text-accent">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-ink/85">{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-dim">Built with</p>
          <ul className="mt-5 space-y-2">
            {project.stack.map((tech, index) => (
              <li
                key={tech}
                className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5"
              >
                <span className="font-mono text-[13px] text-ink/90">{tech}</span>
                <span aria-hidden className="font-mono text-[10px] text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function TechPills({ stack, className }: { stack: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] leading-none text-accent"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({
  project,
  showCaseStudy = true,
}: {
  project: Project;
  showCaseStudy?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {project.links.live ? (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Visit live site
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
      {project.links.github ? (
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <GitHubIcon className="h-4 w-4" />
          Source code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
      {showCaseStudy ? (
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          Read case study
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
