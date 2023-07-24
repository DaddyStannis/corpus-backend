import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";

const MAX_PRICE = 9999999.99;

const propertiesSchema = new Schema(
  {
    manufacturer: { type: String, trim: true, min: 1, max: 40 },
    manufacturerCountry: { type: String, trim: true, min: 1, max: 40 },
    furniture: { type: String },
    casing: { type: String },
    facade: { type: String },
    tabletop: { type: String },
    equipment: [{ type: String }],
  },
  { _id: false, versionKey: false }
);

const productSchema = new Schema(
  {
    article: {
      type: String,
      trim: true,
      required: [true, "Article is required"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      min: 0,
      max: MAX_PRICE,
      required: [true, "Price is required"],
    },
    discountPrice: {
      min: 0,
      max: MAX_PRICE,
      type: Number,
    },
    colorList: {
      type: [String],
      validate: [(val) => val.length > 0, "Must have minimum one option"],
      required: [true, "Colors list is required"],
    },
    description: {
      type: String,
      trim: true,
      min: 10,
      max: 1000,
      required: [true, "Description is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    sample: {
      type: Boolean,
      default: false,
    },
    photos: {
      type: [String],
      required: true,
    },
    properties: {
      type: propertiesSchema,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

const addProductSchema = Joi.object({
  article: Joi.string().trim().required().messages({
    "any.required": `missing required field "article"`,
  }),
  name: Joi.string().trim().required().messages({
    "any.required": `missing required field "name"`,
  }),
  price: Joi.number().min(0).max(MAX_PRICE).required().messages({
    "any.required": `missing required field "price"`,
  }),
  discountPrice: Joi.number().min(0).max(MAX_PRICE),
  colorList: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": `missing required field "colors list"`,
  }),
  description: Joi.string().trim().min(10).max(1000).required().messages({
    "any.required": `missing required field "description"`,
  }),
  category: Joi.string().required().messages({
    "any.required": `missing required field "category"`,
  }),
  sample: Joi.boolean(),
  properties: Joi.object({
    manufacturer: Joi.string().trim().min(1).max(40),
    manufacturerCountry: Joi.string().trim().min(1).max(40),
    furniture: Joi.string(),
    casing: Joi.string(),
    facade: Joi.string(),
    tabletop: Joi.string(),
    equipment: Joi.array().items(Joi.string()),
  })
    .required()
    .messages({
      "any.required": `missing required field "properties"`,
    }),
  photos: Joi.array(),
});

export const schemas = {
  addProductSchema,
};

export const Product = model("product", productSchema);
