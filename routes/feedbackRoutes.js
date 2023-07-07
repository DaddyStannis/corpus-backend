import express from "express";
import {
  getAllFeedbacks,
  addFeedback,
} from "../controllers/feedbackControllers.js";
import { schemas } from "../models/Feedback.js";
import controlWrapper from "../decorators/controlWrapper.js";
import validateBody from "../decorators/validateBody.js";

const router = express.Router();

router.get("/", controlWrapper(getAllFeedbacks));

router.post(
  "/",
  validateBody(schemas.addFeedbackSchema),
  controlWrapper(addFeedback)
);

export default router;
