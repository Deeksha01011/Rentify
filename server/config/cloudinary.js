const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "dchmaz6si",
      api_key: "921579219279593",
      api_secret: "1zuFqjf8M-oz3lS_o7pPPst5mSE",
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Cloudinary failed to connect", error);
  }
};
