const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistContainer =
    document.querySelector("#wishlist-items");

if (wishlist.length === 0) {

    wishlistContainer.innerHTML = `
<div class="empty-state">

    <div class="empty-icon">💖</div>

    <h2>Your Wishlist is Empty</h2>

    <p>
        Save your favourite handmade creations here so
        you can find them anytime.
    </p>

    <a href="shop.html" class="btn btn-primary">
        Explore Products
    </a>

</div>
`;

} else {

    renderWishlist();

}

function renderWishlist() {

    wishlistContainer.innerHTML = "";

    wishlist.forEach(id => {

        const product =
            products.find(item => item.id === id);

        if (!product) return;

        wishlistContainer.innerHTML += `

        <article class="wishlist-card">

            <div class="wishlist-image-wrapper">

                <span class="wishlist-heart">

                    <i class="fa-solid fa-heart"></i>

                </span>

                <img
                src="${product.image}"
                alt="${product.name}"
                class="wishlist-image">

            </div>

            <div class="wishlist-content">

                <span class="wishlist-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <div class="wishlist-rating">

                    ★★★★★

                    <span>4.9</span>

                </div>

                <div class="wishlist-price">

                    ₹${product.price}

                </div>

                <button
                class="btn btn-primary wishlist-cart-btn"
                data-id="${product.id}">

                    Add to Cart

                </button>

                <button
                class="remove-wishlist-btn"
                data-id="${product.id}">

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

        </article>

        `;

    });

}
wishlistContainer.addEventListener("click", (event) => {

    const removeButton =
        event.target.closest(".remove-wishlist-btn");

    const cartButton =
        event.target.closest(".wishlist-cart-btn");

    // Remove from Wishlist
    if (removeButton) {

        const productId =
            Number(removeButton.dataset.id);

        const index =
            wishlist.indexOf(productId);

        if (index !== -1) {

            wishlist.splice(index, 1);

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlistCount();

        if (wishlist.length === 0) {

            location.reload();

        } else {

            renderWishlist();

        }

    }

    // Add to Cart
    if (cartButton) {

        const productId =
            Number(cartButton.dataset.id);

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existing =
            cart.find(item => item.id === productId);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                id: productId,

                quantity: 1

            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateWishlistCount();

        showToast(
            "Added to Cart",
            `${product.name} added successfully.`,
            "success"
        );

    }

});