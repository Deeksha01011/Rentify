const ListedItem = require("../model/listedItem");

exports.filterSearch = async (req, res) => {
  try {
    const { minRent, maxRent, category, city } = req.query;

    const filter = {
      isActive: false,
    };
    const pipeline = [
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "itemData",
        },
      },
      {
        $unwind: "$itemData",
      },
      {
        $lookup: {
          from: "categories",
          localField: "itemData.category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      { $unwind: "$categoryData" },
      {
        $lookup: {
          from: "users",
          localField: "listedBy",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $lookup: {
          from: "profiles",
          localField: "userData.additionalDetails",
          foreignField: "_id",
          as: "profileData",
        },
      },
      { $unwind: "$profileData" },

      //   Base filter
      {
        $match: {
          estimateRent: { $gte: minRent || 0, $lte: maxRent || 999999 },
          isActive: false,
        },
      },
    ];

    // Category filter

    if (category) {
      pipeline.push({
        $match: {
          "categoryData.name": { $regex: new RegExp(`^${category}$`, "i") },
        },
        // $match:{"categoryData.name":category}
      });
    }

    // city filter
    if (city) {
      pipeline.push({
        $match: {
          "profileData.city": { $regex: new RegExp(`^${city}$`, "i") },
        },
      });
    }

    // run pipeline
    const results = await ListedItem.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error("Error in filterSearch controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getAllListedItems = async (req, res) => {
  try {
    const Items = await ListedItem.find()
      .populate({ path: "item", populate: { path: "category" } })
      .populate("estimateRent")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All listed items fetched successfully",
      data: Items,
    });
  } catch (error) {
    console.error("Error in getAllListedItems controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
exports.getLatestApprovedListings = async (req, res) => {
  try {
    const approvedListings = await ListedItem.find({
      status: "approved",
      // isActive: true,
    })
      .populate({ path: "item", populate: { path: "category" } }) // item details
      .populate("listedBy") // user details
      .sort({ createdAt: -1 }) // latest first
      .limit(5); // sirf 5 items

    return res.status(200).json({
      success: true,
      message: "Latest approved listings fetched successfully",
      data: approvedListings,
    });
  } catch (error) {
    console.error("Error fetching approved listings:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};
