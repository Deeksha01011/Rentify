const User = require("../model/user");
const Otp = require("../model/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profile = require("../model/profile");

// OTP generation function

exports.sendOtp = async (req, res) => {
  try {
    // fetch email from req.body
    const { email } = req.body;
    // check user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    // generate OTP
    var otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);

    // check otp already exists
    var otpExists = await Otp.findOne({ otp });
    while (otpExists) {
      otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      otpExists = await Otp.findOne({ otp });
    }

    // create otp entry in db
    const payload = {
      email,
      otp,
    };
    // save otp entry in db
    const otpBody = await Otp.create(payload);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otpBody, // remove this in production
    });
  } catch (error) {
    console.log("Error in sendOtp controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // validate password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }
    // check user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // find most recent otp stored for the user
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
    const profileDetails = await profile.create({
      city: null,
      state: null,
      country: null,
      phoneNumber: null,
      isLister: null,
      listerType: null,
      companyName: null,
      gstNumber: null,
      aadhaarNumber: null,
      accountHolderName: null,
      accountNumber: null,
      ifscCode: null,
      bankName: null,
    });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const userPayload = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    };
    const user = await User.create(userPayload);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error in signUp controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };

      // gernerate JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      user.password = undefined; // remove password from user object
      let userObj = user.toObject(); // convert mongoose object to plain object
      userObj.token = token; // add token to user object
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: userObj,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.log("Error in login controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
