import express from "express";
import {
  newOrder,
  getSellerOrders,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateOrderSeller,
  getSingleOrderForSeller,
} from "../controllers/orderController.js";
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router
  .route("/seller/order/:id")
  .get(isAuthenticatedUser, getSingleOrderForSeller);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/seller/orders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
router
  .route("/seller/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrderSeller);

export default router;
