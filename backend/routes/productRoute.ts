import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware";
import formidable from "express-formidable";
import {
  createProductController,
  getProductsController,
  getSingleProductsController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
} from "../controllers/productController";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("hi");
});
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-product", getProductsController);
router.get("/get-product/:slug", getSingleProductsController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);
router.post("/product-filter", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page?", productListController);
//search product router
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);
router.get("/product-category/:slug", productCategoryController);
export default router;
