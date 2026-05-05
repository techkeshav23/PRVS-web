"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveBlog } from "@/app/actions/admin";

type Blog = {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  tags?: string[];
  isPublished?: boolean;
  metaTitle?: string;
  metaDescription?: string;
};

export function BlogForm({ blog }: { blog?: Blog }) {
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      await saveBlog(formData);
      toast.success(blog?._id ? "Post updated" : "Post created");
      router.push("/admin/blogs");
      router.refresh();
    } catch {
      toast.error("Failed to save post");
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      {blog?._id && <input type="hidden" name="id" value={blog._id} />}

      <Card>
        <H>Content</H>
        <F label="Title *">
          <Input name="title" defaultValue={blog?.title} required />
        </F>
        <F label="Slug">
          <Input name="slug" defaultValue={blog?.slug} placeholder="auto-generated" />
        </F>
        <F label="Excerpt *" hint="Short summary shown on listing pages">
          <Textarea name="excerpt" defaultValue={blog?.excerpt} rows={2} required />
        </F>
        <F label="Content *" hint="HTML / Markdown supported">
          <Textarea name="content" defaultValue={blog?.content} rows={14} required />
        </F>
      </Card>

      <Card>
        <H>Meta</H>
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Author">
            <Input name="author" defaultValue={blog?.author ?? "PRVS Team"} />
          </F>
          <F label="Featured Image URL">
            <Input name="image" defaultValue={blog?.image} placeholder="https://..." />
          </F>
        </div>
        <F label="Tags" hint="Comma-separated">
          <Input
            name="tags"
            defaultValue={blog?.tags?.join(", ") ?? ""}
            placeholder="GST, Compliance, Tax"
          />
        </F>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer pt-2">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={blog?.isPublished}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
          Publish (make visible to public)
        </label>
      </Card>

      <Card>
        <H>SEO</H>
        <F label="Meta Title">
          <Input name="metaTitle" defaultValue={blog?.metaTitle} />
        </F>
        <F label="Meta Description">
          <Textarea name="metaDescription" defaultValue={blog?.metaDescription} rows={2} />
        </F>
      </Card>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={blog?._id ? "Update Post" : "Create Post"} />
        <Link href="/admin/blogs">
          <Button type="button" variant="ghost" size="lg">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border rounded-2xl p-5 sm:p-6 space-y-4">{children}</div>
);
const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-lg mb-1">{children}</h2>
);
const F = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);
