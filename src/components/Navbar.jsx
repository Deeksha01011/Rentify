import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const [location, setLocation] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="bg-white py-3 shadow-lg relative z-50">
      <div className=" w-11/12 max-w-maxContent mx-auto flex justify-between items-center">

        {/* LEFT SIDE */}
        <div className="flex gap-7 items-center">

          {/* Logo */}
          <Link to={"/"}>
            <h1 className="font-bold text-3xl font-Inter">
              <span className="text-green-700 font-Inter">R</span>entify
            </h1>
          </Link>

          {/* Location */}
          <div
            className="flex items-center gap-2 px-20 py-2 border border-gray-300 rounded-xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 w-fit"
          >
            <MapPin size={18} color="#495057" strokeWidth={2} />
            <span className="font-semibold text-gray-700 font-inter">
              {location ? location : "Enter Location"}
            </span>
            <FaCaretDown size={16} className="text-[#343a40]" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <nav className="flex items-center gap-6">
          <ul className="flex gap-7 items-center text-l font-semibold font-inter">

            {/* HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `cursor-pointer pb-1 ${
                  isActive
                    ? "border-b-4 border-[#ced4da] text-[#212529]"
                    : "text-black hover:text-[#6c757d]"
                }`
              }
            >
              <li>HOME</li>
            </NavLink>

            {/* CATEGORY DROPDOWN */}
            <div className="relative">
              <div
                onClick={() => setOpenCategory(!openCategory)}
                className="flex items-center gap-1 cursor-pointer pb-1 text-black hover:text-[#6c757d]"
              >
                <span>CATEGORIES</span>
                <FaCaretDown
                  size={16}
                  className={`text-[#343a40] transition-transform ${
                    openCategory ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {openCategory && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-3 border border-gray-200">

                  {[
                    "Study Materials",
                    "Electronics",
                    "Home Appliances",
                    "Automobiles",
                    "Furniture",
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={`/products?category=${item.toLowerCase()}`}
                      onClick={() => setOpenCategory(false)}
                    >
                      <p className="px-3 py-2 hover:bg-gray-200 rounded-md cursor-pointer text-gray-700">
                        {item}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `cursor-pointer pb-1 ${
                  isActive
                    ? "border-b-4 border-[#ced4da] text-[#212529]"
                    : "text-black hover:text-[#6c757d]"
                }`
              }
            >
              <li>ABOUT</li>
            </NavLink>

            {/* CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `cursor-pointer pb-1 ${
                  isActive
                    ? "border-b-4 border-[#ced4da] text-[#212529]"
                    : "text-black hover:text-[#6c757d]"
                }`
              }
            >
              <li>CONTACT</li>
            </NavLink>
          </ul>

          {/* CART ICON *
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-[#495057] px-2 rounded-full absolute -top-2 -right-2 text-white text-xs">
              0
            </span>
          </Link>
          /}

          {/* LOGIN BUTTON */}
          <Link
            to="/login"
            className="px-5 py-2 bg-[#495057] text-white font-semibold rounded-lg hover:bg-[#212529] transition-all duration-300"
          >
            LOGIN
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
