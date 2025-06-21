// Ambil data cart dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Gabungkan item yang sama menjadi satu dengan quantity
function mergeCartItems(cart) {
  const merged = {};
  cart.forEach(item => {
    if (merged[item.nama]) {
      merged[item.nama].quantity += 1;
    } else {
      merged[item.nama] = {...item, quantity: 1};
    }
  });
  return Object.values(merged);
}

function updateCartCount() {
  // Total quantity semua item
  const totalQty = cart.reduce((acc, item) => acc + 1, 0);
  document.getElementById("cart-count").textContent = totalQty;
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  if (cart.length === 0) {
    cartList.innerHTML = `<div class="cart-empty">Keranjang kosong</div>`;
    cartTotal.textContent = "";
    document.getElementById('pay-btn').disabled = true;
    return;
  }

  const mergedItems = mergeCartItems(cart);

  let total = 0;
  cartList.innerHTML = mergedItems.map((item, i) => {
    total += item.harga * item.quantity;

    // Tentukan gambar berdasarkan nama produk
    let imgSrc = "menu/1.jpg";
    if (item.nama.toLowerCase().includes("americano")) imgSrc = "menu/2.jpg";
    if (item.nama.toLowerCase().includes("affogato")) imgSrc = "menu/3.jpg";

    return `
      <div class="cart-item">
        <img src="${imgSrc}" alt="${item.nama}" class="cart-img"/>
        <div class="cart-info">
          <div class="cart-name">${item.nama} x ${item.quantity}</div>
          <div class="cart-price">Rp ${(item.harga * item.quantity).toFixed(1)}</div>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="changeQuantity('${item.nama}', -1)">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity('${item.nama}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  cartTotal.textContent = `Total: Rp ${total.toFixed(1)}`;
  document.getElementById('pay-btn').disabled = false;
  feather.replace();
}

// Fungsi ubah quantity item
function changeQuantity(nama, delta) {
  // Cari index item di cart asli (bisa ada beberapa, kita hapus atau tambah sesuai delta)
  let count = cart.filter(item => item.nama === nama).length;
  if (delta === -1 && count === 1) {
    // Jika hanya 1 item dan dikurangi, hapus semua item itu
    cart = cart.filter(item => item.nama !== nama);
  } else if (delta === -1) {
    // Hapus satu item yang namanya sama
    let removed = false;
    cart = cart.filter(item => {
      if (!removed && item.nama === nama) {
        removed = true;
        return false; // hapus satu
      }
      return true;
    });
  } else if (delta === 1) {
    // Tambah satu item baru dengan nama dan harga yang sama
    // Cari harga dari salah satu item yang ada
    const itemData = cart.find(item => item.nama === nama);
    if (itemData) cart.push({...itemData});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

document.getElementById('back-to-menu').onclick = () => {
  window.location.href = "index.html#menu";
};

document.getElementById('pay-btn').onclick = () => {
  window.location.href = "payment.html";
};

renderCart();
updateCartCount();
