const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  updateProfile,
  getUserDetails,
  updateProfilePicture,
  deleteUserprofile,
} = require("../controller/profile");
// Profile Routes

// not Tested yet
router.post("/updateprofile", authenticate, updateProfile);
router.get("/getuserdeatils", authenticate, getUserDetails);
router.post("/uploadprofileimage", authenticate, updateProfilePicture);
router.delete("/deleteaccount", authenticate, deleteUserprofile)
module.exports = router;
