import { Product } from "../models/ProductSample.js";
import HttpError from "../helpers/HttpError.js";

export const getProductSamples = async (req, res) => {
  const { page = 1, limit = 6, category = "" } = req.query;
  const skip = (page - 1) * limit;

  if (category) {
    const count = await Product.count({ category });
    const result = await Product.find({ category }, "", { skip, limit });

    res.json({
      total: count,
      products: result,
    });
  };

  const count = await Product.count();
  const result = await Product.find({ }, "", { skip, limit });

  res.json({
    total: count,
    products: result,
  });

};

export const getProductSamplesByArticle = async (req, res) => {
  const { article } = req.params;
  const product = await Product.find({ article });

  if (!product) {
    throw HttpError(404, `Product with article ${article} not found`);
  }

  res.json(product);
};

export const addProductSamples = async (req, res) => {
  const { files = {} } = req;
  const photos = files.map((file) => file.path);
  const product = await Product.create({ ...req.body, photos });

  res.json(product);
};
