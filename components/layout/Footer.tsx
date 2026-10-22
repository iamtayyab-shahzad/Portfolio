import { SocialIcon } from "@/components/contact/ContactChannels";
import { Wordmark } from "@/components/layout/Wordmark";
import { Container } from "@/components/ui/Container";
import { MailIcon } from "@/components/ui/Icons";
import { contactLinks, mailtoHref, siteConfig } from "@/data/site";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#080d17]">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name}, home`} className="inline-block rounded-lg">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.footer.statement}
            </p>
            {siteConfig.availability.visible && siteConfig.availability.available ? (
              <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {siteConfig.availability.label}
              </p>
            ) : null}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-dim">Navigate</p>
            <ul className="mt-4 space-y-2.5">
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
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-dim">Get in touch</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 break-all text-sm text-muted transition-colors hover:text-accent"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel={link.identity ? "me noreferrer noopener" : "noreferrer noopener"}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <SocialIcon label={link.label} className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  Discuss your project →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Designed and built by me with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
