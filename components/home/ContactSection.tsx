import { ContactForm } from "@/components/contact/ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, socialLinks } from "@/data/site";

export function ContactSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={siteConfig.contact.headline}
            description={siteConfig.contact.subheadline}
            as={compact ? "h2" : "h1"}
          />
          {!compact ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {siteConfig.contact.note}
            </p>
          ) : null}
          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <MailIcon className="h-4 w-4" />
                {siteConfig.email}
              </a>
            </li>
            {github ? (
              <li>
                <a
                  href={github.href}
                  target="_blank"
                  rel="me noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            ) : null}
            {linkedin ? (
              <li>
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="me noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
