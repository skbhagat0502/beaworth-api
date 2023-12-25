import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/payment/process").post(checkout);

router.route("/paymentverification").post(paymentVerification);

export default router;
