import { FaqForm } from "@/components/admin/faq-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewFaqPage() {
  return (
    <div>
      <AdminPageHeader title="New FAQ" />
      <FaqForm />
    </div>
  );
}
