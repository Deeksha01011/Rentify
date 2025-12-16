const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryDetails,
} = require("../controller/categories");
const { authenticate, isAdmin } = require("../middleware/auth");
const { createItem, listItem } = require("../controller/items");
const {
  getMyListings,
  updateListing,
  deleteListing,
  getUserAnalytics,
  getlistItemDetails,
} = require("../controller/listedItem");
const {
  filterSearch,
  getAllListedItems,
  getLatestApprovedListings,
} = require("../controller/ImportantController");
const {
  getAllRatingReviews,
  createRatingAndReview,
} = require("../controller/ratingAndReviews");

// not tested yet
// item category api
router.post("/createcategories", authenticate, isAdmin, createCategory);
router.post("/getcategorydetails", getCategoryDetails);
router.get("/getallcategories", getAllCategories);

// items api

router.post("/createitem", authenticate, createItem);
router.post("/listitem", authenticate, listItem);
router.post("/getlistitemdetail", authenticate, getlistItemDetails);
router.get(
  "/latest",
  // agar admin-only chahiye toh
  getLatestApprovedListings
);

// listed items api
router.get("/listeditems", authenticate, getAllListedItems);
router.post("/updatelisting", authenticate, updateListing);
router.delete("/deletelisting", authenticate, deleteListing);
router.get("/userdashboard", authenticate, getUserAnalytics);

// filter searching

router.post("/filteritems", filterSearch);

// rating and reviews api
router.post("/createratingreview", authenticate, createRatingAndReview);
router.get("/getallratingreviews", authenticate, getAllRatingReviews);

module.exports = router;
