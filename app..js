const express = require('express');
const path = require('path');
const { PORT } = require('./config/config');
const logger = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);
app.use('/', routes);

// kalau URL tidak ada yang cocok
app.use((req, res) => {
  res.status(404).json({ pesan: 'Halaman tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:' + PORT);
});