const { GoogleGenAI } = require('@google/genai');

const aiController = {
  chatAssistant: async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(503).json({
          status: 'error',
          message: 'API Key Gemini belum dikonfigurasi di file .env'
        });
      }
    } 
  }
};

module.exports = aiController;