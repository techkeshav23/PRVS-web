import type { Metadata } from "next";
import Link from "next/link";
import { Receipt, Banknote, FileText, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Free calculators for GST, EMI, and Income Tax. Plan your finances with PRVS Business calculators.",
};

const tools = [
  {
    title: "GST Calculator",
    description:
      "Calculate GST inclusive or exclusive of price for any rate (5%, 12%, 18%, 28%).",
    icon: Receipt,
    href: "/tools/gst-calculator",
    label: "01",
  },
  {
    title: "EMI Calculator",
    description:
      "Calculate monthly EMI for home, business or personal loans with full interest breakdown.",
    icon: Banknote,
    href: "/tools/emi-calculator",
    label: "02",
  },
  {
    title: "Income Tax Calculator",
    description:
      "Calculate income tax under New & Old regime for FY 2025-26 with deductions side-by-side.",
    icon: FileText,
    href: "/tools/income-tax-calculator",
    label: "03",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Free Tools"
          title="Calculators that save you tax — and time."
          description="Built by our team of CAs. Accurate, current to FY 2025-26, and free to use forever."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border max-w-5xl mx-auto">
          {tools.map(({ title, description, icon: Icon, href, label }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card p-8 flex flex-col h-full hover:bg-cream-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-border group-hover:border-brand-950 group-hover:bg-brand-950 group-hover:text-cream-100 flex items-center justify-center text-brand-950 transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-foreground-muted tabular">
                  {label} / Tool
                </span>
              </div>
              <h3 className="font-display text-xl text-brand-950 mb-3 group-hover:text-accent-700 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-6 flex-1">
                {description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-950 group-hover:gap-3 transition-all">
                Try Now <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-foreground-muted mt-16 max-w-md mx-auto">
          More tools coming soon — HRA Calculator, TDS Calculator, Salary to CTC.
        </p>
      </div>
    </div>
  );
}
