const mongoose = require("mongoose");
const sendEmail = require("../utils/Nodemailer");
const otpTemplate = require("../mail/emailVerification");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // 5 minutes expiration
  },
});

async function sendVerificationEmail(email, otp) {
  // Email sending logic here
  try {
    const mailResponse = await sendEmail(
      email,
      "Email Verification",
      otpTemplate(otp)
    );
    console.log("Mail response:", mailResponse);
    if (mailResponse) {
      console.log(
        "Verification email sent successfully ",
        mailResponse.messageId
      );
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log("New OTP document being saved, sending verification email...");
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Error in pre-save hook while sending email:", error);
      next(error); // Pass the error to the next middleware
    }
  }
  next();
});
module.exports = mongoose.model("Otp", otpSchema);
