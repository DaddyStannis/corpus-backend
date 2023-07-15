import { Feedback } from "../models/Feedback.js";
import sendEmail from "../helpers/sendEmail.js";
import createModerationEmail from "../helpers/createModerationEmail.js";

const { NODEMAILER_EMAIL_TO: to } = process.env;

export const getAllFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({ moderated: true });
  const result = feedbacks.map((feedback) => ({
    id: feedback._id,
    name: feedback.name,
    rating: feedback.rating,
    comment: feedback.comment,
  }));
  res.json(result);
};

export const addFeedback = async (req, res) => {
  const { phone } = req.body;
  const isNumberExist = await Feedback.findOne({ phone });

  if (isNumberExist) {
    const oneDay = 86400000;
    const now = new Date().getTime();
    const feedbackDate = isNumberExist.createdAt.getTime();
    const difference = now - feedbackDate;

    if (difference < oneDay) {
      res.json({ message: "Feedback can be added only once per day" });
    }
  }
  const feedback = await Feedback.create({ ...req.body });

  const email = createModerationEmail(feedback);
  sendEmail(email.html, email.subject, to);

  res.json({ message: "Feedback will be added after moderation" });
};

export const moderatedFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const result = await Feedback.findByIdAndUpdate(feedbackId, {
    moderated: true,
  });

  if (!result) {
    res.json({ message: "This feedback is not exist" });
  }

  res.json({ message: "Update successful" });
};

export const removeFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const result = await Feedback.findByIdAndRemove(feedbackId);

  if (!result) {
    res.json({ message: "This feedback is not exist" });
  }

  res.json({ message: "Delete successful" });
};

export const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const result = await Feedback.findByIdAndUpdate(feedbackId, req.body);

  if (!result) {
    res.json({ message: "This feedback is not exist" });
  }

  res.json({
    id: result._id,
    name: result.name,
    rating: result.rating,
    comment: result.comment,
  });
};
