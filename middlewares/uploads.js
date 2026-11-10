const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/bukti/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'bukti-' + uniqueSuffix + path.extname(file.originalname));
  }
});

module.exports = upload;