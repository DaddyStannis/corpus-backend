import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";

const productsSchema = new Schema(
  {
    article: {
      type: String,
      required: [true, "Article is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPrice: {
      type: Number,
    },
    colorList: {
      type: [String],
      required: [true, "Colors list is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: true,
    },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "property",
      // required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productsSchema.post("save", handleMongooseError);

export const addProductSchema = Joi.object({
  article: Joi.string().required().messages({
    "any.required": `missing required field "article"`,
  }),
  name: Joi.string().required().messages({
    "any.required": `missing required field "name"`,
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": `missing required field "price"`,
  }),
  discountPrice: Joi.number(),
  colorList: Joi.array().items(Joi.string()).required().messages({
    "any.required": `missing required field "colors list"`,
  }),
  description: Joi.string().required().messages({
    "any.required": `missing required field "description"`,
  }),
  category: Joi.string().required().messages({
    "any.required": `missing required field "category"`,
  }),
  properties: Joi.string(),
  photoURL: Joi.string(),
});

export const Product = model("product", productsSchema);
