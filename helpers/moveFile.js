import fs from "fs/promises";
import path from "path";

async function moveFile(oldPath, filename, dir) {
  const newPath = path.join(dir, filename);

  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  await fs.rename(oldPath, newPath);
}

export default moveFile;
