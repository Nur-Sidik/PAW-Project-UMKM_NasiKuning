const db = require('../config/config');

const PesananModel = {
  createOrder: async ({ nama_pelanggan, nomor_wa, jadwal_pengambilan, items, total_bayar, bukti_transfer }) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const kode_pesanan = 'TRX-' + Date.now().toString().slice(-6);

      const [orderResult] = await conn.query(
        `INSERT INTO pesanan (kode_pesanan, nama_pelanggan, nomor_wa, jadwal_pengambilan, total_bayar, bukti_transfer, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'Menunggu Verifikasi')`,
        [kode_pesanan, nama_pelanggan, nomor_wa, jadwal_pengambilan, total_bayar, bukti_transfer]
      );

      const pesananId = orderResult.insertId;

      for (const item of items) {
        const subtotal = item.harga * item.qty;
        await conn.query(
          `INSERT INTO item_pesanan (pesanan_id, produk_id, jumlah, subtotal) VALUES (?, ?, ?, ?)`,
          [pesananId, item.id, item.qty, subtotal]
        );
      }

      await conn.commit();
      return { pesananId, kode_pesanan };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },
};

module.exports = PesananModel;