import mongoose, { Schema, type Model } from "mongoose";

export interface IService {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category?: string;
  icon: string;
  image?: string;
  price?: number;
  startingFrom?: boolean;
  features: string[];
  documents: string[];
  process: { step: string; description: string }[];
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: "" },
    icon: { type: String, default: "Briefcase" },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    startingFrom: { type: Boolean, default: true },
    features: { type: [String], default: [] },
    documents: { type: [String], default: [] },
    process: {
      type: [{ step: String, description: String }],
      default: [],
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  (mongoose.models.Service as Model<IService>) ||
  mongoose.model<IService>("Service", ServiceSchema);
