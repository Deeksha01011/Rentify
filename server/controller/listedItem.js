const Item = require("../model/item");
const ListedItem = require("../model/listedItem");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
const User = require("../model/user");
const RentedItem = require("../model/rentedItem");
const { estimatedRent } = require("../utils/estimatedCost");

// lister ke liye useful controllers

exports.getlistItemDetails = async (req, res) => {
  try {
    const listingId = req.params;
    if (!listingId) {
      return res
        .status(400)
        .json({ success: false, message: "ListingId is required" });
    }
    const itemDetails = await ListedItem.findById(listingId)
      .populate({ path: "item", populate: { path: "category" } })
      .populate({ path: "listedBy", populate: { path: "additionalDetails" } });
    if (!itemDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Listed item not found" });
    }
    return res.status(200).json({
      success: true,
      data: itemDetails,
    });
  } catch (error) {
    console.error("Error in getlistItemDetails controller:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const myListings = await ListedItem.find({ listedBy: req.user.userId })
      .populate("item")
      .select("itemName estimateRent status listedOn isActive")
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({
      success: true,
      data: myListings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Listing Controller
exports.updateListing = async (req, res) => {
  try {
    // const { listingId } = req.params;
    const {
      listingId,
      itemName,
      description,
      category,
      costPrice,
      monthUsed,
      listingPeriod,
    } = req.body;

    // const invoice = req.files.invoice;
    // const itemImagesFiles = req.files.itemImages;

    // Find listing
    const listing = await ListedItem.findOne({
      _id: listingId,
      listedBy: req.user.userId, // ensure user can only update their own listing
    }).populate("item");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Sirf pending ya rejected state me edit allowed
    if (listing.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Approved listing cannot be updated",
      });
    }

    // Update item fields
    if (itemName) listing.item.itemName = itemName;
    if (description) listing.item.description = description;
    if (category) listing.item.category = category;
    if (costPrice) listing.item.costPrice = costPrice;
    if (monthUsed) listing.item.monthUsed = monthUsed;

    // File uploads handling (optional)
    if (req.files) {
      if (req.files.invoice) {
        const invoiceUrl = await cloudinaryUpload(req.files.invoice, "Rentify");
        listing.item.invoice = invoiceUrl.secure_url;
      }

      if (req.files.itemImages) {
        let imageFiles = [];
        if (Array.isArray(req.files.itemImages)) {
          imageFiles = req.files.itemImages;
        } else {
          imageFiles = [req.files.itemImages];
        }

        const imageUrls = await Promise.all(
          imageFiles.map((img) => cloudinaryUpload(img, "Rentify"))
        );

        listing.item.itemImages = imageUrls.map((res) => res.secure_url);
      }
    }

    // Update listing period if provided
    if (listingPeriod) {
      listing.listingPeriod = listingPeriod;
    }
    const newRent = estimatedRent(costPrice, monthUsed);
    if (newRent) {
      listing.estimateRent = newRent.estimatedCost;
      listing.platformFee = newRent.platformFee;
      listing.listersEarning = newRent.listersEarning;
    }

    // Save changes
    await listing.item.save();
    await listing.save();

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully. Awaiting approval if required.",
      listing,newRent
    });
  } catch (error) {
    console.log("Error in updateListing controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const  listingId  = req.body;

    // Find listing with item details
    const listing = await ListedItem.findOne({
      _id: listingId,
      listedBy: req.user.userId,
    }).populate("item");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found or not owned by you",
      });
    }

    // Only allow delete if pending or rejected
    if (listing.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Approved listing cannot be deleted",
      });
    }

    // Delete item (optional but clean DB)
    await Item.findByIdAndDelete(listing.item._id);

    // Remove listing reference from user
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { listed: listing._id },
    });

    // Delete the listed item
    await ListedItem.findByIdAndDelete(listingId);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteListing controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getUserAnalytics = async (req, res) => {
  try {
    const listerId = req.user.userId; // assuming JWT auth middleware sets req.user

    // Fetch all listings created by this lister
    const listings = await ListedItem.find({ listedBy: listerId }).populate(
      "item"
    );
    const rentedItems = await RentedItem.find({ rentedBy: listerId }).populate(
      "item"
    );

    if (!listings || listings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No listings found for this user",
        data: {
          totalListings: 0,
          approved: 0,
          rejected: 0,
          pending: 0,
          totalEarnings: 0,
          averageRent: 0,
          totalRentedItems: 0,
        },
      });
    }

    // Calculate stats
    const totalListings = listings.length;
    const approved = listings.filter((i) => i.status === "approved").length;
    const rejected = listings.filter((i) => i.status === "rejected").length;
    const pending = listings.filter((i) => i.status === "pending").length;

    // Total & average earning (only approved listings count)
    const totalEarnings = listings
      .filter((i) => i.status === "approved")
      .reduce((sum, i) => sum + (i.listersEarning || 0), 0);

    // const averageRent =
    //   approved > 0 ? (totalEarnings / approved).toFixed(2) : 0;

    return res.status(200).json({
      success: true,
      message: "Lister analytics fetched successfully",
      data: {
        totalListings,
        approved,
        rejected,
        pending,
        totalEarnings,
        totalRentedItems: rentedItems.length,
        listings

      },
    });
  } catch (error) {
    console.error("Error fetching lister analytics:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};

