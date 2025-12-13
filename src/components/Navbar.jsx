import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getAllCategories } from "../Services/operations/ItemOperations";
import { navLinks } from "../StaticData/navbar-links";
const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState();

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white py-3 shadow-lg relative z-50">
      <div className=" w-11/12 max-w-maxContent mx-auto flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex gap-7 items-center">
          {/* Logo */}
          <Link to="/">
            <h1 className="font-bold text-3xl font-Inter">
              <span className="text-green-700">R</span>entify
            </h1>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-2 px-20 py-2 border border-gray-300 rounded-xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 w-fit">
            <MapPin size={18} color="#495057" strokeWidth={2} />
            <span className="font-semibold text-gray-700 font-inter">
              {location ? location : "Enter Location"}
            </span>
            <FaCaretDown size={16} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <nav className="flex items-center gap-6">
          <ul className="flex gap-7 items-center text-l font-semibold font-inter">
            {/* HOME */}

            {navLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Category" ? (
                  <div className="flex items-center relative  text-richblack-25 group">
                    <p>{item.title}</p>
                    <i className="ri-arrow-down-s-line text-[20px]"></i>

                    <div className=" flex flex-col p-5 bg-black-100 w-[300px] invisible rounded-lg text-black-900 absolute left-[50%] top-[50%] opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 translate-x-[-50%] translate-y-[30%] group-hover:translate-y-[1.65em] z-10 ">
                      <div className="absolute h-6 w-6 rotate-45 left-[50%] top-0 translate-x-[63%]  translate-y-[-40%] bg-richblack-5 rounded"></div>

                      {categories.length ? (
                        categories.map((items, index) => (
                          <Link
                            className="px-[18px] py-[14px] rounded-lg bg-transparent hover:bg-richblack-100"
                            key={index}
                            to={`/catalog/${items.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <p>{items.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `cursor-pointer pb-1 ${
                        isActive
                          ? "border-b-4 border-[#ced4da] text-[#212529]"
                          : "text-black hover:text-[#6c757d]"
                      }`
                    }
                  >
                    <li>{item.title}</li>
                  </NavLink>
                )}
              </li>
            ))}

            {/* CATEGORY */}
            <div className="relative">
              <div
                onClick={() => setOpenCategory(!openCategory)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span>CATEGORIES</span>
                <FaCaretDown
                  className={`transition-transform ${
                    openCategory ? "rotate-180" : ""
                  }`}
                />
              </div>

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
                      <p className="px-3 py-2 hover:bg-gray-200 rounded-md">
                        {item}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT */}
            <NavLink to="/about">
              <li>ABOUT</li>
            </NavLink>

            {/* CONTACT */}
            <NavLink to="/contact">
              <li>CONTACT</li>
            </NavLink>
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
