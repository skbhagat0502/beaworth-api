import express from "express";
import {
  getAllProducts,
  getSellerProducts,
  createProduct,
  createProductSeller,
  updateProduct,
  deleteProduct,
  updateProductSeller,
  deleteProductSeller,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/seller/products")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/seller/product/new")
  .post(isAuthenticatedUser, authorizeRoles("seller"), createProductSeller);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/seller/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateProductSeller)
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProductSeller);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
