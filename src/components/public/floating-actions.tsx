"use client";

import { Phone } from "lucide-react";

function WhatsAppGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M27.05 4.91A15.84 15.84 0 0 0 16 .35 15.93 15.93 0 0 0 2.16 24.27L.07 31.65l7.55-1.98a15.92 15.92 0 0 0 7.61 1.94h.01a15.92 15.92 0 0 0 11.81-26.7zM16 28.94h-.01a13.21 13.21 0 0 1-6.74-1.85l-.48-.29-4.48 1.18 1.2-4.37-.31-.5a13.21 13.21 0 1 1 24.5-6.91A13.21 13.21 0 0 1 16 28.94zm7.25-9.91c-.4-.2-2.36-1.16-2.72-1.3-.36-.13-.63-.2-.9.2-.27.4-1.04 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.68-.62-3.2-1.97a12.05 12.05 0 0 1-2.22-2.76c-.23-.4-.02-.62.18-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68l-.76-.02a1.46 1.46 0 0 0-1.06.5 4.45 4.45 0 0 0-1.4 3.32c0 1.96 1.43 3.86 1.63 4.13.2.27 2.81 4.3 6.81 6.03.95.4 1.7.65 2.27.83.95.3 1.82.26 2.5.16.77-.12 2.36-.96 2.7-1.9.33-.93.33-1.74.23-1.9-.1-.16-.36-.27-.76-.46z" />
    </svg>
  );
}

export function FloatingActions() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917348000169";
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "+917348000169";
  const message = encodeURIComponent(
    "Hi PRVS Business, I would like to know more about your services."
  );

  const safeAreaStyle = {
    marginBottom: "max(0px, env(safe-area-inset-bottom))",
  };

  return (
    <>
      {/* Call — Bottom Left */}
      <a
        href={`tel:${phone}`}
        aria-label="Call PRVS Business"
        style={safeAreaStyle}
        className="group fixed left-4 sm:left-5 bottom-24 lg:bottom-6 z-30 w-13 h-13 rounded-full bg-brand-700 hover:bg-brand-800 text-white flex items-center justify-center shadow-xl shadow-brand-900/25 hover:scale-105 transition-all"
      >
        <Phone className="w-5 h-5" strokeWidth={2} />
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink-950 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
          Call Now
        </span>
      </a>

      {/* WhatsApp — Bottom Right */}
      <a
        href={`https://wa.me/${number}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={safeAreaStyle}
        className="group fixed right-4 sm:right-5 bottom-24 lg:bottom-6 z-30 w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center shadow-xl shadow-black/15 hover:scale-105 transition-all"
      >
        <WhatsAppGlyph className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink-950 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
          WhatsApp
        </span>
      </a>
    </>
  );
}
