import type { Metadata } from "next";
import { ServiceCard } from "@/components/public/service-card";
import { SectionHeading } from "@/components/public/section-heading";
import { getServices } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore PRVS Business services — company registration, GST, ITR, trademark and more.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHeading
          eyebrow="Practice Areas"
          title="Comprehensive compliance, elegantly handled."
          description="From the day you incorporate to your tenth annual filing — we work alongside you at every stage."
        />

        {services.length === 0 ? (
          <div className="bg-surface border border-border p-16 text-center text-foreground-muted">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {services.map((service, i) => (
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
    </div>
  );
}
