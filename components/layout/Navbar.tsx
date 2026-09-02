"use client";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { MenuIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-ink transition-colors hover:text-white"
        >
          {siteConfig.wordmark}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
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
      <MobileMenu open={open} onClose={close} />
    </header>
  );
}
