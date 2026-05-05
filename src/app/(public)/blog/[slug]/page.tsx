import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBlogBySlug, getBlogs } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Post Not Found" };
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const allBlogs = await getBlogs({ limit: 4 });
  const related = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <article className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-muted hover:text-brand-950 mb-10"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} /> All articles
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-brand-950 leading-[1.05]">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pb-8 border-b border-border text-xs text-foreground-muted uppercase tracking-widest">
          <span>By {blog.author}</span>
          <span className="tabular">{formatDate(blog.createdAt)}</span>
          <span className="tabular">{blog.views} views</span>
        </div>

        {blog.image && (
          <div className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.image} alt={blog.title} className="w-full" />
          </div>
        )}

        <div
          className="prose prose-zinc max-w-none mt-10 whitespace-pre-line text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {related.length > 0 && (
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-10">
            More articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {related.map((b) => (
              <Link
                key={b._id}
                href={`/blog/${b.slug}`}
                className="bg-card p-6 hover:bg-cream-100 group flex flex-col gap-3"
              >
                <h3 className="font-display text-lg text-brand-950 line-clamp-2 group-hover:text-accent-700">
                  {b.title}
                </h3>
                <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                  {b.excerpt}
                </p>
                <span className="text-xs text-brand-950 inline-flex items-center gap-1 mt-auto pt-3 border-t border-border">
                  Read <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
