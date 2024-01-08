import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { CatBaner } from "../models/catBanerModel.js";
import ErrorHandler from "../utils/errorhander.js";
import cloudinary from "cloudinary";

export const uploadCatBaner = catchAsyncErrors(async (req, res, next) => {
  const { image, category } = req.body;
  if (!image || !category) {
    return next(new ErrorHandler("Please fill all the details!"));
  }

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "catbaners",
  });

  const imageLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imageLink;
  const catbaner = await CatBaner.create(req.body);
  res.status(201).json({
    success: true,
    catbaner,
  });
});
export const getAllCatBaners = catchAsyncErrors(async (req, res, next) => {
  const catbaners = await CatBaner.find();
  res.status(200).json({
    success: true,
    catbaners,
  });
});
export const deleteCatBaner = catchAsyncErrors(async (req, res, next) => {
  const catbaner = await CatBaner.findById(req.params.id);
  if (!catbaner) {
    return next(new ErrorHandler("Baner not found", 404));
  }
  await cloudinary.v2.uploader.destroy(catbaner.image.public_id);
  await CatBaner.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Baner Deleted Successfully",
  });
});
export const getCatBanerDetails = catchAsyncErrors(async (req, res, next) => {
  const catbaner = await CatBaner.find({ category: req.params.category });
  if (!catbaner) {
    return next(new ErrorHandler("Baner not found", 404));
  }

  res.status(200).json({
    success: true,
    catbaner,
  });
});
