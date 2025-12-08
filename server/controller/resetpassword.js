const User = require("../model/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {sendEmail} = require("../utils/Nodemailer");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }
    // Generate a reset token
    const resetToken = crypto.randomUUID();
    const resetTokenExpiry = Date.now() + 5 * 60 * 1000; // Token valid for 5 minutes

    const updateDetails = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        token: resetToken,
        resetPasswordExpiry: resetTokenExpiry,
      },
      { new: true }
    );

    const url = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(email, "Reset your password", `Reset password link ${url}`);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      data: updateDetails,
    });
  } catch (error) {
    console.log("Error in resetPasswordToken controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.resetpassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (user.resetPasswordExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired, please try again later",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.token = null;
    user.resetPasswordExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully, please login with your new password",
    });
  } catch (error) {
    console.log("Error while reseting your password, Please try again later");
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = hashedPassword;
    await userDetails.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Error while changing your password, Please try again later");
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
