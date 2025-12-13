import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">

      {/* Sidebar */}
      <aside
        className={`bg-[#212529] text-white p-6 space-y-6 transition-all duration-300 relative
          ${collapsed ? "w-16" : "w-64"}
        `}
      >

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 bg-white text-black p-1 rounded-full shadow-md cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Brand */}
        {!collapsed && (
          <h1 className="text-2xl font-bold mb-6 whitespace-nowrap">Rentify</h1>
        )}

        {/* Menu */}
        <nav className="space-y-4">

          <NavLink
            to="/dashboard/renter"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LayoutDashboard size={20} /> {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <User size={20} /> {!collapsed && "Profile"}
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <Package size={20} /> {!collapsed && "My Bookings"}
          </NavLink>

          <NavLink
            to="/dashboard/wishlist"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <Heart size={20} /> {!collapsed && "Wishlist"}
          </NavLink>

          <NavLink
            to="/dashboard/track"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <Truck size={20} /> {!collapsed && "Track Orders"}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={`flex items-center gap-3 hover:text-[#adb5bd] transition 
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <Settings size={20} /> {!collapsed && "Settings"}
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          className={`flex gap-3 items-center mt-10 text-red-400 hover:text-red-500 transition
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={20} /> {!collapsed && "Logout"}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 p-8 transition-all duration-300
          ${collapsed ? "ml-0" : ""}
        `}
      >
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
