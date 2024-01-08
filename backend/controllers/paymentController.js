import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/PaymentModel.js";
import { ORIGIN, RAZORPAY_API_KEY, RAZORPAY_API_SECRET } from "../constants.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorhander.js";

export const getRazorpayKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ key: RAZORPAY_API_KEY });
});
export const checkout = catchAsyncErrors(async (req, res, next) => {
  const orderAmount = Number(req.body.amount);
  const options = {
    amount: orderAmount,
    currency: "INR",
  };

  instance.orders.create(options, async (err, order) => {
    if (err) {
      return next(new ErrorHandler(err, 500));
    }
    res.status(200).json({
      success: true,
      order,
    });
  });
});

export const paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    });

    res.redirect(`${ORIGIN}/success?reference=${razorpay_payment_id}`);
  } else {
    return next(new ErrorHandler("Unauthorized error!", 400));
  }
});
