// src/pages/trader/MyQuotations.tsx — Trader's submitted quotations

import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_QUOTATIONS } from "@/data/mockData";
import { Clock, Building2, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const traderQuotations = MOCK_QUOTATIONS.filter((q) => q.traderId === "tr1");

export default function MyQuotations() {
  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        title="My Quotations"
        description={`${traderQuotations.length} submitted quotations`}
      />

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Tender</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Organization</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Timeline</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Submitted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {traderQuotations.map((q) => (
              <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="text-sm font-medium text-foreground line-clamp-1 max-w-[220px]">
                    {q.tenderTitle}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    Apex Enterprises
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                    {q.price.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {q.timeline}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">
                  {q.submittedAt}
                </td>
                <td className="px-4 py-3.5">
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
