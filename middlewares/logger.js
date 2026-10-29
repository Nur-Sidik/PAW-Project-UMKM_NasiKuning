function logger(req, res, next) {
  const waktu = new Date().toISOString();

  // status baru diketahui setelah response selesai dikirim
  res.on('finish', () => {
    console.log(`[${waktu}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });

  next();
}

module.exports = logger;