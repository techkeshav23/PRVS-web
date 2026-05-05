import mongoose, { Schema, type Model } from "mongoose";

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: "general" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Faq: Model<IFaq> =
  (mongoose.models.Faq as Model<IFaq>) ||
  mongoose.model<IFaq>("Faq", FaqSchema);
