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

// Filter validasi format (hanya gambar) dan batas ukuran 2MB (Constraint PRD)
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2 Megabyte
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Format berkas tidak diizinkan! Hanya boleh file gambar (JPG, PNG, WebP).'));
    }
  }
});

module.exports = upload;