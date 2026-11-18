const db = require('../config/config');

const AdminModel = {
    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM admin WHERE username = ? LIMIT 1';
            db.query(sql, [username], (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            });
        });
    },

    createAdmin: (nama_lengkap, username, hashedPassword) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO admin (nama_lengkap, username, password) VALUES (?, ?, ?)';
            db.query(sql, [nama_lengkap, username, hashedPassword], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }
};

module.exports = AdminModel;