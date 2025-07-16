import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import subCategoryModel from "../models/subCategory.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({
        message: "Name and image are required",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({ name, image });
    const saveCategory = await addCategory.save();
    if (!saveCategory) {
      return res.status(500).json({
        message: "Failed to add category",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Category added successfully",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });
    return res.json({
      data: data,
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

export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const updatedCategory = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Category updated successfully",
      data: updatedCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await subCategoryModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message:
          "Cannot delete category, it is associated with products or subcategories",
        error: true,
        success: false,
      });
    }

    const deletedCategory = await CategoryModel.deleteOne({ _id: _id });

    return res.json({
      message: "Category deleted successfully",
      data: deletedCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};
