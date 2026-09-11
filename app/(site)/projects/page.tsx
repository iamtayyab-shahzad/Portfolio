import { ProjectMedia, TechPills } from "@/components/projects/ProjectMedia";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
import type { Project } from "@/types/content";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Selected software projects — web applications, SaaS products, business systems, and AI-powered features.",
  path: "/projects",
});

function ProjectRow({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article
      className={
        large
          ? "overflow-hidden rounded-xl border border-line bg-surface"
          : "group grid overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-white/15 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
      }
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectMedia
          project={project}
          sizes={large ? "(max-width: 1200px) 100vw, 1120px" : "(max-width: 768px) 100vw, 560px"}
          className="rounded-none border-0 border-b border-line md:border-b-0 md:border-r"
        />
      </Link>
      <div className={large ? "p-6 md:p-8" : "flex flex-col p-5 md:p-7"}>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.category}
        </p>
        <h2 className={`mt-2 font-semibold tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link href={`/projects/${project.slug}`} className="hover:text-white">
            {project.name}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{project.tagline}</p>
        <div className="mt-5">
          <TechPills stack={project.stack.slice(0, 6)} />
        </div>
        <div className="mt-6">
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

export default function ProjectsPage() {
  const projects = getProjects();
  const lead = projects[0];
  const rest = projects.slice(1);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
        ])}
      />
      <Section>
        <SectionHeading
          eyebrow="Work"
          title="Selected Work"
          as="h1"
          description="Software products and business systems I've built across SaaS, operations, analytics, and AI-powered features."
        />

        <div className="mt-12 space-y-6">
          {lead ? <ProjectRow project={lead} large /> : null}
          <div className="space-y-6">
            {rest.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
