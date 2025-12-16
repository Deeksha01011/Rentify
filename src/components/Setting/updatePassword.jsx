import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../Services/operations/profileOperation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);

  const [showCurrPassword, setCurrPassword] = useState();
  const [showNewPassword, setNewPassword] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitForm = (data) => {
    // Send the request to the server to reset the password
    console.log(data);
    dispatch(resetPassword(token, data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(submitForm)} action="">
      <div className="flex flex-col bg-gray-200 mt-10 px-7 py-8 rounded-lg justify-between w-full">
        <h1 className="text-gray-800 text-lg font-semibold">Password</h1>
        <div className="flex gap-5 items-center mt-5 w-full">
          <div className=" relative flex flex-col gap-2 w-full">
            <label className="text-gray-800" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type={showCurrPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Current Password"
              className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
              }}
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setCurrPassword((prev) => !prev)}
              className="absolute right-3 top-[43px] z-[10] cursor-pointer"
            >
              {showCurrPassword ? (
                <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
              ) : (
                <i class="ri-eye-line text-[24px] text-richblack-200"></i>
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter password
              </span>
            )}
          </div>

          <div className="flex w-full">
            <div className="flex relative flex-col gap-2 w-full">
              <label className="text-gray-800" htmlFor="newPassword">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setNewPassword((prev) => !prev)}
                className="absolute right-3 top-[43px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
                ) : (
                  <i class="ri-eye-line text-[24px] text-richblack-200"></i>
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter new password
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="text-richblack-5 bg-gray-200 text-gray-800 px-4 py-1 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-gray-200 bg-gray-800 px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
