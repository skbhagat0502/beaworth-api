import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Category } from "../models/categoryModel.js";
import ErrorHandler from "../utils/errorhander.js";

export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

export const getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

export const newCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.body;
  if (!category) {
    return next(new ErrorHandler("Please enter a category!", 500));
  }
  const newCategory = await Category.create(req.body);
  console.log(newCategory);
  res.status(201).json({
    success: true,
    newCategory,
    message: "Category listed successfully!",
  });
});

export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  if (!category) {
    return next(new ErrorHandler("No category found for this id!", 400));
  }
  await Category.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: "Category deleted successfully!",
  });
});

export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  if (!category) {
    return next(new ErrorHandler("No category found with this id!", 500));
  }
  if (!req.body.category) {
    return next(new ErrorHandler("Category cannot be blank!", 400));
  }
  const updateCategory = await Category.findByIdAndUpdate(id, req.body);
  res.status(201).json({
    success: true,
    message: "Category updated successfully!",
    updateCategory,
  });
});
