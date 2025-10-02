import multer from "multer";

const storage = multer.memoryStorage(); // keep file in memory before upload
const upload = multer({ storage });

export default upload;
