const db = require('../config/config');

const ProdukModel = {
    // 1. Ambil semua produk (Read All)
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC');
        return rows;
    },

    // 2. Ambil detail satu produk (Read Detail)
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
        return rows[0];
    },

    // 3. Tambah produk baru (Create)
    create: async (data) => {
        const { nama_produk, deskripsi, harga, stok, gambar_url } = data;
        const [result] = await db.query(
            'INSERT INTO produk (nama_produk, deskripsi, harga, stok, gambar_url) VALUES (?, ?, ?, ?, ?)',
            [nama_produk, deskripsi, harga, stok, gambar_url || null]
        );
        return result.insertId;
    },

    // 4. Update produk (Update)
    update: async (id, data) => {
        const { nama_produk, deskripsi, harga, stok, gambar_url } = data;
        const [result] = await db.query(
            'UPDATE produk SET nama_produk = ?, deskripsi = ?, harga = ?, stok = ?, gambar_url = ? WHERE id = ?',
            [nama_produk, deskripsi, harga, stok, gambar_url, id]
        );
        return result.affectedRows;
    },

    // 5. Hapus produk (Delete)
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM produk WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ProdukModel;