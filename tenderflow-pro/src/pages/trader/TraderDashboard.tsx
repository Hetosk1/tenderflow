// src/pages/trader/TraderDashboard.tsx — Trader's dashboard

import { Link } from "react-router-dom";
import {
  FileCheck,
  Award,
  Clock,
  TrendingUp,
  Search,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_QUOTATIONS, MOCK_TENDERS } from "@/data/mockData";

const STATS = [
  {
    label: "Submitted Quotations",
    value: 5,
    change: "+2 this month",
    trend: "up" as const,
    icon: <FileCheck className="w-full h-full" />,
  },
  {
    label: "Won Tenders",
    value: 2,
    change: "All time",
    trend: "neutral" as const,
    icon: <Award className="w-full h-full" />,
  },
  {
    label: "Pending Decisions",
    value: 3,
    change: "Awaiting response",
    trend: "neutral" as const,
    icon: <Clock className="w-full h-full" />,
  },
  {
    label: "Win Rate",
    value: "40%",
    change: "Above avg (32%)",
    trend: "up" as const,
    icon: <TrendingUp className="w-full h-full" />,
  },
];

const traderQuotations = MOCK_QUOTATIONS.filter((q) => q.traderId === "tr1");

export default function TraderDashboard() {
  const openTenders = MOCK_TENDERS.filter((t) => t.status === "open").slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Your quotation activity and tender opportunities"
        actions={
          <Button size="sm" asChild className="gap-1.5">
            <Link to="/trader/browse">
              <Search className="w-3.5 h-3.5" />
              Browse Tenders
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatsCard
            key={s.label}
            label={s.label}
            value={s.value}
            change={s.change}
            trend={s.trend}
            icon={s.icon}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* My Quotations */}
        <div className="lg:col-span-3 bg-card rounded-xl shadow-card border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">My Quotations</h2>
            <Link
              to="/trader/quotations"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {traderQuotations.map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {q.tenderTitle}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs font-semibold text-foreground">
                      ${q.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {q.timeline}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Submitted {q.submittedAt}
                    </span>
                  </div>
                </div>
                <StatusBadge status={q.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tenders */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Open Tenders</h2>
            <Link
              to="/trader/browse"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Browse all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="px-4 py-3 space-y-3">
            {openTenders.map((tender) => (
              <Link
                key={tender.id}
                to={`/trader/tenders/${tender.id}`}
                className="block p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {tender.title}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {tender.organization}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-medium text-foreground">
                    ${tender.budget.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Due {tender.deadline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
