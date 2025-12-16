import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiShoppingBag } from "react-icons/gi";
import { FaRegClock, FaCreditCard } from "react-icons/fa";
import allProducts from "../../data/products";
import { calculateRentalCost } from "../../utils/rentalCalculator";

import ImageGallery from "./components/ImageGallery";
import SellerInfo from "./components/SellerInfo";
import SpecsTable from "./components/SpecsTable";

const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));
  const [selectedMonth, setSelectedMonth] = useState(1);

  if (!product) {
    return <div className="text-center mt-24 text-[#6c757d]">Product not found</div>;
  }

  const breakdown = calculateRentalCost([product.price, selectedMonth]);

  // ===== Steps cards data =====
  const steps = [
    {
      title: "Select Product",
      desc: "Choose your desired product from our wide range of options.",
      icon: <GiShoppingBag className="text-3xl text-[#212529]" />,
    },
    {
      title: "Select Rental Period",
      desc: "Decide the rental duration that suits you best.",
      icon: <FaRegClock className="text-3xl text-[#212529]" />,
    },
    {
      title: "Pay & Enjoy",
      desc: "Make payment securely and enjoy hassle-free renting.",
      icon: <FaCreditCard className="text-3xl text-[#212529]" />,
    },
  ];

  // ===== Duration selection cards =====
  const durations = [1, 3, 6, 12];

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#adb5bd] border border-[#dee2e6] rounded-xl shadow-sm p-5 flex flex-col gap-5"
        >
          <ImageGallery images={[product.image]} />

          <div className="flex justify-between text-sm text-[#495057] bg-[#e9ecef] p-5 rounded-lg">
            <span>⭐ 4.5 Rating</span>
            <span>🚚 Free delivery</span>
            <span>🔒 100% Secure</span>
          </div>

          <Link to={`/checkout/${product.id}?months=${selectedMonth}&price=${product.price}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#212529] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#343a40] transition cursor-pointer"
            >
              Rent Now
            </motion.button>
          </Link>

          {/* Steps cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border border-[#dee2e6] rounded-xl p-4 flex flex-col items-center text-center shadow-sm cursor-pointer transition"
              >
                <div className="mb-3">{step.icon}</div>
                <h4 className="font-semibold text-[#212529] mb-1">{step.title}</h4>
                <p className="text-sm text-[#495057]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#adb5bd] border border-[#dee2e6] rounded-xl shadow-sm p-6 flex flex-col gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#212529]">{product.title}</h1>
            <p className="text-[#495057] italic mt-2">{product.description}</p>
          </div>

          <SellerInfo />

          {/* Duration cards replacing RentPlans */}
         {/* Duration + Rent cards */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
  {durations.map((month) => {
    const breakdown = calculateRentalCost([product.price, month]);
    const isSelected = selectedMonth === month;

    return (
      <motion.div
        key={month}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setSelectedMonth(month)}
        className={`cursor-pointer rounded-xl p-4 text-center border-2 transition-colors duration-300
          ${isSelected
            ? "bg-[#495057] border-[#495057] text-white"
            : "bg-[#f8f9fa] border-[#dee2e6] text-[#212529] hover:bg-[#e9ecef] hover:border-[#adb5bd]"}`
        }
      >
        <p className="font-semibold text-lg">{month} {month === 1 ? "Month" : "Months"}</p>
        <p className="text-sm mt-1">₹{breakdown.rentTotal}</p>
      </motion.div>
    );
  })}
</div>


          <div className="mt-4 bg-[#e9ecef] border border-[#dee2e6] rounded-lg p-4 text-[#495057]">
            <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
            <div className="flex justify-between py-1">
              <span>Rent ({selectedMonth} month)</span>
              <span>₹{breakdown.rentTotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>GST (18%)</span>
              <span>₹{breakdown.gstAmount}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Delivery Fee</span>
              <span>₹{breakdown.deliveryFee}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Platform Fee</span>
              <span>₹{breakdown.platformFee}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Security Deposit</span>
              <span>₹{breakdown.securityDeposit}</span>
            </div>
            <div className="border-t border-[#adb5bd] mt-2 pt-2 flex justify-between font-bold text-[#212529]">
              <span>Total Payable</span>
              <span>₹{breakdown.total}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
