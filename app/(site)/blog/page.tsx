import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogMeta, getPublishedPosts } from "@/data/blog";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Blog",
  description: blogMeta.description,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Section>
        <SectionHeading
          eyebrow="Blog"
          title={blogMeta.title}
          description={blogMeta.description}
          as="h1"
        />
        {posts.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-white/10 bg-surface px-6 py-16 text-center">
            <p className="text-sm leading-relaxed text-muted">{blogMeta.emptyState}</p>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug} className="py-6">
                <p className="font-mono text-xs text-dim">{formatDate(post.publishedAt)}</p>
                <h2 className="mt-2 text-lg font-medium tracking-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-white">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
                {post.tags.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
