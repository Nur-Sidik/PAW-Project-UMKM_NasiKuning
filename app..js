const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server UMKM Nasi Kuninng Aktif');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});