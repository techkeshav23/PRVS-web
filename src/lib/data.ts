import "server-only";
import { dbConnect } from "@/lib/mongodb";
import { Service, type IService } from "@/models/Service";
import { Blog, type IBlog } from "@/models/Blog";
import { Testimonial, type ITestimonial } from "@/models/Testimonial";
import { Faq, type IFaq } from "@/models/Faq";
import { Settings, type ISettings } from "@/models/Settings";
import { Category, type ICategory } from "@/models/Category";

function toPlain<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc));
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[data] DB query failed, using fallback:", (e as Error).message);
    }
    return fallback;
  }
}

const defaultSettings: ISettings = {
  _id: "",
  siteName: "PRVS Business",
  tagline: "India's Largest Registration Platform",
  logo: "",
  favicon: "",
  heroTitle: "Start, manage & grow your business with India's",
  heroTitleAccent: "most trusted partner",
  heroSubtitle:
    "Company registration, GST, ITR, Trademark — all under one roof. Affordable. Reliable. Fast.",
  heroImage:
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=80&auto=format&fit=crop",
  aboutShort:
    "PRVS Business is your trusted partner for company registration and business compliance in India.",
  aboutFull: "",
  contactPhone: "+91-7348000169",
  contactEmail: "support@prvsbusiness.in",
  contactAddress: "Pandav Nagar, Delhi - 110092",
  officeHours: "Mon - Sat: 9:00 AM to 10:30 PM",
  whatsappNumber: "917348000169",
  social: {},
  stats: {
    clientsServed: 1200,
    servicesCompleted: 5000,
    yearsExperience: 4,
    teamMembers: 25,
  },
  updatedAt: new Date(),
};

export async function getServices(opts: { featured?: boolean; limit?: number } = {}) {
  return safe(async () => {
    await dbConnect();
    const query: Record<string, unknown> = { isActive: true };
    if (opts.featured) query.isFeatured = true;
    let cursor = Service.find(query).sort({ order: 1, createdAt: -1 });
    if (opts.limit) cursor = cursor.limit(opts.limit);
    const docs = await cursor.lean();
    return toPlain<IService[]>(docs);
  }, [] as IService[]);
}

export async function getServiceBySlug(slug: string) {
  return safe(async () => {
    await dbConnect();
    const doc = await Service.findOne({ slug, isActive: true }).lean();
    return doc ? toPlain<IService>(doc) : null;
  }, null);
}

export async function getCategories() {
  return safe(async () => {
    await dbConnect();
    const docs = await Category.find({}).sort({ order: 1 }).lean();
    return toPlain<ICategory[]>(docs);
  }, [] as ICategory[]);
}

export async function getBlogs(opts: { limit?: number; published?: boolean } = {}) {
  return safe(async () => {
    await dbConnect();
    const query: Record<string, unknown> = {};
    if (opts.published !== false) query.isPublished = true;
    let cursor = Blog.find(query).sort({ createdAt: -1 });
    if (opts.limit) cursor = cursor.limit(opts.limit);
    const docs = await cursor.lean();
    return toPlain<IBlog[]>(docs);
  }, [] as IBlog[]);
}

export async function getBlogBySlug(slug: string) {
  return safe(async () => {
    await dbConnect();
    const doc = await Blog.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    return doc ? toPlain<IBlog>(doc) : null;
  }, null);
}

export async function getTestimonials(limit?: number) {
  return safe(async () => {
    await dbConnect();
    let cursor = Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    if (limit) cursor = cursor.limit(limit);
    const docs = await cursor.lean();
    return toPlain<ITestimonial[]>(docs);
  }, [] as ITestimonial[]);
}

export async function getFaqs(limit?: number) {
  return safe(async () => {
    await dbConnect();
    let cursor = Faq.find({ isActive: true }).sort({ order: 1 });
    if (limit) cursor = cursor.limit(limit);
    const docs = await cursor.lean();
    return toPlain<IFaq[]>(docs);
  }, [] as IFaq[]);
}

export async function getSettings(): Promise<ISettings> {
  return safe(async () => {
    await dbConnect();
    let doc = await Settings.findOne({}).lean();
    if (!doc) {
      const created = await Settings.create({});
      doc = created.toObject();
    }
    return toPlain<ISettings>(doc);
  }, defaultSettings);
}
