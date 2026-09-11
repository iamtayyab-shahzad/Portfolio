import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
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
    title: project.name,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    image: project.coverImage.src,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const supportingShots = project.screenshots.filter(
    (shot) => shot.src && shot.src !== project.coverImage.src,
  );

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

      <Section className="pb-10 md:pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {project.category}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {project.tagline}
        </p>
        <div className="mt-6">
          <ProjectLinks project={project} showCaseStudy={false} />
        </div>

        <div className="mt-10">
          <ProjectMedia project={project} priority />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="space-y-10">
            <Block title="What I built">{project.solution || project.description}</Block>

            {project.features.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Key features</h2>
                <ul className="mt-4 space-y-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {supportingShots.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Product screenshots</h2>
                <div className="mt-5">
                  <ProjectGallery shots={supportingShots} />
                </div>
              </div>
            ) : null}

            {project.outcome ? <Block title="Outcome">{project.outcome}</Block> : null}
          </article>

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl border border-line bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
                Technology
              </h2>
              <div className="mt-4">
                <TechPills stack={project.stack} />
              </div>
              <div className="mt-6">
                <ProjectLinks project={project} showCaseStudy={false} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-xl border border-line bg-elevated px-6 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-10">
          <div>
            <p className="text-lg font-semibold tracking-tight text-ink">Need something similar?</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Tell me what you want to build and I&apos;ll help turn it into a practical full-stack
              solution.
            </p>
          </div>
          <div className="mt-6 shrink-0 sm:mt-0">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-[15px]">
        {children}
      </p>
    </div>
  );
}
