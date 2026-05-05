"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/utils";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const result = useMemo(() => {
    const P = principal;
    const R = rate / 12 / 100;
    const N = tenureYears * 12;
    if (P <= 0 || R <= 0 || N <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;
    return { emi, totalPayment, totalInterest };
  }, [principal, rate, tenureYears]);

  const principalPct = (principal / result.totalPayment) * 100 || 0;
  const interestPct = (result.totalInterest / result.totalPayment) * 100 || 0;

  return (
    <div className="bg-surface border border-border p-7 lg:p-9">
      <div className="space-y-7">
        <SliderField
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={20000000}
          step={10000}
          format={(v) => formatINR(v)}
        />
        <SliderField
          label="Interest Rate (per annum)"
          value={rate}
          onChange={setRate}
          min={1}
          max={25}
          step={0.1}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <SliderField
          label="Loan Tenure"
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={30}
          step={1}
          format={(v) => `${v} year${v > 1 ? "s" : ""}`}
        />
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <div className="text-center bg-brand-950 text-cream-100 p-8 mb-6">
          <p className="text-[11px] uppercase tracking-widest text-cream-200/60 mb-2">
            Monthly EMI
          </p>
          <p className="font-display text-5xl tabular">
            {formatINR(result.emi)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border border border-border">
          <div className="bg-card p-5 text-center">
            <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
              Total Interest
            </p>
            <p className="font-display text-xl text-accent-700 mt-1 tabular">
              {formatINR(result.totalInterest)}
            </p>
          </div>
          <div className="bg-card p-5 text-center">
            <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
              Total Payment
            </p>
            <p className="font-display text-xl text-brand-950 mt-1 tabular">
              {formatINR(result.totalPayment)}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[11px] uppercase tracking-widest text-foreground-muted mb-3">
            Payment Breakdown
          </p>
          <div className="h-2 overflow-hidden flex bg-border">
            <div
              className="bg-brand-950 transition-all"
              style={{ width: `${principalPct}%` }}
            />
            <div
              className="bg-accent-500 transition-all"
              style={{ width: `${interestPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-foreground-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-950" />
              Principal · {principalPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-500" />
              Interest · {interestPct.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Label>{label}</Label>
        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
          }}
          className="w-32 h-9 text-right font-display text-sm tabular"
        />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-950"
      />
      <div className="flex justify-between text-xs text-foreground-muted mt-2">
        <span>{format(min)}</span>
        <span className="font-display text-brand-950 tabular">{format(value)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
