import { canAccessAdmin } from "@/lib/admin-access";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const host = (await headers()).get("host");

  if (!canAccessAdmin(host)) {
    notFound();
  }

  redirect("/keystatic");
}
