"use client";

import { Wordmark } from "@/components/layout/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CloseIcon, MailIcon } from "@/components/ui/Icons";
import { mailtoHref, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string | null;
};

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu overlay"
        className="absolute inset-0 z-0 bg-[#050912]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="absolute inset-x-0 top-0 z-10 border-b border-line bg-bg px-5 pb-8 pt-4 shadow-lift"
      >
        <div className="flex h-8 items-center justify-between">
          <Wordmark />
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink"
            aria-label="Close menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col" aria-label="Mobile">
          {siteConfig.navigation.map((item, index) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-line py-4 text-lg font-medium transition-colors",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 space-y-4">
          <ButtonLink href="/contact" className="w-full">
            Discuss Your Project
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <a
            href={mailtoHref}
            className="flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <MailIcon className="h-4 w-4" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}
