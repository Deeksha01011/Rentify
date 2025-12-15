import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar"
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  Truck,
  Settings,
  LogOut,
 
} from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar/>
      <div className="h-[calc(100vh-3.5rem)] w-full overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-5 ">
          <Outlet />
        </div>
      </div>

      {/* MAIN CONTENT */}
    </div>
  );
};

export default DashboardLayout;
