import express from "express";
import validateBody from "../decorators/validateBody.js";
import controlWrapper from "../decorators/controlWrapper.js";
import upload from "../middlewares/upload.js";
import isValidID from "../middlewares/isValidID.js";
import {
  getProductSamples,
  getProductSampleByID,
  addProductSample,
} from "../controllers/productSampleControllers.js";
import { addProductSchema } from "../models/Product.js";
import deleteTempPhotos from "../middlewares/deleteTempPhotos.js";

const router = express.Router();

router.get("/", controlWrapper(getProductSamples));

router.get("/:id", isValidID, controlWrapper(getProductSampleByID));

router.post(
  "/",
  upload.array("photos", 10),
  validateBody(addProductSchema),
  controlWrapper(addProductSample),
  deleteTempPhotos
);

export default router;
