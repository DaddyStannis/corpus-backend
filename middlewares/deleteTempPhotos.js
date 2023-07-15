import fs from "fs/promises";

function deleteTempPhotos(err, req, res, next) {
  const { files = [] } = req;
  files.forEach(async ({ path }) => await fs.unlink(path));
  next(err);
}

export default deleteTempPhotos;
