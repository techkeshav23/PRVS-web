"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

const GST_RATES = [5, 12, 18, 28];

export function GstCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    if (!amount || amount <= 0) return { base: 0, tax: 0, total: 0 };
    if (type === "exclusive") {
      const tax = (amount * rate) / 100;
      return { base: amount, tax, total: amount + tax };
    } else {
      const base = (amount * 100) / (100 + rate);
      const tax = amount - base;
      return { base, tax, total: amount };
    }
  }, [amount, rate, type]);

  return (
    <div className="bg-surface border border-border p-7 lg:p-9">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-px p-px bg-border">
          {(["exclusive", "inclusive"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                type === t
                  ? "bg-brand-950 text-cream-100"
                  : "bg-surface text-foreground-muted hover:text-brand-950"
              )}
            >
              {t === "exclusive" ? "GST Exclusive" : "GST Inclusive"}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">
            {type === "exclusive" ? "Net Amount (excluding GST)" : "Total Amount (including GST)"}
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
              ₹
            </span>
            <Input
              id="amount"
              type="number"
              min={0}
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="pl-8 text-lg h-12 font-display tabular"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>GST Rate</Label>
          <div className="grid grid-cols-4 gap-px bg-border border border-border">
            {GST_RATES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={cn(
                  "px-3 py-3 text-base font-display tabular transition-colors",
                  rate === r
                    ? "bg-brand-950 text-cream-100"
                    : "bg-surface text-brand-950 hover:bg-cream-100"
                )}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-border space-y-4">
        <Row label="Net Amount" value={result.base} />
        <Row label={`GST @ ${rate}%`} value={result.tax} muted />
        <div className="h-px bg-border" />
        <Row label="Total Amount" value={result.total} highlight />

        <div className="grid grid-cols-2 gap-px bg-border border border-border mt-6">
          <div className="bg-card p-4 text-center">
            <div className="text-[11px] uppercase tracking-widest text-foreground-muted">
              CGST ({rate / 2}%)
            </div>
            <div className="font-display text-lg text-brand-950 mt-1 tabular">
              {formatINR(result.tax / 2)}
            </div>
          </div>
          <div className="bg-card p-4 text-center">
            <div className="text-[11px] uppercase tracking-widest text-foreground-muted">
              SGST ({rate / 2}%)
            </div>
            <div className="font-display text-lg text-brand-950 mt-1 tabular">
              {formatINR(result.tax / 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  highlight,
}: {
  label: string;
  value: number;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={cn("text-sm", highlight ? "text-brand-950 font-medium" : "text-foreground-muted")}>
        {label}
      </span>
      <span
        className={cn(
          "font-display tabular",
          highlight ? "text-3xl text-brand-950" : "text-lg",
          muted ? "text-accent-700" : "text-brand-950"
        )}
      >
        {formatINR(value)}
      </span>
    </div>
  );
}
