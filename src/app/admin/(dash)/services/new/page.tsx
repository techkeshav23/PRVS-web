import { ServiceForm } from "@/components/admin/service-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New Service" description="Add a new service to your website." />
      <ServiceForm />
    </div>
  );
}
