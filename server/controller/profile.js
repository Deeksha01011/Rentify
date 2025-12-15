const User = require("../model/user");
const Profile = require("../model/profile");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
const ListedItem = require("../model/listedItem");
const Renteditem = require("../model/rentedItem");

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      city,
      state,
      country,
      isLister,
      listerType,
      companyName,
      gstNumber,
      aadhaarNumber,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
    } = req.body;
    if (!phoneNumber || !city || !state || !country) {
      return res.status(400).json({
        success: false,
        message: "Phone number and address are required",
      });
    }
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );
    console.log(user);
    if (isLister) {
      if (listerType === "individual" && !aadhaarNumber) {
        return res
          .status(400)
          .json({ success: false, message: "Aadhaar number is required" });
      }
      if (listerType === "business" && !gstNumber) {
        return res
          .status(400)
          .json({ success: false, message: "GST number is required" });
      }
    }
    console.log("Updating profile details...");
    console.log(
      firstName,
      lastName,
      phoneNumber,
      city,
      state,
      country,
      isLister,
      listerType,
      companyName,
      gstNumber,
      aadhaarNumber,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName
    );

    const profileDetails = await Profile.findById(user.additionalDetails);
    profileDetails.phoneNumber = phoneNumber;
    profileDetails.city = city;
    profileDetails.state = state;
    profileDetails.country = country;

    profileDetails.isLister = isLister;
    if (isLister) {
      if (listerType === "individual") {
        profileDetails.listerType = "individual";
        profileDetails.aadhaarNumber = aadhaarNumber;
        profileDetails.accountHolderName = accountHolderName;
        profileDetails.accountNumber = accountNumber;
        profileDetails.ifscCode = ifscCode;
        profileDetails.bankName = bankName;
      } else {
        profileDetails.listerType = "business";
        profileDetails.companyName = companyName;
        profileDetails.gstNumber = gstNumber;
        profileDetails.accountHolderName = accountHolderName;
        profileDetails.accountNumber = accountNumber;
        profileDetails.ifscCode = ifscCode;
        profileDetails.bankName = bankName;
      }
    } else {
      profileDetails.listerType = null;
      profileDetails.companyName = null;
      profileDetails.gstNumber = null;
      profileDetails.aadhaarNumber = null;
      profileDetails.accountHolderName = null;
      profileDetails.accountNumber = null;
      profileDetails.ifscCode = null;
      profileDetails.bankName = null;
    }

    await profileDetails.save();

    user.isProfileComplete = true;
    await user.save();
    //  find updated profile details
    const updateUser = await User.findById(req.user.userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.userId;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await User.findById(id).populate("additionalDetails").exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error in getUserDetails controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

async function cloudinaryUploadImage(file, folder) {
  const options = { folder };
  options.resource_type = "auto";

  // console.log(file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
const validatesize = (file) => {
  return file < 500000; // 500kb
};

exports.updateProfilePicture = async (req, res) => {
  try {

    console.log("backend me hu")
    const userId = req.user.userId;
    const file = req.files.profilePicture;
    console.log("backend wala call",file);
    console.log(userId);

    if (!userId || !file) {
      return res.status(400).json({
        success: false,
        message: "User id and profile picture are required",
      });
    }
    // validatae image

    const supportedImageTypes = ["jpeg", "png", "jpg"];
    const imageType = file.name.split(".").pop().toLowerCase();

    // const imageSize = file.size;
    // console.log(imageSize);
    // if (!validatesize(imageSize)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Image size should be less than 500kb",
    //   });
    // }

    if (!supportedImageTypes.includes(imageType)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported image type. Only JPEG, PNG, and JPG are allowed.",
      });
    }
    // upload image to cloudinary
    const Result = await cloudinaryUpload(file, "Rentify");
    console.log(Result);
    // update user profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { image: Result.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while updating profile picture",
      error: error.message,
    });
  }
};

exports.deleteUserprofile = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(user.additionalDetails);
    }

    if (user.listed.length > 0) {
      for (const itemId of user.listed) {
        await ListedItem.findByIdAndDelete(itemId);
      }
    }
    if (user.rented.length > 0) {
      for (const rentedItemId of user.rented) {
        await Renteditem.findByIdAndDelete(rentedItemId);
      }
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while deleting Account",
      error: error.message,
    });
  }
};
