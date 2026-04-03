// src/pages/org/CreateTender.tsx — Create tender form
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/PageHeader";
import {
  Upload,
  FileText,
  DollarSign,
  Calendar,
  Tag,
  Eye,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { L } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const CATEGORIES = [
  "Software Development",
  "IT Infrastructure",
  "Cloud Services",
  "Cybersecurity",
  "Marketing",
  "Legal Services",
  "HR & Recruitment",
  "Finance & Accounting",
  "Consulting",
  "Other",
];

type OrgContext = {
  data: any
};

export default function CreateTender() {

  const url = import.meta.env.VITE_API_URL;

  const { data } = useOutletContext<OrgContext>();
  console.log(data);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setLoading(true);

      const _response = await fetch(`${url}/tender/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          title: title,
          description: description,
          budget: budget,
          category: category,
          deadline: deadline
        })
      });

      const data = await _response.json();
      console.log(data);

      if(data.success = true) {
        alert("Tender created successfully");
      }
      

    } catch(err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }



    // setTimeout(() => navigate("/org/tenders"), 1500);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-status-open-bg flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-status-open-fg" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Tender Published!
          </h2>
          <p className="text-sm text-muted-foreground">
            Redirecting to My Tenders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <PageHeader
        title="Create Tender"
        description="Fill in the details to publish a new tender"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Basic Information
          </h2>

          <div className="space-y-1.5">
            <Label className="text-sm">Tender Title *</Label>
            <Input
              value = {title}
              required
              placeholder="e.g., Enterprise Software Development Platform"
              className="h-9"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Description *</Label>
            <Textarea
              value = {description}
              required
              placeholder="Provide a detailed description of what you're looking for, scope of work, deliverables, and any specific requirements..."
              className="min-h-[100px] resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                Category *
              </Label>
              <Select required value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                Submission Deadline *
              </Label>
              <Input type="date" required className="h-9" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Budget
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Estimated Budget (USD) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  type="number"
                  required
                  placeholder="50,000"
                  className="h-9 pl-6"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                />
              </div>
            </div>
            {/* <div className="space-y-1.5">
              <Label className="text-sm">Budget Type</Label>
              <Select defaultValue="fixed">
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="range">Budget Range</SelectItem>
                  <SelectItem value="open">Open / Best Offer</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-card rounded-xl shadow-card border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Supporting Documents
          </h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-foreground font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, DOCX, XLSX up to 25MB each
            </p>
          </div>
        </div>

        {/* Visibility
        <div className="bg-card rounded-xl shadow-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Public Visibility
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isPublic
                    ? "All registered traders can see this tender"
                    : "Only invited traders can see this tender"}
                </p>
              </div>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
        </div> */}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/org/tenders")}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            {/* <Button type="button" variant="outline">
              Save as Draft
            </Button> */}
            <Button type="submit" className="gap-1.5 px-5">
              Publish Tender
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
