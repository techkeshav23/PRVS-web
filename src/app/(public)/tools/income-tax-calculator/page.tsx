import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IncomeTaxCalculator } from "@/components/tools/income-tax-calculator";

export const metadata: Metadata = {
  title: "Income Tax Calculator FY 2025-26 — Free",
  description:
    "Calculate your income tax under New & Old regime for FY 2025-26 (AY 2026-27). Free, accurate calculator.",
};

export default function IncomeTaxCalculatorPage() {
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
            Tool 03 / FY 2025-26
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-950 leading-[1.05]">
            Income Tax Calculator
          </h1>
          <p className="text-base text-foreground-muted mt-5 leading-relaxed">
            Compare New vs Old tax regime side-by-side. We&apos;ll tell you which one saves
            you more.
          </p>
        </div>

        <IncomeTaxCalculator />

        <div className="mt-16 bg-surface border border-border p-7">
          <h2 className="font-display text-xl text-brand-950 mb-6">
            Tax slabs for FY 2025-26
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-3">
                New Regime (Default)
              </p>
              <ul className="space-y-1.5 text-foreground-muted tabular">
                <li>Up to ₹4 lakh — Nil</li>
                <li>₹4 - 8 lakh — 5%</li>
                <li>₹8 - 12 lakh — 10%</li>
                <li>₹12 - 16 lakh — 15%</li>
                <li>₹16 - 20 lakh — 20%</li>
                <li>₹20 - 24 lakh — 25%</li>
                <li>Above ₹24 lakh — 30%</li>
              </ul>
              <p className="text-xs mt-3 italic text-foreground-muted">
                Standard Deduction ₹75,000
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-3">
                Old Regime
              </p>
              <ul className="space-y-1.5 text-foreground-muted tabular">
                <li>Up to ₹2.5 lakh — Nil</li>
                <li>₹2.5 - 5 lakh — 5%</li>
                <li>₹5 - 10 lakh — 20%</li>
                <li>Above ₹10 lakh — 30%</li>
              </ul>
              <p className="text-xs mt-3 italic text-foreground-muted">
                + 80C, 80D, HRA, Standard Deduction ₹50,000
              </p>
            </div>
          </div>
          <p className="text-xs text-foreground-muted mt-6 italic">
            * Cess of 4% applies on tax. Rebate u/s 87A available up to ₹12L (new) / ₹5L (old).
          </p>
        </div>
      </div>
    </div>
  );
}
