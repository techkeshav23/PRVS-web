"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { Blog } from "@/models/Blog";
import { Lead } from "@/models/Lead";
import { Testimonial } from "@/models/Testimonial";
import { Faq } from "@/models/Faq";
import { Settings } from "@/models/Settings";
import { Category } from "@/models/Category";

async function ensureAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

function makeSlug(title: string) {
  return slugify(title, { lower: true, strict: true });
}

// SERVICES
export async function saveService(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const id = formData.get("id")?.toString();
  const title = formData.get("title")!.toString();
  const data = {
    title,
    slug: formData.get("slug")?.toString() || makeSlug(title),
    shortDescription: formData.get("shortDescription")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    icon: formData.get("icon")?.toString() || "Briefcase",
    image: formData.get("image")?.toString() ?? "",
    price: Number(formData.get("price") ?? 0),
    startingFrom: formData.get("startingFrom") === "on",
    features: (formData.get("features")?.toString() ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    documents: (formData.get("documents")?.toString() ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
    order: Number(formData.get("order") ?? 0),
    metaTitle: formData.get("metaTitle")?.toString() ?? "",
    metaDescription: formData.get("metaDescription")?.toString() ?? "",
  };

  if (id) {
    await Service.findByIdAndUpdate(id, data);
  } else {
    await Service.create(data);
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await ensureAuth();
  await dbConnect();
  await Service.findByIdAndDelete(id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

// BLOGS
export async function saveBlog(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const id = formData.get("id")?.toString();
  const title = formData.get("title")!.toString();
  const data = {
    title,
    slug: formData.get("slug")?.toString() || makeSlug(title),
    excerpt: formData.get("excerpt")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    image: formData.get("image")?.toString() ?? "",
    author: formData.get("author")?.toString() || "PRVS Team",
    tags: (formData.get("tags")?.toString() ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    isPublished: formData.get("isPublished") === "on",
    metaTitle: formData.get("metaTitle")?.toString() ?? "",
    metaDescription: formData.get("metaDescription")?.toString() ?? "",
  };

  if (id) {
    await Blog.findByIdAndUpdate(id, data);
  } else {
    await Blog.create(data);
  }
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function deleteBlog(id: string) {
  await ensureAuth();
  await dbConnect();
  await Blog.findByIdAndDelete(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

// LEADS
export async function updateLeadStatus(id: string, status: string, notes?: string) {
  await ensureAuth();
  await dbConnect();
  const update: Record<string, string> = { status };
  if (notes !== undefined) update.notes = notes;
  await Lead.findByIdAndUpdate(id, update);
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  await ensureAuth();
  await dbConnect();
  await Lead.findByIdAndDelete(id);
  revalidatePath("/admin/leads");
}

// TESTIMONIALS
export async function saveTestimonial(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const id = formData.get("id")?.toString();
  const data = {
    name: formData.get("name")!.toString(),
    role: formData.get("role")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    message: formData.get("message")!.toString(),
    photo: formData.get("photo")?.toString() ?? "",
    rating: Number(formData.get("rating") ?? 5),
    isActive: formData.get("isActive") === "on",
    order: Number(formData.get("order") ?? 0),
  };

  if (id) {
    await Testimonial.findByIdAndUpdate(id, data);
  } else {
    await Testimonial.create(data);
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await ensureAuth();
  await dbConnect();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// FAQS
export async function saveFaq(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const id = formData.get("id")?.toString();
  const data = {
    question: formData.get("question")!.toString(),
    answer: formData.get("answer")!.toString(),
    category: formData.get("category")?.toString() || "general",
    order: Number(formData.get("order") ?? 0),
    isActive: formData.get("isActive") === "on",
  };

  if (id) {
    await Faq.findByIdAndUpdate(id, data);
  } else {
    await Faq.create(data);
  }
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

export async function deleteFaq(id: string) {
  await ensureAuth();
  await dbConnect();
  await Faq.findByIdAndDelete(id);
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

// CATEGORIES
export async function saveCategory(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const id = formData.get("id")?.toString();
  const name = formData.get("name")!.toString();
  const data = {
    name,
    slug: formData.get("slug")?.toString() || makeSlug(name),
    icon: formData.get("icon")?.toString() ?? "Folder",
    order: Number(formData.get("order") ?? 0),
  };

  if (id) {
    await Category.findByIdAndUpdate(id, data);
  } else {
    await Category.create(data);
  }
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await ensureAuth();
  await dbConnect();
  await Category.findByIdAndDelete(id);
  revalidatePath("/admin/categories");
}

// SETTINGS
export async function saveSettings(formData: FormData) {
  await ensureAuth();
  await dbConnect();

  const data = {
    siteName: formData.get("siteName")?.toString() ?? "PRVS Business",
    tagline: formData.get("tagline")?.toString() ?? "",
    logo: formData.get("logo")?.toString() ?? "",
    heroTitle: formData.get("heroTitle")?.toString() ?? "",
    heroTitleAccent: formData.get("heroTitleAccent")?.toString() ?? "",
    heroSubtitle: formData.get("heroSubtitle")?.toString() ?? "",
    heroImage: formData.get("heroImage")?.toString() ?? "",
    aboutShort: formData.get("aboutShort")?.toString() ?? "",
    aboutFull: formData.get("aboutFull")?.toString() ?? "",
    contactPhone: formData.get("contactPhone")?.toString() ?? "",
    contactEmail: formData.get("contactEmail")?.toString() ?? "",
    contactAddress: formData.get("contactAddress")?.toString() ?? "",
    officeHours: formData.get("officeHours")?.toString() ?? "",
    whatsappNumber: formData.get("whatsappNumber")?.toString() ?? "",
    social: {
      facebook: formData.get("facebook")?.toString() ?? "",
      instagram: formData.get("instagram")?.toString() ?? "",
      twitter: formData.get("twitter")?.toString() ?? "",
      youtube: formData.get("youtube")?.toString() ?? "",
      linkedin: formData.get("linkedin")?.toString() ?? "",
    },
    stats: {
      clientsServed: Number(formData.get("clientsServed") ?? 0),
      servicesCompleted: Number(formData.get("servicesCompleted") ?? 0),
      yearsExperience: Number(formData.get("yearsExperience") ?? 0),
      teamMembers: Number(formData.get("teamMembers") ?? 0),
    },
  };

  await Settings.findOneAndUpdate({}, data, { upsert: true, new: true });
  revalidatePath("/", "layout");
}
