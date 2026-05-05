import { TestimonialForm } from "@/components/admin/testimonial-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="New Testimonial" />
      <TestimonialForm />
    </div>
  );
}
