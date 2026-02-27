// src/pages/org/OrgDashboard.tsx — Organization dashboard

import { Link } from "react-router-dom";
import {
  FileText,
  InboxIcon,
  Award,
  TrendingUp,
  Clock,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_TENDERS, MOCK_ACTIVITY } from "@/data/mockData";

const STATS = [
  {
    label: "Active Tenders",
    value: 4,
    change: "+2 this month",
    trend: "up" as const,
    icon: <FileText className="w-full h-full" />,
  },
  {
    label: "Total Quotations",
    value: 31,
    change: "+8 this week",
    trend: "up" as const,
    icon: <InboxIcon className="w-full h-full" />,
  },
  {
    label: "Awarded Tenders",
    value: 12,
    change: "+1 this month",
    trend: "up" as const,
    icon: <Award className="w-full h-full" />,
  },
  {
    label: "Avg. Quotations/Tender",
    value: "7.8",
    change: "Industry avg: 5.2",
    trend: "neutral" as const,
    icon: <TrendingUp className="w-full h-full" />,
  },
];

export default function OrgDashboard() {
  const recentTenders = MOCK_TENDERS.slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Overview of your tender activity and performance"
        actions={
          <Button size="sm" asChild className="gap-1.5">
            <Link to="/org/create-tender">
              <Plus className="w-3.5 h-3.5" />
              New Tender
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
        {/* Recent Tenders */}
        <div className="lg:col-span-3 bg-card rounded-xl shadow-card border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Tenders</h2>
            <Link
              to="/org/tenders"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentTenders.map((tender) => (
              <div
                key={tender.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/org/tenders/${tender.id}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                  >
                    {tender.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {tender.quotationsCount} quotations
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tender.deadline}
                    </span>
                  </div>
                </div>
                <StatusBadge status={tender.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="px-5 py-3 space-y-4">
            {MOCK_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    activity.type === "success"
                      ? "bg-status-open"
                      : activity.type === "warning"
                      ? "bg-status-evaluation"
                      : "bg-primary"
                  }`}
                />
                <div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {activity.message}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
