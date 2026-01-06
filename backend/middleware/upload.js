import multer from "multer";
import path from "path";

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

export default upload;
