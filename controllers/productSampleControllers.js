import path from "path";

import { ProductSample } from "../models/Product.js";
import { Category } from "../models/Category.js";
import HttpError from "../helpers/HttpError.js";

const PUBLIC_DIR = path.resolve("public", "products");

export const getProductSamples = async (req, res) => {
  const { page = 1, limit = 6, category = null } = req.query;
  const skip = (page - 1) * limit;

  var query = {};
  if (category) {
    query.category = await Category.findOne({ name: category });
  }

  const count = await ProductSample.count(query);
  const result = await ProductSample.find(
    query,
    "name article price discountPrice",
    { skip, limit }
  );

  res.json({
    total: count,
    products: result,
  });
};

export const getProductSampleByID = async (req, res) => {
  const { id } = req.params;
  const product = await ProductSample.findById(id).populate("category");

  if (!product) {
    throw HttpError(404, `Product not found`);
  }

  res.json(product);
};

export const addProductSample = async (req, res) => {
  const { files = [] } = req;

  const product = await ProductSample.create({ ...req.body, photos: [] });

  if (product) {
    const photos = files.map((file) => {
      const { filename, path: oldPath } = file;
      moveFile(oldPath, filename, PUBLIC_DIR);
      const newPath = path.join("product-samples", filename);
      return newPath;
    });

    if (photos.length) {
      product.photos = photos;
      await product.save();
    }
  }

  res.json(product);
};
