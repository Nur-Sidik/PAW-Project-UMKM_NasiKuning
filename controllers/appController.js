const Produk = require('../models/produkModel');
const { formatRupiah } = require('../utils/formatRupiah');
const { APP_NAME } = require('../config/config');

function tampilHalaman(req, res) {
  res.render('index', {
    appName: APP_NAME,
    produk: Produk.getAll(),
    formatRupiah,
  });
}

function getStatus(req, res) {
  res.json({
    status: 'aktif',
    aplikasi: APP_NAME,
    waktu: new Date().toISOString(),
  });
}

function getProduk(req, res) {
  res.json(Produk.getAll());
}

module.exports = { tampilHalaman, getStatus, getProduk };