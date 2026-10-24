import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";
import Link from "next/link";

type HeadingLevel = "h2" | "h3";

function ProjectFrames({ project, priority = false }: { project: Project; priority?: boolean }) {
  const second = project.screenshots.find(
    (shot) => shot.src && shot.src !== project.coverImage.src && !shot.src.includes("/placeholder-"),
  );

  return (
    <div className="flex h-full min-h-[16rem] flex-1 flex-col gap-3">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.name} case study`}
        className="flex min-h-0 flex-1 rounded-xl shadow-frame transition-transform duration-300 hover:-translate-y-1"
      >
        <ProjectMedia
          project={project}
          priority={priority}
          expand
          sizes="(max-width: 1024px) 100vw, 620px"
          className="w-full"
        />
      </Link>
      {second ? (
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} screenshot`}
          className="relative min-h-[9rem] flex-1 overflow-hidden rounded-xl border border-white/10 shadow-frame transition-transform duration-300 hover:-translate-y-1"
        >
          <SmartImage
            src={second.src}
            alt={second.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 620px"
            className="object-cover object-top"
          />
        </Link>
      ) : null}
    </div>
  );
}

/** Large case-study card: screenshot or drawn preview, then problem, build, and result. */
export function ProjectFeature({
  project,
  label,
  reverse = false,
  as: Heading = "h3",
  priority = false,
}: {
  project: Project;
  label?: string;
  reverse?: boolean;
  as?: HeadingLevel;
  priority?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface/80">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div
          className={cn(
            "flex flex-col border-b border-line bg-[#0c1422] p-5 sm:p-8 lg:border-b-0",
            reverse ? "lg:order-2 lg:border-l" : "lg:border-r",
          )}
        >
          <ProjectFrames project={project} priority={priority} />
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            {label ? `${label} · ` : ""}
            {project.category}
          </p>
          <Heading className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
              {project.name}
            </Link>
          </Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.tagline}</p>

          <dl className="mt-7 space-y-5">
            <CaseRow label="The problem" value={project.problem} />
            <CaseRow label="What I built" value={project.solution} />
            {project.outcome ? <CaseRow label="Result" value={project.outcome} highlight /> : null}
          </dl>

          <TechPills stack={project.stack.slice(0, 7)} className="mt-7" />
          <div className="mt-auto pt-8">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? "border-l-2 border-accent pl-4" : "border-l-2 border-line pl-4"}>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-dim">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink/85">{value}</dd>
    </div>
  );
}

/** Compact hoverable row; the whole row links to the case study. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li>
      <article className="group relative grid grid-cols-[minmax(0,1fr)] gap-5 rounded-xl p-4 transition-colors duration-200 hover:bg-surface sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-7 sm:p-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <ProjectMedia project={project} chrome={false} compact sizes="16rem" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-dim">{project.category}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 transition-colors after:absolute after:inset-0 after:rounded-xl group-hover:text-accent"
            >
              {project.name}
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
          <TechPills stack={project.stack.slice(0, 5)} className="mt-4" />
        </div>
      </article>
    </li>
  );
}
