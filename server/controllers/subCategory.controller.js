import subCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { image, name, category } = req.body;
    if (!image || !name || !category[0]) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const newSubCategory = new subCategoryModel(payload);
    const save = await newSubCategory.save();
    return res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSubCategoryController = async (req, res) => {
  try {
    const data = await subCategoryModel
      .find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
    const checkSub = await subCategoryModel.findById(_id);
    if (!checkSub) {
      return res.status(400).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await subCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return res.json({
      message: "Updated Successfully",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteSubCategory = await subCategoryModel.findByIdAndDelete(_id);

    if (deleteSubCategory) {
      return res.json({
        message: "Subcategory Deleted Successfully",
        data: deleteSubCategory,
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
