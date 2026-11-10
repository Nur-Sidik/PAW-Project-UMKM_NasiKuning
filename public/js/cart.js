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

function openCartModal() {
  if (cart.length === 0) {
    alert('Keranjang pesananmu masih kosong. Pilih menu nasi kuning terlebih dahulu!');
    return;
  }

  const container = document.getElementById('cartItemsContainer');
  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, idx) => {
    const subtotal = item.harga * item.qty;
    total += subtotal;
    container.innerHTML += `
      <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
        <div>
          <p class="font-bold text-gray-900">${item.nama}</p>
          <p class="text-gray-500">Rp ${item.harga.toLocaleString('id-ID')} x ${item.qty} porsi</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-bold text-amber-700">Rp ${subtotal.toLocaleString('id-ID')}</span>
          <button type="button" onclick="removeFromCart(${idx})" class="text-rose-600 hover:text-rose-800 font-bold text-sm">&times;</button>
        </div>
      </div>
    `;
  });

  document.getElementById('cartTotalPrice').innerText = 'Rp ' + total.toLocaleString('id-ID');
  document.getElementById('cartModal').classList.remove('hidden');
  document.getElementById('cartModal').classList.add('flex');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  if (cart.length === 0) {
    closeCartModal();
  } else {
    openCartModal();
  }
}

function closeCartModal() {
  document.getElementById('cartModal').classList.remove('flex');
  document.getElementById('cartModal').classList.add('hidden');
}