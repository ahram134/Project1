// Ambil data cart dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Tampilkan daftar cart dengan gambar, nama, harga, tombol hapus
function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  if (cart.length === 0) {
    cartList.innerHTML = `<div class="cart-empty">Keranjang kosong</div>`;
    cartTotal.textContent = "";
    document.getElementById('pay-btn').disabled = true;
    document.getElementById('clear-cart').disabled = true;
    return;
  }
  let total = 0;
  cartList.innerHTML = cart.map((item, i) => {
    total += item.harga;
    // Gambar otomatis (ganti sesuai kebutuhan)
    let imgSrc = "menu/1.jpg";
    if (item.nama.toLowerCase().includes("americano")) imgSrc = "menu/2.jpg";
    if (item.nama.toLowerCase().includes("affogato")) imgSrc = "menu/3.jpg";
    return `
      <div class="cart-item">
        <img src="${imgSrc}" alt="${item.nama}" class="cart-img"/>
        <div class="cart-info">
          <div class="cart-name">${item.nama}</div>
          <div class="cart-price">Rp ${item.harga.toFixed(1)}</div>
        </div>
        <button class="remove-btn" onclick="removeItem(${i})"><i data-feather="trash-2"></i></button>
      </div>
    `;
  }).join("");
  cartTotal.textContent = `Total: Rp ${total.toFixed(1)}`;
  document.getElementById('pay-btn').disabled = false;
  document.getElementById('clear-cart').disabled = false;
  feather.replace();
}

window.removeItem = function(idx) {
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

document.getElementById('clear-cart').onclick = function() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

document.getElementById('pay-btn').onclick = function() {
  window.location.href = "payment.html";
};

renderCart();
updateCartCount();
