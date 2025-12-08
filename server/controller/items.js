const User = require("../model/user");
const Item = require("../model/item");
const ListedItem = require("../model/listedItem");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");
const {sendEmail} = require("../utils/Nodemailer");
const statusTemplate = require("../mail/stateTemplate");
const categories = require("../model/categories");
const { estimatedRent} = require("../utils/estimatedCost")

exports.createItem = async (req, res) => {
  try {
    const { itemName, description, category, costPrice, monthUsed } = req.body;
    console.log("req.body:", req.body);
    if (!itemName || !description || !category || !costPrice || !monthUsed) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryExists = await categories.findOne({ name: category });
    if (!categoryExists) {
      return res.status(401).json({
        success: false,
        message: "Category does not exist",
      });
    }

    console.log("req.files:", req.files);
    const invoice = req.files.invoice;
    const image = req.files.itemImages;
    console.log("invoice:", invoice);
    console.log("item images:", image);
    if (!invoice || !image) {
      return res.status(401).json({
        success: false,
        message: "Invoice and Itemimages required!",
      });
    }

    const invoiceUrl = await cloudinaryUpload(invoice, "Rentify");
    // Item images stored in cloudinary;
    var imageFiles = [];

    if (Array.isArray(req.files.itemImages)) {
      imageFiles = req.files.itemImages;
    } else {
      imageFiles = [req.files.itemImages];
    }
    console.log("image files: ", imageFiles);

    const imageUrls = await Promise.all(
      imageFiles.map((img) => cloudinaryUpload(img, "Rentify"))
    );

    const images = imageUrls.map((res) => res.secure_url);

    const item = await Item.create({
      itemName: itemName,
      description: description,
      category: categoryExists?._id,
      costPrice: costPrice,
      monthUsed: monthUsed,
      invoice: invoiceUrl?.secure_url,
      itemImages: images,
    });

    console.log("items: ", item);
    const itemRent = estimatedRent(costPrice, monthUsed);
    console.log("item rent: ", itemRent);

    return res.status(200).json({
      success: true,
      message: "Item is created and listed successfull, Now wait for approval",
      data: item,
      itemRent,
    });
  } catch (error) {
    console.log("Error in createItem controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.listItem = async (req, res) => {
  try {
    const { item, estimatedRent, platformFee, listersEarning, listingPeriod } =
      req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!item || !estimatedRent || !platformFee || !listersEarning) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    const listitem = await ListedItem.create({
      item: item,
      listedBy: userId,
      status: "pending",
      estimatedRent: estimatedRent,
      platformFee: platformFee,
      listersEarning: listersEarning,
      listedOn: null,
      listingPeriod,
      isActive: null,
    });

    await User.findByIdAndUpdate(
      req.user.userId,
      {
        $push: { listed: listitem._id },
      },
      { new: true }
    );

    await sendEmail(
      req.user.email,
      "Item Listed Successfully - Rentify",
      statusTemplate("pending", item.itemName)
    );
    return res.status(200).json({
      success: true,
      message: "Item is listed successfully, Now wait for approval",
      data: listitem,
    });
  } catch (error) {
    console.log("Error in listItem controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
