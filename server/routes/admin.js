const express = require("express");
const { authenticate, isAdmin } = require("../middleware/auth");
const {
  getPendingListings,
  updateListingStatus,
  getApprovedList,
  adminDashboard,
  getRejectedList,
} = require("../controller/admin");
const router = express.Router();
// not tested yet
router.get("/getpendinglists", authenticate, isAdmin, getPendingListings);
router.post("/updatelistingstatus", authenticate, isAdmin, updateListingStatus);
router.get("/getapprovedlists", authenticate, isAdmin, getApprovedList);
router.get("/rejectedLists",authenticate,isAdmin,getRejectedList)
router.get("/adminanalytics", authenticate, isAdmin, adminDashboard);
module.exports = router;