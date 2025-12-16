import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { calculateRentalCost } from "../../utils/rentalCalculator";
import allProducts from "../../data/products";

const Payment = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const months = Number(searchParams.get("months")) || 1;
  const product = allProducts.find((p) => p.id === Number(id));
  const [selectedPayment, setSelectedPayment] = useState("card");

  // Inputs
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  if (!product) {
    return <div className="text-center mt-20 text-[#6c757d]">Product not found</div>;
  }

  const breakdown = calculateRentalCost([product.price, months]);

  const handlePayNow = () => {
    let valid = true;
    if (selectedPayment === "upi" && !upiId) valid = false;
    if (selectedPayment === "card" && (!cardNumber || !expiry || (cvv === "" && cardNumber.startsWith("credit")))) valid = false;
    if (!valid) return alert("Please fill required details.");

    alert(`Payment of ₹${breakdown.total} successful!`);
    navigate("/"); // redirect after payment
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10">
      <div className="w-11/12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Payment Methods */}
        <div className="bg-white border border-[#dee2e6] rounded-xl shadow-sm p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-[#212529]">Select Payment Method</h2>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 p-3 border border-[#dee2e6] rounded-lg cursor-pointer hover:bg[#dee2e6] border-[#495057]">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <span className="text-[#212529] font-medium">Credit / Debit Card</span>
            </label>

            <label className="flex items-center gap-3 p-3 border border-[#dee2e6] rounded-lg cursor-pointer hover:border-[#495057]">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={selectedPayment === "upi"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <span className="text-[#212529] font-medium">UPI / Wallet</span>
            </label>

            <label className="flex items-center gap-3 p-3 border border-[#dee2e6] rounded-lg cursor-pointer hover:border-[#495057]">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <span className="text-[#212529] font-medium">Cash on Delivery</span>
            </label>
          </div>

          {/* Conditional Inputs */}
          {selectedPayment === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="mt-3 border border-[#dee2e6] rounded-lg p-2 text-[#212529]"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {selectedPayment === "card" && (
            <div className="flex flex-col gap-3 mt-3">
              <input
                type="text"
                placeholder="Last 5 digits of Card"
                maxLength={5}
                className="border border-[#dee2e6] rounded-lg p-2 text-[#212529]"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="border border-[#dee2e6] rounded-lg p-2 text-[#212529]"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              {cardNumber.startsWith("credit") && (
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={3}
                  className="border border-[#dee2e6] rounded-lg p-2 text-[#212529]"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              )}
            </div>
          )}

          {/* Pay Now Button */}
          <button
            onClick={handlePayNow}
            className="mt-6 w-full bg-[#212529] text-white py-3 rounded-lg font-semibold hover:bg-[#343a40] transition"
          >
            Pay ₹{breakdown.total} Now
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-[#dee2e6] rounded-xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[#212529]">Order Summary</h2>
          <div className="flex justify-between text-[#495057]">
            <span>{product.title} ({months} month{months > 1 ? "s" : ""})</span>
            <span>₹{breakdown.rentTotal}</span>
          </div>
          <div className="flex justify-between text-[#495057]">
            <span>GST (18%)</span>
            <span>₹{breakdown.gstAmount}</span>
          </div>
          <div className="flex justify-between text-[#495057]">
            <span>Delivery Fee</span>
            <span>₹{breakdown.deliveryFee}</span>
          </div>
          <div className="flex justify-between text-[#495057]">
            <span>Platform Fee</span>
            <span>₹{breakdown.platformFee}</span>
          </div>
          <div className="flex justify-between text-[#495057]">
            <span>Security Deposit</span>
            <span>₹{breakdown.securityDeposit}</span>
          </div>
          <div className="border-t border-[#adb5bd] mt-2 pt-2 flex justify-between font-bold text-[#212529] text-lg">
            <span>Total Payable</span>
            <span>₹{breakdown.total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
