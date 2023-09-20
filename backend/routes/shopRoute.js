const express = require("express");
const router = express.Router();
const { registerShopkeeper } = require("../controllers/shopController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/me/application")
  .post(isAuthenticatedUser, authorizeRoles("user"), registerShopkeeper);

module.exports = router;
