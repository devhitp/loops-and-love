// ===========================================
// URL PARAMETERS
// ===========================================

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));

// ===========================================
// FIND PRODUCT
// ===========================================

const product = products.find(item => item.id === productId);

// ===========================================
// RECENTLY VIEWED PRODUCTS
// ===========================================

let recentlyViewed =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];

// Remove the current product if it already exists
recentlyViewed =
    recentlyViewed.filter(id => id !== product.id);

// Add the current product to the beginning
recentlyViewed.unshift(product.id);

// Keep only the latest 6 products
recentlyViewed =
    recentlyViewed.slice(0, 6);

localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(recentlyViewed)
);



// ===========================================
// INVALID PRODUCT CHECK
// ===========================================

if (!product) {

    document.body.innerHTML = `

        <main class="container">

            <h1>Product Not Found</h1>

            <a href="shop.html">

                Back to Shop

            </a>

        </main>

    `;

    throw new Error("Product not found");

}

// ===========================================
// GET CONTAINER
// ===========================================

const productContainer = document.querySelector("#product-container");
// console.log("Product JS Loaded");

// console.log(product);

// console.log(productContainer);
const breadcrumbProduct =
    document.querySelector("#breadcrumb-product");

breadcrumbProduct.textContent =
    product.name;

// ===========================================
// RENDER PRODUCT
// ===========================================

productContainer.innerHTML = `
<section class="product-details">

    <div class="product-details-image">

        <img
            src="${product.image}"
            alt="${product.name}"
        >

    </div>

    <div class="product-details-content">

        <h1 class="product-title">

    ${product.name}

</h1>

<div class="product-rating">

    ⭐⭐⭐⭐⭐

    <span>(24 Reviews)</span>

</div>

<div class="product-price">

    ₹${product.price}

</div>

<span class="product-category">

    ${product.category}

</span>

        <p class="product-description">

            ${product.description}

        </p>

        <div class="product-highlights">

    <div class="highlight-card">

        <span class="highlight-icon">🧶</span>

        <div>

            <h4>Handmade</h4>

            <p>Crafted with love</p>

        </div>

    </div>

    <div class="highlight-card">

        <span class="highlight-icon">🌿</span>

        <div>

            <h4>Eco Friendly</h4>

            <p>Premium yarn materials</p>

        </div>

    </div>

    <div class="highlight-card">

        <span class="highlight-icon">📦</span>

        <div>

            <h4>Ready to Ship</h4>

            <p>Quick dispatch</p>

        </div>

    </div>

</div>

        <div class="quantity-wrapper">

    <label class="quantity-label">

        Quantity

    </label>

    <div class="quantity-selector">

        <button
            class="quantity-btn quantity-minus"
        >

            <i class="fa-solid fa-minus"></i>

        </button>

        <span class="quantity-value">

            1

        </span>

        <button
            class="quantity-btn quantity-plus"
        >

            <i class="fa-solid fa-plus"></i>

        </button>

    </div>

</div>

        <div class="product-actions">

            <button
    class="add-cart-btn"
    data-id="${product.id}"
>

    <i class="fa-solid fa-bag-shopping"></i>

    <span>Add to Cart</span>

</button>

<button
    class="product-wishlist-btn"
    data-id="${product.id}"
>

    <i class="fa-regular fa-heart"></i>

    <span>Wishlist</span>

</button>

        </div>

    </div>

</section>
<section class="recently-viewed">

    <h2>Recently Viewed</h2>

    <div
        class="recent-grid"
        id="recent-grid"
    >

    </div>

</section>
<section class="related-products">

    <h2>You May Also Like</h2>

    <div
        class="related-grid"
        id="related-grid"
    >

    </div>

</section>
`;

lucide.createIcons();

// ===========================================
// RENDER RECENTLY VIEWED
// ===========================================

const recentGrid =
    document.getElementById("recent-grid");

const recentSection =
    document.querySelector(".recently-viewed");

const recentProducts =
    recentlyViewed
        .filter(id => id !== product.id)
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);

if (recentProducts.length === 0) {

    recentSection.style.display = "none";

} else {

    recentProducts.forEach(item => {

        recentGrid.innerHTML += `

        <a
            href="product.html?id=${item.id}"
            class="recent-card"
        >

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <h4>${item.name}</h4>

            <span>₹${item.price}</span>

        </a>

        `;

    });

}

// ===========================================
// RELATED PRODUCTS
// ===========================================

const relatedGrid =
    document.getElementById("related-grid");

const relatedSection =
    document.querySelector(".related-products");

const relatedProducts =
    products
        .filter(item =>
            item.category === product.category &&
            item.id !== product.id
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

if (relatedProducts.length === 0) {

    relatedSection.style.display = "none";

} else {

    relatedProducts.forEach(item => {

        relatedGrid.innerHTML += `

        <a
            href="product.html?id=${item.id}"
            class="recent-card"
        >

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <h4>${item.name}</h4>

            <span>₹${item.price}</span>

        </a>

        `;

    });

}

// ===========================================
// QUANTITY SELECTOR
// ===========================================

let quantity = 1;

const minusBtn =
    document.querySelector(".quantity-minus");

const plusBtn =
    document.querySelector(".quantity-plus");

const quantityText =
    document.querySelector(".quantity-value");

minusBtn.addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityText.textContent = quantity;

    }

});

plusBtn.addEventListener("click", () => {

    quantity++;

    quantityText.textContent = quantity;

});
// ===========================================
// ADD TO CART
// ===========================================

const addCartBtn = document.querySelector(".add-cart-btn");

addCartBtn.addEventListener("click", () => {

    addCartBtn.classList.add("btn-loading");
addCartBtn.disabled = true;

    setTimeout(() => {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem =
            cart.find(item => item.id === product.id);

        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            cart.push({

                id: product.id,

                quantity: quantity

            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();

        showToast(
            "Added to Cart",
            `${product.name} added successfully.`,
            "success"
        );

        addCartBtn.classList.remove("btn-loading");

addCartBtn.disabled = false;
    }, 500);

});


// ===========================================
// WISHLIST
// ===========================================

const wishlistBtn = document.querySelector(".product-wishlist-btn");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

updateWishlistButton();

wishlistBtn.addEventListener("click", () => {

    if (wishlist.includes(product.id)) {

        wishlist =
            wishlist.filter(id => id !== product.id);

        showToast(
            "Removed",
            `${product.name} removed from wishlist.`,
            "warning"
        );

    } else {

        wishlist.push(product.id);

        showToast(
            "Wishlist Updated",
            `${product.name} added to wishlist.`,
            "info"
        );

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

    updateWishlistButton();

});

function updateWishlistButton() {

    if (wishlist.includes(product.id)) {

        wishlistBtn.innerHTML = "💖 In Wishlist";

        wishlistBtn.classList.add("active");

    } else {

        wishlistBtn.innerHTML = "❤️ Wishlist";

        wishlistBtn.classList.remove("active");

    }

}