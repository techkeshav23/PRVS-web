import type { Metadata } from "next";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { SectionHeading } from "@/components/public/section-heading";
import { getFaqs } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about PRVS Business services.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Common Questions"
          title="Things founders ask before working with us."
          description="Don't see your question? Reach out — we'll answer in detail."
        />

        {faqs.length === 0 ? (
          <div className="bg-surface border border-border p-16 text-center text-foreground-muted max-w-2xl mx-auto">
            FAQs will be added soon.
          </div>
        ) : (
          <FaqAccordion items={faqs} />
        )}
      </div>
    </div>
  );
}
