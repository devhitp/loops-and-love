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
console.log("Product JS Loaded");

console.log(product);

console.log(productContainer);
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

        <span class="product-category">

            ${product.category}

        </span>

        <h1>

            ${product.name}

        </h1>

        <div class="product-rating">

            ⭐⭐⭐⭐⭐
            <span>(24 Reviews)</span>

        </div>

        <span class="product-price">

            ₹${product.price}

        </span>

        <p class="product-description">

            ${product.description}

        </p>

        <div class="product-highlights">

            <div>✅ Handmade with Love</div>

            <div>🌿 Eco-Friendly Materials</div>

            <div>📦 Ready to Ship</div>

        </div>

        <div class="quantity-selector">

            <button>-</button>

            <span>1</span>

            <button>+</button>

        </div>

        <div class="product-actions">

            <button
                class="add-cart-btn"
                data-id="${product.id}"
            >

                Add to Cart

            </button>

            <button
                class="product-wishlist-btn"
                data-id="${product.id}"
            >

                ❤️ Wishlist

            </button>

        </div>

    </div>

</section>
`;

lucide.createIcons();

// ===========================================
// QUANTITY SELECTOR
// ===========================================

let quantity = 1;

const minusBtn = document.querySelector(".quantity-selector button:first-child");
const plusBtn = document.querySelector(".quantity-selector button:last-child");
const quantityText = document.querySelector(".quantity-selector span");

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

    addCartBtn.textContent = "Adding...";

    setTimeout(() => {

        let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem =
        cart.find(item => item.id === product.id);

        if(existingItem){

            existingItem.quantity += quantity;

        }else{

            cart.push({

                id:product.id,

                quantity:quantity

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

        addCartBtn.textContent = "Add to Cart";

    },500);

});


// ===========================================
// WISHLIST
// ===========================================

const wishlistBtn =
    document.querySelector(".product-wishlist-btn");

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

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