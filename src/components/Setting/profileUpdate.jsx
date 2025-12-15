import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../Services/operations/profileOperation";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const isLister = watch("isLister");
  const listerType = watch("listerType");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        contactNumber: "",
        gender: "",
        isLister: "",
        listerType: "",
        city: "",
        state: "",
        country: "",
        aadharNumber: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const handleForm = (data) => {
  
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(handleForm)}>
      <div className="  flex flex-col bg-gray-200 mt-10 px-7 py-8 rounded-lg justify-between">
        <h1 className="text-gray-800 text-lg font-semibold">
          Profile Information
        </h1>

        <div className="flex gap-5 flex-col mt-5">
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1 "
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Enter Contact Number"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                defaultValue={user?.additionalDetails?.phoneNumber}
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
              {errors.phoneNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="gender">
                Gender
              </label>

              <select
                name="gender"
                id="gender"
                placeholder="Enter Gender"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  Please enter your gender
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="city">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter City Name"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("city", {
                  required: {
                    value: true,
                    message: "Please enter your city.",
                  },
                })}
                defaultValue={user?.additionalDetails?.city}
              />
              {errors.city && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="state">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter Your State"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("state", { required: true })}
                defaultValue={user?.additionalDetails?.state}
              />
              {errors.state && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  Please Provide State Name
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country Name"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("country", {
                  required: {
                    value: true,
                    message: "Please enter your city.",
                  },
                })}
                defaultValue={user?.additionalDetails?.country}
              />
              {errors.country && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="dd/mm/yyyy"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            {/* <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-gray-800" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country Name"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("city", {
                  required: {
                    value: true,
                    message: "Please enter your city.",
                  },
                })}
                defaultValue={user?.additionalDetails?.city}
              />
              {errors.city && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  {errors.city.message}
                </span>
              )}
            </div> */}
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="isLister">
                Do you want to be lister
              </label>
              <select
                name="isLister"
                id="isLister"
                placeholder="Select"
                className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                }}
                {...register("isLister", { required: true })}
                defaultValue={user?.additionalDetails?.isLister}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.isLister && (
                <span className="-mt-1 text-[12px] text-gray-800">
                  Please select first
                </span>
              )}
            </div>
            {isLister === "yes" && (
              <div className="flex flex-col gap-2 w-[50%]">
                <label className="text-gray-800" htmlFor="listerType">
                  Lister Type
                </label>
                <select
                  name="listerType"
                  id="isLister"
                  placeholder="Select"
                  className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                  }}
                  {...register("listerType", { required: true })}
                  defaultValue={user?.additionalDetails?.listerType}
                >
                  <option value="">Select</option>
                  <option value="bussiness">Business</option>
                  <option value="individual">Individual</option>
                </select>
                {errors.isLister && (
                  <span className="-mt-1 text-[12px] text-gray-800">
                    Please select first
                  </span>
                )}
              </div>
            )}
          </div>

          {isLister === "yes" && listerType === "individual" && (
            <div className="flex flex-col gap-5 items-center w-full">
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="aadharnumber">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    placeholder="Enter Aadhar Number"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("aadharNumber", {
                      required: {
                        value: true,
                        message: "Please enter your aadhar number.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.aadharNumber}
                  />
                  {errors.aadharNumber && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.aadharNumber.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <label className="text-gray-800" htmlFor="accountHolderName">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("accountHolderName", { required: true })}
                    defaultValue={user?.firstName}
                  />
                  {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter Account Holder Name
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("accountNumber", {
                      required: {
                        value: true,
                        message: "Please enter your Account number.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.accountNumber}
                  />
                  {errors.accountNumber && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.accountNumber.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <label className="text-gray-800" htmlFor="ifscCode">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("ifscCode", { required: true })}
                    defaultValue={user?.ifscCode}
                  />
                  {errors.ifscCode && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter Ifsc Code
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Enter Bank Namer"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("bankName", {
                      required: {
                        value: true,
                        message: "Please enter your Bank Name.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.bankName}
                  />
                  {errors.bankName && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.bankName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {
            isLister === "yes" && listerType === "bussiness" && (
                 <div className="flex flex-col gap-5 items-center w-full">
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="gstNumber">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST Number"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("gstNumber", {
                      required: {
                        value: true,
                        message: "Please enter your aadhar number.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.gstNumber}
                  />
                  {errors.gstNumber && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.gstNumber.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <label className="text-gray-800" htmlFor="accountHolderName">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("accountHolderName", { required: true })}
                    defaultValue={user?.accountHolderName}
                  />
                  {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter Account Holder Name
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("accountNumber", {
                      required: {
                        value: true,
                        message: "Please enter your Account number.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.accountNumber}
                  />
                  {errors.accountNumber && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.accountNumber.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <label className="text-gray-800" htmlFor="ifscCode">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("ifscCode", { required: true })}
                    defaultValue={user?.ifscCode}
                  />
                  {errors.ifscCode && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter Ifsc Code
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5 items-center w-full">
                <div className="flex flex-col gap-2 w-[50%] ">
                  <label className="text-gray-800" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Enter Bank Namer"
                    className="rounded-lg w-full bg-gray-100 p-[12px] text-gray-800 p-[12px] mt-1"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(36, 34, 34, 0.18)",
                    }}
                    {...register("bankName", {
                      required: {
                        value: true,
                        message: "Please enter your Bank Name.",
                      },
                    })}
                    defaultValue={user?.additionalDetails?.bankName}
                  />
                  {errors.bankName && (
                    <span className="-mt-1 text-[12px] text-gray-800">
                      {errors.bankName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            )

          }
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="bg-gray-200 text-gray-700 px-4 py-1 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-800  text-gray-200 px-4 py-1 rounded "
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
