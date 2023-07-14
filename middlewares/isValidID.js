import mongoose from "mongoose";
import HttpError from "../helpers/HttpError.js";

function isValidID(req, res, next) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    next(HttpError(400, `"${id}" is not valid id format.`));
  }
  next();
}

export default isValidID;
