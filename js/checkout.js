// ===========================================
// GET CART
// ===========================================


const cart =
    JSON.parse(localStorage.getItem("cart")) || [];



const checkoutItems =
    document.querySelector("#checkout-items");


const subtotalElement =
    document.querySelector("#checkout-subtotal");


const totalElement =
    document.querySelector("#checkout-total");



let subtotal = 0;



cart.forEach(item => {


    const product =
        products.find(
            p => p.id === item.id
        );



    if (!product) return;



    subtotal +=
        product.price * item.quantity;



    checkoutItems.innerHTML += `


<div class="checkout-product">


<span>

${product.name}

x${item.quantity}

</span>



<span>

₹${product.price * item.quantity}

</span>


</div>


`;


});



subtotalElement.textContent =
    `₹${subtotal}`;



totalElement.textContent =
    `₹${subtotal}`;

const placeOrderButton =
document.querySelector(".place-order-btn");

placeOrderButton.addEventListener("click", () => {

    const orderId =
    "LL" + Date.now();

    localStorage.setItem(

        "orderId",

        orderId

    );

    localStorage.removeItem("cart");

    window.location.href =
    "order-success.html";

});