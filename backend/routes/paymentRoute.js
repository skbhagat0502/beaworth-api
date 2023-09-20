const express = require("express");
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController");

const router = express.Router();

router.route("/payment/process").post(checkout);

router.route("/paymentverification").post(paymentVerification);

module.exports = router;
