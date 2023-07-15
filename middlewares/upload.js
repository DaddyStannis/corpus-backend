import multer from "multer";
import path from "path";

const TEMP_DIR = path.resolve("temp");

const FILETYPE_WHITE_LIST = ["image/jpeg", "image/png"];

const multerConfig = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (FILETYPE_WHITE_LIST.includes(mimetype)) {
    cb(null, true);
  } else {
    cb({ message: "Invalid format. Allow only .png or .jpg" }, false);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

export default upload;
