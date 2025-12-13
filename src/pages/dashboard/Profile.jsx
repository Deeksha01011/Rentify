import React, { useState } from "react";
import { User } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "Natashia",
    lastName: "Khaleira",
    email: "info@binary-fusion.com",
    phone: "+62 821 2554 5846",
    dob: "1990-12-10",
    role: "User",

    country: "United Kingdom",
    state: "Bihar",
    city: "Leeds, East London",
    postalCode: "ERT 1254",

    isLister: false,
    listerType: "",
  });

  // ---------------- MODAL STATE ----------------
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  // ---------------- FORM STATE ----------------
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditPersonal = () => {
    setFormData(user);
    setErrors({});
    setEditPersonal(true);
  };

  const openEditAddress = () => {
    setFormData(user);
    setErrors({});
    setEditAddress(true);
  };

  // ---------------- VALIDATION ----------------
  const validatePersonalForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phone?.trim()) {
  newErrors.phone = "Phone number is required";
} else if (!/^\d{10}$/.test(formData.phone)) {
  newErrors.phone = "Phone number must be exactly 10 digits";
}


    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (formData.isLister && !formData.listerType) {
      newErrors.listerType = "Please select lister type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddressForm = () => {
    const newErrors = {};

    if (!formData.country?.trim()) newErrors.country = "Country is required";
    if (!formData.state?.trim()) newErrors.state = "State is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.postalCode?.trim())
      newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SAVE ----------------
  const savePersonal = () => {
    if (!validatePersonalForm()) return;
    setUser(formData);
    setEditPersonal(false);
  };

  const saveAddress = () => {
    if (!validateAddressForm()) return;
    setUser(formData);
    setEditAddress(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* ---------------- TOP CARD ---------------- */}
      <div className="bg-[#ced4da] p-9 rounded-xl shadow-sm flex items-center gap-8">
        <div className="bg-[#f8f9fa] rounded-full w-20 h-20 flex items-center justify-center">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-600">{user.role}</p>
          <p className="text-sm italic text-gray-600">
            {user.city}, {user.country}
          </p>
        </div>
      </div>

      {/* ---------------- PERSONAL INFO ---------------- */}
      <div className="bg-[#ced4da] p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold italic text-lg">Personal Information</h3>
          <button onClick={openEditPersonal} className="text-green-800 italic border-b border-green-900 cursor-pointer">
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <p><b>First Name:</b> {user.firstName}</p>
          <p><b>Last Name:</b> {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>DOB:</b> {user.dob}</p>
          <p><b>Lister:</b> {user.isLister ? user.listerType : "No"}</p>
        </div>
      </div>

      {/* ---------------- ADDRESS ---------------- */}
      <div className="bg-[#ced4da] p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold text-lg">Address</h3>
          <button onClick={openEditAddress} className="text-green-800 italic border-b border-green-900 cursor-pointer">
            Edit
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <p><b>Country:</b> {user.country}</p>
          <p><b>State:</b> {user.state}</p>
          <p><b>City:</b> {user.city}</p>
          <p><b>Postal:</b> {user.postalCode}</p>
        </div>
      </div>

      {/* ================= PERSONAL MODAL ================= */}
      {editPersonal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setEditPersonal(false)}
          />

          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[#495057] p-10 rounded-xl w-[480px] max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-semibold mb-5 text-white">
              Edit Personal Information
            </h3>

            {["firstName", "lastName", "phone", "dob"].map((field) => (
              <div key={field} className="mt-4">
                <label className="text-sm text-[#dee2e6] capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  type={field === "dob" ? "date" : "text"}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="border w-full p-2 rounded-md mt-1 bg-[#e9ecef]"
                />
                {errors[field] && (
                  <p className="text-red-400 text-xs">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* ROLE */}
            <div className="mt-4">
              <label className="text-sm text-[#dee2e6]">Role</label>
              <select
                value={formData.isLister ? "yes" : "no"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isLister: e.target.value === "yes",
                  })
                }
                className="border w-full p-2 rounded-md mt-1 bg-[#e9ecef]"
              >
                <option value="no">User</option>
                <option value="yes">Lister</option>
              </select>
            </div>

            {formData.isLister && (
              <div className="mt-4">
                <label className="text-sm text-[#dee2e6]">Lister Type</label>
                <select
                  name="listerType"
                  value={formData.listerType}
                  onChange={handleChange}
                  className="border w-full p-2 rounded-md mt-1 bg-[#e9ecef]"
                >
                  <option value="">Select</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
                {errors.listerType && (
                  <p className="text-red-400 text-xs">
                    {errors.listerType}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditPersonal(false)}
                className="px-4 py-2 bg-[#6c757d] hover:bg-[#343a40] rounded-md text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={savePersonal}
                className="px-4 py-2 bg-[#212529] hover:bg-[#343a40] rounded-md text-white cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADDRESS MODAL ================= */}
      {editAddress && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center pt-10">
          <div className="bg-[#495057] p-10 rounded-xl w-[480px]">
            <h3 className="text-xl text-white mb-4">Edit Address</h3>

            {["country", "state", "city", "postalCode"].map((field) => (
              <div key={field} className="mt-4">
                <label className="text-sm text-[#dee2e6] capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="border w-full p-2 rounded-md mt-1 bg-[#e9ecef]"
                />
                {errors[field] && (
                  <p className="text-red-400 text-xs">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditAddress(false)}
                className="px-4 py-2 bg-[#6c757d] hover:bg-[#343a40] text-white rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="px-4 py-2 bg-[#212529] hover:bg-[#343a40] text-white rounded-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
