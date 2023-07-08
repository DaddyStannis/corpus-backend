import { Category } from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  const result = await Category.find();
  res.json(result);
};

export const addCategory = async (req, res) => {
  await Category.create({ ...req.body, quantity: 0 });
  res.status(201).json({ message: "Категорія успішно додана" });
};
