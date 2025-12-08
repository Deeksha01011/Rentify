const mongoose = require("mongoose");

const listedItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // default jab user list kare
    },
    estimateRent: {
      type: Number,
    },
    platformFee: {
      type: Number,
    },
    listersEarning: {
      type: Number,
    },
    listedOn: {
      type: Date,
    },
    listingPeriod: {
      type: Number, // in months
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false, // default false until approved
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListedItem", listedItemSchema);
