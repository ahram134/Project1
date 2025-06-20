// === TOGGLE HAMBURGER MENU ===
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

// Tampilkan / sembunyikan menu ketika hamburger diklik
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// Sembunyikan menu jika klik di luar area menu
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// === SHOPPING CART LOGIC ===
let cart = [];

function tanyaBeli(nama, harga) {
  const konfirmasi = confirm(`Apakah kamu ingin membeli ${nama}?`);
  if (konfirmasi) {
    cart.push({ nama, harga });
    alert(`${nama} ditambahkan ke keranjang!`);
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  if (!cartElement) return; // Jika elemen #cart belum ada di HTML

  if (cart.length === 0) {
    cartElement.innerHTML = "<li>Keranjang kosong</li>";
    return;
  }

  cartElement.innerHTML = cart
    .map((item, index) => `<li>${index + 1}. ${item.nama} - Rp ${item.harga.toFixed(1)}</li>`)
    .join("");
}
