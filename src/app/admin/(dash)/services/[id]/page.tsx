import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { ServiceForm } from "@/components/admin/service-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditServicePage(props: PageProps<"/admin/services/[id]">) {
  const { id } = await props.params;
  await dbConnect();
  const doc = await Service.findById(id).lean();
  if (!doc) notFound();
  const service = JSON.parse(JSON.stringify(doc));

  return (
    <div>
      <AdminPageHeader
        title="Edit Service"
        description="Update service details, pricing and features."
      />
      <ServiceForm service={service} />
    </div>
  );
}
