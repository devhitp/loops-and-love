// ===========================================
// DOM ELEMENTS
// ===========================================

const productGrid = document.querySelector(".product-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector(".search-input");
const suggestionsBox = document.getElementById("search-suggestions");
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

    const button =
        document.querySelector(
            `.wishlist-btn[data-id="${productId}"]`
        );

    if (button) {

        button.classList.add("heart-pop");

        setTimeout(() => {

            button.classList.remove("heart-pop");

        }, 350);

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
        `${product.name} added successfully.`,
        "success"
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

    cartButton.classList.add("btn-loading");

    const originalText =
        cartButton.textContent;

    cartButton.textContent = "Adding...";

    setTimeout(() => {

        addToCart(cartButton.dataset.id);

        cartButton.classList.remove("btn-loading");

        cartButton.textContent = originalText;

    }, 500);

});

// ===========================================
// SEARCH
// ===========================================

searchInput.addEventListener("input", () => {

    currentSearch = searchInput.value.trim();

    visibleProducts = PRODUCTS_PER_PAGE;

    updateProducts();

    renderSuggestions();

});
// ===========================================
// SEARCH SUGGESTIONS
// ===========================================

function renderSuggestions() {

    const value =
        searchInput.value.trim().toLowerCase();

    suggestionsBox.innerHTML = "";

    if (value === "") {

        suggestionsBox.classList.remove("show");

        return;

    }

    const matches =
        products
            .filter(product =>
                product.name
                    .toLowerCase()
                    .includes(value)
            )
            .slice(0, 5);

    if (matches.length === 0) {

        suggestionsBox.innerHTML = `

        <div class="search-empty">

            <span>😔</span>

            <p>No products found.</p>

        </div>

    `;

        suggestionsBox.classList.add("show");

        return;

    }

    matches.forEach(product => {

        const highlightedName =
            product.name.replace(
                new RegExp(`(${value})`, "gi"),
                "<strong>$1</strong>"
            );

        suggestionsBox.innerHTML += `

    <div
        class="search-item"
        data-id="${product.id}"
    >

        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <div class="search-info">

            <h4>${highlightedName}</h4>

            <small>${product.category}</small>

            <span>₹${product.price}</span>

        </div>

    </div>

    `;

    });

    suggestionsBox.classList.add("show");

}

suggestionsBox.addEventListener("click", (event) => {

    const item =
        event.target.closest(".search-item");

    if (!item) return;

    window.location.href =
        `product.html?id=${item.dataset.id}`;

});

document.addEventListener("click", (event) => {

    if (
        !event.target.closest(".search-wrapper")
    ) {

        suggestionsBox.classList.remove("show");

    }

});


document.addEventListener("click",(event)=>{

    const cartButton =
    event.target.closest(".quick-cart-btn");

    if(!cartButton) return;

    const id =
    Number(cartButton.dataset.id);

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
    cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id:id,

            quantity:1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    const product =
    products.find(item => item.id === id);

    showToast(
        "Added to Cart",
        `${product.name} added successfully.`,
        "success"
    );

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