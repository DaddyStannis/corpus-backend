import path from "path";

import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import HttpError from "../helpers/HttpError.js";
import moveFile from "../helpers/moveFile.js";

const PUBLIC_DIR = path.resolve("public", "products");

export const getProducts = async (req, res) => {
  const { page = 1, limit = 6, category = null } = req.query;
  const skip = (page - 1) * limit;

  var query = { sample: false };
  if (category) {
    query.category = await Category.findOne({ name: category });

    if (!query.category) {
      throw HttpError(404, `The category named ${category} doesn't exist`);
    }
  }

  const total = await Product.count(query);
  const products = await Product.find(
    query,
    "name article price discountPrice mainPhotoURL",
    {
      skip,
      limit,
    }
  );

  res.json({ total, products });
};

export const getProductSamples = async (req, res) => {
  const { page = 1, limit = 6, category = null } = req.query;
  const skip = (page - 1) * limit;

  var query = { sample: true };
  if (category) {
    query.category = await Category.findOne({ name: category });

    if (!query.category) {
      throw HttpError(404, `The category named ${category} doesn't exist`);
    }
  }

  const total = await Product.count(query);
  const products = await Product.find(
    query,
    "name article price discountPrice mainPhotoURL",
    {
      skip,
      limit,
    }
  );

  res.json({ total, products });
};

export const getProductByID = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product not found`);
  }

  res.json(product);
};

export const addProduct = async (req, res) => {
  const { files = [] } = req;

  const product = await Product.create({ ...req.body, photos: [] });

  if (product) {
    const photos = files.map((file) => {
      const { filename, path: oldPath } = file;
      moveFile(oldPath, filename, PUBLIC_DIR);
      const newPath = path.join("products", filename);
      return newPath;
    });

    if (photos.length) {
      product.photos = photos;
      await product.save();
    }
  }

  res.json(product);
};

export const addMainPhoto = async (req, res) => {
  const { mainPhotoURL } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw HttpError(404, `Product with id "${id}" doesn't exist`);
  }

  const result = product.photos.find((url) => url === mainPhotoURL);

  if (!result) {
    throw HttpError(
      404,
      `Photo with url "${mainPhotoURL}" doesn't exist in product "${product._id}"`
    );
  }

  product.mainPhotoURL = mainPhotoURL;
  await product.save();

  res.json({ message: "Successfully updated" });
};
