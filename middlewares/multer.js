const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../Front/public/uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}.png`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
