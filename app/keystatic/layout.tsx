import { canAccessAdmin } from "@/lib/admin-access";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function KeystaticLayout() {
  const host = (await headers()).get("host");

  if (!canAccessAdmin(host)) {
    notFound();
  }

  return <KeystaticApp />;
}
