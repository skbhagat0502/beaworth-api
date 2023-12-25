import express from "express";
const router = express.Router();
import { registerShopkeeper } from "../controllers/shopController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

router
  .route("/me/application")
  .post(isAuthenticatedUser, authorizeRoles("user"), registerShopkeeper);

export default router;
