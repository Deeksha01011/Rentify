import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  Truck,
  Settings,
  LogOut
} from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">

      {/* Sidebar */}
      <aside className="w-64 bg-[#212529] text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Rentify</h1>

        <nav className="space-y-4">

          <NavLink to="/dashboard/renter" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/profile" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <User size={20} /> Profile
          </NavLink>

          <NavLink to="/dashboard/bookings" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <Package size={20} /> My Bookings
          </NavLink>

          <NavLink to="/dashboard/wishlist" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <Heart size={20} /> Wishlist
          </NavLink>

          <NavLink to="/dashboard/track" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <Truck size={20} /> Track Orders
          </NavLink>

          <NavLink to="/dashboard/settings" className="flex gap-3 items-center hover:text-[#adb5bd]">
            <Settings size={20} /> Settings
          </NavLink>

        </nav>

        <button className="flex gap-3 items-center mt-10 text-red-400 hover:text-red-500">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
