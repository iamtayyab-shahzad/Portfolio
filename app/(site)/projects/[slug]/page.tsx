import { ProjectLinks, ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
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
      <Section className="pb-12 md:pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {project.category}
          {project.isPlaceholder ? " · Placeholder" : null}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {project.tagline}
        </p>
        <div className="mt-6">
          <ProjectLinks project={project} />
        </div>
        <div className="mt-10">
          <ProjectMedia project={project} priority />
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="space-y-12">
            <Block title="Overview">{project.description}</Block>
            <Block title="Problem">{project.problem}</Block>
            <Block title="Approach">{project.approach}</Block>
            <Block title="Solution">{project.solution}</Block>
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
            <Block title="Architecture">{project.architecture}</Block>
            {project.outcome ? (
              <Block title="Results">{project.outcome}</Block>
            ) : (
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Results</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Results will be added when there is a real outcome to share. No invented metrics.
                </p>
              </div>
            )}
            {project.screenshots.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Screenshots</h2>
                <div className="mt-5 space-y-4">
                  {project.screenshots.map((shot) => (
                    <div
                      key={shot.src + shot.alt}
                      className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-elevated"
                    >
                      <SmartImage
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
          <aside className="h-fit rounded-lg border border-line bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-dim">
              Stack
            </h2>
            <div className="mt-4">
              <TechPills stack={project.stack} />
            </div>
            <div className="mt-8">
              <ButtonLink href="/contact" className="w-full">
                Discuss a similar project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">{children}</p>
    </div>
  );
}
