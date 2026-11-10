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

// Handler Tombol Ubah di Tabel Menu
function handleEditClick(btn) {
  const id = btn.dataset.id;
  const nama = btn.dataset.nama;
  const harga = parseInt(btn.dataset.harga, 10);
  const stok = parseInt(btn.dataset.stok, 10);
  const deskripsi = btn.dataset.deskripsi;
  const gambar = btn.dataset.gambar;

  openModalEdit(id, nama, harga, stok, deskripsi, gambar);
}

// Modal CRUD Produk
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const formId = document.getElementById('formId');
const formNama = document.getElementById('formNama');
const formHarga = document.getElementById('formHarga');
const formStok = document.getElementById('formStok');
const formDeskripsi = document.getElementById('formDeskripsi');
const formGambar = document.getElementById('formGambar');

function openModalCreate() {
  modalTitle.innerText = 'Tambah Menu Baru';
  formId.value = '';
  formNama.value = '';
  formHarga.value = '';
  formStok.value = '';
  formDeskripsi.value = '';
  formGambar.value = '';
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openModalEdit(id, nama, harga, stok, deskripsi, gambar) {
  modalTitle.innerText = 'Ubah Rincian Menu & Stok';
  formId.value = id;
  formNama.value = nama;
  formHarga.value = harga;
  formStok.value = stok;
  formDeskripsi.value = deskripsi;
  formGambar.value = gambar || '';
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}