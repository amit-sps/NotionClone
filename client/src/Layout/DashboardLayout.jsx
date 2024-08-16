import Navigation from "@/components/documents/Navigation";
import SearchCommand from "@/components/documents/SearchCommand";
import { useAuth } from "@/context/auth";
import React from "react";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  const [{ user }, setAuth, socket] = useAuth();
  console.log("DashboardLayoutDashboardLayoutDashboardLayoutDashboardLayoutDashboardLayoutDashboardLayout")

  return (
    <div className="min-h-full flex dark:bg-[#1F1F1F] ">
      <Navigation user={user}/>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
        <SearchCommand />
      </main>
    </div>
  );
};

export default DashboardLayout;
