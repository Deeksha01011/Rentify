import React from "react";
import UpdateProfilePicture from "./updateProfilePicture";
import ProfileUpdate from "./profileUpdate";
import ResetPassword from "./updatePassword";
import DeleteAccount from "./deleteAccount";

const Setting = () => {
  return (
    <div className="mx-auto  w-11/12 min-h-[100vh]">
      <h1 className="text-gray-700 mb-10 font-semibold text-2xl">My Profile</h1>
      <UpdateProfilePicture />
      <ProfileUpdate />
      <ResetPassword />
      <DeleteAccount />
    </div>
  );
};

export default Setting;
