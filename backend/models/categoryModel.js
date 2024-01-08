import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: [
    {
      type: String,
    },
  ],
});

export const Category = mongoose.model("Category", categorySchema);
