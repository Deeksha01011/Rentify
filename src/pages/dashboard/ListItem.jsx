import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaCalendarAlt,
  FaImage,
  FaLayerGroup,
} from "react-icons/fa";

const ListItem = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    costPrice: "",
    monthUsed: "",
    listingPeriod: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Listing Data →", formData);
    // yahan API call lagegi (POST create listing)
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`bg-white border-r transition-all duration-300
        ${collapsed ? "w-[80px]" : "w-[260px]"}`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-[#212529]">
              Lister Panel
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-[#dee2e6]"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <div className="flex flex-col gap-3 px-3 mt-6">
          <div className="flex items-center gap-3 p-2 rounded-md bg-[#495057] text-white">
            <FaBoxOpen />
            {!collapsed && <span>List Item</span>}
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-8 animate-fadeIn">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#212529]">
            List Your Item
          </h1>
          <p className="text-[#6c757d] mt-2 max-w-2xl">
            Share your product with thousands of users and start earning.
            Fill in accurate details — listings go for admin approval.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border p-8 grid gap-6 max-w-4xl"
        >

          {/* Item Name */}
          <div>
            <label className="font-medium text-[#212529]">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#495057]"
              placeholder="Canon DSLR Camera"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-[#212529] flex items-center gap-2">
              <FaLayerGroup /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="automobiles">Automobiles</option>
              <option value="homeappliances">Home Appliances</option>
              <option value="stationery">Study Materials</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-[#212529]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 px-4 py-2 border rounded-md"
              placeholder="Condition, features, usage details..."
            />
          </div>

          {/* Cost & Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaRupeeSign /> Cost Price
              </label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="font-medium flex items-center gap-2">
                <FaCalendarAlt /> Months Used
              </label>
              <input
                type="number"
                name="monthUsed"
                value={formData.monthUsed}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Listing Period */}
          <div>
            <label className="font-medium">
              Listing Period (months)
            </label>
            <input
              type="number"
              name="listingPeriod"
              value={formData.listingPeriod}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-md"
            />
          </div>

          {/* Images */}
          <div>
            <label className="font-medium flex items-center gap-2">
              <FaImage /> Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-[#212529] text-white py-3 rounded-md hover:bg-[#343a40] transition"
          >
            Submit for Approval
          </button>
        </form>
      </main>
    </div>
  );
};

export default ListItem;
