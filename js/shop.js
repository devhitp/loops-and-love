// ===========================================
// DOM ELEMENTS
// ===========================================

const productGrid = document.querySelector(".product-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector(".search-input");
const sortSelect = document.querySelector(".sort-select");
const productCount = document.querySelector(".product-count");
const loadMoreBtn = document.querySelector(".load-more-btn");
const wishlistCount = document.querySelector(".wishlist-count");
const cartCount = document.querySelector(".cart-count");

// ===========================================
// APP STATE
// ===========================================

const PRODUCTS_PER_PAGE = 9;

let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

let visibleProducts = PRODUCTS_PER_PAGE;
let currentProducts = [];

// ===========================================
// WISHLIST
// ===========================================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===========================================
// CREATE PRODUCT CARD
// ===========================================

function createProductCard(product) {

    return `
        <article
            class="product-card"
            data-id="${product.id}"
            data-category="${product.category}"
        >

            <a
                href="product.html?id=${product.id}"
                class="product-link"
            >

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span class="product-tag">

                        ${product.badge}

                    </span>

                </div>

            </a>

            <button
                class="wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}"
                data-id="${product.id}"
            >

                <i data-lucide="heart"></i>

            </button>

            <div class="product-content">

                <span class="product-category">

                    ${product.category}

                </span>

                <a
                    href="product.html?id=${product.id}"
                    class="product-title-link"
                >

                    <h3>

                        ${product.name}

                    </h3>

                </a>

                <p>

                    ${product.description}

                </p>

                <div class="product-footer">

                    <span class="product-price">

                        ₹${product.price}

                    </span>

                    <button
                        class="add-cart-btn"
                        data-id="${product.id}"
                    >

                        Add to Cart

                    </button>

                </div>

            </div>

        </article>
    `;

}

// ===========================================
// RENDER PRODUCTS
// ===========================================

function renderProducts() {

    productGrid.innerHTML = "";

    const visible = currentProducts.slice(0, visibleProducts);

    visible.forEach(product => {

        productGrid.innerHTML += createProductCard(product);

    });
    productCount.textContent =
        `Showing ${currentProducts.length} Handmade Creations`;
    if (visibleProducts >= currentProducts.length) {

        loadMoreBtn.style.display = "none";

    } else {

        loadMoreBtn.style.display = "inline-flex";

    }

    lucide.createIcons();

}
// ===========================================
// WISHLIST
// ===========================================

function toggleWishlist(productId) {

    productId = Number(productId);

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(id => id !== productId);

    } else {

        wishlist.push(productId);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderProducts();

}

// ===========================================
// WISHLIST COUNTER
// ===========================================

function updateWishlistCount() {

    wishlistCount.textContent = wishlist.length;

    wishlistCount.style.display =
        wishlist.length ? "flex" : "none";

}

function addToCart(productId) {

    const existingItem = cart.find(item => item.id == productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: Number(productId),

            quantity: 1

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();
    const product =
        products.find(p => p.id == productId);

    showToast(
        "Added to Cart",
        `${product.name} added successfully.`
    );

}
// ===========================================
// UPDATE PRODUCTS
// ===========================================

function updateProducts() {

    currentProducts = [...products];

    // Category Filter
    if (currentCategory !== "all") {

        currentProducts = currentProducts.filter(product =>
            product.category === currentCategory
        );

    }

    // Search
    if (currentSearch !== "") {

        currentProducts = currentProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch.toLowerCase())
        );

    }

    // Sorting
    switch (currentSort) {

        case "price-low":

            currentProducts.sort((a, b) => a.price - b.price);

            break;

        case "price-high":

            currentProducts.sort((a, b) => b.price - a.price);

            break;

        case "name":

            currentProducts.sort((a, b) => a.name.localeCompare(b.name));

            break;

    }

    renderProducts();

}

function updateCartCount() {

    const totalItems = cart.reduce(

        (sum, item) => sum + item.quantity,

        0

    );

    cartCount.textContent = totalItems;

}

// ===========================================
// FILTER PRODUCTS
// ===========================================

function filterProducts(category) {

    currentCategory = category;

    visibleProducts = PRODUCTS_PER_PAGE;

    updateProducts();

}

// ===========================================
// FILTER BUTTON EVENTS
// ===========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        filterProducts(button.dataset.filter);

    });

});
// ===========================================
// WISHLIST EVENTS
// ===========================================

productGrid.addEventListener("click", (event) => {

    const wishlistButton = event.target.closest(".wishlist-btn");

    if (!wishlistButton) return;

    toggleWishlist(wishlistButton.dataset.id);

});

productGrid.addEventListener("click", (event) => {

    const cartButton =
        event.target.closest(".add-cart-btn");

    if (!cartButton) return;

    addToCart(cartButton.dataset.id);

});

// ===========================================
// SEARCH
// ===========================================

searchInput.addEventListener("input", () => {

    currentSearch = searchInput.value.trim();

    visibleProducts = PRODUCTS_PER_PAGE;

    updateProducts();

});
// ===========================================
// SORT
// ===========================================

sortSelect.addEventListener("change", () => {

    currentSort = sortSelect.value;

    updateProducts();

});
// ===========================================
// SORTING
// ===========================================

switch (currentSort) {

    case "price-low":

        currentProducts.sort((a, b) => a.price - b.price);

        break;

    case "price-high":

        currentProducts.sort((a, b) => b.price - a.price);

        break;

    case "name-asc":

        currentProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        break;

    case "name-desc":

        currentProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

        break;

    default:

        break;

}
// ===========================================
// LOAD MORE
// ===========================================

loadMoreBtn.addEventListener("click", () => {

    visibleProducts += PRODUCTS_PER_PAGE;

    renderProducts();

});

// ===========================================
// INITIALIZE SHOP
// ===========================================

updateProducts();