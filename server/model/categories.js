const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    services: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
