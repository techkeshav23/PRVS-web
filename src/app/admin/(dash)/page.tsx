import Link from "next/link";
import { Briefcase, BookOpen, Inbox, Star, HelpCircle, ArrowUpRight, TrendingUp } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { Blog } from "@/models/Blog";
import { Lead } from "@/models/Lead";
import { Testimonial } from "@/models/Testimonial";
import { Faq } from "@/models/Faq";

export const dynamic = "force-dynamic";

async function getStats() {
  await dbConnect();
  const [services, blogs, leadsTotal, leadsNew, testimonials, faqs, recentLeads] =
    await Promise.all([
      Service.countDocuments({}),
      Blog.countDocuments({}),
      Lead.countDocuments({}),
      Lead.countDocuments({ status: "new" }),
      Testimonial.countDocuments({}),
      Faq.countDocuments({}),
      Lead.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);
  return {
    services,
    blogs,
    leadsTotal,
    leadsNew,
    testimonials,
    faqs,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)) as Array<{
      _id: string;
      name: string;
      phone: string;
      email?: string;
      service?: string;
      status: string;
      createdAt: string;
    }>,
  };
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-purple-100 text-purple-700",
  converted: "bg-accent-100 text-accent-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  const s = await getStats();

  const cards = [
    { label: "Total Services", value: s.services, Icon: Briefcase, href: "/admin/services" },
    { label: "Blog Posts", value: s.blogs, Icon: BookOpen, href: "/admin/blogs" },
    { label: "New Leads", value: s.leadsNew, Icon: Inbox, href: "/admin/leads", highlight: true },
    { label: "Total Leads", value: s.leadsTotal, Icon: TrendingUp, href: "/admin/leads" },
    { label: "Testimonials", value: s.testimonials, Icon: Star, href: "/admin/testimonials" },
    { label: "FAQs", value: s.faqs, Icon: HelpCircle, href: "/admin/faqs" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your website.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, Icon, href, highlight }) => (
          <Link
            key={label}
            href={href}
            className={`bg-card border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden ${
              highlight && value > 0 ? "border-brand-500 bg-brand-50/40 dark:bg-brand-950/40" : ""
            }`}
          >
            <div className="absolute top-3 right-3 text-muted-foreground">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                highlight && value > 0
                  ? "bg-gradient-to-br from-brand-600 to-accent-500 text-white"
                  : "bg-muted text-foreground/70"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold">{value}</div>
            <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-card border rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold">Recent Leads</h2>
            <p className="text-xs text-muted-foreground">Latest customer inquiries</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-sm text-brand-600 hover:underline font-semibold"
          >
            View all
          </Link>
        </div>
        {s.recentLeads.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No leads yet — they will show up here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b">
                  <th className="pb-2.5 pr-4">Name</th>
                  <th className="pb-2.5 pr-4 hidden sm:table-cell">Phone</th>
                  <th className="pb-2.5 pr-4 hidden md:table-cell">Service</th>
                  <th className="pb-2.5 pr-4">Status</th>
                  <th className="pb-2.5 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {s.recentLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="py-3 pr-4 font-medium">{lead.name}</td>
                    <td className="py-3 pr-4 hidden sm:table-cell text-muted-foreground">
                      {lead.phone}
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">
                      {lead.service || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          statusColors[lead.status] ?? "bg-muted"
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 hidden md:table-cell text-xs text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
