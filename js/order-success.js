// ==========================================
// GET ORDER DATA
// ==========================================

const latestOrder =
    JSON.parse(
        localStorage.getItem("latestOrder")
    );


// ==========================================
// INVALID ORDER CHECK
// ==========================================

if (!latestOrder) {

    document.querySelector(".success-card").innerHTML = `

        <h1>
            Order Not Found
        </h1>

        <p>
            We couldn't find your order details.
        </p>

        <a href="shop.html"
           class="btn btn-primary">

            Continue Shopping

        </a>

    `;

}


// ==========================================
// DISPLAY BASIC DETAILS
// ==========================================


document.querySelector("#order-id")
    .textContent =
    latestOrder.id;



document.querySelector("#order-date")
    .textContent =
    latestOrder.date;


const customerName =
    latestOrder.customer?.name || "";


document.querySelector("#customer-name")
    .textContent =
    customerName;

// ==========================================
// ORDER ITEMS
// ==========================================


const orderItemsContainer =
    document.querySelector("#order-items");



latestOrder.items.forEach(item => {


    const product =
        products.find(
            p => p.id === item.id
        );


    if (!product) return;


    const itemTotal =
        product.price * item.quantity;



    orderItemsContainer.innerHTML += `


<div class="order-item">


<img
src="${product.image}"
alt="${product.name}"
>



<div>


<h3>
${product.name}
</h3>


<p>

Quantity:
${item.quantity}

</p>


</div>



<strong>

₹${itemTotal}

</strong>



</div>


`;

});

const subtotal =
latestOrder.subtotal || 0;


const shipping =
latestOrder.shipping || 0;


const tax =
latestOrder.tax || 0;


const total =
latestOrder.total || subtotal;



// ==========================================
// TOTAL
// ==========================================


document.querySelector("#order-total")
    .textContent =
    `₹${total}`;

    document.querySelector("#order-subtotal")
.textContent =
`₹${subtotal}`;


document.querySelector("#order-shipping")
.textContent =
shipping === 0
? "FREE"
: `₹${shipping}`;


document.querySelector("#order-tax")
.textContent =
`₹${tax}`;