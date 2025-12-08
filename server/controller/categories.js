const Category = require("../model/categories");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, services } = req.body;
    if (!name || !description || !services) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }
    const category = await Category.create({
      name: name,
      description: description,
      services: services,
    });

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category not created",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log("Error in createCategory controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log("Error in getAllCategories controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const categoryId = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const categorydDetails = await Category.findById(categoryId)
      .populate("items")
      .exec();
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    }).limit(5);

    return res.status(200).json({
      success: true,
      message: "Category details fetched successfully",
      data: categorydDetails,
      differentCategories,
    });
  } catch (error) {
    console.log("Error in getCategoryDetails controller:", error);
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
