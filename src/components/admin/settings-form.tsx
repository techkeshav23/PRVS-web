"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveSettings } from "@/app/actions/admin";
import type { ISettings } from "@/models/Settings";

export function SettingsForm({ settings }: { settings: ISettings }) {
  const router = useRouter();

  async function action(fd: FormData) {
    try {
      await saveSettings(fd);
      toast.success("Settings saved");
      router.refresh();
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <Section title="Branding">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Site Name">
            <Input name="siteName" defaultValue={settings.siteName} />
          </F>
          <F label="Tagline">
            <Input name="tagline" defaultValue={settings.tagline} />
          </F>
        </div>
        <F label="Logo URL">
          <Input name="logo" defaultValue={settings.logo} />
        </F>
      </Section>

      <Section title="Hero Section">
        <F label="Hero Title" hint="Main headline shown at the top of the home page.">
          <Input name="heroTitle" defaultValue={settings.heroTitle} />
        </F>
        <F label="Hero Title Highlight" hint="Appears after the title in gradient color (e.g. 'most trusted partner').">
          <Input name="heroTitleAccent" defaultValue={settings.heroTitleAccent} />
        </F>
        <F label="Hero Subtitle">
          <Textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={2} />
        </F>
        <F label="Hero Image URL">
          <Input name="heroImage" defaultValue={settings.heroImage} />
        </F>
      </Section>

      <Section title="About">
        <F label="Short About">
          <Textarea name="aboutShort" defaultValue={settings.aboutShort} rows={2} />
        </F>
        <F label="Full About">
          <Textarea name="aboutFull" defaultValue={settings.aboutFull} rows={6} />
        </F>
      </Section>

      <Section title="Contact Info">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Phone">
            <Input name="contactPhone" defaultValue={settings.contactPhone} />
          </F>
          <F label="Email">
            <Input name="contactEmail" defaultValue={settings.contactEmail} type="email" />
          </F>
          <F label="WhatsApp Number" hint="Without + (e.g. 917348000169)">
            <Input name="whatsappNumber" defaultValue={settings.whatsappNumber} />
          </F>
          <F label="Working Hours">
            <Input name="officeHours" defaultValue={settings.officeHours} />
          </F>
        </div>
        <F label="Address">
          <Textarea name="contactAddress" defaultValue={settings.contactAddress} rows={2} />
        </F>
      </Section>

      <Section title="Social Media">
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Facebook URL">
            <Input name="facebook" defaultValue={settings.social?.facebook} />
          </F>
          <F label="Instagram URL">
            <Input name="instagram" defaultValue={settings.social?.instagram} />
          </F>
          <F label="X (Twitter) URL">
            <Input name="twitter" defaultValue={settings.social?.twitter} />
          </F>
          <F label="YouTube URL">
            <Input name="youtube" defaultValue={settings.social?.youtube} />
          </F>
          <F label="LinkedIn URL">
            <Input name="linkedin" defaultValue={settings.social?.linkedin} />
          </F>
        </div>
      </Section>

      <Section title="Stats Counter (Homepage)">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <F label="Clients Served">
            <Input
              name="clientsServed"
              type="number"
              defaultValue={settings.stats.clientsServed}
            />
          </F>
          <F label="Services Completed">
            <Input
              name="servicesCompleted"
              type="number"
              defaultValue={settings.stats.servicesCompleted}
            />
          </F>
          <F label="Years of Experience">
            <Input
              name="yearsExperience"
              type="number"
              defaultValue={settings.stats.yearsExperience}
            />
          </F>
          <F label="Team Members">
            <Input
              name="teamMembers"
              type="number"
              defaultValue={settings.stats.teamMembers}
            />
          </F>
        </div>
      </Section>

      <div className="sticky bottom-4 bg-card border rounded-2xl p-4 shadow-lg">
        <SubmitButton label="Save All Settings" />
      </div>
    </form>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card border rounded-2xl p-5 sm:p-6">
    <h2 className="font-bold text-lg mb-5">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);
const F = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);
