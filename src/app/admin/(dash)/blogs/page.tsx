import Link from "next/link";
import { Edit, Eye, EyeOff } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { deleteBlog } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  await dbConnect();
  const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(docs)) as Array<{
    _id: string;
    title: string;
    slug: string;
    isPublished: boolean;
    views: number;
    author: string;
    createdAt: string;
  }>;

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description="Manage articles, news and insights."
        actionLabel="New Post"
        actionHref="/admin/blogs/new"
      />

      {blogs.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground mb-4">No posts yet.</p>
          <Link href="/admin/blogs/new">
            <Button>Write First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b bg-muted/30">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 hidden md:table-cell">Author</th>
                  <th className="px-4 py-3 hidden md:table-cell">Views</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Status</th>
                  <th className="px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-semibold truncate">{b.title}</div>
                      <div className="text-xs text-muted-foreground truncate">/{b.slug}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {b.author}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {b.views}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {b.isPublished ? (
                        <Badge variant="success">
                          <Eye className="w-3 h-3 mr-1" /> Live
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <EyeOff className="w-3 h-3 mr-1" /> Draft
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">
                      {formatDate(b.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/blogs/${b._id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteButton id={b._id} onDelete={deleteBlog} label="post" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
