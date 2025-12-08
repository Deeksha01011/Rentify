const moongoose = require("mongoose");

const rentedItemSchema = new moongoose.Schema(
  {
    item: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    rentedBy: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
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

    maintenanceCount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model("RentedItem", rentedItemSchema);
