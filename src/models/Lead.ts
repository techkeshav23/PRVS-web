import mongoose, { Schema, type Model } from "mongoose";

export type LeadStatus = "new" | "contacted" | "in_progress" | "converted" | "rejected";

export interface ILead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  status: LeadStatus;
  source: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    service: { type: String, default: "" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "converted", "rejected"],
      default: "new",
    },
    source: { type: String, default: "website" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  (mongoose.models.Lead as Model<ILead>) ||
  mongoose.model<ILead>("Lead", LeadSchema);
