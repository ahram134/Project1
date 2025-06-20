// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

<script>
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
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = cart.map(item => `
      <li>${item.nama} - Rp ${item.harga.toFixed(1)}</li>
    `).join('');
  }
</script>

