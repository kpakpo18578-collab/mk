import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Your Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyCCgGD66PPvjZMfo357A3rbthp08bUterc",
  authDomain: "ab-collections-5228c.firebaseapp.com",
  projectId: "ab-collections-5228c",
  storageBucket: "ab-collections-5228c.appspot.com",
  messagingSenderId: "585093695454",
  appId: "1:585093695454:web:f34b514ddd2fd90a73bf4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const productsDiv = document.getElementById("products");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// ===== Load products from Firestore =====
async function loadProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts(allProducts);
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

// ===== Render products into DOM =====
function renderProducts(products) {
  productsDiv.innerHTML = "";
  products.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 product-item";
    col.dataset.category = p.category.toLowerCase();

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Color: ${p.color}</p>
          <p class="card-text">Size: ${p.size}</p>
          <p class="fw-bold">£${p.price}</p>
        </div>
      </div>
    `;
    productsDiv.appendChild(col);
  });
}

// ===== Filter products by category =====
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category.toLowerCase();
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const items = document.querySelectorAll(".product-item");
    items.forEach(item => {
      item.style.display =
        category === "all" || item.dataset.category === category ? "block" : "none";
    });
  });
});

// ===== Search products =====
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const items = document.querySelectorAll(".product-item");

  items.forEach(item => {
    const name = item.querySelector(".card-title").textContent.toLowerCase();
    const color = item.querySelector(".card-text:nth-child(1)").textContent.toLowerCase();
    const size = item.querySelector(".card-text:nth-child(2)").textContent.toLowerCase();

    item.style.display =
      name.includes(query) || color.includes(query) || size.includes(query) ? "block" : "none";
  });
});

// ===== Load products on page load =====
loadProducts();