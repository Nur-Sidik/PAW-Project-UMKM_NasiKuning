function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

module.exports = { formatRupiah };