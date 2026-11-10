const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

// Halaman Frontend EJS
router.get('/', appController.renderHome);

// REST API Endpoints (Sesuai Ketentuan Tugas Topic 8)
router.get('/api/status', appController.getStatus);
router.get('/api/produk', appController.getProdukAPI);
router.get('/api/produk/:id', appController.getProdukDetailAPI);
router.post('/api/produk', appController.createProdukAPI);
router.put('/api/produk/:id', appController.updateProdukAPI);
router.delete('/api/produk/:id', appController.deleteProdukAPI);

module.exports = router;