// src/layouts/TraderLayout.tsx — Layout wrapper for Trader area

import { Outlet } from "react-router-dom";
import { TraderSidebar } from "@/components/layouts/TraderSidebar";
import { TopNavbar } from "@/components/layouts/TopNavbar";

export default function TraderLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <TraderSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
