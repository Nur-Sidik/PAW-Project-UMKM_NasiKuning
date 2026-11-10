// Preview Bukti Transfer
function previewBukti(url) {
  document.getElementById('previewImg').src = url;
  document.getElementById('previewModal').classList.remove('hidden');
  document.getElementById('previewModal').classList.add('flex');
}

function closePreview() {
  document.getElementById('previewModal').classList.remove('flex');
  document.getElementById('previewModal').classList.add('hidden');
}