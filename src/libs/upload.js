import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = `./public/${file.fieldname}`;
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".").pop();
    callback(null, uuid().toString() + `.${ext}`);
  },
});

export const upload = multer({ storage: storage });
