import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  deleteProduct,
  getProductByCategory,
  getProductByCategoryIdAndSubCategoryId,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/admin.js";
const productRouter = Router();

productRouter.post("/create", auth,admin, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryIdAndSubCategoryId
);
productRouter.post("/get-product-details", getProductDetails);
productRouter.put("/update-product-details", auth,admin, updateProductDetails);
productRouter.delete("/delete-product", auth,admin, deleteProduct);
productRouter.post('/search-product',searchProduct)
export default productRouter;
