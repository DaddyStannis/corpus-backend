import express from "express";

import validateBody from "../decorators/validateBody.js";
import controlWrapper from "../decorators/controlWrapper.js";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";
import { addCategorySchema } from "../models/Category.js";

const router = express.Router();

router.get("/", controlWrapper(getAllCategories));

router.post("/", validateBody(addCategorySchema), controlWrapper(addCategory));

router.delete("/:categoryId", controlWrapper(deleteCategory));

export default router;
