import express from "express";
import {
  checkout,
  paymentVerification,
  getRazorpayKey,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
router.route("/getkey", isAuthenticatedUser).get(getRazorpayKey);
router.route("/payment/process", isAuthenticatedUser).post(checkout);

router
  .route("/paymentverification", isAuthenticatedUser)
  .post(paymentVerification);

export default router;
