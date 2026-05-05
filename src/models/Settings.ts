import mongoose, { Schema, type Model } from "mongoose";

export interface ISettings {
  _id: string;
  siteName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutShort: string;
  aboutFull: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  officeHours: string;
  whatsappNumber: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  stats: {
    clientsServed: number;
    servicesCompleted: number;
    yearsExperience: number;
    teamMembers: number;
  };
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: "PRVS Business" },
    tagline: { type: String, default: "India's Largest Registration Platform" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    heroTitle: {
      type: String,
      default: "Start, manage & grow your business with India's",
    },
    heroTitleAccent: {
      type: String,
      default: "most trusted partner",
    },
    heroSubtitle: {
      type: String,
      default:
        "Company registration, GST, ITR, Trademark — all under one roof. Affordable. Reliable. Fast.",
    },
    heroImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=80&auto=format&fit=crop",
    },
    aboutShort: {
      type: String,
      default:
        "PRVS Business is your trusted partner for company registration and business compliance in India.",
    },
    aboutFull: { type: String, default: "" },
    contactPhone: { type: String, default: "+91-7348000169" },
    contactEmail: { type: String, default: "support@prvsbusiness.in" },
    contactAddress: { type: String, default: "Pandav Nagar, Delhi - 110092" },
    officeHours: { type: String, default: "Mon - Sat: 9:00 AM to 10:30 PM" },
    whatsappNumber: { type: String, default: "917348000169" },
    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    stats: {
      clientsServed: { type: Number, default: 1200 },
      servicesCompleted: { type: Number, default: 5000 },
      yearsExperience: { type: Number, default: 4 },
      teamMembers: { type: Number, default: 25 },
    },
  },
  { timestamps: true }
);

export const Settings: Model<ISettings> =
  (mongoose.models.Settings as Model<ISettings>) ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
