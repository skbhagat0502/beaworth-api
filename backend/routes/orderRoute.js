const express = require("express");
const {
  newOrder,
  getSellerOrders,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateOrderSeller,
  getSingleOrderForSeller,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

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

module.exports = router;
