import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { CategoryForm } from "@/components/admin/category-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage(props: PageProps<"/admin/categories/[id]">) {
  const { id } = await props.params;
  await dbConnect();
  const doc = await Category.findById(id).lean();
  if (!doc) notFound();
  const data = JSON.parse(JSON.stringify(doc));
  return (
    <div>
      <AdminPageHeader title="Edit Category" />
      <CategoryForm data={data} />
    </div>
  );
}
