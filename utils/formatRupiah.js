// Di utils/formatRupiah.js
function formatRupiah(angka) {
  if (!angka) return 'Rp 0';
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

module.exports = formatRupiah;