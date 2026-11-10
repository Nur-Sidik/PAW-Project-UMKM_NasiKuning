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

// Update Status Pesanan (Diproses / Selesai / Dibatalkan)
async function updateStatus(id, status) {
  if (!confirm(`Konfirmasi ubah status pesanan menjadi [${status}]?`)) return;

  try {
    const res = await fetch(`/api/pesanan/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Gagal: ' + (data.message || 'Terjadi kesalahan'));
    }
  } catch (err) {
    alert('Gagal menghubungi server');
  }
}