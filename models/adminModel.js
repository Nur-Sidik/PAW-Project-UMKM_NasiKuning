const db = require('../config/config');

const AdminModel = {
    findByUsername: async (username) => {
        const [rows] = await db.query(
            'SELECT * FROM admin WHERE username = ? LIMIT 1',
            [username]);
        return rows[0] || null;
    },

    createAdmin: async (nama_lengkap, username, hashedPassword) => {
        const [result] = await db.query(
            'INSERT INTO admin (nama_lengkap, username, password) VALUES (?, ?, ?)',
            [nama_lengkap, username, hashedPassword]
        );
        return result.insertId;
    }
};

module.exports = AdminModel;