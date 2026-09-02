import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { getAllPostSlugs, getPostBySlug } from "@/data/blog";
import { breadcrumbJsonLd, blogPostJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createMetadata({ title: "Article not found", noIndex: true });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage?.src,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Section>
        <article className="mx-auto max-w-2xl">
          <p className="font-mono text-xs text-dim">{formatDate(post.publishedAt)}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{post.description}</p>
          {post.coverImage ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-elevated">
              <SmartImage
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="mt-10 space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Section>
    </>
  );
}
