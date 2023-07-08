import { Feedback } from "../models/Feedback.js";

export const getAllFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find();
  const result = feedbacks.map((feedback) => ({
    name: feedback.name,
    rating: feedback.rating,
    comment: feedback.comment,
  }));
  res.json(result);
};

export const addFeedback = async (req, res) => {
  const feedback = await Feedback.create({ ...req.body });
  const result = {
    name: feedback.name,
    rating: feedback.rating,
    comment: feedback.comment,
  };
  res.status(201).json(result);
};
