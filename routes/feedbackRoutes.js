import express from "express";
import {
  getAllFeedbacks,
  addFeedback,
  moderatedFeedback,
  removeFeedback,
  updateFeedback,
} from "../controllers/feedbackControllers.js";
import { addFeedbackSchema, updateFeedbackSchema } from "../models/Feedback.js";
import controlWrapper from "../decorators/controlWrapper.js";
import validateBody from "../decorators/validateBody.js";

const router = express.Router();

router.get("/", controlWrapper(getAllFeedbacks));

router.post("/", validateBody(addFeedbackSchema), controlWrapper(addFeedback));

router.get("/moderated/:feedbackId", controlWrapper(moderatedFeedback));

router.get("/delete/:feedbackId", controlWrapper(removeFeedback));

router.patch(
  "/:feedbackId",
  validateBody(updateFeedbackSchema),
  controlWrapper(updateFeedback)
);

router.delete("/:feedbackId", controlWrapper(removeFeedback));

export default router;
