import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { siteConfig, socialLinks } from "@/data/site";

export function AboutTeaser() {
  const { about } = siteConfig;
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) =>
    link.label === "LinkedIn" && !link.href.includes("your-profile"),
  );

  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-line bg-elevated lg:mx-0">
          <SmartImage
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(max-width: 1024px) 24rem, 28rem"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="About" title={`${siteConfig.name.split(" ")[0]} — Full-Stack Developer`} />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
            <p>{about.who}</p>
            <p>{about.whatIBuild}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <MailIcon className="h-4 w-4" />
              Email
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
          <div className="mt-8">
            <ButtonLink href="/about" variant="secondary">
              More about me
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
