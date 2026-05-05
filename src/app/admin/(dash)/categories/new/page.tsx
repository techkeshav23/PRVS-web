import { CategoryForm } from "@/components/admin/category-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewCategoryPage() {
  return (
    <div>
      <AdminPageHeader title="New Category" />
      <CategoryForm />
    </div>
  );
}
