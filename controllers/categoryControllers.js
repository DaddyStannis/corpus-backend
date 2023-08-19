import { Category } from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const result = await Category.find();
  res.json(result);
};

export const addCategory = async (req, res) => {
  const result = await Category.create({ ...req.body });
  res.status(201).json(result);
};

export const deleteCategory = async (req, res) => {
  const {categoryId} = req.params
  const result = await Category.findByIdAndRemove(categoryId);
  if (!result) {
    throw HttpError(404, `Category with id ${categoryId} not found`);
  }
  res.json({ message: "Category deleted" });
};
