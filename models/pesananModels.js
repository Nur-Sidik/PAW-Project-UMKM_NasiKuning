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

  getAllOrders: async () => {
    const [rows] = await db.query(
      `SELECT p.*, 
              GROUP_CONCAT(CONCAT(pr.nama_produk, ' (', ip.jumlah, 'x)') SEPARATOR ', ') AS rincian_menu,
              SUM(ip.jumlah) AS total_porsi
       FROM pesanan p
       LEFT JOIN item_pesanan ip ON p.id = ip.pesanan_id
       LEFT JOIN produk pr ON ip.produk_id = pr.id
       GROUP BY p.id
       ORDER BY p.id DESC`
    );
    return rows;
  },

  // Update Status + Auto-potong stok jika status disetujui jadi 'Diproses'
  updateStatus: async (id, status) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Ambil status saat ini
      const [current] = await conn.query('SELECT status FROM pesanan WHERE id = ?', [id]);
      if (current.length === 0) throw new Error('Pesanan tidak ditemukan');
      const prevStatus = current[0].status;

      // Jika dari Menunggu Verifikasi -> Diproses, potong stok produk
      if (prevStatus === 'Menunggu Verifikasi' && status === 'Diproses') {
        const [items] = await conn.query('SELECT produk_id, jumlah FROM item_pesanan WHERE pesanan_id = ?', [id]);
        for (const item of items) {
          await conn.query(
            'UPDATE produk SET stok = GREATEST(stok - ?, 0) WHERE id = ?',
            [item.jumlah, item.produk_id]
          );
        }
      }

      await conn.query('UPDATE pesanan SET status = ? WHERE id = ?', [status, id]);
      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
};

module.exports = PesananModel;