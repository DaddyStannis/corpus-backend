import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import Joi from "joi";

const phoneRegexp = /^\+380\d{9}$/;

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
      match: phoneRegexp,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchema.post("save", handleMongooseError);

export const addFeedbackSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required field "name"`,
  }),
  phone: Joi.string().required().pattern(phoneRegexp).messages({
    "any.required": `missing required field "phone"`,
  }),
  rating: Joi.number().required().messages({
    "any.required": `missing required field "rating"`,
  }),
  comment: Joi.string().required().messages({
    "any.required": `missing required field "comment"`,
  }),
});

export const Feedback = model("feedback", feedbackSchema);
