import { FinalCta } from "@/components/home/FinalCta";
import { ProjectFeature } from "@/components/projects/ProjectShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Case studies by Tayyab Shahzad: the Krunchies restaurant ordering and POS platform, plus AI assistant and research automation backends.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
        ])}
      />
      <Section className="pb-12 md:pb-16">
        <SectionHeading
          eyebrow="Work"
          title="Software I've designed, built, and shipped"
          as="h1"
          description="Each case study covers the problem, what I built, and the technology behind it. Results are only listed where they can be verified."
        />

        <div className="mt-14 space-y-8">
          {projects.map((project, index) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              as="h2"
              label={index === 0 ? "Featured" : undefined}
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
