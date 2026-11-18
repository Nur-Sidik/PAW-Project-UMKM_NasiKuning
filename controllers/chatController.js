const GeminiService = require('../services/gemini.service');

const chatController = {
  handleChat: async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          success: false,
          message: 'Layanan AI belum dikonfigurasi (API Key belum tersedia).'
        });
      }

      const reply = await GeminiService.generateChatReply(req.cleanMessage);

      return res.status(200).json({
        success: true,
        data: {
          reply
        }
      });
    } catch (error) {
      console.error('[Gemini Error]:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Maaf, asisten AI sedang mengalami gangguan. Silakan coba beberapa saat lagi.'
      });
    }
  }
};

module.exports = chatController;