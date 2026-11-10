// Preview Bukti Transfer
function previewBukti(url) {
  document.getElementById('previewImg').src = url;
  document.getElementById('previewModal').classList.remove('hidden');
  document.getElementById('previewModal').classList.add('flex');
}