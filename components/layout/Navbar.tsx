"use client";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { useActiveNav } from "@/components/layout/useActiveNav";
import { Wordmark } from "@/components/layout/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, MenuIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const active = useActiveNav(siteConfig.navigation);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-white/[0.07] bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-5 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" aria-label={`${siteConfig.name}, home`} className="rounded-lg">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact" className="min-h-10 px-4 py-2 text-[13px]">
            Discuss Your Project
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
      <MobileMenu open={open} onClose={close} active={active} />
    </header>
  );
}
