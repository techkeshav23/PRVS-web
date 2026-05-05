"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const NEW_REGIME_SLABS = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 5 },
  { upto: 1200000, rate: 10 },
  { upto: 1600000, rate: 15 },
  { upto: 2000000, rate: 20 },
  { upto: 2400000, rate: 25 },
  { upto: Infinity, rate: 30 },
];

const OLD_REGIME_SLABS = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 5 },
  { upto: 1000000, rate: 20 },
  { upto: Infinity, rate: 30 },
];

function calculateSlabTax(taxable: number, slabs: typeof NEW_REGIME_SLABS) {
  let tax = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (taxable <= prev) break;
    const slabAmount = Math.min(taxable, slab.upto) - prev;
    tax += (slabAmount * slab.rate) / 100;
    prev = slab.upto;
  }
  return tax;
}

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1500000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [hra, setHra] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const result = useMemo(() => {
    const newStandardDeduction = 75000;
    const newTaxable = Math.max(0, income - newStandardDeduction);
    let newTax = calculateSlabTax(newTaxable, NEW_REGIME_SLABS);
    if (newTaxable <= 1200000) newTax = 0;
    const newCess = newTax * 0.04;
    const newTotal = newTax + newCess;

    const oldStandardDeduction = 50000;
    const oldDeductions =
      Math.min(deductions80C, 150000) +
      Math.min(deductions80D, 100000) +
      hra +
      otherDeductions +
      oldStandardDeduction;
    const oldTaxable = Math.max(0, income - oldDeductions);
    let oldTax = calculateSlabTax(oldTaxable, OLD_REGIME_SLABS);
    if (oldTaxable <= 500000) oldTax = 0;
    const oldCess = oldTax * 0.04;
    const oldTotal = oldTax + oldCess;

    return {
      new: { taxable: newTaxable, tax: newTax, cess: newCess, total: newTotal },
      old: { taxable: oldTaxable, tax: oldTax, cess: oldCess, total: oldTotal },
      savings: Math.abs(newTotal - oldTotal),
      betterRegime: newTotal <= oldTotal ? "new" : "old",
    };
  }, [income, deductions80C, deductions80D, hra, otherDeductions]);

  return (
    <div className="bg-surface border border-border p-7 lg:p-9">
      <div className="space-y-6">
        <Field label="Annual Gross Income (₹) *">
          <Input
            type="number"
            value={income || ""}
            min={0}
            onChange={(e) => setIncome(Number(e.target.value) || 0)}
            placeholder="15,00,000"
            className="text-lg h-12 font-display tabular"
          />
        </Field>

        <div className="bg-cream-100 border border-border p-5 space-y-5">
          <p className="text-[11px] uppercase tracking-widest text-foreground-muted font-semibold">
            Old Regime Deductions Only
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="80C (PF, LIC, ELSS) — max ₹1.5L">
              <Input
                type="number"
                value={deductions80C || ""}
                onChange={(e) => setDeductions80C(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="80D (Health) — max ₹1L">
              <Input
                type="number"
                value={deductions80D || ""}
                onChange={(e) => setDeductions80D(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="HRA Exemption">
              <Input
                type="number"
                value={hra || ""}
                onChange={(e) => setHra(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Other Deductions">
              <Input
                type="number"
                value={otherDeductions || ""}
                onChange={(e) => setOtherDeductions(Number(e.target.value) || 0)}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          <RegimeCard
            title="New Regime"
            isBetter={result.betterRegime === "new"}
            taxable={result.new.taxable}
            tax={result.new.tax}
            cess={result.new.cess}
            total={result.new.total}
          />
          <RegimeCard
            title="Old Regime"
            isBetter={result.betterRegime === "old"}
            taxable={result.old.taxable}
            tax={result.old.tax}
            cess={result.old.cess}
            total={result.old.total}
          />
        </div>

        {result.savings > 0 && (
          <div className="mt-6 bg-brand-950 text-cream-100 p-7 text-center">
            <p className="text-[11px] uppercase tracking-widest text-cream-200/60">
              {result.betterRegime === "new" ? "New" : "Old"} Regime Saves You
            </p>
            <p className="font-display text-4xl sm:text-5xl mt-2 tabular">
              {formatINR(result.savings)}
            </p>
            <p className="text-xs text-cream-200/60 mt-2">per year</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RegimeCard({
  title,
  isBetter,
  taxable,
  tax,
  cess,
  total,
}: {
  title: string;
  isBetter: boolean;
  taxable: number;
  tax: number;
  cess: number;
  total: number;
}) {
  return (
    <div
      className={
        "relative p-6 transition-colors " +
        (isBetter ? "bg-cream-100" : "bg-card")
      }
    >
      {isBetter && (
        <div className="absolute -top-px right-4 px-2 py-1 bg-accent-500 text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" strokeWidth={2} /> Better
        </div>
      )}
      <h3 className="font-display text-lg text-brand-950 mb-4">{title}</h3>
      <dl className="space-y-2 text-sm tabular">
        <Stat label="Taxable Income" value={taxable} />
        <Stat label="Tax" value={tax} />
        <Stat label="Cess (4%)" value={cess} />
      </dl>
      <div className="border-t border-border mt-4 pt-4">
        <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
          Total Tax Payable
        </p>
        <p className="font-display text-3xl text-brand-950 mt-1 tabular">
          {formatINR(total)}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <dt className="text-foreground-muted">{label}</dt>
      <dd className="font-medium text-brand-950">{formatINR(value)}</dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
