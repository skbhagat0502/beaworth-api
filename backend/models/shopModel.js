import mongoose from "mongoose";
const shopkeeperSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  officialBusinessName: { type: String, required: true },
  businessNameOnBeaworth: { type: String, required: true },
  shopAddress: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, required: true },
  ifscCode: { type: String, required: true },
  panCard: { type: String, required: true },
  gstNo: { type: String },
  gstExem: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);
