import Link from "next/link";
import { Edit, Eye, EyeOff, Star, ArrowLeft } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/dynamic-icon";
import { formatINR } from "@/lib/utils";
import { deleteService } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

async function fetchAll() {
  await dbConnect();
  const docs = await Service.find({}).sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export default async function AdminServicesPage() {
  const services = await fetchAll();

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Add, edit and manage all services shown on the website."
        actionLabel="Add Service"
        actionHref="/admin/services/new"
      />

      {services.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No services yet. Add your first service to get started.
          </p>
          <Link href="/admin/services/new">
            <Button>Create First Service</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b bg-muted/30">
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3 hidden md:table-cell">Price</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {services.map((s: {
                  _id: string;
                  title: string;
                  slug: string;
                  icon: string;
                  price: number;
                  startingFrom: boolean;
                  isActive: boolean;
                  isFeatured: boolean;
                  category?: string;
                }) => (
                  <tr key={s._id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white">
                          <DynamicIcon name={s.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {s.title}
                            {s.isFeatured && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <div className="text-xs text-muted-foreground">/{s.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {s.price > 0 ? (
                        <span className="font-semibold text-brand-600">
                          {formatINR(s.price)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">On request</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {s.isActive ? (
                        <Badge variant="success">
                          <Eye className="w-3 h-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <EyeOff className="w-3 h-3 mr-1" /> Hidden
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/services/${s._id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteButton id={s._id} onDelete={deleteService} label="service" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        href="/admin"
        className="inline-flex items-center gap-1 mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>
    </div>
  );
}
