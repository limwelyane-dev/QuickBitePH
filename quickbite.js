
// FOR LOGIN
const logInBtn = document.getElementById("logInBtn");
const registerBtn = document.getElementById("registerBtn");
const logInForm = document.getElementById("login");
const closeBtn = document.getElementById("closeLogin");
const signUp = document.getElementById("signupForm");
const logIn = document.getElementById("loginForm");


logInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logInForm.style.display = "flex";
    logIn.style.display = "block";
    signUp.style.display = "none";
});

closeBtn.addEventListener("click", (e) => {
    logInForm.style.display = "none";
});

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logInForm.style.display = "flex";
  logIn.style.display = "none";
  signUp.style.display = "block";

});

function showSignup(){
  logIn.style.display = "none";
  signUp.style.display = "block";
}
function showLogin(){
  logIn.style.display = "block";
  signUp.style.display = "none";
}

const verifyLogin = document.getElementById("verifyLogin");
const firstPage = document.getElementById("firstPage");

verifyLogin.addEventListener('click', (e) =>{
  e.preventDefault();
  firstPage.classList.add('hidden');
  logInForm.style.display = ('none');
  secondPage.classList.remove('hidden');
})

//FOR SECONDPAGE
const products = document.querySelectorAll('.productImg');
const viewImg = document.getElementById('viewImg');
const viewText = document.getElementById('viewText');
const viewRate = document.getElementById('rating');
const viewBenefits = document.getElementById('benefitsInfo');

products.forEach(product => {

    const img = product.querySelector('img');
    const title = product.querySelector('h3');
    const rating = product.querySelector('p#rate');
    const benefits = product.querySelector('p#benefits');

    product.addEventListener('mouseenter', () => {
        viewImg.src = img.src;
        viewRate.textContent = rating.textContent;
        viewText.textContent = title.textContent;
        viewBenefits.textContent = benefits.textContent;
    });

});

const orderNow = document.getElementById('OrderNow');
const seemore = document.getElementById('seemore');
const myProducts = document.querySelector('.myProducts');
const secondPage = document.querySelector('.secondPage');
const aboutContainer = document.getElementById('aboutContainer');
const home = document.getElementById('home');
const about = document.getElementById('about');
const arrow = document.getElementById('arrow');

orderNow.addEventListener('click', () =>{
  secondPage.classList.add("hidden");
  myProducts.classList.remove("hidden");
})

seemore.addEventListener('click', () =>{
  secondPage.classList.add('hidden');
  aboutContainer.classList.remove('hidden');
})
 
home.addEventListener('click', () =>{
  secondPage.classList.remove("hidden");
  myProducts.classList.add("hidden");
})
about.addEventListener('click', () =>{
  myProducts.classList.add("hidden");
  aboutContainer.classList.remove("hidden");
})

arrow.addEventListener('click', () =>{
  aboutContainer.classList.add("hidden");
  secondPage.classList.remove('hidden');
})

//FOR THIRDPAGE
const foods = [
    { id: 1, name: "Chicken Adobo", price: 120, img: "chicken-adobo.jpg", category: "chicken" },
    { id: 2, name: "Roasted Chicken", price: 150, img: "roasted-chicken.webp", category: "chicken" },
    { id: 3, name: "Pork Steak", price: 200, img: "Pork-Steak.jpg", category: "pork" },
    { id: 4, name: "Ground Pork", price: 85, img: "ground-pork.jpg", category: "pork" },
    { id: 5, name: "Buko Shake", price: 50, img: "BukoShake.jpg", category: "drinks" },
    { id: 6, name: "Chicken Bucket /w fries", price: 299, img: "bucket.jpg", category: "chicken" },
    { id: 7, name: "Fried Chicken", price: 45, img: "FriedChicken.avif", category: "chicken" },
    { id: 8, name: "Coke", price: 20, img: "coke1.jpg", category: "drinks" },
    { id: 9, name: "Mango Shake", price: 50, img: "mangoShake.jpg", category: "drinks" },
    { id: 10, name: "Water", price: 20, img: "water.jpg", category: "drinks" },
    { id: 11, name: "Chess Cake", price: 45, img: "chesscake.jpg", category: "dessert" },
    { id: 12, name: "Pan Cakes", price: 50, img: "pancakes.jpg", category: "dessert" },
    { id: 13, name: "Mango Float", price: 150, img: "mangofloat.jpg", category: "dessert" },
    { id: 14, name: "Croissant Sandwich", price: 90, img: "croissant-sandwich.jpg", category: "dessert" },
    { id: 15, name: "Pork BBQ", price: 30, img: "barbecue.jpg", category: "pork" },
    { id: 16, name: "Pork Adobo", price: 50, img: "Pork-Adobo_2.webp", category: "pork" },
    { id: 17, name: "Grilled Oyster", price: 90, img: "grilled-oyster.avif", category: "seafood" },
    { id: 18, name: "Grilled Fish", price: 40, img: "grilled-fish.jpg", category: "seafood" },
    { id: 19, name: "Grilled Shrimp", price: 120, img: "grilled-shrimp.jpg", category: "seafood" },
    { id: 20, name: "Grilled Squid", price: 100, img: "grilled-squid.avif", category: "seafood" },
    { id: 21, name: "Beef Steak", price: 400, img: "beef-steak.jpg", category: "beef" },
    { id: 22, name: "Beef Tacos", price: 120, img: "beef-tacos.webp", category: "beef" },
    { id: 23, name: "Beef MeatBalls", price: 80, img: "beef-meatballs.jpg", category: "beef" },
    { id: 24, name: "Beef Nilaga", price: 110, img: "beef-nilaga.jpg", category: "beef" },
    { id: 25, name: "Coconut Water", price: 50, img: "coconut-water.jpg", category: "drinks" },
    { id: 26, name: "Iced Tea", price: 60, img: "summer-peach.jpg", category: "drinks" }
];

let cart = []; 

    const seafoodRoot = document.getElementById("seafood");
    const dessertRoot = document.getElementById("desserts");
    const porkRoot = document.getElementById("pork");
    const chickenRoot = document.getElementById("chicken");
    const drinkRoot = document.getElementById("drinks");
    const beefRoot = document.getElementById("beef");

    const cartToggleBtn = document.getElementById("cartToggle");
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCartBtn = document.getElementById("closeCart");

    const cartCount = document.getElementById("cartCount");
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");
    const itemsCountEl = document.getElementById("itemsCount");

    const checkoutBtn = document.getElementById("checkoutBtn");

    const receiptModal = document.getElementById("receiptModal");
    const receiptItems = document.getElementById("receiptItems");
    const receiptTotal = document.getElementById("receiptTotal");

    renderProducts();
    updateCartUI();

    function renderProducts() {
        chickenRoot.innerHTML = "";
        drinkRoot.innerHTML = "";
        dessertRoot.innerHTML = "";
        porkRoot.innerHTML = "";
        seafoodRoot.innerHTML = "";
        beefRoot.innerHTML = "";

        foods.forEach(p => {
          const card = document.createElement("article");
          card.className = "card";
          card.innerHTML = `
            <img src="${p.img}" alt="${escapeHtml(p.name)}" />
            <h3>${escapeHtml(p.name)}</h3>
            <div class="actions">
              <div class="price small">₱${formatNumber(p.price)}</div>
              <button onclick="addToCart(${p.id})">Add to cart</button>
            </div>
          `;

          if (p.category === "chicken") chickenRoot.appendChild(card);
          else if (p.category === "drinks") drinkRoot.appendChild(card);
          else if (p.category === "dessert") dessertRoot.appendChild(card);
          else if (p.category === "pork") porkRoot.appendChild(card);
          else if (p.category === "seafood") seafoodRoot.appendChild(card);
          else if (p.category === "beef") beefRoot.appendChild(card);
        });
    }

    const searchBar = document.getElementById("searchBar");
    const searchBtn = document.getElementById("search");

    function searchFoods(){
      const searchText = searchBar.value.toLowerCase();
      const cards = document.querySelectorAll(".card");

      cards.forEach(card => {
        const foodName = card.querySelector("h3").textContent.toLowerCase();

        if(foodName.includes(searchText)){
          card.style.display = "block";
        }
        else{
          card.style.display = "none";
        }
      });
      toggleSection(chickenRoot, "chicken1");
      toggleSection(drinkRoot, "drinks1");
      toggleSection(dessertRoot, "dessert1");
      toggleSection(porkRoot, "pork1");
      toggleSection(seafoodRoot, "seafood1");
      toggleSection(beefRoot, "beef1");
    }

    function toggleSection(section, headerId){

    const visibleCards =
        [...section.querySelectorAll(".card")]
        .filter(card => card.style.display !== "none");

    const header = document.getElementById(headerId);

    if(visibleCards.length > 0){

        section.style.display = "";

    }else{

        section.style.display = "none";

    }
}

    searchBar.addEventListener('input', searchFoods);
    searchBtn.addEventListener('click', searchFoods);

    function addToCart(id) {
        const item = cart.find(c => c.id === id);
        if (item) item.qty++;
        else cart.push({ id, qty: 1 });
        updateCartUI();
        openCart();
      }

      function removeFromCart(id) {
        cart = cart.filter(c => c.id !== id);
        updateCartUI();
      }

      function changeQty(id, delta) {
        const item = cart.find(c => c.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        updateCartUI();
      }

      function cartDetails() {
        return cart.map(c => ({ ...c, product: foods.find(p => p.id === c.id) }));
      }

      function cartTotals() {
        const details = cartDetails();
        return {
          items: details.reduce((s, i) => s + i.qty, 0),
          total: details.reduce((s, i) => s + i.qty * i.product.price, 0)
        };
      }

      function updateCartUI() {
        const details = cartDetails();
        cartItemsEl.innerHTML = "";

        if (!details.length) {
          cartItemsEl.innerHTML = `<p>Your cart is empty, please add some food uglyman</p>`;
        } else {
          details.forEach(d => {
            const row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML = `
              <div style="width:64px;height:64px;border-radius:8px;overflow:hidden">
                <img src="${d.product.img}" alt="${escapeHtml(d.product.name)}"
                    style="width:100%;height:100%;object-fit:cover" />
              </div>

              <div class="meta">
                <div style="font-weight:700">${escapeHtml(d.product.name)}</div>
                <div style="color:var(--muted);font-size:13px">
                  ₱${formatNumber(d.product.price)} • ${d.qty} pcs
                </div>

                <div class="qty-controls" style="margin-top:8px">
                  <button onclick="changeQty(${d.id}, -1)">−</button>
                  <span>${d.qty}</span>
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
      }

      // CART SIDEBAR
      function openCart() {
        cartSidebar.classList.add("open");
      }

      function closeCart() {
        cartSidebar.classList.remove("open");
      }

      cartToggleBtn.addEventListener("click", () => cartSidebar.classList.toggle("open"));
      closeCartBtn.addEventListener("click", closeCart);

      checkoutBtn.addEventListener("click", () => {
        if (!cart.length) {
          alert("Your cart is empty.");
          return;
        }
        receiptItems.innerHTML = "";
        let total = 0;

        cartDetails().forEach(item => {
          const div = document.createElement("div");
          div.className = "receipt-item";
          div.innerHTML = `
            <span>${item.product.name} x${item.qty}</span>
            <span>₱${formatNumber(item.qty * item.product.price)}</span>
          `;
          receiptItems.appendChild(div);
          total += item.qty * item.product.price;
        });

        receiptTotal.innerText = formatNumber(total);
        receiptModal.style.display = "flex";
      });

      function closeReceipt() {
        receiptModal.style.display = "none";
      }

      function printReceipt() {
        window.print();
      }

      function formatNumber(n) {
        return Number(n).toLocaleString("en-PH");
      }

      function escapeHtml(s) {
        return String(s)
          .replace(/&/g,"&amp;")
          .replace(/</g,"&lt;")
          .replace(/>/g,"&gt;")
          .replace(/"/g,"&quot;");
      }

      window.addToCart = addToCart;
      window.changeQty = changeQty;
      window.removeFromCart = removeFromCart;
      window.closeReceipt = closeReceipt;
      window.printReceipt = printReceipt;

      const categorySelect = document.querySelector(".selectcategory");

    categorySelect.addEventListener("change", () => {
      const selectedValue = categorySelect.value;
      const targetSection = document.getElementById(selectedValue);

      if(targetSection){
        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    }
});
