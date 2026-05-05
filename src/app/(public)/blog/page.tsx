import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/public/section-heading";
import { getBlogs } from "@/lib/data";
import { formatDate, truncate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles, guides and analysis on Indian business compliance.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Journal"
          title="Insights for founders, finance teams and operators."
          description="Plain-language analysis of regulatory changes, compliance deadlines, and business setup decisions."
        />

        {blogs.length === 0 ? (
          <div className="bg-surface border border-border p-16 text-center text-foreground-muted">
            No articles yet — check back soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group bg-card p-7 flex flex-col h-full hover:bg-cream-100 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-foreground-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-display text-xl text-brand-950 group-hover:text-accent-700 transition-colors line-clamp-3 leading-snug mb-4">
                  {blog.title}
                </h3>
                <p className="text-sm text-foreground-muted mb-6 line-clamp-3 leading-relaxed">
                  {truncate(blog.excerpt, 140)}
                </p>
                <div className="flex items-center justify-between text-xs text-foreground-muted mt-auto pt-5 border-t border-border">
                  <time className="tabular">{formatDate(blog.createdAt)}</time>
                  <span className="inline-flex items-center gap-1.5 text-brand-950 font-medium group-hover:text-accent-700">
                    Read <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
