const produk = [
    {
        id: 1,
        nama: 'Nasi Kuning Komplit', 
        kategori: 'Makanan', 
        harga: 15000, 
        keunggulan: 'Lauk lengkap, porsi besar'
    },
    { id: 2, nama: 'Nasi Kuning Ayam Suwir', kategori: 'Makanan', harga: 12000, keunggulan: 'Ayam suwir bumbu khas' },
    { id: 3, nama: 'Nasi Kuning Telur Balado', kategori: 'Makanan', harga: 10000, keunggulan: 'Pedas gurih, harga hemat' },
    { id: 4, nama: 'Es Teh Manis', kategori: 'Minuman', harga: 4000, keunggulan: 'Segar, cocok untuk teman makan' },
];

function getAll() {
    return produk;
}

module.exports = { getAll };