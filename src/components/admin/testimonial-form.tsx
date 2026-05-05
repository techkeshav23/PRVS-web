"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveTestimonial } from "@/app/actions/admin";

type T = {
  _id?: string;
  name?: string;
  role?: string;
  company?: string;
  message?: string;
  photo?: string;
  rating?: number;
  isActive?: boolean;
  order?: number;
};

export function TestimonialForm({ data }: { data?: T }) {
  const router = useRouter();

  async function action(fd: FormData) {
    try {
      await saveTestimonial(fd);
      toast.success(data?._id ? "Updated" : "Added");
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-xl">
      {data?._id && <input type="hidden" name="id" value={data._id} />}

      <div className="bg-card border rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name *</Label>
            <Input name="name" defaultValue={data?.name} required />
          </div>
          <div className="space-y-1.5">
            <Label>Photo URL</Label>
            <Input name="photo" defaultValue={data?.photo} placeholder="https://..." />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input name="role" defaultValue={data?.role} placeholder="Founder" />
          </div>
          <div className="space-y-1.5">
            <Label>Company</Label>
            <Input name="company" defaultValue={data?.company} />
          </div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <select
              name="rating"
              defaultValue={data?.rating ?? 5}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} stars</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input type="number" name="order" defaultValue={data?.order ?? 0} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Message *</Label>
          <Textarea name="message" defaultValue={data?.message} rows={5} required />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={data?.isActive ?? true}
            className="w-4 h-4 rounded text-brand-600"
          />
          Active (visible on website)
        </label>
      </div>

      <div className="flex gap-3">
        <SubmitButton label={data?._id ? "Update" : "Add Testimonial"} />
        <Link href="/admin/testimonials">
          <Button type="button" variant="ghost" size="lg">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
