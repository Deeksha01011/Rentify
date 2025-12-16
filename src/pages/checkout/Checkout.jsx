import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { calculateRentalCost } from "../../utils/rentalCalculator";
import { motion } from "framer-motion";

const Checkout = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const months = Number(searchParams.get("months")) || 1;
  const rentPerMonth = Number(searchParams.get("price")) || 0;

  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userAddress")) || ""
  );

  const [editable, setEditable] = useState(false);

  const breakdown = calculateRentalCost([rentPerMonth, months]);

  useEffect(() => {
    localStorage.setItem("userAddress", JSON.stringify(address));
  }, [address]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="w-11/12 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-[#dee2e6]">
        <h1 className="text-2xl font-bold text-[#212529] mb-6">
          Checkout
        </h1>

        {/* ADDRESS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold text-[#495057] mb-2">
            Delivery Address
          </h2>

          {editable ? (
            <textarea
              className="w-full p-3 border border-[#ced4da] rounded-md focus:outline-none focus:border-[#495057]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
            />
          ) : (
            <div className="p-3 border border-[#dee2e6] rounded-md text-[#343a40]">
              {address || "No address saved"}
            </div>
          )}

          <button
            className="mt-3 px-4 py-2 bg-[#495057] text-white rounded-md hover:bg-[#343a40] transition"
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Save Address" : address ? "Edit Address" : "Add Address"}
          </button>
        </motion.div>

        {/* RENTAL BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 border border-[#dee2e6] rounded-lg p-4 bg-[#e9ecef]"
        >
          <h2 className="text-lg font-semibold text-[#495057] mb-3">
            Order Summary
          </h2>

          <div className="flex justify-between py-1">
            <span>Rent ({months} month)</span>
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
        </motion.div>

        {/* PROCEED TO PAYMENT BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to={`/payment/${id}?months=${months}&price=${rentPerMonth}`}>
            <button
              className="w-full py-4 rounded-xl bg-[#212529] text-white text-lg hover:bg-black transition"
              disabled={!address}
            >
              Proceed to Payment
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
