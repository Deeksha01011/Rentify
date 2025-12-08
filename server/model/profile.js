const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    listerType: {
      type: String,
      enum: ["individual", "business", null],
      default: null,
    },

    isLister: {
      type: Boolean,
      default: false,
    },
    // Sirf business ke liye
    companyName: {
      type: String,
      default: null,
    },
    gstNumber: {
      type: String,
      default: null,
    },

    // Sirf individual ke liye
    aadhaarNumber: {
      type: String,
      default: null,
    },

    accountHolderName: {
      type: String,
      default: null,
    },
    accountNumber: {
      type: String,
      default: null,
    },
    ifscCode: {
      type: String,
      default: null,
    },
    bankName: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
