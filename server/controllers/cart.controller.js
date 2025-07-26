import CartProductModel from "../models/cartProduct.model.js";
import CartModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemContorller = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(402).json({
        message: "Provide product",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already added",
        error: true,
        success: false,
      });
    }

    const cartItem = new CartProductModel({
      productId: productId,
      quantity: 1,
      userId: userId,
    });

    const save = await cartItem.save();

    const updateUserCart = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.json({
      data: save,
      message: "item added successfully",
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

export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");
    return res.json({
      data: cartItem,
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

export const updateCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;
    if (!_id || !qty) {
      return res.status(400).json({
        message: "provide_id, quantity",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      { _id: _id },
      { quantity: qty }
    );
    return res.json({
      message: "Item added",
      error: false,
      success: true,
      data: updateCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;
    if (!_id) {
      return res.json({
        message: "Provide _id",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });
    return res.json({
      message: "Removed",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
