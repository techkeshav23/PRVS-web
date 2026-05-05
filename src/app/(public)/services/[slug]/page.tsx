import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Shield,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { LeadForm } from "@/components/public/lead-form";
import { getServiceBySlug, getServices } from "@/lib/data";
import { formatINR } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const allServices = await getServices({ limit: 4 });
  const related = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground-muted hover:text-brand-950 mb-10"
          >
            ← All Services
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-border bg-surface flex items-center justify-center text-brand-950">
                  <DynamicIcon name={service.icon} className="w-5 h-5" />
                </div>
                {service.isFeatured && <Badge variant="soft">Most Requested</Badge>}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-950 leading-[1.05]">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-foreground-muted mt-6 max-w-xl leading-relaxed">
                {service.shortDescription}
              </p>
              {service.price && service.price > 0 && (
                <div className="mt-8 flex items-baseline gap-3 pb-6 border-b border-border max-w-md">
                  {service.startingFrom && (
                    <span className="text-[11px] uppercase tracking-widest text-foreground-muted">
                      From
                    </span>
                  )}
                  <span className="font-display text-5xl text-brand-950 tabular">
                    {formatINR(service.price)}
                  </span>
                  <span className="text-xs text-foreground-muted">all-inclusive</span>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent-600" strokeWidth={1.5} />
                  <span>5–10 working days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent-600" strokeWidth={1.5} />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-surface border border-border p-7">
                <h3 className="font-display text-xl text-brand-950 mb-1">
                  Begin this engagement
                </h3>
                <p className="text-xs text-foreground-muted mb-6">
                  Our team will respond within 24 hours.
                </p>
                <LeadForm services={[{ title: service.title, slug: service.slug }]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-16">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-4">
                  Overview
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-6">
                  About this engagement
                </h2>
                <div
                  className="prose prose-zinc max-w-none whitespace-pre-line text-foreground-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>

              {service.features && service.features.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-4">
                    Inclusions
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-8">
                    What&apos;s included
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="bg-card p-5 flex items-start gap-3 text-sm"
                      >
                        <span className="text-accent-500 font-display text-base tabular pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-brand-950">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.documents && service.documents.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-4">
                    Required
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-8">
                    Documents needed
                  </h2>
                  <ul className="border-t border-border">
                    {service.documents.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 py-4 border-b border-border text-sm text-brand-950"
                      >
                        <span className="text-foreground-muted text-xs tabular w-8">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.process && service.process.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-4">
                    Process
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-8">
                    How it works
                  </h2>
                  <ol className="border-t border-border">
                    {service.process.map((step, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-12 gap-4 py-7 border-b border-border"
                      >
                        <span className="col-span-2 sm:col-span-1 font-display text-2xl text-accent-500 tabular">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="col-span-10 sm:col-span-11">
                          <h3 className="font-display text-lg text-brand-950 mb-2">
                            {step.step}
                          </h3>
                          <p className="text-sm text-foreground-muted leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="bg-brand-950 text-cream-100 p-8 sticky top-24">
                <p className="divider-gold inline-block text-[11px] uppercase tracking-widest text-accent-400 font-semibold mb-5">
                  Speak Directly
                </p>
                <h3 className="font-display text-2xl mb-3">Have questions first?</h3>
                <p className="text-sm text-cream-200/70 mb-7 leading-relaxed">
                  Talk to a senior consultant. No commitments, no scripts —
                  just clear answers.
                </p>
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? "+917348000169"}`}>
                  <Button
                    variant="outline"
                    className="w-full border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-brand-950"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-950 mb-10">
              Related services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {related.map((s) => (
                <Link
                  key={s._id}
                  href={`/services/${s.slug}`}
                  className="bg-card p-6 hover:bg-cream-100 transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-lg text-brand-950 mb-1">{s.title}</h3>
                    <p className="text-xs text-foreground-muted line-clamp-1">
                      {s.shortDescription}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-brand-950 group-hover:text-accent-700 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
