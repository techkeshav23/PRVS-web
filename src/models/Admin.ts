import mongoose, { Schema, type Model } from "mongoose";

export interface IAdmin {
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "super_admin" | "admin" | "editor";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: {
      type: String,
      enum: ["super_admin", "admin", "editor"],
      default: "admin",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Admin: Model<IAdmin> =
  (mongoose.models.Admin as Model<IAdmin>) ||
  mongoose.model<IAdmin>("Admin", AdminSchema);
