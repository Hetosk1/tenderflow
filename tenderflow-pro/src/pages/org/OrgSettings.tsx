// src/pages/org/OrgSettings.tsx — Organization settings placeholder

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrgSettings() {
  return (
    <div className="max-w-xl space-y-5 animate-fade-in">
      <PageHeader title="Settings" description="Manage your organization profile and preferences" />

      <div className="bg-card rounded-xl shadow-card border border-border p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Organization Profile</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm">Organization Name</Label>
            <Input defaultValue="Apex Enterprises Ltd." className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Email Address</Label>
            <Input defaultValue="admin@apex.com" className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Phone</Label>
            <Input defaultValue="+1 (555) 000-0000" className="h-9" />
          </div>
        </div>
        <Button size="sm">Save Changes</Button>
      </div>
    </div>
  );
}
