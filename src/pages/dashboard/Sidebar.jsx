import React, { useState } from "react";
import { dashboardLink } from "../../StaticData/Dashboard-links";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../utils/ConformationModal";
import { Logout } from "../../Services/operations/Authoperations";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [collapsed, setCollapsed] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className=" ">
      {/* Sidebar */}
      <aside
        className={`bg-[#212529] text-white p-6 space-y-6 transition-all duration-300 relative h-full
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
          {dashboardLink
            ?.filter((item) => {
              // agar type nahi hai → common item
              if (!item.type) return true;

              // warna role match hona chahiye
              return item.type === user?.role;
            })
            .map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 hover:text-[#adb5bd] transition
        ${collapsed ? "justify-center" : ""}
      `}
              >
                {item.icon}
                {!collapsed && item.name}
              </NavLink>
            ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            setConfirmationModal({
              text1: "Are you sure ?",
              text2: "You will be logged out from your Account",
              btn1Text: "Log out",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(Logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            });
          }}
          className={`flex gap-3 items-center mt-10 text-red-400 hover:text-red-500 transition cursor-pointer
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={20} /> {!collapsed && "Logout"}
        </button>
      </aside>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

// export default Sidebar;
