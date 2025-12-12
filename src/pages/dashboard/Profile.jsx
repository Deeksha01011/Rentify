import React, { useEffect, useState } from "react";
import FormWrapper from "../../components/form/FormWrapper.jsx";
import InputField from "../../components/form/Input.jsx";
import SelectField from "../../components/form/Select.jsx";
import Button from "../../components/form/Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    isLister: false,
    listerType: "",
    companyName: "",
    gstNumber: "",
    aadhaarNumber: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const navigate = useNavigate();

  // ---------------------------------------------------
  // FETCH USER DETAILS
  // ---------------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:4000/api/user/getUserDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.data);

        const p = res.data.data.additionalDetails;

        setFormData({
          firstName: res.data.data.firstName || "",
          lastName: res.data.data.lastName || "",
          phoneNumber: p.phoneNumber || "",
          city: p.city || "",
          state: p.state || "",
          country: p.country || "",
          isLister: p.isLister || false,
          listerType: p.listerType || "",
          companyName: p.companyName || "",
          gstNumber: p.gstNumber || "",
          aadhaarNumber: p.aadhaarNumber || "",
          accountHolderName: p.accountHolderName || "",
          accountNumber: p.accountNumber || "",
          ifscCode: p.ifscCode || "",
          bankName: p.bankName || "",
        });

        setLoading(false);
      } catch (err) {
        console.log("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ---------------------------------------------------
  // HANDLE CHANGE
  // ---------------------------------------------------
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------
  // SUBMIT FORM
  // ---------------------------------------------------
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:4000/api/user/updateProfile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile Updated Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log("Profile update error:", err);
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-[90%] mx-auto mt-6 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Your Profile</h1>

      <FormWrapper title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <InputField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />

          <InputField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />

          <InputField
            label="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <InputField
            label="State"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          <InputField
            label="Country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
      </FormWrapper>

      {/* ---------------------------------------------------
          SWITCH TO LISTER
      ------------------------------------------------------ */}
      <FormWrapper title="Become a Lister">
        <SelectField
          label="Do you want to become a lister?"
          options={[
            { label: "No", value: false },
            { label: "Yes", value: true },
          ]}
          value={formData.isLister}
          onChange={(e) =>
            handleChange("isLister", e.target.value === "true")
          }
        />

        {formData.isLister && (
          <>
            <SelectField
              label="Lister Type"
              options={[
                { label: "Individual", value: "individual" },
                { label: "Business", value: "business" },
              ]}
              value={formData.listerType}
              onChange={(e) => handleChange("listerType", e.target.value)}
            />

            {/* INDIVIDUAL LISTER FIELDS */}
            {formData.listerType === "individual" && (
              <InputField
                label="Aadhaar Number"
                value={formData.aadhaarNumber}
                onChange={(e) => handleChange("aadhaarNumber", e.target.value)}
              />
            )}

            {/* BUSINESS LISTER FIELDS */}
            {formData.listerType === "business" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <InputField
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />

                <InputField
                  label="GST Number"
                  value={formData.gstNumber}
                  onChange={(e) => handleChange("gstNumber", e.target.value)}
                />
              </div>
            )}

            {/* COMMON BANK DETAILS */}
            <FormWrapper title="Bank Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Account Holder Name"
                  value={formData.accountHolderName}
                  onChange={(e) => handleChange("accountHolderName", e.target.value)}
                />

                <InputField
                  label="Account Number"
                  value={formData.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                />

                <InputField
                  label="IFSC Code"
                  value={formData.ifscCode}
                  onChange={(e) => handleChange("ifscCode", e.target.value)}
                />

                <InputField
                  label="Bank Name"
                  value={formData.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                />
              </div>
            </FormWrapper>
          </>
        )}
      </FormWrapper>

      <div className="mt-8 flex justify-end">
        <Button label="Update Profile" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Profile;
