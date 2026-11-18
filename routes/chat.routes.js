const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput');
const chatController = require('../controllers/chatController');

router.post('/api/chat', validateChatInput, chatController.handleChat);

module.exports = router;