// here we Go
const ListedItem = require("../model/listedItem");
const RentedItem = require("../model/rentedItem");

const OrderSummary = require("../models/OrderSummary");
const Item = require("../models/Item");
const User = require("../models/User");

exports.createOrderSummary = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you use auth middleware
    const {
      itemId,
      months,
      rentPerMonth,
      deliveryCharges,
      platformFee,
      gst,
      securityDeposit,
    } = req.body;

    //  Validate required fields
    if (
      !itemId ||
      !months ||
      !rentPerMonth ||
      !deliveryCharges ||
      !platformFee ||
      !gst ||
      !securityDeposit
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    //  Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    //  Check item exists
    const item = await ListedItem.findOne({ item: itemId });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found." });
    }

    //  Check item availability
    if (item.isActive === true) {
      return res.status(400).json({
        success: false,
        message: "This item is already rented by another customer.",
      });
    }

    //  Prevent creating multiple summaries for same item & user
    const existing = await OrderSummary.findOne({
      rentedItem: itemId,
      rentedBy: userId,
    });

    if (existing && existing.expiresAt > new Date()) {
      return res.status(200).json({
        success: true,
        message: "Order summary already exists.",
        summary: existing,
      });
    }

    //  Server-side calculations (tampering protected)
    const firstMonthRent =
      rentPerMonth + deliveryCharges + platformFee + gst + securityDeposit;
    const autopayRent = rentPerMonth + platformFee;
    const totalAmount = firstMonthRent + autopayRent * (months - 1);

    //  Create new summary
    const summary = await OrderSummary.create({
      rentedItem: itemId,
      rentedBy: userId,
      month: months,
      rentPerMonth,
      platformFee,
      gst,
      securityDeposit,
      firstMonthRent,
      autopayRent,
      totalAmount,
      deliveryCharges,
    });

    return res.status(201).json({
      success: true,
      message: "Order summary created successfully.",
      summary,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

exports.getOrderSummary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order Summary ID is required",
      });
    }
    const summary = await OrderSummary.findById(id);
    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Order Summary not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order Summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    console.log("Error in getOrderSummary controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

// const createRentedItem = async (req, res) => {
//   try {
//     const {
//       userId,
//       itemId,
//       startDate,
//       months,
//       address,
//       rentPerMonth,
//       gst,
//       platformFee,
//       securityDeposit,
//       firstMonthPayment,
//       monthlyAutopay,
//       totalPrice,
//       maintenanceCount,
//     } = req.body;

//     if (
//       !userId ||
//       !itemId ||
//       !startDate ||
//       !months ||
//       !address ||
//       !rentPerMonth ||
//       !gst ||
//       !platformFee ||
//       !securityDeposit ||
//       !firstMonthPayment ||
//       !monthlyAutopay ||
//       !totalPrice
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // CHECK ITEM EXISTS + APPROVED
//     const listedItemDetails = await listedItem
//       .findOne({ item: itemId })
//       .populate("listedBy");
//     if (!listedItemDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Listed item not found",
//       });
//     }
//     if (listedItemDetails.status !== "approved") {
//       return res.status(400).json({
//         success: false,
//         message: "Item is not approved for renting",
//       });
//     }
//     //  CHECK IF ITEM IS ALREADY RENTED
//     if (listedItemDetails.isActive === true) {
//       return res.status(400).json({
//         success: false,
//         message: "This item is already rented to someone else.",
//       });
//     }
//   } catch (error) {}
// };

exports.getRentedItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const rentedItems = await RentedItem.find({ rentedBy: userId })
      .populate("item")
      .exec();
    return res.status(200).json({
      status: true,
      data: rentedItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
