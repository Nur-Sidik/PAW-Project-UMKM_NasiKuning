const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');
const upload = require('../middlewares/uploads');
const { verifyAdminPage, verifyAdminAPI } = require('../middlewares/authMiddleware');

// Auth Routes
router.get('/login', authController.renderLogin);
router.post('/login', authController.loginProcess);
router.get('/register', authController.renderRegister);
router.post('/register', authController.registerProcess);
router.get('/logout', authController.logout);

// Publik
router.get('/', appController.renderHome);

// Diproteksi JWT (Halaman & API Admin)
router.get('/admin', verifyAdminPage, appController.renderAdmin);
router.get('/api/status', appController.getStatus);
router.get('/api/produk', appController.getProdukAPI);
router.get('/api/produk/:id', appController.getProdukDetailAPI);
router.post('/api/pesanan', upload.single('bukti_transfer'), appController.createOrder);

router.post('/api/produk', verifyAdminAPI, appController.createProdukAPI);
router.put('/api/produk/:id', verifyAdminAPI, appController.updateProdukAPI);
router.delete('/api/produk/:id', verifyAdminAPI, appController.deleteProdukAPI);
router.put('/api/pesanan/:id/status', verifyAdminAPI, appController.updateOrderStatus);

module.exports = router;