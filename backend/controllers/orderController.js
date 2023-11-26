const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shopkeeper = require("../models/shopModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const newOderTemplateForOwner = require("../emailTemplates/newOrderTemplateForOwner");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const message = newOderTemplateForOwner(req.body);
  const currentUser = await User.findById(req.user._id);
  await sendEmail({
    email: currentUser.email,
    subject: "Your order is on your way!",
    message,
  });
  const orderItemsWithShopkeepers = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      const user = await User.findById(product.user);
      await sendEmail({
        email: user.email,
        subject: `You have a new order!`,
        message,
      });
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        product: product._id,
        shopkeeper: user._id,
      };
    })
  );

  try {
    await sendEmail({
      email: "beaworthbusiness@gmail.com",
      subject: `New Order!!!`,
      message,
    });
    const order = await Order.create({
      shippingInfo,
      orderItems: orderItemsWithShopkeepers,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
});

// get Single Order--Admin
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
// get Single Order--Seller
exports.getSingleOrderForSeller = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  const userId = req.user.id;
  const singleOrderItems = order.orderItems;
  const filteredItems = singleOrderItems.filter((orderItem) => {
    return orderItem.shopkeeper == userId;
  });
  order.orderItems = filteredItems;
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//Update Order Status--Seller
exports.updateOrderSeller = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

//Get orders of seller
exports.getSellerOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = [];
  const userId = req.user.id;
  const allOrders = await Order.find({ "orderItems.shopkeeper": userId });
  const singleOrder = allOrders.forEach((singleOrder) => {
    if (singleOrder.orderItems.length > 1) {
      const singleOrderItems = singleOrder.orderItems;
      const filteredItems = singleOrderItems.filter((orderItem) => {
        return orderItem.shopkeeper == userId;
      });
      singleOrder.orderItems = filteredItems;
    }
    orders.push(singleOrder);
  });
  let totalAmount = 0;
  orders.forEach((order) => {
    const singleOrderItems = order.orderItems;
    singleOrderItems.forEach((orderItem) => {
      totalAmount += orderItem.price;
    });
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
