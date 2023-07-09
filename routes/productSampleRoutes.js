import express from "express";
import validateBody from "../decorators/validateBody.js";
import controlWrapper from "../decorators/controlWrapper.js";
import upload from "../middlewares/upload.js";
import {
  getProductSamples,
  getProductSamplesByArticle,
  addProductSamples,
} from "../controllers/productControllers.js";
import { addProductSchema } from "../models/ProductSample.js";

const router = express.Router();

router.get("/", controlWrapper(getProductSamples));

router.get("/:article", controlWrapper(getProductSamplesByArticle));

router.post(
  "/",
  upload.array("photoURL", 10),
  validateBody(addProductSchema),
  controlWrapper(addProductSamples)
);

export default router;
