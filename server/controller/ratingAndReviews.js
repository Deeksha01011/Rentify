const ratingAndreviews = require("../model/ratingAndreviews");

exports.createRatingAndReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const userId = req.user._id;

    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Rating and review are required",
      });
    }
    const ratingReview = await ratingAndreviews.create({
      user: userId,
      rating: rating,
      review: review,
    });
    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      data: ratingReview,
    });
  } catch (error) {
    console.log("Error in createRatingAndReview controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getAllRatingReviews = async (req, res) => {
  try {
    const ratingReviews = await ratingAndreviews
      .find()
      .populate({ path: "user", select: "firstName lastName email image" });
    return res.status(200).json({
      success: true,
      message: "Rating and reviews fetched successfully",
      data: ratingReviews,
    });
  } catch (error) {
    console.log("Error in getAllRatingReviews controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
