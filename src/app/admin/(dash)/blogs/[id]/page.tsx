import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { BlogForm } from "@/components/admin/blog-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditBlogPage(props: PageProps<"/admin/blogs/[id]">) {
  const { id } = await props.params;
  await dbConnect();
  const doc = await Blog.findById(id).lean();
  if (!doc) notFound();
  const blog = JSON.parse(JSON.stringify(doc));

  return (
    <div>
      <AdminPageHeader title="Edit Post" />
      <BlogForm blog={blog} />
    </div>
  );
}
