import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { siteConfig, socialLinks } from "@/data/site";

export function Hero() {
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>
      <Container className="relative py-24 sm:py-28 md:py-36">
        <div className="max-w-3xl animate-fade-up">
          {siteConfig.availability.visible ? (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted">
              <span
                className={
                  siteConfig.availability.available
                    ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                    : "h-1.5 w-1.5 rounded-full bg-dim"
                }
                aria-hidden
              />
              <span className="sr-only">Status: </span>
              {siteConfig.availability.label}
            </p>
          ) : null}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.08]">
            {siteConfig.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.hero.valueProposition}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.hero.primaryCta.href}>
              {siteConfig.hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={siteConfig.hero.secondaryCta.href} variant="secondary">
              {siteConfig.hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
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
        </div>
      </Container>
    </section>
  );
}
