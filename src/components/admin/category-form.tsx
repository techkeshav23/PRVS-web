"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveCategory } from "@/app/actions/admin";

type C = { _id?: string; name?: string; slug?: string; icon?: string; order?: number };

export function CategoryForm({ data }: { data?: C }) {
  const router = useRouter();
  async function action(fd: FormData) {
    try {
      await saveCategory(fd);
      toast.success(data?._id ? "Updated" : "Added");
      router.push("/admin/categories");
      router.refresh();
    } catch {
      toast.error("Failed to save");
    }
  }
  return (
    <form action={action} className="space-y-6 max-w-xl">
      {data?._id && <input type="hidden" name="id" value={data._id} />}
      <div className="bg-card border rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="space-y-1.5">
          <Label>Name *</Label>
          <Input name="name" defaultValue={data?.name} required />
        </div>
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <Input name="slug" defaultValue={data?.slug} placeholder="auto-generated" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Icon</Label>
            <Input name="icon" defaultValue={data?.icon ?? "Folder"} />
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input type="number" name="order" defaultValue={data?.order ?? 0} />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <SubmitButton label={data?._id ? "Update" : "Add Category"} />
        <Link href="/admin/categories">
          <Button type="button" variant="ghost" size="lg">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
