const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const upload = require('../middlewares/uploads');
const aiController = require('../controllers/aiController');

// Endpoint AI Chat Assistant
router.post('/api/ai/chat', aiController.chatAssistant);

// Halaman Frontend EJS
router.get('/', appController.renderHome);
router.get('/admin', appController.renderAdmin);


// REST API Endpoints (Sesuai Ketentuan Tugas Topic 8)
router.get('/api/status', appController.getStatus);
router.get('/api/produk', appController.getProdukAPI);
router.get('/api/produk/:id', appController.getProdukDetailAPI);
router.post('/api/produk', appController.createProdukAPI);
router.put('/api/produk/:id', appController.updateProdukAPI);
router.delete('/api/produk/:id', appController.deleteProdukAPI);

router.post('/api/pesanan', upload.single('bukti_transfer'), appController.createOrder);
router.put('/api/pesanan/:id/status', appController.updateOrderStatus);

module.exports = router;