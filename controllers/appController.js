const ProdukModel = require('../models/produkModel');
const formatRupiah = require('../utils/formatRupiah');
const PesananModel = require('../models/pesananModels');

const appController = {
  renderHome: async (req, res) => {
    try {
      const produk = await ProdukModel.getAll();
      res.render('index', {
        appName: 'UMKM Nasi Kuning',
        title: 'UMKM Nasi Kuning',
        produk,
        formatRupiah
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan pada server');
    }
  },

  // Endpoint API: GET /api/status
  getStatus: (req, res) => {
    res.json({
      status: 'success',
      message: 'Server berjalan dengan baik',
      timestamp: new Date().toISOString()
    });
  },

  // Endpoint API: GET /api/produk (Read All)
  getProdukAPI: async (req, res) => {
    try {
      const data = await ProdukModel.getAll();
      res.json({ status: 'success', data });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // Endpoint API: GET /api/produk/:id (Read Detail)
  getProdukDetailAPI: async (req, res) => {
    try {
      const item = await ProdukModel.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
      }
      res.json({ status: 'success', data: item });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // Endpoint API: POST /api/produk (Create)
  createProdukAPI: async (req, res) => {
    try {
      const { nama_produk, deskripsi, harga, stok, gambar_url } = req.body;
      const insertId = await ProdukModel.create({ nama_produk, deskripsi, harga, stok, gambar_url });
      res.status(201).json({ status: 'success', message: 'Produk berhasil ditambahkan', id: insertId });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // Endpoint API: PUT /api/produk/:id (Update)
  updateProdukAPI: async (req, res) => {
    try {
      const affected = await ProdukModel.update(req.params.id, req.body);
      if (!affected) {
        return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
      }
      res.json({ status: 'success', message: 'Produk berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // Endpoint API: DELETE /api/produk/:id (Delete)
  deleteProdukAPI: async (req, res) => {
    try {
      const affected = await ProdukModel.delete(req.params.id);
      if (!affected) {
        return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
      }
      res.json({ status: 'success', message: 'Produk berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  // Endpoint POST /api/pesanan (Checkout Transaksi)
  createOrder: async (req, res) => {
    try {
      const { nama_pelanggan, nomor_wa, jadwal_pengambilan, items } = req.body;
      const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

      if (!parsedItems || parsedItems.length === 0) {
        return res.status(400).json({ status: 'error', message: 'Item pesanan tidak boleh kosong' });
      }

      const total_bayar = parsedItems.reduce((acc, curr) => acc + (curr.harga * curr.qty), 0);
      const bukti_transfer = req.file ? `/uploads/bukti/${req.file.filename}` : null;

      const result = await PesananModel.createOrder({
        nama_pelanggan,
        nomor_wa,
        jadwal_pengambilan,
        items: parsedItems,
        total_bayar,
        bukti_transfer
      });

      res.status(201).json({
        status: 'success',
        message: 'Pesanan berhasil dibuat',
        kode_pesanan: result.kode_pesanan
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};

module.exports = appController;