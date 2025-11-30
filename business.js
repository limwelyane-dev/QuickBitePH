const MESSENGER_PAGE = "";
const ENABLE_WHATSAPP = false;
const WHATSAPP_PHONE = "";


const products = [
  { id: 1, name: "Fried Rice", price: 35, img: "friedRice.avif", category: "food" },
  { id: 2, name: "Buko Shake", price: 50, img: "BukoShake.jpg", category: "drink" },
  { id: 3, name: "Chicken Bucket /w fries", price: 299, img: "bucket.avif", category: "food" },
  { id: 4, name: "Fried Chicken", price: 45, img: "FriedChicken.avif", category: "food" },
  { id: 5, name: "Coke", price: 20, img: "coke1.jpg", category: "drink" },
  { id: 6, name: "Mango Shake", price: 50, img: "mangoShake.jpg", category: "drink" }
];


let cart = [];


const foodRoot = document.getElementById("foods");
const drinkRoot = document.getElementById("drinks");
const cartToggleBtn = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const itemsCountEl = document.getElementById("itemsCount");
const checkoutMessengerBtn = document.getElementById("checkoutMessenger");
const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsApp");
const buyerNameInput = document.getElementById("buyerName");


renderProducts();
updateCartUI();

function renderProducts() {
  foodRoot.innerHTML = "";
  drinkRoot.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
      <h3>${escapeHtml(p.name)}</h3>
      <p class="desc">High-quality Foods</p>
      <div class="actions">
        <div class="price small">₱${formatNumber(p.price)}</div>
        <button onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    `;

    if (p.category === "food") foodRoot.appendChild(card);
    else if (p.category === "drink") drinkRoot.appendChild(card);
  });
}

// Cart logic
function addToCart(id) {
  const entry = cart.find(c => c.id === id);
  if (entry) entry.qty++;
  else cart.push({ id, qty: 1 });
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const entry = cart.find(c => c.id === id);
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) removeFromCart(id);
  updateCartUI();
}

function cartDetails() {
  return cart.map(c => ({ ...c, product: products.find(p => p.id === c.id) }));
}

function cartTotals() {
  const details = cartDetails();
  const items = details.reduce((s, i) => s + i.qty, 0);
  const total = details.reduce((s, i) => s + i.qty * i.product.price, 0);
  return { items, total };
}

function updateCartUI() {
  const details = cartDetails();
  cartItemsEl.innerHTML = "";

  if (!details.length) {
    cartItemsEl.innerHTML = `<p style="color:var(--muted)">Your cart is empty</p>`;
  } else {
    details.forEach(d => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div style="width:64px;height:64px;border-radius:8px;overflow:hidden">
          <img src="${d.product.img}" alt="${escapeHtml(d.product.name)}" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div class="meta">
          <div style="font-weight:700">${escapeHtml(d.product.name)}</div>
          <div style="color:var(--muted);font-size:13px">₱${formatNumber(d.product.price)} • ${d.qty} pcs</div>
          <div style="margin-top:8px" class="qty-controls">
            <button onclick="changeQty(${d.id}, -1)">−</button>
            <span style="min-width:24px;text-align:center">${d.qty}</span>
            <button onclick="changeQty(${d.id}, 1)">+</button>
            <button class="remove-link" onclick="removeFromCart(${d.id})">Remove</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(row);
    });
  }

  const totals = cartTotals();
  cartCount.innerText = totals.items;
  itemsCountEl.innerText = totals.items;
  cartTotalEl.innerText = `₱${formatNumber(totals.total)}`;

  if (!ENABLE_WHATSAPP) checkoutWhatsAppBtn.style.display = "none";
}

// Cart sidebar
function openCart() {
  cartSidebar.classList.add("open");
  cartSidebar.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartSidebar.classList.remove("open");
  cartSidebar.setAttribute("aria-hidden", "true");
}
cartToggleBtn.addEventListener("click", () => cartSidebar.classList.toggle("open"));
closeCartBtn.addEventListener("click", closeCart);

// Checkout
checkoutMessengerBtn.addEventListener("click", () => {
  if (!cart.length) { alert("Your cart is empty."); return; }
  copyToClipboard(buildOrderMessage()).then(() => {
    const url = `https://m.me/${encodeURIComponent(MESSENGER_PAGE)}`;
    window.open(url, "_blank");
  });
});

checkoutWhatsAppBtn.addEventListener("click", () => {
  if (!cart.length) { alert("Your cart is empty."); return; }
  const encoded = encodeURIComponent(buildOrderMessage());
  const waUrl = WHATSAPP_PHONE ? `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
  window.open(waUrl, "_blank");
});

// Build order message
function buildOrderMessage() {
  const details = cartDetails();
  const totals = cartTotals();
  const buyer = buyerNameInput.value.trim() || "—";

  let lines = [];
  lines.push("Hello! I’d like to place an order:\n");
  details.forEach(d => lines.push(`${d.qty} x ${d.product.name} — ₱${formatNumber(d.product.price)} each — Subtotal ₱${formatNumber(d.qty * d.product.price)}`));
  lines.push(`\nTotal items: ${totals.items}`);
  lines.push(`Total amount: ₱${formatNumber(totals.total)}\n`);
  lines.push(`Buyer name: ${buyer}`);
  lines.push("Delivery address / contact: (please type here)\nThank you!");
  return lines.join("\n");
}

// Utils
function copyToClipboard(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  return new Promise((res, rej) => {
    const t = document.createElement("textarea");
    t.value = text;
    t.style.position = "fixed";
    t.style.left = "-9999px";
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); document.body.removeChild(t); res(); } 
    catch(e){ document.body.removeChild(t); rej(e); }
  });
}
function formatNumber(n){ return Number(n).toLocaleString("en-PH"); }
function escapeHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

// Make functions global
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
