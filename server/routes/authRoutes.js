const express = require("express");
const router = express.Router();

const { sendOtp, login, signUp } = require("../controller/user");
const {
  resetPasswordToken,
  resetpassword,
  changePassword,
} = require("../controller/resetpassword");
const { authenticate } = require("../middleware/auth");

router.post("/send-otp", sendOtp);
router.post("/signup", signUp);
router.post("/login", login);
// not tested yet
router.post("/reset-password-token", resetPasswordToken);
router.post("/resetpassword", resetpassword);
router.post("/changepassword", authenticate, changePassword);

module.exports = router;
