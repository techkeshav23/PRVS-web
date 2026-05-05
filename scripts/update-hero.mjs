// One-off script to update the hero background image directly in MongoDB.
// Usage from website folder:  node scripts/update-hero.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("Could not find .env.local at", envPath);
  process.exit(1);
}

// Tiny .env loader (just MONGODB_URI is needed)
const envContent = fs.readFileSync(envPath, "utf-8");
envContent.split(/\r?\n/).forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return;
  const idx = trimmed.indexOf("=");
  if (idx <= 0) return;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
});

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI not set in .env.local");
  process.exit(1);
}

const HERO_URL =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&q=80&auto=format&fit=crop&crop=focalpoint&fp-x=0.7";

console.log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB_URI);

const result = await mongoose.connection.db
  .collection("settings")
  .updateOne({}, { $set: { heroImage: HERO_URL } }, { upsert: true });

console.log("");
console.log("✓ Hero image updated");
console.log("  URL:", HERO_URL);
console.log("  Modified:", result.modifiedCount, "doc(s)");
console.log("  Upserted:", result.upsertedCount > 0 ? "yes" : "no");

await mongoose.disconnect();
process.exit(0);
