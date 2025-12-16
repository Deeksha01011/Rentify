import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getAllCategories } from "../Services/operations/itemOperation";
import { navLinks } from "../StaticData/navbar-links";
import ProfileDashboard from "../pages/dashboard/ProfileDashboard";
const Navbar = () => {
  const { user } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getAllCategories();
      setCategories(res?.data?.data);
    };
    fetchCategory();
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
              {/* {location ? location : "Enter Location"} */}
              Enter location
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
                {item.title === "CATEGORY" ? (
                  <div className="flex items-center relative  text-gray-800 group">
                    <p>{item.title}</p>
                    <i className="ri-arrow-down-s-line text-[20px]"></i>

                    <div className=" flex flex-col p-5 bg-gray-200 w-[300px] invisible rounded-lg text-black-900 absolute left-[50%] top-[50%] opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 translate-x-[-50%] translate-y-[30%] group-hover:translate-y-[1.65em] z-10 ">
                      <div className="absolute h-6 w-6 rotate-45 left-[50%] top-0 translate-x-[63%]  translate-y-[-40%] bg-gray-200 rounded"></div>

                      {categories?.length ? (
                        categories.map((items, index) => (
                          <Link
                            key={index}
                            to={`/products?category=${items.name
                              .toLowerCase()
                              .replace(/\s+/g, "")}`}
                            className="px-[18px] py-[14px] rounded-lg bg-transparent hover:bg-gray-100"
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
                    to={item.link}
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

            {/* ABOUT */}
          </ul>

          {/* 🔁 LOGIN vs PROFILE */}

          <div className=" hidden md:flex items-center gap-x-4">
            {user && user.role !== "admin" && (
              <Link to="/dashboard/cart" className="relative">
                <IoCartOutline className="h-7 w-7" />
                <span className="bg-[#495057] px-2 rounded-full absolute -top-2 -right-2 text-white text-xs">
                  0
                </span>
              </Link>
            )}

            {token === null && (
              <Link
                to="/login"
                className="px-5 py-2 bg-[#495057] text-white font-semibold rounded-lg hover:bg-[#212529]"
              >
                LOGIN
              </Link>
            )}
            {token !== null && <ProfileDashboard />}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
