import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getUserDetails } from "../../Services/operations/profileOperation";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getUserDetail = async () => {
      const data = await getUserDetails(token);

      setUser(data);
    };
    if (token) {
      getUserDetail();
    }
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* ---------------- TOP CARD ---------------- */}
      <div className="bg-gray-200 p-9 rounded-xl shadow-sm flex items-center gap-8">
        <img
          src={user?.image}
          className="bg-[#f8f9fa] rounded-full w-20 h-20 flex items-center justify-center"
        />

        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm font-semibold text-gray-600">{user.role}</p>
          <p className="text-md font-semibold italic text-gray-600">
            {user?.additionalDetails?.city}, {user?.additionalDetails?.country}
          </p>
        </div>
      </div>

      {/* ---------------- PERSONAL INFO ---------------- */}
      <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold italic text-lg">Personal Information</h3>
          <Link
            to={"/dashboard/setting"}
            className="text-green-800 italic border-b border-green-900 cursor-pointer"
          >
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">First Name </p>{" "}
            <p className="italic text-gray-500 text-md font-semibold">
              {user.firstName}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">Last Name </p>{" "}
            <p className="italic text-gray-500 text-md font-semibold">
              {user.lastName}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">Email </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user.email}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">
              Contact Number{" "}
            </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user?.additionalDetails?.phoneNumber}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">
              Date Of Birth{" "}
            </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user?.additionalDetails?.dateOfBirth}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">City </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user?.additionalDetails?.city}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">State </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user?.additionalDetails?.state}
            </p>
          </div>
          <div className="">
            <p className="text-gray-800 text-lg font-semibold">Country </p>{" "}
            <p className="italic text-md font-semibold text-gray-500">
              {user?.additionalDetails?.country}
            </p>
          </div>
        </div>
      </div>

      {user?.role !== "admin" &&
      user?.additionalDetails?.isLister === "business" ? (
        <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold italic text-lg">Additional Details</h3>
            <Link
              to={"/dashboard/setting"}
              className="text-green-800 italic border-b border-green-900 cursor-pointer"
            >
              Edit
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Lister Type{" "}
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.listerType}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">GST Number</p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.gstNumber}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Account Holder Name{" "}
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.accountHolderName}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Account Number
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.accountNumber}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">IFSC Code</p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.ifscCode}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">Bank Name</p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.bankName}
              </p>
            </div>
          </div>
        </div>
      ) : user?.additionalDetails?.listerType === "individual" ? (
        <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold italic text-lg">Additional Details</h3>
            <Link
              to={"/dashboard/setting"}
              className="text-green-800 italic border-b border-green-900 cursor-pointer"
            >
              Edit
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Lister Type{" "}
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.listerType}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Aadhar Number
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.aadharNumber}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Account Holder Name{" "}
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.accountHolderName}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">
                Account Number
              </p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.accountNumber}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">IFSC Code</p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.ifscCode}
              </p>
            </div>
            <div className="">
              <p className="text-gray-800 text-lg font-semibold">Bank Name</p>{" "}
              <p className="italic text-md font-semibold text-gray-500">
                {user?.additionalDetails?.bankName}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
