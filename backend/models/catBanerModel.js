import mongoose from "mongoose";

const catBanerSchema = new mongoose.Schema({
  id: String,
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const CatBaner = new mongoose.model("CatBaner", catBanerSchema);
