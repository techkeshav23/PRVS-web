import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { Faq } from "@/models/Faq";
import { FaqForm } from "@/components/admin/faq-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditFaqPage(props: PageProps<"/admin/faqs/[id]">) {
  const { id } = await props.params;
  await dbConnect();
  const doc = await Faq.findById(id).lean();
  if (!doc) notFound();
  const data = JSON.parse(JSON.stringify(doc));
  return (
    <div>
      <AdminPageHeader title="Edit FAQ" />
      <FaqForm data={data} />
    </div>
  );
}
