import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import Joi from "joi";

const phoneRegexp = /^\+380\d{9}$/;

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
      match: phoneRegexp,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
    moderated: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchema.post("save", handleMongooseError);

export const addFeedbackSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": `missing required field "name"`,
  }),
  phone: Joi.string().required().pattern(phoneRegexp).messages({
    "any.required": `missing required field "phone"`,
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    "any.required": `missing required field "rating"`,
  }),
  comment: Joi.string().trim().required().messages({
    "any.required": `missing required field "comment"`,
  }),
});

export const updateFeedbackSchema = Joi.object({
  comment: Joi.string().trim().required().messages({
    "any.required": `missing required field "comment"`,
  }),
});

export const Feedback = model("feedback", feedbackSchema);
