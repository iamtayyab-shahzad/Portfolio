"use client";

import type { NavItem } from "@/types/content";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function sectionId(href: string): string | null {
  return href.startsWith("/#") ? href.slice(2) : null;
}

/**
 * Returns the href of the nav item that matches the current view: the section
 * in view on the homepage, or the route on other pages. Case-study pages map
 * to the "Work" section link.
 */
export function useActiveNav(items: NavItem[]): string | null {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }

    const ids = items.map((item) => sectionId(item.href)).filter(Boolean) as string[];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setSection(visible[visible.length - 1].target.id);
        } else if (window.scrollY < nodes[0].offsetTop - window.innerHeight / 2) {
          setSection(null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname, items]);

  if (pathname === "/") {
    return section ? `/#${section}` : null;
  }

  const routeMatch = items.find((item) => !sectionId(item.href) && pathname.startsWith(item.href));
  if (routeMatch) return routeMatch.href;

  if (pathname.startsWith("/projects")) {
    return items.find((item) => item.href === "/#work")?.href ?? null;
  }

  return null;
}
