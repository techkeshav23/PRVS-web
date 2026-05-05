"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveFaq } from "@/app/actions/admin";

type F = {
  _id?: string;
  question?: string;
  answer?: string;
  category?: string;
  order?: number;
  isActive?: boolean;
};

export function FaqForm({ data }: { data?: F }) {
  const router = useRouter();

  async function action(fd: FormData) {
    try {
      await saveFaq(fd);
      toast.success(data?._id ? "Updated" : "Added");
      router.push("/admin/faqs");
      router.refresh();
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      {data?._id && <input type="hidden" name="id" value={data._id} />}
      <div className="bg-card border rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="space-y-1.5">
          <Label>Question *</Label>
          <Input name="question" defaultValue={data?.question} required />
        </div>
        <div className="space-y-1.5">
          <Label>Answer *</Label>
          <Textarea name="answer" defaultValue={data?.answer} rows={5} required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Input name="category" defaultValue={data?.category ?? "general"} />
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input type="number" name="order" defaultValue={data?.order ?? 0} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={data?.isActive ?? true}
            className="w-4 h-4 rounded text-brand-600"
          />
          Active
        </label>
      </div>
      <div className="flex gap-3">
        <SubmitButton label={data?._id ? "Update" : "Add FAQ"} />
        <Link href="/admin/faqs">
          <Button type="button" variant="ghost" size="lg">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
