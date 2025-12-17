import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FaRupeeSign,
  FaCalendarAlt,
  FaImage,
  FaLayerGroup,
  FaClipboardList,
  FaCheckCircle,
  FaTimes,
  FaUpload,
  FaTrash,
} from "react-icons/fa";
import { createItem, listItem } from "../../Services/operations/itemOperation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

const ListItem = () => {
  const [imageError, setImageError] = useState("");
  const [estimateData, setEstimateData] = useState(null);
  const [isEstimated, setIsEstimated] = useState(false);
  const [itemId, setItemId] = useState(null);
  // const [listingPeriod, setListingPeriod] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    costPrice: "",
    monthUsed: "",
    listingPeriod: "",
    images: [],
    invoice: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ===== IMAGE HANDLER (FIXED & PROFESSIONAL) ===== */
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalImages = formData.images.length + selectedFiles.length;

    if (totalImages > 5) {
      setImageError("You can upload maximum 5 images only.");
      return;
    }

    setImageError("");
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });

    if (updatedImages.length < 5) {
      setImageError("Please upload at least 5 images.");
    } else {
      setImageError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEstimated) {
      alert("Please calculate estimated rent first");
      return;
    }

    const data = new FormData();

    data.append("item", itemId);
    data.append("estimateRent", estimateData.estimatedCost);
    data.append("platformFee", estimateData.platformFee);
    data.append("listersEarning", estimateData.listersEarning);
    data.append("listingPeriod", formData.listingPeriod);

    const res = listItem(data, token, navigate);
    console.log(res);
  };

  //invoice handler

  const handleInvoiceChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setImageError("Invoice must be a PDF file");
      return;
    }

    setImageError("");
    setFormData({ ...formData, invoice: file });
  };
  const handleCalculateRent = async () => {
    try {
      const data = new FormData();

      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("costPrice", formData.costPrice);
      data.append("monthUsed", formData.monthUsed);

      // images
      formData.images.forEach((img) => {
        data.append("itemImages", img);
      });

      // invoice
      if (formData.invoice) {
        data.append("invoice", formData.invoice);
      }
      console.log(data);
      //   if (formData.images.length < 5 || formData.images.length > 4) {
      //   setImageError("Please upload minimum 5 images.");
      //   return;
      // }
      const res = await createItem(data, token);

      if (!res.data.status === 200) {
        throw new Error("Calculation failed");
      }
      setItemId(res.data._id);
      setEstimateData(res.itemRent);
      setIsEstimated(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      {/* ===== STEPS ===== */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#212529]">
          List Your Items
        </h2>

        <div className="grid md:grid-cols-3 gap-8 bg-[#f8f9fa] p-6 rounded-xl">
          {[
            {
              icon: <FaClipboardList size={40} />,
              title: "Fill Item Details",
              desc: "Add accurate name, category, usage and pricing details.",
            },
            {
              icon: <FaImage size={40} />,
              title: "Upload Images",
              desc: "Upload clear images so users trust your listing.",
            },
            {
              icon: <FaCheckCircle size={40} />,
              title: "Submit for Approval",
              desc: "Our team reviews your item before it goes live.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-xl shadow-md text-center bg-[#ced4da]"
            >
              <div className="flex justify-center mb-4 text-gray-700">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#dee2e6] rounded-xl shadow-sm p-8 grid gap-6 max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-center text-[#212529]">
          Start Listing Your Items..
        </h1>

        {/* Item Name */}
        <div>
          <label className="font-medium text-[#495057]">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md focus:ring-2 focus:ring-[#495057]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium  text-[#495057] flex items-center gap-2">
            <FaLayerGroup /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Automobile">Automobile</option>
            <option value="Homea ppliances">Home Appliance</option>
            <option value="Books & Study">Books & Study</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium  text-[#495057]">Description</label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md"
          />
        </div>

        {/* Cost & Usage */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium  text-[#495057] flex items-center gap-2">
              <FaRupeeSign /> Cost Price
            </label>
            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md"
            />
          </div>

          <div>
            <label className="font-medium  text-[#495057] flex items-center gap-2">
              <FaCalendarAlt /> Months Used
            </label>
            <input
              type="number"
              name="monthUsed"
              value={formData.monthUsed}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md"
            />
          </div>
        </div>

        {/* Listing Period */}
        <div>
          <label className="font-medium  text-[#495057]">
            Listing Period (months)
          </label>
          <input
            type="number"
            name="listingPeriod"
            value={formData.listingPeriod}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-[#f8f9fa] rounded-md"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-medium  text-[#495057] flex items-center gap-2 mb-2">
            <FaImage /> Upload Images (min 5)
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed bg-[#f8f9fa] rounded-xl p-6 cursor-pointer hover:bg-[#f1f3f5] transition">
            <FaUpload className="text-xl text-gray-500 mb-2" />
            <p className="text-sm text-gray-600">Click to upload images</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <p className="text-xs text-gray-500 mt-2">
            {formData.images.length}/5 images selected
          </p>

          {imageError && (
            <p className="text-red-500 text-sm mt-2">{imageError}</p>
          )}

          {/* PREVIEW */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {formData.images.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Upload */}
        <div>
          <label className="font-medium flex items-center gap-2 text-[#495057] mb-2">
            <FaUpload /> Upload Purchase Invoice (PDF)
          </label>

          <div className="mt-2 border-2 border-dashed border-gray-900 rounded-lg p-4 hover:border-gray-400 transition bg-[#f8f9fa] cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleInvoiceChange}
              className="w-full"
            />

            {formData.invoice && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                <span className="text-sm text-gray-700 truncate">
                  {formData.invoice.name}
                </span>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, invoice: null })}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCalculateRent}
          className="bg-[#495057] text-white py-2 rounded-md hover:bg-[#343a40] transition font-medium"
        >
          Calculate Estimated Rent
        </button>
        {isEstimated && estimateData && (
          <div className="bg-[#ced4da] rounded-lg p-4 grid gap-3">
            <h3 className="font-semibold text-[#212529]">
              Estimated Earnings Breakdown
            </h3>

            <div className="flex justify-between text-sm">
              <span>Estimated Rent</span>
              <span>₹ {estimateData.estimatedCost}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Platform Fee</span>
              <span>₹ {estimateData.platformFee}</span>
            </div>

            <div className="flex justify-between text-sm font-semibold">
              <span>Your Earnings</span>
              <span>₹ {estimateData.listersEarning}</span>
            </div>
          </div>
        )}

        {/* SUBMIT */}
        {/* <button
          type="submit"
          className="bg-[#212529] text-white py-3 rounded-md hover:bg-[#343a40] transition font-medium cursor-pointer"
        >
          Submit for Admin's Approval
        </button> */}
        <button
          type="submit"
          disabled={!isEstimated}
          className={`py-3 rounded-md font-medium transition ${
            isEstimated
              ? "bg-[#212529] text-white hover:bg-[#343a40]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit for Admin's Approval
        </button>
      </form>
    </div>
  );
};

export default ListItem;
