import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage(
  props: PageProps<"/admin/testimonials/[id]">
) {
  const { id } = await props.params;
  await dbConnect();
  const doc = await Testimonial.findById(id).lean();
  if (!doc) notFound();
  const data = JSON.parse(JSON.stringify(doc));
  return (
    <div>
      <AdminPageHeader title="Edit Testimonial" />
      <TestimonialForm data={data} />
    </div>
  );
}
