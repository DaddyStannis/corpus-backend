import HttpError from "../helpers/HttpError.js"

const isFileExist = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "The file was not attached"));
  }
  next();
};

export default isFileExist;