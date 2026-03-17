// src/pages/trader/TraderTenderDetails.tsx — Trader view of a specific tender

import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext, useOutlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { MOCK_TENDERS } from "@/data/mockData";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Tag,
  Users,
  Building2,
  FileText,
  Download,
  Send,
} from "lucide-react";
import { SubmitQuotationModal } from "@/components/trader/SubmitQuotationModal";

type TraderConext = {
  data: any
};

export default function TraderTenderDetails() {


  const navigate = useNavigate();
  const { data } = useOutletContext<TraderConext>();
  console.log(data);
  const { id } = useParams();
  console.log(id);

  const [tenderi, setTender] = useState({});

  useEffect(() => {
    const fetchData = async () => {

      const _response = await fetch(`http://localhost:3000/tender/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      const responsedata = await _response.json();

      console.log(responsedata);

      setTender(responsedata.data)
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Tender state changed");
    console.log(tenderi);
  }, [tenderi]);


  const [modalOpen, setModalOpen] = useState(false);

  const tender = MOCK_TENDERS.find((t) => t._id === "t1");
  // const tender = tenderi;

  if (!tender) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Tender not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Browse
      </button>

      {/* Header Card */}
      <div className="bg-card rounded-xl shadow-card border border-border p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={tenderi.status} />
              <span className="text-xs text-muted-foreground">
                Posted {tender.createdAt}
              </span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">{tenderi.title}</h1>
            <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
              <Building2 className="w-3.5 h-3.5" />
              {tenderi.organization}
            </div>
          </div>
          {tender.status === "OPEN" && (
            <Button className="gap-2 shrink-0" onClick={() => setModalOpen(true)}>
              <Send className="w-3.5 h-3.5" />
              Submit Quotation
            </Button>
          )}
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/40 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="text-xs">Budget</span>
            </div>
            <p className="text-base font-bold text-foreground">
              00
              {/* ${tender.budget.toLocaleString()} */}
            </p>
          </div>
          <div className="text-center border-x border-border">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs">Deadline</span>
            </div>
            <p className="text-base font-bold text-foreground">{tenderi.deadline?.slice(0, 10)}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs">Quotations</span>
            </div>
            <p className="text-base font-bold text-foreground">
              0
              {/* {tender.quotationsCount} */}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Scope of Work
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tender.description}
        </p>
      </div>

      {/* Category */}
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Category", value: tenderi.category },
            // { label: "Visibility", value: tender.visibility === "public" ? "Public" : "Private" },
            { label: "Posted On", value: tenderi.updatedAt?.slice(0, 10) },
            { label: "Deadline", value: tender.deadline},
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-card rounded-xl shadow-card border border-border p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-primary" />
          Attachments
        </h2>
        <div className="space-y-2">
          {["Tender_Requirements_v1.pdf", "Technical_Specifications.docx"].map(
            (doc) => (
              <div
                key={doc}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-primary-light flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                  <span className="text-sm text-foreground">{doc}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA */}
      {tenderi.status === "OPEN" && (
        <div className="bg-primary-light rounded-xl border border-primary/20 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Ready to submit your quotation?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Deadline: {tenderi.deadline.slice(0, 10)}
            </p>
          </div>
          <Button className="gap-2" onClick={() => setModalOpen(true)}>
            <Send className="w-3.5 h-3.5" />
            Submit Quotation
          </Button>
        </div>
      )}

      <SubmitQuotationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tenderTitle={tenderi.title}
        tenderBudget={100}
        tenderid={tenderi._id}
      />
    </div>
  );
}
