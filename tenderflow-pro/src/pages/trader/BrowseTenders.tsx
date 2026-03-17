// src/pages/trader/BrowseTenders.tsx — Browse all open tenders

import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { MOCK_TENDERS } from "@/data/mockData";
import {
  Search,
  LayoutGrid,
  List,
  Clock,
  Building2,
  DollarSign,
  ArrowRight,
  SlidersHorizontal,
  Tag,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast, useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "All Categories",
  "Software Development",
  "IT Infrastructure",
  "Cloud Services",
  "Cybersecurity",
  "Marketing",
  "Legal Services",
];

type TraderContext = {
  data: any
};

export default function BrowseTenders() {

  const {toast} = useToast();
  const [tendersi, setTenders] = useState([]);

  useEffect(() => {
    
    async function fetchData(){

      try {

        const _response = await fetch("http://localhost:3000/tender", {
          method: "GET",
          headers: {
            "Content-Type": "appliation/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });

        const responseJson = await _response.json();

        setTenders(responseJson.data);

        console.log(data);

      } catch(err) {
        console.log(err.message);
        toast({
          title: err.message
        });
      }

    }
    
    fetchData();
 
  }, []);

  useEffect(() => {
    console.log("Tenders state updated");
    console.log(tendersi)
  }, [tendersi])

  const { data } = useOutletContext<TraderContext>();
  console.log(data);

  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const publicTenders = MOCK_TENDERS.filter((t) => t.visibility === "public");
  const filtered = tendersi;
  // const filtered = publicTenders.filter((t) => {
  //   const matchSearch =
  //     t.title.toLowerCase().includes(search.toLowerCase()) ||
  //     t.organization.toLowerCase().includes(search.toLowerCase());
  //   const matchCat =
  //     category === "All Categories" || t.category === category;
  //   return matchSearch && matchCat;
  // });

  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader
        title="Browse Tenders"
        description={`${filtered.length} tenders available`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or organization..."
            className="h-9 pl-8 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 w-48">
              <Tag className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </Button>

          {/* View toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-2 transition-colors",
                view === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-2 transition-colors",
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tender) => (
            <div
              key={tender._id}
              className="bg-card rounded-xl shadow-card border border-border p-5 hover:shadow-soft hover:border-primary/30 transition-all duration-200 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                  <Tag className="w-3 h-3" />
                  {tender.category}
                </span>
                <StatusBadge status={tender.status} />
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                {tender.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                {tender.description}
              </p>

              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5" />
                  {tender.organization}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="font-semibold text-foreground">
                      $200
                      {/* ${tender.budget.toLocaleString()} */}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {tender.deadline.slice(0, 10)}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full gap-1.5 mt-1"
                  asChild
                >
                  <Link to={`/trader/tenders/${tender._id}`}>
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Organization</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Deadline</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((tender) => (
                <tr key={tender._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {tender.title}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {tender.organization}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">
                    {tender.category}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                    $200
                    {/* ${tender.budget.toLocaleString()} */}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {tender.deadline.slice(0, 10)}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={tender.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <Button variant="outline" size="sm" className="h-7" asChild>
                      <Link to={`/trader/tenders/${tender._id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
