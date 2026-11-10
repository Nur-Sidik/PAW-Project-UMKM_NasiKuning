require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

// Parsing body request (Wajib untuk CRUD POST/PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder (jika ada file CSS/gambar lokal)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware logger & routing
app.use(logger);
app.use('/', routes);

// Penanganan 404 (harus di bawah semua route yang valid)
app.use((req, res) => {
  res.status(404).json({ pesan: 'Halaman tidak ditemukan' });
});

// Port deklarasi tunggal
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});