import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GstCalculator } from "@/components/tools/gst-calculator";

export const metadata: Metadata = {
  title: "GST Calculator — Free Tool",
  description:
    "Free GST Calculator. Calculate GST inclusive or exclusive of price. Supports 5%, 12%, 18%, 28% rates.",
  keywords: [
    "GST calculator",
    "GST inclusive calculator",
    "GST exclusive calculator",
    "GST tax calculator India",
  ],
};

export default function GstCalculatorPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-muted hover:text-brand-950 mb-10"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} /> All Tools
        </Link>

        <div className="mb-12 max-w-2xl">
          <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-5">
            Tool 01 / GST
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-950 leading-[1.05]">
            GST Calculator
          </h1>
          <p className="text-base text-foreground-muted mt-5 leading-relaxed">
            Calculate GST inclusive or exclusive amounts with a single click. Supports all
            standard Indian GST rates.
          </p>
        </div>

        <GstCalculator />

        <div className="mt-16 bg-surface border border-border p-7">
          <h2 className="font-display text-xl text-brand-950 mb-4">About GST in India</h2>
          <div className="text-sm text-foreground-muted space-y-3 leading-relaxed">
            <p>
              Goods and Services Tax (GST) is an indirect tax used in India on the supply of
              goods and services. It replaced multiple cascading taxes levied by central and
              state governments.
            </p>
            <p>
              <span className="text-brand-950 font-medium">GST Slabs:</span> 0%, 5%, 12%, 18%,
              and 28%. Most essential items are at 0%-5%, while luxury goods are taxed at 28%.
            </p>
            <p>
              <span className="text-brand-950 font-medium">Inclusive vs Exclusive:</span>{" "}
              Inclusive means the GST amount is already included in the price. Exclusive means
              GST will be added on top of the base price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
