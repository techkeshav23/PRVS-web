"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveService } from "@/app/actions/admin";

type Service = {
  _id?: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  icon?: string;
  image?: string;
  price?: number;
  startingFrom?: boolean;
  features?: string[];
  documents?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
};

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      await saveService(formData);
      toast.success(service?._id ? "Service updated" : "Service created");
      router.push("/admin/services");
      router.refresh();
    } catch {
      toast.error("Failed to save service");
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      {service?._id && <input type="hidden" name="id" value={service._id} />}

      <Section title="Basic Info">
        <Field label="Title *">
          <Input name="title" defaultValue={service?.title} required />
        </Field>
        <Field label="Slug (URL)" hint="Auto-generated if empty">
          <Input name="slug" defaultValue={service?.slug} placeholder="company-registration" />
        </Field>
        <Field label="Short Description *" hint="Shown on cards and listings">
          <Textarea
            name="shortDescription"
            defaultValue={service?.shortDescription}
            rows={2}
            required
          />
        </Field>
        <Field label="Full Description *" hint="HTML allowed">
          <Textarea name="description" defaultValue={service?.description} rows={6} required />
        </Field>
      </Section>

      <Section title="Display & Pricing">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Icon" hint="Lucide icon name (e.g. Briefcase, FileText, Shield)">
            <Input name="icon" defaultValue={service?.icon ?? "Briefcase"} />
          </Field>
          <Field label="Category">
            <Input name="category" defaultValue={service?.category} />
          </Field>
          <Field label="Price (₹)" hint="0 means 'on request'">
            <Input
              name="price"
              type="number"
              defaultValue={service?.price ?? 0}
              min={0}
            />
          </Field>
          <Field label="Order" hint="Lower = shown first">
            <Input name="order" type="number" defaultValue={service?.order ?? 0} />
          </Field>
        </div>
        <Field label="Image URL (optional)">
          <Input name="image" defaultValue={service?.image} placeholder="https://..." />
        </Field>
        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
          <Toggle name="startingFrom" defaultChecked={service?.startingFrom ?? true} label="Show 'Starting from'" />
          <Toggle name="isFeatured" defaultChecked={service?.isFeatured ?? false} label="Featured (homepage)" />
          <Toggle name="isActive" defaultChecked={service?.isActive ?? true} label="Active (visible)" />
        </div>
      </Section>

      <Section title="Features & Documents">
        <Field label="Features" hint="One per line">
          <Textarea
            name="features"
            defaultValue={service?.features?.join("\n") ?? ""}
            rows={6}
            placeholder={"Free expert consultation\nGovernment fees included\nAll documents prepared"}
          />
        </Field>
        <Field label="Documents Required" hint="One per line">
          <Textarea
            name="documents"
            defaultValue={service?.documents?.join("\n") ?? ""}
            rows={5}
            placeholder={"PAN card of all directors\nAadhaar card\nAddress proof"}
          />
        </Field>
      </Section>

      <Section title="SEO (Optional)">
        <Field label="Meta Title">
          <Input name="metaTitle" defaultValue={service?.metaTitle} />
        </Field>
        <Field label="Meta Description">
          <Textarea name="metaDescription" defaultValue={service?.metaDescription} rows={2} />
        </Field>
      </Section>

      <div className="flex gap-3 pt-2">
        <SubmitButton label={service?._id ? "Update Service" : "Create Service"} />
        <Link href="/admin/services">
          <Button type="button" variant="ghost" size="lg">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-2xl p-5 sm:p-6">
      <h2 className="font-bold text-lg mb-5">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 rounded border-input text-brand-600 focus:ring-brand-500"
      />
      {label}
    </label>
  );
}
