import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatsCounter } from "@/components/public/stats-counter";
import { getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PRVS Business — India's trusted partner for company registration and compliance services.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-6">
              About PRVS Business
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-950 leading-[1.05]">
              A modern firm for{" "}
              <em className="text-accent-700 not-italic">
                a generation of Indian founders
              </em>
              .
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mt-8 max-w-2xl">
              {settings.aboutShort}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-widest text-accent-700 font-semibold mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-950 leading-[1.1]">
                Built to simplify business in India.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-foreground-muted leading-relaxed">
              <p>
                PRVS Business Development was founded with one clear mission — to make business
                registration and compliance simple, transparent, and affordable for every Indian
                entrepreneur.
              </p>
              <p>
                Today, we serve thousands of clients across India, helping them navigate the
                complex world of GST, income tax, trademark, and corporate compliance. Every
                engagement is reviewed by qualified Chartered Accountants and Company Secretaries.
              </p>
              {settings.aboutFull && <p>{settings.aboutFull}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 mt-20 border-t border-border">
            {[
              { end: settings.stats.clientsServed, label: "Clients", suffix: "+" },
              { end: settings.stats.servicesCompleted, label: "Filings", suffix: "+" },
              { end: settings.stats.yearsExperience, label: "Years", suffix: "" },
              { end: settings.stats.teamMembers, label: "Experts", suffix: "+" },
            ].map(({ end, label, suffix }, i) => (
              <div
                key={label}
                className={
                  "py-8 px-4 border-b sm:border-b-0 border-border " +
                  (i < 3 ? "sm:border-r" : "")
                }
              >
                <div className="font-display text-4xl lg:text-5xl text-brand-950 tabular">
                  <StatsCounter end={end} suffix={suffix} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-foreground-muted mt-3">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-5">
              Our Values
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-950 leading-[1.1]">
              The standards we hold ourselves to.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                n: "01",
                title: "Quality First",
                desc: "Every filing reviewed by qualified CA/CS — never paralegals or interns.",
              },
              {
                n: "02",
                title: "Transparent Pricing",
                desc: "Fixed, published fees. No hidden charges, no padded government-fee surprises.",
              },
              {
                n: "03",
                title: "Long-Term Partnership",
                desc: "We measure success by clients who return year after year, not by quick transactions.",
              },
            ].map(({ n, title, desc }) => (
              <div key={title} className="bg-card p-8">
                <span className="font-display text-3xl text-accent-500 tabular block mb-4">
                  {n}
                </span>
                <h3 className="font-display text-xl text-brand-950 mb-3">{title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-brand-950 leading-[1.1]">
            Ready to work with us?
          </h2>
          <p className="text-foreground-muted mt-5 mb-10 leading-relaxed">
            Schedule a complimentary consultation with one of our senior partners.
          </p>
          <Link href="/contact">
            <Button size="lg">Book Consultation</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
