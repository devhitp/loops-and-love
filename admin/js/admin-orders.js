// ==========================================
// DISPLAY ORDERS
// ==========================================


const ordersTable =
    document.querySelector(".orders-table");
const orderModal =
    document.querySelector("#order-modal");

const closeOrderModal =
    document.querySelector("#close-order-modal");

const orderDetails =
    document.querySelector("#order-details");



function renderOrders() {


    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];



    const emptyMessage =
        document.querySelector(".empty-orders");



    if (orders.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }



    emptyMessage.style.display =
        "none";



    // Remove old rows

    document
        .querySelectorAll(".order-row")
        .forEach(row => row.remove());





    orders.forEach(order => {



        const row =
            document.createElement("div");


        row.className =
            "order-row";



        row.innerHTML = `


        <span>

        ${order.id}

        </span>




        <span>

        ${order.customer.name}

        </span>




        <span>

        ₹${order.total}

        </span>




        <span>

        <span class="status ${order.status.toLowerCase()}">

    ${order.status}

</span>

        </span>





        <span>


        <button
    class="view-order-btn"
    data-id="${order.id}">

    View

</button>


        </span>



        `;



        ordersTable.appendChild(row);



    });



}

// ==========================================
// VIEW ORDER
// ==========================================

document.addEventListener(
    "click",
    function (e) {

        const button =
            e.target.closest(".view-order-btn");

        if (!button) return;

        const orderId =
            button.dataset.id;

        const orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        const order =
            orders.find(
                o => o.id == orderId
            );

        if (!order) return;

        showOrderDetails(order);

        orderModal.classList.add("active");

    }
);

function showOrderDetails(order) {

    let itemsHTML = "";

    order.items.forEach(item => {

        itemsHTML += `

        <div class="order-item">

            <span>

                ${item.name}
                × ${item.quantity}

            </span>

            <span>

                ₹${item.price * item.quantity}

            </span>

        </div>

        `;

    });

    orderDetails.innerHTML = `

        <div class="order-section">

            <h3>Order Information</h3>

            <p><strong>Order ID:</strong> ${order.id}</p>

            <p>

    <strong>Status:</strong>

    <select
        id="order-status"
        data-id="${order.id}">

        <option
            value="Pending"
            ${order.status === "Pending" ? "selected" : ""}>

            Pending

        </option>

        <option
            value="Processing"
            ${order.status === "Processing" ? "selected" : ""}>

            Processing

        </option>

        <option
            value="Shipped"
            ${order.status === "Shipped" ? "selected" : ""}>

            Shipped

        </option>

        <option
            value="Delivered"
            ${order.status === "Delivered" ? "selected" : ""}>

            Delivered

        </option>

        <option
            value="Cancelled"
            ${order.status === "Cancelled" ? "selected" : ""}>

            Cancelled

        </option>

    </select>

</p>

            <p><strong>Date:</strong> ${order.date}</p>

        </div>

        <div class="order-section">

    <h3>Customer Information</h3>

    <p><strong>Name:</strong> ${order.customer.name}</p>

    <p><strong>Phone:</strong> ${order.customer.phone}</p>

    <p><strong>Address:</strong> ${order.customer.address}</p>

    <p><strong>City:</strong> ${order.customer.city}</p>

    <p><strong>Pincode:</strong> ${order.customer.pincode}</p>

</div>

        <div class="order-section">

            <h3>Items</h3>

            ${itemsHTML}
        </div>

        <div class="order-total">

            Total: ₹${order.total}

        </div>

    `;

}


closeOrderModal.addEventListener(
    "click",
    () => {

        orderModal.classList.remove("active");

    }
);

orderModal.addEventListener(
    "click",
    (e) => {

        if (e.target === orderModal) {

            orderModal.classList.remove("active");

        }

    }
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

document.addEventListener(
    "change",
    function (e) {

        if (e.target.id !== "order-status") return;

        const orderId =
            e.target.dataset.id;

        const newStatus =
            e.target.value;

        let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        const order =
            orders.find(
                o => o.id == orderId
            );

        if (!order) return;

        order.status = newStatus;

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        renderOrders();

        showToast("Order status updated!");

    }
);


renderOrders();