// ===========================================
// CART DATA
// ===========================================
const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);
const cartContainer = document.querySelector("#cart-items");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");

if (cart.length === 0) {

    cartContainer.innerHTML = `

        <div class="empty-cart">

            <h2>

                Your cart is empty.

            </h2>

            <a
                href="shop.html"
                class="btn btn-primary"
            >

                Continue Shopping

            </a>

        </div>

    `;

}
if (cart.length > 0) {

    renderCart();

}
function renderCart() {

    cartContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(cartItem => {

        const product =
            products.find(
                item => item.id === cartItem.id
            );

        if (!product) return;

        subtotal +=
            product.price * cartItem.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img
            src="${product.image}"
            class="cart-item-image"
            alt="${product.name}">

            <div class="cart-item-details">

                <h3>${product.name}</h3>

                <p class="cart-price">

    ₹${product.price} × ${cartItem.quantity}

</p>

<p class="cart-total">

    Total: ₹${product.price * cartItem.quantity}

</p>
<p class="cart-category">

    ${product.category}

</p>

                <div class="quantity-controls">

                    <button
                    class="decrease-btn"
                    data-id="${product.id}">

                    −

                    </button>

                    <span>

                    ${cartItem.quantity}

                    </span>

                    <button
                    class="increase-btn"
                    data-id="${product.id}">

                    +

                    </button>

                </div>

                <button
                class="remove-btn"
                data-id="${product.id}">

                <i class="fa-solid fa-trash"></i>

Remove

                </button>

            </div>

        </div>

        `;

    });

    subtotalElement.textContent =
        `₹${subtotal}`;

    totalElement.textContent =
        `₹${subtotal}`;

}
cartContainer.addEventListener("click", (event) => {

    const increase =
        event.target.closest(".increase-btn");

    const decrease =
        event.target.closest(".decrease-btn");

    const remove =
        event.target.closest(".remove-btn");

    if (increase) {

        const item =
            cart.find(
                p => p.id == increase.dataset.id
            );

        item.quantity++;

    }

    if (decrease) {

        const item =
            cart.find(
                p => p.id == decrease.dataset.id
            );

        item.quantity--;

        if (item.quantity <= 0) {

            const index =
                cart.indexOf(item);

            cart.splice(index, 1);

        }

    }

    if (remove) {

        const index =
            cart.findIndex(
                p => p.id == remove.dataset.id
            );

        cart.splice(index, 1);

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    renderCart();

});