import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  Shield,
  Clock,
  ScrollText,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/public/service-card";
import { TestimonialCard } from "@/components/public/testimonial-card";
import { FaqAccordion } from "@/components/public/faq-accordion";
import { SectionHeading } from "@/components/public/section-heading";
import { StatsCounter } from "@/components/public/stats-counter";
import { ConsultationDialog } from "@/components/public/consultation-dialog";
import {
  getServices,
  getTestimonials,
  getFaqs,
  getSettings,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [services, featured, testimonials, faqs, settings] = await Promise.all([
    getServices({ limit: 8 }),
    getServices({ featured: true, limit: 6 }),
    getTestimonials(4),
    getFaqs(6),
    getSettings(),
  ]);

  const displayServices = featured.length > 0 ? featured : services;

  return (
    <>
      {/* HERO with image background */}
      <section className="relative overflow-hidden bg-brand-950">
        {settings.heroImage && (
          <div className="absolute inset-0 -z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={settings.heroImage}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/85 to-brand-950/60" />
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-24">
          <div className="max-w-2xl text-white animate-fade-up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent-300 font-semibold mb-4">
              <span className="inline-block w-8 h-px bg-accent-400 align-middle mr-3" />
              India&apos;s Largest Registration Platform
            </p>
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
              {settings.heroTitle}
              {settings.heroTitleAccent && (
                <>
                  {" "}
                  <em className="text-accent-300 not-italic">
                    {settings.heroTitleAccent}
                  </em>
                  .
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-cream-100/85 leading-relaxed mt-4 max-w-xl">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6">
              <ConsultationDialog
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
                buttonLabel="Free Consultation"
                buttonVariant="secondary"
                buttonSize="default"
                buttonClassName="gap-2"
              />
              <a
                href={`tel:${settings.contactPhone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-300 underline underline-offset-4 decoration-1 decoration-accent-400"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="tabular">{settings.contactPhone}</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-cream-100/70">
              {[
                "100% Online",
                "CA / CS Reviewed",
                "Money-Back Guarantee",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-accent-400 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-3 text-xs text-foreground-muted">
            {[
              { Icon: Shield, label: "Reviewed by qualified CA & CS" },
              { Icon: ScrollText, label: "Transparent fixed pricing" },
              { Icon: Clock, label: "Most filings within 7 days" },
              { Icon: Award, label: "ISO 9001 certified" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-brand-600" strokeWidth={1.5} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-5">
                Practice Areas
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-950 leading-[1.1]">
                Comprehensive compliance, <em className="text-brand-700 not-italic">elegantly handled</em>.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-accent-700"
            >
              View all services <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          {displayServices.length === 0 ? (
            <div className="text-center py-16 text-foreground-muted border border-border bg-surface">
              No services configured yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {displayServices.map((service, i) => (
                <div key={service._id} className="bg-card">
                  <ServiceCard
                    title={service.title}
                    slug={service.slug}
                    shortDescription={service.shortDescription}
                    icon={service.icon}
                    price={service.price}
                    startingFrom={service.startingFrom}
                    index={i}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-20 lg:py-28 bg-brand-950 text-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-300 font-semibold mb-6">
                Our Approach
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
                Built on three principles we refuse to compromise.
              </h2>
              <p className="text-cream-200/70 mt-6 leading-relaxed">
                Every filing, every consultation, every recommendation passes through this filter.
                It&apos;s why founders trust us with their most important paperwork.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-300 hover:text-accent-200 mt-8 underline underline-offset-4 decoration-1"
              >
                Read our story <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <ol className="divide-y divide-cream-200/15">
                {[
                  {
                    n: "01",
                    title: "Quality Without Compromise",
                    desc: "Every document reviewed by qualified CA or CS professionals — never paralegals or interns. If it carries our name, it meets our standard.",
                  },
                  {
                    n: "02",
                    title: "Fixed, Honest Pricing",
                    desc: "What you see is what you pay. No hidden fees, no padded government-fee surprises, no scope creep. Our pricing is published.",
                  },
                  {
                    n: "03",
                    title: "Long-Term Partnership",
                    desc: "We measure success not by transactions but by clients who return year after year. 89% of our clients stay with us beyond their first engagement.",
                  },
                ].map((p) => (
                  <li key={p.n} className="py-7 first:pt-0 grid grid-cols-12 gap-6">
                    <span className="col-span-2 font-display text-3xl text-accent-300 tabular">
                      {p.n}
                    </span>
                    <div className="col-span-10">
                      <h3 className="font-display text-xl mb-2">{p.title}</h3>
                      <p className="text-cream-200/70 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { end: settings.stats.clientsServed, label: "Clients Served", suffix: "+" },
              { end: settings.stats.servicesCompleted, label: "Filings Completed", suffix: "+" },
              { end: settings.stats.yearsExperience, label: "Years of Service", suffix: "" },
              { end: 98, label: "On-Time Delivery", suffix: "%" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "text-center py-4 px-2 " +
                  (i < 3 ? "lg:border-r border-border" : "") +
                  (i === 0 || i === 1 ? " border-r border-border " : "") +
                  (i < 2 ? " border-b lg:border-b-0 border-border" : "")
                }
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-700 tabular">
                  <StatsCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-foreground-muted mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-20 lg:py-28 bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Client Voices"
              title="Trusted by founders, finance teams, and family businesses across India."
            />
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {testimonials.map((t) => (
                <TestimonialCard
                  key={t._id}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  message={t.message}
                  rating={t.rating}
                  photo={t.photo}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 lg:py-28 bg-surface border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Common Questions"
              title="Things founders ask before working with us."
            />
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-950 text-cream-100 p-10 sm:p-14 lg:p-20 text-center max-w-4xl mx-auto">
            <p className="divider-gold inline-block text-[11px] uppercase tracking-[0.25em] text-accent-300 font-semibold mb-6">
              Begin Today
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
              Your business deserves a partner, not a portal.
            </h2>
            <p className="text-cream-200/70 leading-relaxed mt-6 max-w-2xl mx-auto">
              Schedule a free consultation. No hard sell, no obligation — just clear advice from
              people who&apos;ve done this thousands of times.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Book Free Consultation
                </Button>
              </Link>
              <a href={`tel:${settings.contactPhone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-brand-950"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
