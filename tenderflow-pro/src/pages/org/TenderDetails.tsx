// src/pages/org/TenderDetails.tsx — Org view of a specific tender with quotations

import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_TENDERS, MOCK_QUOTATIONS, MOCK_ACTIVITY } from "@/data/mockData";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Tag,
  Users,
  Star,
  Check,
  X,
  BarChart2,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Quotation } from "@/types";
import { ComparisonModal } from "@/components/org/ComparisonModal";
import { Tender } from "@/types";

type Tab = "quotations" | "details" | "activity";
type OrgContext = {
  data: any
};

export default function TenderDetails() {

  const { id } = useParams();

  // const [tender1, setTender] = useState({});
  const [tender1, setTender] = useState<any>({}); 
  const [quotations1, setQuotations] = useState<any>([]);

  useEffect(() => {

    const fetchData = async () => {

      const tenderRes = await fetch(`http://localhost:3000/tender/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      const tenderData = await tenderRes.json();
      setTender(tenderData.data);

      const quoteRes = await fetch(`http://localhost:3000/quotation/tender/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      const quoteData = await quoteRes.json();
      setQuotations(quoteData.data);

    };

    fetchData();

  }, [id]);

  useEffect(() => {
    console.log("Tender state updated:", tender1);
    console.log("Id: " + tender1._id)
    console.log("Title: " + tender1.title)
    console.log("Description: " + tender1.description)
    console.log("Deadline: " + tender1.deadline)
    console.log("Status: " + tender1.status)
    console.log("Category: " + tender1.category)
  }, [tender1]);

  useEffect(() => {
    console.log("Quotations state updated: ", quotations1)

    if (quotations1.length > 0) {
      console.log("Trader Name:", quotations1[0].trader.name);
      console.log("Trader Email: " + quotations1[0].trader.email)
      console.log("Trader Price: " + quotations1[0].price)
      console.log("Trader Status: " + quotations1[0].status)
      console.log("Trader Submitted: " + quotations1[0].submitted)
      console.log("Trader Timeline: " + quotations1[0].timeline)
    }

  }, [quotations1]);

   
  

  const { data } = useOutletContext<OrgContext>();
  console.log(data);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("quotations");
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);

  // const tender = MOCK_TENDERS.find((t) => t.id === id);
  const tender = tender1;
  const quotations: any[] = quotations1 || [];


  if (!tender) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Tender not found</p>
      </div>
    );
  }

  const toggleSelect = (qId: string) => {
    setSelectedQuotations((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: "quotations", label: `Quotations (${quotations.length})` },
    { key: "details", label: "Details" },
    { key: "activity", label: "Activity Log" },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Back + Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Tenders
        </button>

        <div className="bg-card rounded-xl shadow-card border border-border p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-lg font-semibold text-foreground">{tender.title}</h1>
                <StatusBadge status={tender.status} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {tender.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm">
                Edit Tender
              </Button>
              <Button size="sm">Award Tender</Button>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="w-3.5 h-3.5" />
              Budget: <span className="font-medium text-foreground">0</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              Deadline: <span className="font-medium text-foreground">{tender.deadline}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Tag className="w-3.5 h-3.5" />
              <span className="font-medium text-foreground">{tender.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium text-foreground">{quotations1.length}</span> quotations received
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {/* <div className="flex items-center gap-0.5 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      {/* Tab Content */}
        <QuotationsTab
          quotations={quotations}
          selected={selectedQuotations}
          onToggle={toggleSelect}
          onCompare={() => setComparisonOpen(true)}
        />

      {/* Comparison Modal */}
      {/* <ComparisonModal
        open={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        quotations={quotations.filter((q) => selectedQuotations.includes(q.id))}
        tenderBudget={tender.budget}
      /> */}
    </div>
  );
}

// ---- Sub-components ----

function QuotationsTab({
  quotations,
  selected,
  onToggle,
  onCompare,
}: {
  quotations: Quotation[];
  selected: string[];
  onToggle: (id: string) => void;
  onCompare: () => void;
}) {
  if (quotations.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border">
        <div className="py-16 text-center">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">No quotations yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Quotations will appear here once traders submit them
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {selected.length >= 2 && (
        <div className="flex items-center justify-between bg-accent rounded-lg px-4 py-2.5">
          <p className="text-sm text-accent-foreground">
            {selected.length} quotations selected for comparison
          </p>
          <Button size="sm" onClick={onCompare} className="gap-1.5">
            <BarChart2 className="w-3.5 h-3.5" />
            Compare Selected
          </Button>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {/* <th className="w-8 px-4 py-3" /> */}
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trader</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Timeline</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rating</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Submitted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {quotations.map((q) => (
              <tr key={q.id} className={cn("hover:bg-muted/30 transition-colors", selected.includes(q._id) && "bg-accent/30")}>
                {/* <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(q.id)}
                    onChange={() => onToggle(q.id)}
                    className="rounded border-border"
                  />
                </td> */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-accent-foreground">
                        {q.trader.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{q.trader.name}</p>
                      <p className="text-xs text-muted-foreground">{q.trader.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-semibold text-foreground">
                    ${q.price}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {q.timeline}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-status-evaluation fill-status-evaluation" />
                      <span className="font-medium text-foreground">4.7</span>
                    </div>
                </td>
                <td className="px-4 py-3.5">
                  {/* {q.status} */}
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-muted-foreground">{q.updatedAt.slice(0, 10)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 px-2 gap-1 bg-status-open-bg text-status-open-fg hover:bg-status-open/20"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 gap-1 text-status-rejected hover:bg-status-rejected-bg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// function DetailsTab({ tender }: { tender: ReturnType<typeof MOCK_TENDERS.find> }) {
//   if (!tender) return null;
//   return (
//     <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-5">
//       <div className="grid sm:grid-cols-2 gap-5">
//         {[
//           { label: "Title", value: tender.title },
//           { label: "Category", value: tender.category },
//           { label: "Budget", value: `$${tender.budget.toLocaleString()}` },
//           { label: "Deadline", value: tender.deadline },
//           { label: "Visibility", value: tender.visibility === "public" ? "Public" : "Private" },
//           { label: "Created", value: tender.createdAt },
//         ].map((row) => (
//           <div key={row.label}>
//             <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{row.label}</p>
//             <p className="text-sm font-medium text-foreground">{row.value}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
//         <p className="text-sm text-foreground leading-relaxed">{tender.description}</p>
//       </div>
//     </div>
//   );
// }

// function ActivityTab() {
//   return (
//     <div className="bg-card rounded-xl shadow-card border border-border p-5">
//       <div className="space-y-5">
//         {MOCK_ACTIVITY.map((activity, i) => (
//           <div key={activity.id} className="flex gap-4">
//             <div className="flex flex-col items-center">
//               <div
//                 className={cn(
//                   "w-2 h-2 rounded-full mt-1.5 shrink-0",
//                   activity.type === "success"
//                     ? "bg-status-open"
//                     : activity.type === "warning"
//                     ? "bg-status-evaluation"
//                     : "bg-primary"
//                 )}
//               />
//               {i < MOCK_ACTIVITY.length - 1 && (
//                 <div className="w-px flex-1 bg-border mt-1.5" />
//               )}
//             </div>
//             <div className="pb-5">
//               <p className="text-sm text-foreground">{activity.message}</p>
//               <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
