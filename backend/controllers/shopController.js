const Shopkeeper = require("../models/shopModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerShopkeeper = catchAsyncErrors(async (req, res, next) => {
  const newShopkeeperData = req.body;
  req.body.user = req.user.id;

  try {
    const shopkeeper = await Shopkeeper.create(newShopkeeperData);

    res.status(201).json({ success: true, shopkeeper });
  } catch (error) {
    console.error("Error registering shopkeeper:", error);

    res
      .status(500)
      .json({ success: false, message: "Could not register shopkeeper" });
  }
});
