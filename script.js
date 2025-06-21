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
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = {};

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
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById("custom-modal").style.display = "none";
  updateCartCount();
};

// Inisialisasi cart count saat halaman dimuat
updateCartCount();
