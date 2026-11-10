require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'umkm_nasikuning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then(conn => {
    console.log(' [Database] Terhubung ke MySQL Laragon (' + (process.env.DB_NAME || 'umkm_nasikuning') + ')');
    conn.release();
  })
  .catch(err => {
    console.error(' [Database Error] Gagal konek:', err.message);
  });

module.exports = db;