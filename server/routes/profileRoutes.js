const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  updateProfile,
  getUserDetails,
  updateProfilePicture,
  deleteUserprofile,
} = require("../controller/profile");
const { changePassword } = require("../controller/resetpassword");
// Profile Routes

// not Tested yet
router.post("/updateprofile", authenticate, updateProfile);
router.get("/getuserdeatils", authenticate, getUserDetails);
router.post("/uploadprofileimage", authenticate, updateProfilePicture);
router.delete("/deleteaccount", authenticate, deleteUserprofile);
router.post("/changepassword", authenticate, changePassword);
module.exports = router;
