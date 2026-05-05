import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "PRVS Business — India's Trusted Compliance Partner",
    template: "%s · PRVS Business",
  },
  description:
    "Company registration, GST, ITR, Trademark and ROC compliance — handled by qualified CA & CS professionals. Trusted by 1000+ Indian businesses.",
  keywords: [
    "company registration",
    "GST registration",
    "ITR filing",
    "trademark registration",
    "MSME registration",
    "FSSAI license",
    "ROC compliance",
    "PRVS Business",
  ],
  authors: [{ name: "PRVS Business" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prvsbusiness.in",
    siteName: "PRVS Business",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand-950 focus:text-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
