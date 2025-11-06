// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -----------------------------
// Utility Functions
// -----------------------------

// Get cart from sessionStorage (returns empty array if none)
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -----------------------------
// Render Functions
// -----------------------------

// Render product list with Add to Cart buttons
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add click listeners to each "Add to Cart" button
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart items from sessionStorage
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -----------------------------
// Cart Operations
// -----------------------------

// Add product to cart and update sessionStorage
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingCart = getCart(); // fetch current session data
  const updatedCart = [...existingCart, product]; // append new item
  saveCart(updatedCart);
  renderCart(); // update UI
}

// Clear cart and sessionStorage
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// -----------------------------
// Event Listeners
// -----------------------------
clearCartBtn.addEventListener("click", clearCart);

// -----------------------------
// Initial Render
// -----------------------------
renderProducts();
renderCart();
