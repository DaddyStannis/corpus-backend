import express from "express";
import validateBody from "../decorators/validateBody.js";
import controlWrapper from "../decorators/controlWrapper.js";
import upload from "../middlewares/upload.js";
import isValidID from "../middlewares/isValidID.js";
import {
  getProducts,
  getProductByID,
  addProduct,
} from "../controllers/productControllers.js";
import { addProductSchema } from "../models/Product.js";
import deleteTempPhotos from "../middlewares/deleteTempPhotos.js";

const router = express.Router();

router.get("/", controlWrapper(getProducts));

router.get("/:id", isValidID, controlWrapper(getProductByID));

router.post(
  "/",
  upload.array("photos", 10),
  validateBody(addProductSchema),
  controlWrapper(addProduct),
  deleteTempPhotos
);

export default router;
