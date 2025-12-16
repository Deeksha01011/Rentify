import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logout } from "../../Services/operations/Authoperations";
import { useOnClickOutside } from "../../hook/useOnClickOutside";
import {LogOut,LayoutDashboard} from "lucide-react"

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        ></img>
        <i className="ri-arrow-down-s-fill text-richblack-100 text-lg"></i>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-[-25px] z-[1000] divide-y-[1px] divide-gray-800 overflow-hidden rounded-md border-[1px] border-gray-700 bg-gray-100"
          ref={ref}
        >
          <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
            <div
              className="flex w-full border-b-[1px] border-gray-800 transition-all duration-300 items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-gray-800 hover:text-white 
         "
            >
             <LayoutDashboard size={15}/>
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(Logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            <LogOut size={15}/>
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDashboard;
