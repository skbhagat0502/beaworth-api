const { instance } = require("../server");
const crypto = require("crypto");
const { Payment } = require("../models/PaymentModel");

const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;
const RAZORPAY_API_SECRET = process.env.RAZORPAY_API_SECRET;

const checkout = async (req, res) => {
  try {
    const orderAmount = req.body.amount * 100; // Convert to paisa
    const options = {
      amount: orderAmount,
      currency: "INR",
    };

    const order = await instance.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create order" });
      }

      return res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { order_id, paymentId, signature } = req.body;
    const body = order_id + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id: order_id,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      });

      res.redirect(
        `https://beaworth.onrender.com/sucess?reference=$(razorpay_payment_id)`
      );
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
};

module.exports = { checkout, paymentVerification };
