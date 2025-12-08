const mongoose = require("mongoose");
const orderSummarySchema = new mongoose.Schema({
  rentedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  rentPerMonth: {
    type: Number,
    required: true,
  },
  platformFee: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  firstMonthRent: {
    type: Number,
    required: true,
  },
  autopayRent: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  deliveryCharges: {
    type: Number,
    required: true,
  },
  expiresAt: { type: Date, default: () => Date.now() + 30 * 60 * 1000 }, // 30 min
});
module.exports = mongoose.model("OrderSummary", orderSummarySchema);
