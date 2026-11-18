require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('[Warning] GEMINI_API_KEY belum diisi pada file .env');
}

const ai = new GoogleGenAI({ apiKey });

module.exports = ai;