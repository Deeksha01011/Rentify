import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { User } from "lucide-react";

const Navbar = () => {
  const [location, setLocation] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  // AUTH CHECK
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = Boolean(token);

  return (
    <div className="bg-white py-3 shadow-lg relative z-50">
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex gap-7 items-center">
          {/* Logo */}
          <Link to="/">
            <h1 className="font-bold text-3xl font-Inter">
              <span className="text-green-700">R</span>entify
            </h1>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-2 px-20 py-2 border border-gray-300 rounded-xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-all">
            <MapPin size={18} color="#495057" />
            <span className="font-semibold text-gray-700">
              {location || "Enter Location"}
            </span>
            <FaCaretDown size={16} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <nav className="flex items-center gap-6">
          <ul className="flex gap-7 items-center font-semibold">

            {/* HOME */}
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "border-b-4 border-[#ced4da]" : ""
            }>
              <li>HOME</li>
            </NavLink>

            {/* CATEGORY */}
            <div className="relative">
              <div
                onClick={() => setOpenCategory(!openCategory)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span>CATEGORIES</span>
                <FaCaretDown
                  className={`transition-transform ${openCategory ? "rotate-180" : ""}`}
                />
              </div>

              {openCategory && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-3 border">
                  {[
                    { label: "Study Materials", value: "stationery" },
                    { label: "Electronics", value: "electronics" },
                    { label: "Home Appliances", value: "homeappliances" },
                    { label: "Automobiles", value: "automobiles" },
                    { label: "Furniture", value: "furniture" },
          ].map((cat) => (
         <Link
           key={cat.value}
            to={`/products?category=${cat.value}`}
            onClick={() => setOpenCategory(false)}
          >
          <p className="px-3 py-2 hover:bg-gray-200 rounded-md">
            {cat.label}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT */}
            <NavLink to="/about"><li>ABOUT</li></NavLink>

            {/* CONTACT */}
            <NavLink to="/contact"><li>CONTACT</li></NavLink>
          </ul>

          {/* 🔁 LOGIN vs PROFILE */}
          {!isLoggedIn ? (
            /* LOGIN BUTTON */
            <Link
              to="/login"
              className="px-5 py-2 bg-[#495057] text-white font-semibold rounded-lg hover:bg-[#212529]"
            >
              LOGIN
            </Link>
          ) : (
            <div className="flex items-center gap-4">

              {/* 🛒 CART */}
              <Link to="/cart" className="relative">
                <IoCartOutline className="h-7 w-7" />
                <span className="bg-[#495057] px-2 rounded-full absolute -top-2 -right-2 text-white text-xs">
                  0
                </span>
              </Link>

              {/* 👤 PROFILE */}
              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
