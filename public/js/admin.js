// Pastikan script ini hanya jalan di halaman admin yang punya modal produk
const modal = document.getElementById('productModal');
if (modal) {
  // Semua fungsi khusus admin ditaruh di dalam sini
  const modalTitle = document.getElementById('modalTitle');
  const formId = document.getElementById('formId');
  const formNama = document.getElementById('formNama');
  const formHarga = document.getElementById('formHarga');
  const formStok = document.getElementById('formStok');
  const formDeskripsi = document.getElementById('formDeskripsi');
  const formGambar = document.getElementById('formGambar');

  window.openModalCreate = function () {
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

  window.openModalEdit = function (id, nama, harga, stok, deskripsi, gambar) {
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

  window.closeModal = function () {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }

  window.handleFormSubmit = async function (e) {
    e.preventDefault();
    const id = formId.value;
    const data = {
      nama_produk: formNama.value,
      harga: parseInt(formHarga.value, 10),
      stok: parseInt(formStok.value, 10),
      deskripsi: formDeskripsi.value,
      gambar_url: formGambar.value || null
    };

    const url = id ? `/api/produk/${id}` : '/api/produk';
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const err = await res.json();
        alert('Gagal: ' + (err.message || 'Terjadi kesalahan'));
      }
    } catch (err) {
      alert('Gagal menghubungi server');
    }
  }

  window.deleteProduct = async function (id) {
    if (!confirm('Hapus menu ini dari database?')) return;

    try {
      const res = await fetch(`/api/produk/${id}`, { method: 'DELETE' });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Gagal menghapus produk');
      }
    } catch (err) {
      alert('Gagal menghubungi server');
    }
  }
}

// Fungsi global pendukung
window.previewBukti = function (url) {
  document.getElementById('previewImg').src = url;
  document.getElementById('previewModal').classList.remove('hidden');
  document.getElementById('previewModal').classList.add('flex');
}

window.closePreview = function () {
  document.getElementById('previewModal').classList.remove('flex');
  document.getElementById('previewModal').classList.add('hidden');
}

window.updateStatus = async function (id, status) {
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

window.handleEditClick = function (btn) {
  const id = btn.dataset.id;
  const nama = btn.dataset.nama;
  const harga = parseInt(btn.dataset.harga, 10);
  const stok = parseInt(btn.dataset.stok, 10);
  const deskripsi = btn.dataset.deskripsi;
  const gambar = btn.dataset.gambar;

  if (typeof openModalEdit === 'function') {
    openModalEdit(id, nama, harga, stok, deskripsi, gambar);
  }
}