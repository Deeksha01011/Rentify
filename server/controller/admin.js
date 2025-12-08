const statusTemplate = require("../mail/stateTemplate");
const ListedItem = require("../model/listedItem");
const RentedItem = require("../model/rentedItem");
const { sendEmail } = require("../utils/Nodemailer");

exports.getPendingListings = async (req, res) => {
  try {
    const listings = await ListedItem.find({ status: "pending" })
      .populate("item")
      .populate("listedBy", "name email");
    if (!listings) {
      return res.status(404).json({
        success: false,
        message: "No pending listings found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Pending listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    console.log("Error in getPendingListings controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.updateListingStatus = async (req, res) => {
  try {
    const { listingId, status, reason } = req.body;
    if (!listingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Listing ID and status are required",
      });
    }
    const listing = await ListedItem.findById(listingId)
      .populate("item")
      .populate("listedBy", "name email");
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    listing.status = status;
    if (status === "approved") {
      listing.isActive = true;
      listing.listedOn = new Date();
    }
    if (status === "rejected" && reason) {
      listing.isActive = false;
      // Optionally, you can store the reason for rejection in the listing schema
      listing.rejectionReason = reason;
    }
    await listing.save();
    await sendEmail(
      listing.listedBy.email,
      `Your item listing has been ${status} - Rentify`,
      statusTemplate(status, listing.item.itemName, reason)
    );
    return res.status(200).json({
      success: true,
      message: `Listing has been ${status} successfully`,
      data: listing,
    });
  } catch (error) {
    console.log("Error in updateListingStatus controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getApprovedList = async (req, res) => {
  try {
    const listings = await ListedItem.find({ status: "approved" })
      .populate("item")
      .populate("listedBy", "name email");
    if (!listings) {
      return res.status(404).json({
        success: false,
        message: "No approved listings found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Approved listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    console.log("Error in getApprovedList controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getRejectedList = async (req, res) => {
  try {
    const listings = await ListedItem.find({ status: "rejected" })  
    if (!listings) {
      return res.status(404).json({
        success: false,
        message: "No rejected listings found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Rejected listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    console.log("Error in getRejectedList controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};


exports.adminDashboard = async (req, res) => {
  try {
    const totalListedItems = await ListedItem.countDocuments();
    const pendingLists = await ListedItem.countDocuments({ status: "pending" });
    const approvedLists = await ListedItem.countDocuments({
      status: "approved",
    });
    const rejectedLists = await ListedItem.countDocuments({
      status: "rejected",
    });
    const activeItems = await ListedItem.countDocuments({ isActive: true });
    const totalRentedItems = await RentedItem.countDocuments();

    const revenueStats = await RentedItem.aggregate([
      { $match: { paymentStatus: "completed" } },
      {
        $group: {
          _id: null,
          totalSecurityDeposit: { $sum: "$securityDeposit" },
          totalGst: { $sum: "$gst" },
          totalPlatformFee: { $sum: "$platformFee" },
          totalDeliveryCharges: { $sum: "$deliveryCharges" },
          totalRevenue: {
            $sum: {
              $add: [
                "$securityDeposit",
                "$gst",
                "$platformFee",
                "$deliveryCharges",
              ],
            },
          },
        },
      },
    ]);

    const revenue = revenueStats[0] || {
      totalSecurityDeposit: 0,
      totalGst: 0,
      totalPlatformFee: 0,
      totalDeliveryCharges: 0,
      totalRevenue: 0,
    };
    return res.status(200).json({
      success: true,
      message: "Admin dashboard stats fetched successfully",
      dashboard: {
        itemStats: {
          totalListedItems,
          approvedLists,
          pendingLists,
          rejectedLists,
          activeItems,
          totalRentedItems,

        },
        revenue,
      },
    });
  } catch (error) {
    console.log("Error in adminDashboards controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
