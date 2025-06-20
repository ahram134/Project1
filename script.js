// Toggle Navbar
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Shopping Cart
let cart = [];
let selectedProduct = {};

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  if (cart.length === 0) {
    cartElement.innerHTML = "<li>Keranjang kosong</li>";
    return;
  }
  cartElement.innerHTML = cart
    .map((item, i) => `<li>${i + 1}. ${item.nama} - Rp ${item.harga.toFixed(1)}</li>`)
    .join("");
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function tanyaBeli(nama, harga) {
  selectedProduct = { nama, harga };
  document.getElementById("modal-message").textContent = `Beli ${nama}?`;
  document.getElementById("custom-modal").style.display = "flex";
}

document.getElementById("cancel-btn").onclick = () => {
  document.getElementById("custom-modal").style.display = "none";
};

document.getElementById("buy-btn").onclick = () => {
  cart.push({ ...selectedProduct });
  document.getElementById("custom-modal").style.display = "none";
  updateCartDisplay();
  updateCartCount();
};
