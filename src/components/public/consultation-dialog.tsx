"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { LeadForm } from "@/components/public/lead-form";
import { cn } from "@/lib/utils";

type Props = {
  services: { title: string; slug: string }[];
  buttonLabel?: string;
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
  buttonClassName?: string;
  children?: React.ReactNode;
};

export function ConsultationDialog({
  services,
  buttonLabel = "Free Consultation",
  buttonVariant = "secondary",
  buttonSize = "lg",
  buttonClassName,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      {children ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn("inline-flex", buttonClassName)}
          aria-haspopup="dialog"
        >
          {children}
        </button>
      ) : (
        <Button
          type="button"
          variant={buttonVariant}
          size={buttonSize}
          onClick={() => setOpen(true)}
          className={buttonClassName}
          aria-haspopup="dialog"
        >
          {buttonLabel}
        </Button>
      )}

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Free consultation form"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          >
            <div
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="relative w-full sm:max-w-sm bg-surface border border-border shadow-2xl shadow-ink-950/30 max-h-[92vh] overflow-y-auto animate-fade-up">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center text-foreground-muted hover:text-ink-950 hover:bg-muted transition-colors z-10"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Free Consultation
                </p>
                <h3 className="font-display text-xl text-brand-950 mb-1">
                  Get Expert Advice
                </h3>
                <p className="text-xs text-foreground-muted mb-5">
                  No charges, no commitment.
                </p>
                <LeadForm services={services} compact />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
