"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { _id: string; question: string; answer: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  return (
    <div className="max-w-3xl mx-auto border-t border-border">
      {items.map((faq) => {
        const isOpen = openId === faq._id;
        return (
          <div key={faq._id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-brand-950 group-hover:text-accent-700 transition-colors">
                {faq.question}
              </span>
              <Plus
                className={cn(
                  "w-5 h-5 flex-shrink-0 text-brand-950 transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
                strokeWidth={1.5}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-base text-foreground-muted leading-relaxed pr-9">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
