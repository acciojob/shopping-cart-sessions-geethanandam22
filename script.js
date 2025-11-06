// -----------------------------
// Product Data
// -----------------------------
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// -----------------------------
// DOM Elements
// -----------------------------
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -----------------------------
// Utility Functions
// -----------------------------

// Get cart from sessionStorage (returns [] if empty)
function getCart() {
  const cart = sessionStorage.getItem("cart");
  try {
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -----------------------------
// Render Functions
// -----------------------------

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add click listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
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

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingCart = getCart();
  existingCart.push(product);
  saveCart(existingCart);
  renderCart();
}

// Clear cart
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

