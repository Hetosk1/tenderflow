// src/pages/org/QuotationsReceived.tsx — All quotations received by organization

import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_QUOTATIONS } from "@/data/mockData";
import { Star, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useOutletContext } from "react-router-dom";

type OrgContext = {
  data: any
};

export default function QuotationsReceived() {

  const { data } = useOutletContext<OrgContext>();
  console.log(data);

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        title="Quotations Received"
        description={`${MOCK_QUOTATIONS.length} total quotations across all tenders`}
      />

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Trader</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tender</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Timeline</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rating</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_QUOTATIONS.map((q) => (
              <tr key={q.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-accent-foreground">
                        {q.traderName.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{q.traderName}</p>
                      <p className="text-xs text-muted-foreground">{q.traderCompany}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    to={`/org/tenders/${q.tenderId}`}
                    className="text-sm text-foreground hover:text-primary transition-colors line-clamp-1 max-w-[200px]"
                  >
                    {q.tenderTitle}
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-sm font-semibold text-foreground">
                  ${q.price.toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {q.timeline}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {q.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-status-evaluation fill-status-evaluation" />
                      <span className="font-medium text-foreground">{q.rating}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-4 py-3.5">
                  <Button variant="ghost" size="sm" className="h-7 gap-1">
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
