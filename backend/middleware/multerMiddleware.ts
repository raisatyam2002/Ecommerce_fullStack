import multer from "multer";
import path from "path";

import { Request } from "express";
console.log("chekcing multer ", path.resolve(__dirname, "../productImage"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productImage");
  },
  filename: function (req: Request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

export const upload = multer({ storage: storage });
