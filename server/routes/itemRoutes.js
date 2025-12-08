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
const { filterSearch } = require("../controller/ImportantController");
const {
  getAllRatingReviews,
  createRatingAndReview,
} = require("../controller/ratingAndReviews");

// not tested yet
// item category api
router.post("/createcategories", authenticate, isAdmin, createCategory);
router.post("/getcategorydetails", authenticate, getCategoryDetails);
router.get("/getallcategories", authenticate, getAllCategories);

// items api

router.post("/createitem", authenticate, createItem);
router.post("/listitem", authenticate, listItem);
router.get("/getlistitemdetail", authenticate, getlistItemDetails);

// listed items api
router.get("/listeditems", authenticate, getMyListings);
router.post("/updatelisting", authenticate, updateListing);
router.delete("/deletelisting", authenticate, deleteListing);
router.get("/userdashboard", authenticate, getUserAnalytics);

// filter searching

router.post("/filteritems", filterSearch);

// rating and reviews api
router.post("/createratingreview", authenticate, createRatingAndReview);
router.get("/getallratingreviews", authenticate, getAllRatingReviews);

module.exports = router;
