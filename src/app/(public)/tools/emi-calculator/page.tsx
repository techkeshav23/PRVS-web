import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmiCalculator } from "@/components/tools/emi-calculator";

export const metadata: Metadata = {
  title: "EMI Calculator — Free Loan Calculator",
  description:
    "Free EMI Calculator. Calculate monthly loan EMI for home, business or personal loans with interest breakdown.",
};

export default function EmiCalculatorPage() {
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
            Tool 02 / Loans
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-950 leading-[1.05]">
            EMI Calculator
          </h1>
          <p className="text-base text-foreground-muted mt-5 leading-relaxed">
            Calculate your monthly loan installment instantly. Plan home, business or personal
            loans with confidence.
          </p>
        </div>

        <EmiCalculator />

        <div className="mt-16 bg-surface border border-border p-7">
          <h2 className="font-display text-xl text-brand-950 mb-4">How EMI is calculated</h2>
          <div className="text-sm text-foreground-muted space-y-3 leading-relaxed">
            <p>
              EMI uses this formula:{" "}
              <code className="bg-cream-200/50 px-2 py-0.5 text-xs tabular">
                EMI = [P × R × (1+R)^N] / [(1+R)^N − 1]
              </code>
            </p>
            <p>
              <span className="text-brand-950 font-medium">P</span> = Loan Amount,{" "}
              <span className="text-brand-950 font-medium">R</span> = Monthly Interest Rate,{" "}
              <span className="text-brand-950 font-medium">N</span> = Tenure in months.
            </p>
            <p>
              Your EMI stays the same throughout the loan, but the interest and principal split
              changes — early EMIs are mostly interest, later ones mostly principal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
