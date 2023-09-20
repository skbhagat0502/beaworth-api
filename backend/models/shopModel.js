const mongoose = require("mongoose");

const shopkeeperSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  fathersName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  shopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  category: { type: String, required: true },
  aadhaarCard: { type: String, required: true },
  panCard: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shopkeeper", shopkeeperSchema);
