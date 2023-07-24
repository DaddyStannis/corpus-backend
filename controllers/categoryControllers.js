import { Category } from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const result = await Category.find();
  res.json(result);
};

export const addCategory = async (req, res) => {
  const result = await Category.create({ ...req.body });
  res.status(201).json(result);
};
