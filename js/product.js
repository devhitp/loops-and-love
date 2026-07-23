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