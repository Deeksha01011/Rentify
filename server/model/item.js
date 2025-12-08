const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    monthUsed: {
      type: Number,
      required: true,
      min: 0,
    },
    invoice: {
      type: String, // invoice file URL
    },
     itemImages: {
      type: [String], // array of image URLs
      validate: {
        validator: function (v) {
          return v.length >= 5; // at least 5 images required
        },
        message: "An item must have at least 5 images.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
