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

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Kamu adalah asisten katering dan sarapan UMKM Nasi Kuning. Bantu pelanggan memilih varian menu, menghitung estimasi porsi tasyakuran/syukuran, dan berikan jawaban yang ramah dan solutif.'
        }
      });

      res.json({
        status: 'success',
        reply: response.text
      });
    } catch (error) {
      console.error('AI Error:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};

module.exports = aiController;