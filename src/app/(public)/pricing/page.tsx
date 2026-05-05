import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/public/section-heading";
import { getServices } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import { DynamicIcon } from "@/components/dynamic-icon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, fixed pricing for all PRVS Business services.",
};

export default async function PricingPage() {
  const services = await getServices();
  const priced = services.filter((s) => s.price && s.price > 0);
  const onRequest = services.filter((s) => !s.price || s.price === 0);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="One fee. Everything included."
          description="Our pricing is published, fixed, and inclusive of all government charges. No hidden costs, no scope creep."
        />

        {priced.length === 0 ? (
          <div className="bg-surface border border-border p-16 text-center text-foreground-muted">
            Pricing will be available soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {priced.map((service) => (
              <div
                key={service._id}
                className={
                  "bg-card p-8 flex flex-col relative " +
                  (service.isFeatured ? "lg:bg-brand-950 lg:text-cream-100" : "")
                }
              >
                {service.isFeatured && (
                  <Badge
                    variant="accent"
                    className="absolute top-0 right-0"
                  >
                    Most Requested
                  </Badge>
                )}
                <div className="mb-6">
                  <div
                    className={
                      "w-11 h-11 border flex items-center justify-center mb-5 " +
                      (service.isFeatured
                        ? "border-cream-100/30 text-cream-100"
                        : "border-border text-brand-950")
                    }
                  >
                    <DynamicIcon name={service.icon} className="w-5 h-5" />
                  </div>
                  <h3
                    className={
                      "font-display text-xl mb-2 " +
                      (service.isFeatured ? "text-cream-100" : "text-brand-950")
                    }
                  >
                    {service.title}
                  </h3>
                  <p
                    className={
                      "text-sm leading-relaxed line-clamp-2 " +
                      (service.isFeatured ? "text-cream-200/70" : "text-foreground-muted")
                    }
                  >
                    {service.shortDescription}
                  </p>
                </div>
                <div
                  className={
                    "py-6 my-2 border-y " +
                    (service.isFeatured ? "border-cream-100/15" : "border-border")
                  }
                >
                  {service.startingFrom && (
                    <span
                      className={
                        "text-[11px] uppercase tracking-widest block " +
                        (service.isFeatured ? "text-cream-200/60" : "text-foreground-muted")
                      }
                    >
                      Starting from
                    </span>
                  )}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={
                        "font-display text-4xl tabular " +
                        (service.isFeatured ? "text-cream-100" : "text-brand-950")
                      }
                    >
                      {formatINR(service.price ?? 0)}
                    </span>
                  </div>
                  <span
                    className={
                      "text-xs " +
                      (service.isFeatured ? "text-cream-200/60" : "text-foreground-muted")
                    }
                  >
                    All-inclusive · No hidden fees
                  </span>
                </div>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3 my-6 flex-1">
                    {service.features.slice(0, 5).map((feature, i) => (
                      <li
                        key={i}
                        className={
                          "flex items-start gap-3 text-sm " +
                          (service.isFeatured ? "text-cream-200/85" : "text-foreground-muted")
                        }
                      >
                        <Check
                          className={
                            "w-4 h-4 flex-shrink-0 mt-0.5 " +
                            (service.isFeatured ? "text-accent-400" : "text-accent-600")
                          }
                          strokeWidth={2}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/services/${service.slug}`} className="mt-auto">
                  <Button
                    className="w-full"
                    variant={service.isFeatured ? "secondary" : "default"}
                  >
                    Get Started <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {onRequest.length > 0 && (
          <div className="mt-24">
            <h3 className="font-display text-2xl text-brand-950 mb-8">
              Custom-quote services
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {onRequest.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="bg-card p-6 hover:bg-cream-100 flex items-center justify-between transition-colors group"
                >
                  <div>
                    <h4 className="font-display text-base text-brand-950">{service.title}</h4>
                    <p className="text-xs text-foreground-muted">Request custom quote</p>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-brand-950 group-hover:text-accent-700"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
