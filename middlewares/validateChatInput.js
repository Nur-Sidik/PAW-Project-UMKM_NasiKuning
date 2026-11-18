const validateChatInput = (req, res, next) => {
  const { message } = req.body;

  // 1. Cek pesan kosong atau bukan string
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan tidak boleh kosong.'
    });
  }

  const trimmedMessage = message.trim();

  // 2. Batasi panjang input (maksimal 500 karakter)
  if (trimmedMessage.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Pesan terlalu panjang (maksimal 500 karakter).'
    });
  }

  // 3. Deteksi dasar pola Prompt Injection / Jailbreak
  const injectionPatterns = [
    /ignore (all )?previous instructions/i,
    /abaikan (semua )?(instruksi|aturan|perintah) sebelumnya/i,
    /act as/i,
    /bertindak sebagai/i,
    /lupakan peran/i,
    /system prompt/i,
    /jailbreak/i
  ];

  const isInjection = injectionPatterns.some((pattern) => pattern.test(trimmedMessage));
  if (isInjection) {
    return res.status(403).json({
      success: false,
      message: 'Permintaan ditolak. Saya hanya dapat membantu informasi seputar menu, stok, dan pemesanan di UMKM Nasi Kuning.'
    });
  }

  req.cleanMessage = trimmedMessage;
  next();
};

module.exports = validateChatInput;