// Ambil data cart dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Keranjang kosong</li>";
    cartTotal.textContent = "";
    return;
  }
  let total = 0;
  cartList.innerHTML = cart.map((item, i) => {
    total += item.harga;
    return `<li>${i + 1}. ${item.nama} - Rp ${item.harga.toFixed(1)}</li>`;
  }).join("");
  cartTotal.textContent = `Total: Rp ${total.toFixed(1)}`;
}

document.getElementById('clear-cart').onclick = function() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

renderCart();
updateCartCount();
