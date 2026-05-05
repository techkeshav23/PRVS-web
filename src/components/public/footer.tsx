import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3 3 0 0 0-2.122-2.121C19.493 3.5 12 3.5 12 3.5s-7.493 0-9.376.565A3 3 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3 3 0 0 0 2.122 2.121C4.507 20.5 12 20.5 12 20.5s7.493 0 9.376-.565a3 3 0 0 0 2.122-2.121C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.6 15.6V8.4L15.84 12z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-950 text-cream-200 pt-20 pb-24 lg:pb-12 mt-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent-500 flex items-center justify-center font-display text-2xl font-bold text-brand-950">
                P
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-semibold text-cream-100">
                  PRVS Business
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-cream-200/60 mt-1">
                  Compliance · Tax · Advisory
                </span>
              </div>
            </Link>
            <p className="text-sm text-cream-200/80 leading-relaxed max-w-sm">
              India&apos;s trusted partner for company registration, tax filings and corporate
              compliance. Backed by qualified CA &amp; CS professionals.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: FacebookIcon, href: "#" },
                { Icon: InstagramIcon, href: "#" },
                { Icon: TwitterIcon, href: "#" },
                { Icon: YoutubeIcon, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-cream-200/20 hover:border-accent-500 hover:text-accent-500 flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-cream-100 text-sm uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-cream-200/70">
              {[
                ["Company Setup", "/services"],
                ["GST Filing", "/services"],
                ["ITR Filing", "/services"],
                ["Trademark", "/services"],
                ["MSME / Udyam", "/services"],
                ["FSSAI License", "/services"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-accent-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-cream-100 text-sm uppercase tracking-widest mb-5">
              Firm
            </h4>
            <ul className="space-y-3 text-sm text-cream-200/70">
              <li><Link href="/about" className="hover:text-accent-500">About</Link></li>
              <li><Link href="/pricing" className="hover:text-accent-500">Pricing</Link></li>
              <li><Link href="/tools" className="hover:text-accent-500">Tools</Link></li>
              <li><Link href="/blog" className="hover:text-accent-500">Insights</Link></li>
              <li><Link href="/faq" className="hover:text-accent-500">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-accent-500">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-cream-100 text-sm uppercase tracking-widest mb-5">
              Reach Us
            </h4>
            <ul className="space-y-4 text-sm text-cream-200/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" strokeWidth={1.5} />
                <span className="leading-relaxed">Pandav Nagar, Delhi — 110092, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-500 flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+917348000169" className="hover:text-accent-500 tabular">
                  +91-7348000169
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-500 flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:support@prvsbusiness.in" className="hover:text-accent-500 break-all">
                  support@prvsbusiness.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" strokeWidth={1.5} />
                <span>Mon — Sat · 9:00 AM to 10:30 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-200/10 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-cream-200/50">
          <p>© {new Date().getFullYear()} PRVS Business Development Pvt. Ltd.</p>
          <p className="font-mono tabular">CIN: U74999UP2022PTC161809</p>
        </div>
      </div>
    </footer>
  );
}
