import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { skillGroups } from "@/data/skills";
import { siteConfig, socialLinks } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} is a full-stack developer building web applications, SaaS products, and business systems.`,
  path: "/about",
});

export default function AboutPage() {
  const { about } = siteConfig;
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find(
    (link) => link.label === "LinkedIn" && !link.href.includes("your-profile"),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-line bg-elevated">
            <SmartImage
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(max-width: 1024px) 24rem, 26rem"
              priority
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="About" title={siteConfig.name} as="h1" />
            <p className="mt-2 text-sm font-medium tracking-wide text-accent">
              {siteConfig.role}
            </p>
            <div className="mt-8 space-y-8">
              <AboutBlock title="Who I am" body={about.who} />
              <AboutBlock title="What I build" body={about.whatIBuild} />
              <AboutBlock title="How I work" body={about.interestedIn} />
              <AboutBlock title="Direction" body={about.headingTowards} />
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <MailIcon className="h-4 w-4" />
                {siteConfig.email}
              </a>
              {github ? (
                <a
                  href={github.href}
                  target="_blank"
                  rel="me noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="me noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : null}
            </div>
            <div className="mt-10">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I bring to a build"
          description="Concrete delivery capabilities for full-stack product work."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="border-t border-line pt-5">
              <h2 className="text-sm font-semibold tracking-tight text-ink">
                {group.category}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-base font-medium tracking-tight text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{body}</p>
    </div>
  );
}
