import { BlogForm } from "@/components/admin/blog-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader title="New Post" description="Write a new blog post." />
      <BlogForm />
    </div>
  );
}
