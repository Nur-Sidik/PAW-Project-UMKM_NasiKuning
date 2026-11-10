let cart = [];

function handleAddToCart(button) {
  const id = button.dataset.id;
  const nama = button.dataset.nama;
  const harga = parseInt(button.dataset.harga);
  const stok = parseInt(button.dataset.stok);
  
  addToCart(id, nama, harga, stok);
}