// === HAMBURGER MENU TOGGLE ===
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

// === SHOPPING CART LOGIC + MODAL ===
let cart = [];

// Buat elemen modal secara dinamis
const modalHTML = `
  <div id="custom-modal" class="modal-overlay" style="display:none;">
    <div class="modal-content">
      <p id="modal-message"></p>
      <div class="modal-buttons">
        <button id="cancel-btn">❌ Cancel</button>
        <button id="buy-btn">✅ Beli</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("custom-modal");
const modalMessage = document.getElementById("modal-message");
const cancelBtn = document.getElementById("cancel-btn");
const buyBtn = document.getElementById("buy-btn");

let selectedProduct = {};

// Fungsi saat gambar diklik
function tanyaBeli(nama, harga) {
  selectedProduct = { nama, harga };
  modalMessage.textContent = `Beli ${nama}?`;
  modal.style.display = "flex";
}

// Tombol CANCEL
cancelBtn.onclick = () => {
  modal.style.display = "none";
};

// Tombol BELI
buyBtn.onclick = () => {
  cart.push({ ...selectedProduct });
  modal.style.display = "none";
  alert(`${selectedProduct.nama} masuk ke keranjang!`);
  updateCartDisplay();
};

// Fungsi menampilkan keranjang
function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  if (!cartElement) return;

  if (cart.length === 0) {
    cartElement.innerHTML = "<li>Keranjang kosong</li>";
    return;
  }

  cartElement.innerHTML = cart
    .map((item, i) => `<li>${i + 1}. ${item.nama} - Rp ${item.harga.toFixed(1)}</li>`)
    .join("");
}
