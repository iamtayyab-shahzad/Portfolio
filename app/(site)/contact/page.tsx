import { ContactSection } from "@/components/home/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a project for a web application, SaaS product, business system, or AI-powered feature.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactSection />
    </>
  );
}
