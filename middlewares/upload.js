import multer from "multer";
import path from "path";

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniquePrefix}_${file.originalname}`)
    }
});

const upload = multer({
    storage: multerConfig,
})

export default upload;