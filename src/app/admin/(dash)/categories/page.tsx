import Link from "next/link";
import { Edit } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/dynamic-icon";
import { deleteCategory } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await dbConnect();
  const docs = await Category.find({}).sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(docs)) as Array<{
    _id: string;
    name: string;
    slug: string;
    icon: string;
  }>;

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Group services by category for easier navigation."
        actionLabel="Add Category"
        actionHref="/admin/categories/new"
      />

      {items.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground mb-4">No categories yet.</p>
          <Link href="/admin/categories/new">
            <Button>Add First Category</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <div key={c._id} className="bg-card border rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white">
                <DynamicIcon name={c.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">/{c.slug}</div>
              </div>
              <div className="flex gap-1">
                <Link href={`/admin/categories/${c._id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <DeleteButton id={c._id} onDelete={deleteCategory} label="category" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
