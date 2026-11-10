const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'umkm_nasikuning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then(conn => {
    console.log(' [Database] Terhubung ke MySQL Laragon');
    conn.release();
  })
  .catch(err => {
    console.error(' [Database Error] Gagal konek:', err.message);
  });

module.exports = db;