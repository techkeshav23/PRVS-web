import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LeadForm } from "@/components/public/lead-form";
import { getServices, getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with PRVS Business team.",
};

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M27.05 4.91A15.84 15.84 0 0 0 16 .35 15.93 15.93 0 0 0 2.16 24.27L.07 31.65l7.55-1.98a15.92 15.92 0 0 0 7.61 1.94h.01a15.92 15.92 0 0 0 11.81-26.7zM16 28.94h-.01a13.21 13.21 0 0 1-6.74-1.85l-.48-.29-4.48 1.18 1.2-4.37-.31-.5a13.21 13.21 0 1 1 24.5-6.91A13.21 13.21 0 0 1 16 28.94zm7.25-9.91c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.63-.2-.9.2-.27.4-1.04 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.68-.62-3.2-1.97a12.05 12.05 0 0 1-2.22-2.76c-.23-.4-.02-.62.18-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68l-.76-.02a1.46 1.46 0 0 0-1.06.5 4.45 4.45 0 0 0-1.4 3.32c0 1.96 1.43 3.86 1.63 4.13.2.27 2.81 4.3 6.81 6.03.95.4 1.7.65 2.27.83.95.3 1.82.26 2.5.16.77-.12 2.36-.96 2.7-1.9.33-.93.33-1.74.23-1.9-.1-.16-.36-.27-.76-.46z" />
    </svg>
  );
}

export default async function ContactPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const whatsapp = settings.whatsappNumber.replace(/\D/g, "");

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl mb-16">
          <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-6">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-950 leading-[1.05]">
            Begin a conversation.
          </h1>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mt-6 max-w-2xl">
            Whether you have a clear scope or just questions — we&apos;re here. Most
            consultations are completed within 30 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-surface border border-border p-7 lg:p-10">
              <h2 className="font-display text-2xl text-brand-950 mb-2">Send us a message</h2>
              <p className="text-sm text-foreground-muted mb-7">
                Fill the form and our team will reach out within 24 hours.
              </p>
              <LeadForm services={services.map((s) => ({ title: s.title, slug: s.slug }))} />
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-px bg-border border border-border">
            {[
              {
                Icon: Phone,
                label: "Phone",
                value: settings.contactPhone,
                href: `tel:${settings.contactPhone}`,
                tabular: true,
              },
              {
                Icon: Mail,
                label: "Email",
                value: settings.contactEmail,
                href: `mailto:${settings.contactEmail}`,
              },
              {
                Icon: WhatsAppIcon,
                label: "WhatsApp",
                value: "Chat instantly",
                href: `https://wa.me/${whatsapp}`,
              },
              {
                Icon: MapPin,
                label: "Office",
                value: settings.contactAddress,
              },
              {
                Icon: Clock,
                label: "Hours",
                value: settings.officeHours,
              },
            ].map(({ Icon, label, value, href, tabular }, i) => {
              const inner = (
                <div className="bg-card p-6 flex items-start gap-5">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-brand-950 flex-shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-foreground-muted mb-1">
                      {label}
                    </p>
                    <p
                      className={
                        "text-base text-brand-950 break-words " + (tabular ? "tabular" : "")
                      }
                    >
                      {value}
                    </p>
                  </div>
                </div>
              );
              return href ? (
                <a key={i} href={href} className="block hover:bg-cream-100 transition-colors">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
