const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.tampilHalaman);
router.get('/api/status', appController.getStatus);
router.get('/api/produk', appController.getProduk);

module.exports = router;