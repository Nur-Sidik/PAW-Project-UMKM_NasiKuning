let cart = [];

function handleAddToCart(button) {
  const id = button.dataset.id;
  const nama = button.dataset.nama;
  const harga = parseInt(button.dataset.harga);
  const stok = parseInt(button.dataset.stok);
  
  addToCart(id, nama, harga, stok);
}

function addToCart(id, nama, harga, stokMaks) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    if (existing.qty < stokMaks) {
      existing.qty += 1;
    } else {
      alert('Porsi yang dipesan sudah mencapai batas stok dapur!');
      return;
    }
  } else {
    cart.push({ id, nama, harga, qty: 1, max: stokMaks });
  }
  updateCartUI();
  alert(`[${nama}] berhasil ditambahkan ke keranjang.`);
}

function updateCartUI() {
  const badge = document.getElementById('cartCountBadge');
  const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
  if (totalQty > 0) {
    badge.innerText = totalQty;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}