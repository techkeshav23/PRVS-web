"use server";

import { z } from "zod";
import { dbConnect } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { revalidatePath } from "next/cache";

const LeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    service: formData.get("service") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString();
      if (field) fieldErrors[field] = issue.message;
    });
    return { error: "Please fix the errors", fieldErrors };
  }

  try {
    await dbConnect();
    await Lead.create({
      ...parsed.data,
      source: "website",
      status: "new",
    });
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (e) {
    console.error("Lead submission error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}
