// src/layouts/OrgLayout.tsx — Layout wrapper for Organization area

import { Outlet } from "react-router-dom";
import { OrgSidebar } from "@/components/layouts/OrgSidebar";
import { TopNavbar } from "@/components/layouts/TopNavbar";

export default function OrgLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <OrgSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
