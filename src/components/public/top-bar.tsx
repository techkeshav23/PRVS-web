import { MapPin, Phone, Mail } from "lucide-react";

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

export function TopBar() {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "+91-7348000169";
  const email = process.env.NEXT_PUBLIC_EMAIL ?? "support@prvsbusiness.in";

  return (
    <div className="bg-brand-700 text-white text-xs hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 lg:h-10 gap-4 lg:gap-6">
          {/* Left: contact info */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 hover:text-accent-300 transition-colors flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
              <span className="tabular">{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="hidden lg:flex items-center gap-2 hover:text-accent-300 transition-colors min-w-0"
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
              <span className="truncate">{email}</span>
            </a>
          </div>

          {/* Right: location + social */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            <span className="hidden lg:flex items-center gap-2 min-w-0">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
              <span className="truncate">Pandav Nagar, Delhi</span>
            </span>
            <div className="flex items-center gap-3 flex-shrink-0">
              {[
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: TwitterIcon, href: "#", label: "X (Twitter)" },
                { Icon: YoutubeIcon, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:text-accent-300 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
