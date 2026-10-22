import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { getAllProjectSlugs, getProjectBySlug, getProjects } from "@/data/projects";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createMetadata({ title: "Project not found", noIndex: true });
  }

  return createMetadata({
    title: `${project.name} — Case Study`,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    image: project.coverImage.src.includes("/placeholder-") ? undefined : project.coverImage.src,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = getProjects();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  const supportingShots = project.screenshots.filter(
    (shot) => shot.src && shot.src !== project.coverImage.src && !shot.src.includes("/placeholder-"),
  );
  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />

      <Section className="pb-12 pt-12 md:pb-16 md:pt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          All work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Case study · {project.category}
            </p>
            <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.tagline}
            </p>
            {hasLinks ? (
              <div className="mt-7">
                <ProjectLinks project={project} showCaseStudy={false} />
              </div>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.12em] text-dim">Type</dt>
              <dd className="mt-1 text-ink/90">{project.category}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.12em] text-dim">Core stack</dt>
              <dd className="mt-1 text-ink/90">{project.stack.slice(0, 4).join(" · ")}</dd>
            </div>
            {project.links.live ? (
              <div className="col-span-2 lg:col-span-1">
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-dim">Status</dt>
                <dd className="mt-1 inline-flex items-center gap-2 text-ink/90">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live in production
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-[#0c1422] p-3 shadow-frame sm:p-5">
          <ProjectMedia project={project} priority sizes="(max-width: 1200px) 100vw, 1150px" />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0 space-y-14">
            <p className="text-lg leading-relaxed text-ink/90 sm:text-xl sm:leading-relaxed">
              {project.description}
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              <Block label="01" title="The problem" body={project.problem} />
              <Block label="02" title="My approach" body={project.approach} />
            </div>

            <Block label="03" title="What I built" body={project.solution} />

            {project.features.length > 0 ? (
              <div>
                <BlockHeading label="04" title="Key features" />
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 rounded-xl border border-line bg-surface/60 p-4 text-sm leading-relaxed text-ink/85"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.architecture ? (
              <Block label="05" title="How it's built" body={project.architecture} />
            ) : null}

            {project.outcome ? (
              <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Result</p>
                <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
                  {project.outcome}
                </p>
              </div>
            ) : null}

            {supportingShots.length > 0 ? (
              <div>
                <BlockHeading label="—" title="Screenshots" />
                <div className="mt-5">
                  <ProjectGallery shots={supportingShots} />
                </div>
              </div>
            ) : null}
          </article>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
                Technology
              </h2>
              <TechPills stack={project.stack} className="mt-4" />
              {hasLinks ? (
                <div className="mt-6 border-t border-line pt-5">
                  <ProjectLinks project={project} showCaseStudy={false} />
                </div>
              ) : null}
            </div>
            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <p className="text-sm font-semibold text-ink">Need something similar?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                I can build a system like this around your business.
              </p>
              <ButtonLink href="/contact" className="mt-5 w-full">
                Discuss Your Project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-line bg-elevated px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-2xl font-semibold tracking-tight text-ink">
              Want software like this for your business?
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Tell me what you need. I&apos;ll reply within 24 hours with questions and a suggested
              approach.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Discuss Your Project
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                View all work
              </ButtonLink>
            </div>
          </div>

          {next && next.slug !== project.slug ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/40 sm:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
                Next case study
              </span>
              <span className="mt-6">
                <span className="block text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                  {next.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {next.category}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read case study
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </Section>
    </>
  );
}

function BlockHeading({ label, title }: { label: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-ink">
      <span className="font-mono text-xs font-normal text-accent">{label}</span>
      {title}
    </h2>
  );
}

function Block({ label, title, body }: { label: string; title: string; body: string }) {
  if (!body) return null;
  return (
    <div>
      <BlockHeading label={label} title={title} />
      <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
