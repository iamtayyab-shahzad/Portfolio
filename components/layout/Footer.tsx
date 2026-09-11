import { Container } from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { siteConfig, socialLinks } from "@/data/site";
import Link from "next/link";

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return <GitHubIcon className="h-4 w-4" />;
  }
  if (label === "LinkedIn") {
    return <LinkedInIcon className="h-4 w-4" />;
  }
  return <MailIcon className="h-4 w-4" />;
}

export function Footer() {
  const year = new Date().getFullYear();
  const links = socialLinks.filter(
    (link) => !(link.label === "LinkedIn" && link.href.includes("your-profile")),
  );

  return (
    <footer className="border-t border-line">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-tight text-ink">
              {siteConfig.wordmark}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.footer.statement}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <MailIcon className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </li>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel={link.identity ? "me noreferrer noopener" : "noreferrer noopener"}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <SocialIcon label={link.label} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>Full-Stack Developer</p>
        </div>
      </Container>
    </footer>
  );
}
